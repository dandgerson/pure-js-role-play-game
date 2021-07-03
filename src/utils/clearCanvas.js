const clearCanvas = ({ ctx, h, w, frequency = 120 } = {}) => {
  setInterval(() => {
    ctx.clearRect(0, 0, h, w)
  }, frequency)
}

export default clearCanvas
