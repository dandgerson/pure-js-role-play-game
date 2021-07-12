import eventSourceMixin from 'common/eventSourceMixin'

class ClientEngine {
  constructor(canvas) {
    console.log(canvas)

    Object.assign(this, {
      canvas,
      ctx: null,
      imageLoaders: [],
      sprites: {},
      images: {},
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

        console.log({ img: imgUrl })
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
}

Object.assign(ClientEngine.prototype, eventSourceMixin)

export default ClientEngine
