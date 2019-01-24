import v4 from '../utils/uuid.js'
import * as api from '../api/index.js'

const receiveTodos = (filter, response) => ({
	type: 'RECIEVE_TODOS',
	todos: response,
	filter
})

export const fetchTodos  = (filter) => 
	api.fetchTodos(filter).then(response => 
		receiveTodos(filter, response)
	)

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
