import ClientEngine from 'client/ClientEngine'
import ClientWorld from 'client/ClientWorld'
import eventSourceMixin from 'common/EventSourceMixin'

import sprites from 'configs/sprites'
import worldJson from 'configs/world.json'
import gameObjects from 'configs/gameObjects.json'

class ClientGame {
  constructor({ config }) {
    Object.assign(this, {
      config,
      gameObjects,
      player: null,
    })

    this.engine = this.createEngine()
    this.world = this.createWorld()

    this.initEngine()
  }

  static init({ config }) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame({ config })

      // console.log('Game init')
    }
  }

  setPlayer(player) {
    this.player = player
  }

  createEngine() {
    return new ClientEngine(document.querySelector(this.config.tagId))
  }

  createWorld() {
    return new ClientWorld({
      game: this,
      engine: this.engine,
      levelCfg: worldJson,
    })
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.world.init()
      this.engine.on('render', (_, timestamp) => {
        this.world.render(timestamp)
      })

      this.engine.start()
      this.initKeys()
    })
  }

  initKeys() {
    const setMovableTile = tile => cell => cell.findObjectsByType(tile).length

    this.engine.input.onKey({
      ArrowLeft: (keydown) => {
        if (keydown) this.player.moveByCellCoord(-1, 0, setMovableTile('grass'))
      },
      ArrowRight: (keydown) => {
        if (keydown) this.player.moveByCellCoord(1, 0, setMovableTile('grass'))
      },
      ArrowUp: (keydown) => {
        if (keydown) this.player.moveByCellCoord(0, -1, setMovableTile('grass'))
      },
      ArrowDown: (keydown) => {
        if (keydown) this.player.moveByCellCoord(0, 1, setMovableTile('grass'))
      },
    })
  }
}

Object.assign(ClientGame.prototype, eventSourceMixin)

export default ClientGame
