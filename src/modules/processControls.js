import store from 'store'
import { setKeyDown, setKeyUp } from 'store/reducers/keyState'

const processControls = () => {
  const keyMap = {
    down: {
      keys: ['Down', 'ArrowDown', 's', 'ы'],
      state: 'isDownPressed',
    },
    up: {
      keys: ['Up', 'ArrowUp', 'w', 'ц'],
      state: 'isUpPressed',
    },
    left: {
      keys: ['Left', 'ArrowLeft', 'a', 'ф'],
      state: 'isLeftPressed',
    },
    right: {
      keys: ['Right', 'ArrowRight', 'd', 'в'],
      state: 'isRightPressed',
    },
  }

  const handleKeyDown = (e) => {
    Object.keys(keyMap).forEach((key) => {
      if (keyMap[key].keys.includes(e.key)) {
        store.dispatch(setKeyDown(keyMap[key].state))
      }
    })
  }
  const handleKeyUp = (e) => {
    Object.keys(keyMap).forEach((key) => {
      if (keyMap[key].keys.includes(e.key)) {
        store.dispatch(setKeyUp(keyMap[key].state))
      }
    })
  }

  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)
}

export default processControls
