const t = {
  SET_KEY_DOWN: 'SET_KEY_DOWN',
  SET_KEY_UP: 'SET_KEY_UP',
}

export default (state = {}, action) => {
  switch (action.type) {
    case t.SET_KEY_DOWN: {
      return {
        ...state,
        [action.key]: true,
      }
    }
    case t.SET_KEY_UP: {
      return {
        ...state,
        [action.key]: false,
      }
    }
    default:
      return state
  }
}

export const setKeyDown = key => ({
  type: t.SET_KEY_DOWN,
  key,
})
export const setKeyUp = key => ({
  type: t.SET_KEY_UP,
  key,
})
