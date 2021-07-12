import './styles/main.scss'

// import store from 'store'

import ClientGame from 'client/ClientGame'

// import processControls from 'modules/processControls'
// import processCharacter from 'modules/processCharacter'
// import processWorld from 'modules/world'

window.addEventListener('load', () => {
  ClientGame.init({
    config: {
      tagId: '#game',
    },
  })
})

// const canvas = document.querySelector('#game')
// const { width: w, height: h } = canvas.getBoundingClientRect()
// const ctx = canvas.getContext('2d')

// const state = {
//   key: store.getState().keyState,
//   character: store.getState().characterState,
// }

// const keyStateListenter = () => {
//   state.key = store.getState().keyState
// }
// const characterStateListenter = () => {
//   state.character = store.getState().characterState
// }

// store.subscribe(keyStateListenter)
// store.subscribe(characterStateListenter)
// // store.subscribe(() => console.log(state))

// processControls()
// processCharacter({
//   w,
//   h,
//   ctx,
//   state,
// })
// processWorld({ canvas, ctx })
