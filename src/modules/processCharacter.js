/* eslint-disable max-len */
import store from 'store'
import {
  setCycle, setTurned, setPosX, setPosY,
} from 'store/reducers/characterState'

import characterAtlas from 'assets/Male-3-Walk.png' // 3 x 4

const processCharacter = ({
  w, h, ctx, state,
}) => {
  const img = document.createElement('img')
  img.src = characterAtlas

  const charSprite = {
    w: 48,
    h: 48,
    shots: 3,
    step: 10,
  }

  const initCharPos = () => {
    store.dispatch(setPosX(w / 2 - charSprite.w / 2))
    store.dispatch(setPosY(h / 2 - charSprite.h / 2))
  }

  const animateSprite = () => {
    store.dispatch(setCycle((state.character.cycle + 1) % charSprite.shots))
  }

  const moveTo = (direction) => {
    const moveToMap = {
      left: () => state.character.posX - (state.character.posX <= 0 ? 0 : charSprite.step),
      right: () => state.character.posX + (state.character.posX + charSprite.w >= w ? 0 : charSprite.step),
      up: () => state.character.posY - (state.character.posY <= 0 ? 0 : charSprite.step),
      down: () => state.character.posY + (state.character.posY + charSprite.h >= h ? 0 : charSprite.step),
    }

    switch (direction) {
      case 'left':
        store.dispatch(setPosX(moveToMap.left()))
        break
      case 'right':
        store.dispatch(setPosX(moveToMap.right()))
        break
      case 'up':
        store.dispatch(setPosY(moveToMap.up()))
        break
      case 'down':
        store.dispatch(setPosY(moveToMap.down()))
        break
      default:
        break
    }
  }

  const turnTo = (direction) => {
    store.dispatch(setTurned(direction))
  }

  const handleImgLoad = () => {
    initCharPos()

    const directionsMap = {
      down: 0,
      left: 1,
      right: 2,
      up: 3,
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
        state.character.cycle * charSprite.w, // image pos x
        charSprite.h * directionsMap[state.character.turned], // image pos y
        charSprite.w, // image width
        charSprite.h, // image height
        state.character.posX, // canvas pos x
        state.character.posY, // canvas pos y
        charSprite.w, // canvas image width
        charSprite.h, // canvas image height
      )
    }, 65)
  }

  img.addEventListener('load', handleImgLoad)
}

export default processCharacter
