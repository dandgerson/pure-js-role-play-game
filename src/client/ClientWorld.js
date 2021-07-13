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
    const { map } = this.config

    const sprite = {
      w: 48,
      h: 48,
    }

    map.forEach((row, y) => {
      row.forEach((cell, x) => {
        const [spriteName] = cell
        this.engine.renderSpriteFrame({
          sprite: ['terrain', spriteName],
          frame: 0,
          x: sprite.w * x,
          y: sprite.h * y,
          w: 48,
          h: 48,
        })
      })
    })
  }
}

export default ClientWorld
