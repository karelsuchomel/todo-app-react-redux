import { combineReducers } from 'redux'
import todo from './todo.js'

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
      return {
        ...state,
        [action.id]: todo(state[action.id], action)
      }
    case 'DELETE_TODO':
      let newState = {...state}
      delete newState[action.id]
      return newState
    default:
      return state;
  }
}

const allIds = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [...state, action.id]
    case 'DELETE_TODO':
      return state.filter(id => id !== action.id)
    default:
      return state
  }
}

const todos = combineReducers({
  byId,
  idsByFilter
})

export const getVisibleTodos = (state, filter ) => {
  const ids = state.idsByFilter[filter]
  return ids.map(id => state.byId[id])
}


export default todos