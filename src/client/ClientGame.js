import ClientEngine from 'client/ClientEngine'

import sprites from 'configs/sprites'

class ClientGame {
  constructor({ config }) {
    Object.assign(this, {
      config,
    })

    this.engine = this.createEngine()
    this.initEngine()
  }

  static init({ config }) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame({ config })

      console.log('Game init')
    }
  }

  createEngine() {
    return new ClientEngine(document.querySelector(this.config.tagId))
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      console.log({ engine: this.engine })
      this.engine.start()
    })
  }
}

export default ClientGame
