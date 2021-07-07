const t = {
  SET_CYCLE: 'SET_CYCLE',
  SET_TURNED: 'SET_TURNED',
}

const sprite = {
  shots: 3,
}

export default (
  state = {
    cycle: 0,
    turned: 'down',
  },
  action,
) => {
  switch (action.type) {
    case t.SET_CYCLE: {
      return {
        ...state,
        cycle: (state.cycle + 1) % sprite.shots,
      }
    }
    case t.SET_TURNED: {
      return {
        ...state,
        turned: action.direction,
      }
    }
    default:
      return state
  }
}

export const setCycle = () => ({
  type: t.SET_CYCLE,
})

export const setTurned = direction => ({
  type: t.SET_TURNED,
  direction,
})
