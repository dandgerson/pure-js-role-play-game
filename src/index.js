import './styles/main.scss'

const canvas = document.querySelector('#game')
const { width: w, height: h } = canvas.getBoundingClientRect()
const ctx = canvas.getContext('2d')

console.log({
  canvas,
  ctx,
})

const drawRect = ({
  start = [0, 0],
  end = [w, h],
  fillStyle,
  width,
  height,
  speed,
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

const clearCanvas = ({ frequency = 120 } = {}) => {
  setInterval(() => {
    ctx.clearRect(0, 0, h, w)
  }, frequency)
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

clearCanvas({ frequency: 300 })
