import v4 from '../utils/uuid.js'
import * as api from '../api/index.js'
import {getIsFetching} from '../reducers' 

// normalizing responses
import * as schema from './schema'
import {normalize} from 'normalizr'

export const fetchTodos  = (filter) => (dispatch, getState) => {
	if(getIsFetching(getState(), filter) === true) {
		return Promise.resolve()
	}

	dispatch({
		type: 'FETCH_TODOS_REQUEST',
		filter
	})

	return api.fetchTodos(filter).then(
		response => {
			console.log(
				'normalized response',
				normalize(response, schema.arrayOfTodos)
			)
			dispatch({
				type: 'FETCH_TODOS_SUCCESS',
				response,
				filter
			})
		},
		error => {
			dispatch({
				type: 'FETCH_TODOS_FAILURE',
				filter,
				message: error.message || 'Something went wrong.'
			})
		}
	)
}

export const addTodo = (text) => (dispatch) =>
	api.addTodo(text).then(
		response => {
			console.log(
				'normalized response',
				normalize(response, schema.todo)
			)
			dispatch({
				type: 'ADD_TODO_SUCCESS',
				response
			})
		}
	)


export const toggleTodo = (id) => (dispatch) =>
	api.toggleTodo(id).then(
		response =>
			dispatch({
				type: 'TOGGLE_TODO_SUCCESS',
				response
			})
	)

export const deleteTodo = (id) => (
	{
		type: 'DELETE_TODO',
		id
	}
)
