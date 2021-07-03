import clearCanvas from './utils/clearCanvas'

export default ({ w, h, ctx }) => {
  const drawRect = ({
    start = [0, 0], end = [w, h], fillStyle, width, height, speed,
  }) => {
    let [x, y] = start

    const interval = setInterval(() => {
      if (x <= end[0]) {
        [x, y] = start
      }
      ctx.fillStyle = fillStyle
      ctx.fillRect(x, y, height, width)
      x -= 10
      y += 10
    }, speed)

    return () => clearInterval(interval)
  }

  drawRect({
    start: [w, 0],
    end: [0, h],
    fillStyle: 'green',
    width: 100,
    height: 100,
    speed: 240,
  })
  // drawRect({
  //   start: [0, 0],
  //   end: [w, h],
  //   fillStyle: 'pink',
  //   width: 100,
  //   height: 100,
  //   speed: 120,
  // })

  clearCanvas({
    ctx,
    w,
    h,
    frequency: 300,
  })
}
