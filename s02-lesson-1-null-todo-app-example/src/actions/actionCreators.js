import v4 from '../utils/uuid.js'
import * as api from '../api/index.js'
import {getIsFetching} from '../reducers' 

export const fetchTodos  = (filter) => (dispatch, getState) => {
	if(getIsFetching(getState(), filter) === true) {
		return Promise.resolve()
	}

	dispatch({
		type: 'FETCH_TODOS_REQUEST',
		filter
	})

	return api.fetchTodos(filter).then(
		response => 
			dispatch({
				type: 'FETCH_TODOS_SUCCESS',
				response,
				filter
			}),
		error =>
			dispatch({
				type: 'FETCH_TODOS_FAILURE',
				filter,
				message: error.message || 'Something went wrong.'
			})

	)
}

export const addTodo = (text) => (
	{
		type: 'ADD_TODO',
		id: v4(),
		text,
	}
)

export const toggleTodo = (id) => (
	{
		type: 'TOGGLE_TODO',
		id
	}
)

export const deleteTodo = (id) => (
	{
		type: 'DELETE_TODO',
		id
	}
)
