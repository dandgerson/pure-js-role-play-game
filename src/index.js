/* eslint-disable no-console */
import './styles/main.scss'

import character from './assets/Male-3-Walk.png'

const canvas = document.querySelector('#game')
const { width: w, height: h } = canvas.getBoundingClientRect()
const ctx = canvas.getContext('2d')

const img = document.createElement('img')
img.src = character

const state = {}

img.addEventListener('load', () => {
  const directions = {
    bottom: 0,
    left: 1,
    right: 2,
    top: 3,
  }

  const shots = 3
  let cycle = 0

  const spriteW = 48
  const spriteH = 48

  let pY = h / 2 - spriteH / 2
  let pX = w / 2 - spriteW / 2

  const step = 10
  let turned = 'bottom'

  const applyActions = () => {
    cycle = (cycle + 1) % shots
  }

  setInterval(() => {
    switch (true) {
      case state.isRightPressed: {
        pX += (pX + spriteW >= w ? 0 : step)
        turned = 'right'

        applyActions()
        break
      }
      case state.isLeftPressed: {
        pX -= (pX <= 0 ? 0 : step)
        turned = 'left'

        applyActions()
        break
      }
      case state.isTopPressed: {
        pY -= (pY <= 0 ? 0 : step)
        turned = 'top'

        applyActions()
        break
      }
      case state.isBottomPressed: {
        pY += (pY + spriteH >= h ? 0 : step)
        turned = 'bottom'

        applyActions()
        break
      }
      default: break
    }

    ctx.clearRect(0, 0, w, h)

    ctx.drawImage(
      img, // src
      cycle * spriteW, spriteH * directions[turned], spriteW, spriteH, // pos into image
      pX, pY, spriteW, spriteH, // pos into canvas
    )
  }, 100)
})

const keyMap = {
  down: {
    keys: ['Down', 'ArrowDown', 's'],
    state: 'isBottomPressed',
  },
  up: {
    keys: ['Up', 'ArrowUp', 'w'],
    state: 'isTopPressed',
  },
  left: {
    keys: ['Left', 'ArrowLeft', 'a'],
    state: 'isLeftPressed',
  },
  right: {
    keys: ['Right', 'ArrowRight', 'd'],
    state: 'isRightPressed',
  },
}

const handleKeyDown = (e) => {
  Object.keys(keyMap).forEach((key) => {
    state[keyMap[key].state] = keyMap[key].keys.includes(e.key)
  })
}
const handleKeyUp = (e) => {
  Object.keys(keyMap).forEach((key) => {
    if (keyMap[key].keys.includes(e.key)) {
      state[keyMap[key].state] = false
    }
  })
}

document.addEventListener('keydown', handleKeyDown)
document.addEventListener('keyup', handleKeyUp)
