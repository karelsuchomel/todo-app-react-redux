import v4 from '../utils/uuid.js'
import * as api from '../api/index.js'
import {getIsFetching} from '../reducers' 

const requestTodos = (filter) => ({
	type: 'REQUEST_TODOS',
	filter
})

const receiveTodos = (filter, response) => ({
	type: 'RECEIVE_TODOS',
	response,
	filter
})

export const fetchTodos  = (filter) => (dispatch, getState) => {
	if(getIsFetching(getState(), filter) === true) {
		return Promise.resolve()
	}

	dispatch(requestTodos(filter))

	api.fetchTodos(filter).then(response => 
		dispatch(receiveTodos(filter, response))
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
