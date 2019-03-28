import { combineReducers } from 'redux'

const createList = (filter) => {

	const handleToggle = (state ,action) => {
		const { result: toggledId, entities } = action.response
		const { completed } = entities.todos[toggledId]
		const shouldRemove = 
			(completed && filter === 'active') ||
			(!completed && filter === 'completed')
		return shouldRemove ?
			state.filter(t => t !== toggledId) :
			state
	}

	const ids = (state = [], action) => {
		switch (action.type) {
			case 'FETCH_TODOS_SUCCESS':
				return filter === action.filter ?
					action.response.result :
					state
			case 'ADD_TODO_SUCCESS':
				return filter !== 'completed' ?
					[...state, action.response.result] :
					state
			case 'TOGGLE_TODO_SUCCESS':
				return handleToggle(state ,action)
			case 'REMOVE_TODO_SUCCESS':
				return state.filter(t => t !== action.response.result)
			case 'REORDER_TODOS_SUCCESS':
				return action.response.result
			default:
				return state
		}
	}

	const isFetching = (state = false, action) => {
		if (filter !== action.filter) {
      return state
    }
    switch (action.type) {
      case 'FETCH_TODOS_REQUEST':
        return true
      case 'FETCH_TODOS_SUCCESS':
      case 'FETCH_TODOS_FAILURE':
        return false
      default:
      	console.log('Haven\'t recognized action.type')
        return state
    }
	}

	const errorMessage = (state = null, action) => {
		if (filter !== action.filter) {
			return state
		}
		switch(action.type) {
			case 'FETCH_TODOS_REQUEST':
			case 'FETCH_TODOS_SUCCESS':
				return null
			case 'FETCH_TODOS_FAILURE':
				return action.message
			default:
				return state
		}
	}

	return combineReducers({
		ids,
		isFetching,
		errorMessage
	})
}

export default createList

// will change in the future
export const getIds = (state) => state.ids

export const getIsFetching = (state) => state.isFetching

export const getErrorMessage = (state) => state.errorMessage