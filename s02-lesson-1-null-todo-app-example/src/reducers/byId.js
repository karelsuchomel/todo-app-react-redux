const byId = (state = {}, action) => {
  if(action.type === 'REMOVE_TODO_SUCCESS') {
    const newState = state
    delete newState[action.response.result]
    return newState
  }

  if(action.response) {
    return {
      ...state,
      ...action.response.entities.todos
    }
  }
  return state
}

export default byId

export const getTodo = (state, id) => state[id]