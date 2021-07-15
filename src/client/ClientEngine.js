import ClientCamera from 'client/ClientCamera'
import ClientInput from 'client/ClientInput'
import eventSourceMixin from 'common/EventSourceMixin'

class ClientEngine {
  constructor(canvas) {
    Object.assign(this, {
      canvas,
      ctx: null,
      imageLoaders: [],
      sprites: {},
      images: {},
      camera: new ClientCamera({ canvas, engine: this }),
      input: new ClientInput(canvas),
    })

    this.ctx = this.canvas.getContext('2d')
    this.loop = this.loop.bind(this)
  }

  start() {
    this.loop()
  }

  loop(timestamp) {
    const { ctx, canvas } = this
    ctx.fillStyle = 'black'
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.trigger('render', timestamp)

    this.initNextFrame()
  }

  initNextFrame() {
    window.requestAnimationFrame(this.loop)
  }

  loadSprites(spriteGroups) {
    this.imageLoaders = []

    Object.keys(spriteGroups).forEach((group) => {
      this.sprites[group] = spriteGroups[group]
    })

    Object.keys(this.sprites).forEach((groupName) => {
      const group = this.sprites[groupName]

      Object.keys(group).forEach((sprite) => {
        const { img: imgUrl } = group[sprite]

        // console.log({ img: imgUrl })
        if (!this.images[imgUrl]) {
          this.imageLoaders.push(this.loadImage(imgUrl))
        }
      })
    })

    return Promise.all(this.imageLoaders)

    // console.log(this.sprites)
  }

  loadImage(url) {
    return new Promise((resolve) => {
      const img = new Image()

      this.images[url] = img
      img.onload = () => resolve(img)
      img.src = url
    })
  }

  renderSpriteFrame({
    sprite, frame, x, y, w, h,
  }) {
    const spriteConfig = this.sprites[sprite[0]][sprite[1]]
    const [fx, fy, fw, fh] = spriteConfig.frames[frame]
    const img = this.images[spriteConfig.img]

    this.ctx.drawImage(img, fx, fy, fw, fh, x, y, w, h)
  }
}

Object.assign(ClientEngine.prototype, eventSourceMixin)

export default ClientEngine
