import { createStore, combineReducers } from 'redux'
import keyState from './reducers/keyState'

const rootReducer = combineReducers({
  keyState,
})

const store = createStore(rootReducer)

export default store
