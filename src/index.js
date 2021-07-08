import './styles/main.scss'

import store from 'store'

import processControls from 'modules/processControls'
// import processCharacter from 'modules/processCharacter'
import processWorld from 'modules/world'

const canvas = document.querySelector('#game')
// const { width: w, height: h } = canvas.getBoundingClientRect()
const ctx = canvas.getContext('2d')

const state = {
  key: store.getState().keyState,
  character: store.getState().characterState,
}

const keyStateListenter = () => {
  state.key = store.getState().keyState
}
const characterStateListenter = () => {
  state.character = store.getState().characterState
}

store.subscribe(keyStateListenter)
store.subscribe(characterStateListenter)
// store.subscribe(() => console.log(state))

processControls()
processWorld({ canvas, ctx })
// processCharacter({
//   w,
//   h,
//   ctx,
//   state,
// })
