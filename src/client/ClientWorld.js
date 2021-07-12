class ClientWorld {
  constructor({ game, engine, config }) {
    Object.assign(this, {
      game,
      engine,
      config,
      height: config.map.length,
      width: config.map[0].length,
    })
  }

  init() {
    this.engine.renderSpriteFrame({
      sprite: ['terrain', 'grass'],
      frame: 0,
      x: 0,
      y: 0,
      w: 48,
      h: 48,
    })
  }
}

export default ClientWorld
