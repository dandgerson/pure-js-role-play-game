import store from 'redux/store'
import { setCycle, setTurned } from 'redux/reducers/characterState'

import characterAtlas from 'assets/Male-3-Walk.png' // 3 x 4

const processCharacter = ({
  w, h, ctx, state,
}) => {
  console.log({ state })
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
      posX: w / 2 - sprite.w / 2,
      posY: h / 2 - sprite.h / 2,
    }

    const directionsMap = {
      down: 0,
      left: 1,
      right: 2,
      up: 3,
    }

    const animateSprite = () => {
      store.dispatch(setCycle())
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
      store.dispatch(setTurned(direction))
    }

    setInterval(() => {
      switch (true) {
        case state.key.isLeftPressed && state.key.isUpPressed: {
          turnTo('left')
          moveTo('left')
          moveTo('up')
          animateSprite()
          break
        }
        case state.key.isRightPressed && state.key.isUpPressed: {
          turnTo('right')
          moveTo('right')
          moveTo('up')
          animateSprite()
          break
        }
        case state.key.isRightPressed && state.key.isDownPressed: {
          turnTo('right')
          moveTo('right')
          moveTo('down')
          animateSprite()
          break
        }
        case state.key.isLeftPressed && state.key.isDownPressed: {
          turnTo('left')
          moveTo('left')
          moveTo('down')
          animateSprite()
          break
        }
        case state.key.isRightPressed: {
          turnTo('right')
          moveTo('right')
          animateSprite()
          break
        }
        case state.key.isLeftPressed: {
          turnTo('left')
          moveTo('left')
          animateSprite()
          break
        }
        case state.key.isUpPressed: {
          turnTo('up')
          moveTo('up')
          animateSprite()
          break
        }
        case state.key.isDownPressed: {
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
        state.character.cycle * sprite.w, // image pos x
        sprite.h * directionsMap[state.character.turned], // image pos y
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
}

export default processCharacter
