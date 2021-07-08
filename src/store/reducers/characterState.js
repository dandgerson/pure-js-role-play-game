const t = {
  SET_CYCLE: 'SET_CYCLE',
  SET_TURNED: 'SET_TURNED',
  SET_POS_X: 'SET_POS_X',
  SET_POS_Y: 'SET_POS_Y',
}

export default (
  state = {
    cycle: 0,
    turned: 'down',
    posX: 0,
    posY: 0,
  },
  action,
) => {
  switch (action.type) {
    case t.SET_CYCLE: {
      return {
        ...state,
        cycle: action.cycle,
      }
    }
    case t.SET_TURNED: {
      return {
        ...state,
        turned: action.direction,
      }
    }
    case t.SET_POS_X: {
      return {
        ...state,
        posX: action.posX,
      }
    }
    case t.SET_POS_Y: {
      return {
        ...state,
        posY: action.posY,
      }
    }
    default:
      return state
  }
}

export const setCycle = cycle => ({
  type: t.SET_CYCLE,
  cycle,
})

export const setTurned = direction => ({
  type: t.SET_TURNED,
  direction,
})

export const setPosX = posX => ({
  type: t.SET_POS_X,
  posX,
})

export const setPosY = posY => ({
  type: t.SET_POS_Y,
  posY,
})
