import './styles/main.scss'

import characterAtlas from './assets/Male-3-Walk.png' // 3 x 4

const canvas = document.querySelector('#game')
const { width: w, height: h } = canvas.getBoundingClientRect()
const ctx = canvas.getContext('2d')

let keyState = {}

const keyMap = {
  down: {
    keys: ['Down', 'ArrowDown', 's'],
    state: 'isDownPressed',
  },
  up: {
    keys: ['Up', 'ArrowUp', 'w'],
    state: 'isUpPressed',
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
    if (keyMap[key].keys.includes(e.key)) {
      keyState = {
        ...keyState,
        [keyMap[key].state]: true,
      }
    }
  })
}
const handleKeyUp = (e) => {
  Object.keys(keyMap).forEach((key) => {
    if (keyMap[key].keys.includes(e.key)) {
      keyState = {
        ...keyState,
        [keyMap[key].state]: false,
      }
    }
  })
}

document.addEventListener('keydown', handleKeyDown)
document.addEventListener('keyup', handleKeyUp)

const img = document.createElement('img')
img.src = characterAtlas

const handleImgLoad = () => {
  const sprite = {
    w: 48,
    h: 48,
    shots: 3,
    step: 10,
  }

  let spriteState = {
    cycle: 0,
    posX: w / 2 - sprite.w / 2,
    posY: h / 2 - sprite.h / 2,
    turned: 'down',
  }

  const directionsMap = {
    down: 0,
    left: 1,
    right: 2,
    up: 3,
  }

  const animateSprite = () => {
    spriteState = {
      ...spriteState,
      cycle: (spriteState.cycle + 1) % sprite.shots,
    }
  }

  const moveTo = (direction) => {
    const posMap = {
      left: 'posX',
      right: 'posX',
      up: 'posY',
      down: 'posY',
    }

    const moveToMap = {
      left: () => spriteState.posX - (spriteState.posX <= 0 ? 0 : sprite.step),
      right: () => spriteState.posX + (spriteState.posX + sprite.w >= w ? 0 : sprite.step),
      up: () => spriteState.posY - (spriteState.posY <= 0 ? 0 : sprite.step),
      down: () => spriteState.posY + (spriteState.posY + sprite.h >= h ? 0 : sprite.step),
    }

    spriteState = {
      ...spriteState,
      [posMap[direction]]: moveToMap[direction](),
    }
  }

  const turnTo = (direction) => {
    spriteState = {
      ...spriteState,
      turned: direction,
    }
  }

  setInterval(() => {
    switch (true) {
      case keyState.isLeftPressed && keyState.isUpPressed: {
        turnTo('left')
        moveTo('left')
        moveTo('up')
        animateSprite()
        break
      }
      case keyState.isRightPressed && keyState.isUpPressed: {
        turnTo('right')
        moveTo('right')
        moveTo('up')
        animateSprite()
        break
      }
      case keyState.isRightPressed && keyState.isDownPressed: {
        turnTo('right')
        moveTo('right')
        moveTo('down')
        animateSprite()
        break
      }
      case keyState.isLeftPressed && keyState.isDownPressed: {
        turnTo('left')
        moveTo('left')
        moveTo('down')
        animateSprite()
        break
      }
      case keyState.isRightPressed: {
        turnTo('right')
        moveTo('right')
        animateSprite()
        break
      }
      case keyState.isLeftPressed: {
        turnTo('left')
        moveTo('left')
        animateSprite()
        break
      }
      case keyState.isUpPressed: {
        turnTo('up')
        moveTo('up')
        animateSprite()
        break
      }
      case keyState.isDownPressed: {
        turnTo('down')
        moveTo('down')
        animateSprite()
        break
      }
      default:
        break
    }

    ctx.clearRect(0, 0, w, h)

    ctx.drawImage(
      img, // img elem
      spriteState.cycle * sprite.w, // image pos x
      sprite.h * directionsMap[spriteState.turned], // image pos y
      sprite.w, // image width
      sprite.h, // image height
      spriteState.posX, // canvas pos x
      spriteState.posY, // canvas pos y
      sprite.w, // canvas image width
      sprite.h, // canvas image height
    )
  }, 100)
}

img.addEventListener('load', handleImgLoad)
