const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
          completed: !state.completed
      }
    case 'DELETE_TODO':
      if (state.id === action.id) {
        return true
      }
      return false
    default:
      return state;
  }
}

export default todo