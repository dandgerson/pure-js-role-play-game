import ClientEngine from 'client/ClientEngine'

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
    this.engine.start()
  }
}

export default ClientGame
