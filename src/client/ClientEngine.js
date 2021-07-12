class ClientEngine {
  constructor(canvas) {
    console.log(canvas)

    Object.assign(this, {
      canvas,
      ctx: null,
    })

    this.ctx = this.canvas.getContext('2d')
    this.loop = this.loop.bind(this)
  }

  start() {
    this.loop()
  }

  loop() {
    // (timestamp)
    const { ctx, canvas } = this
    ctx.fillStyle = 'black'
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.initNextFrame()
  }

  initNextFrame() {
    window.requestAnimationFrame(this.loop)
  }
}

export default ClientEngine
