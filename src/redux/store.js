import { createStore, combineReducers } from 'redux'
import keyState from './reducers/keyState'
import characterState from './reducers/characterState'

const rootReducer = combineReducers({
  keyState,
  characterState,
})

const store = createStore(rootReducer)

export default store
