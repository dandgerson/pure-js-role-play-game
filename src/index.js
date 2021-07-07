import './styles/main.scss'

import store from 'redux/store'

// import terrainAtlas from './assets/terrain.png'

import processControls from 'modules/processControls'
import processCharacter from 'modules/processCharacter'

const canvas = document.querySelector('#game')
const { width: w, height: h } = canvas.getBoundingClientRect()
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

processControls()
processCharacter({
  w, h, ctx, state,
})
