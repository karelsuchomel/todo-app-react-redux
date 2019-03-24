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
			dispatch({
				type: 'FETCH_TODOS_SUCCESS',
				response: normalize(response, schema.arrayOfTodos),
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

export const addTodo = (text) => (dispatch) => {
	if (!text) {
		return Promise.response()
	}

	return api.addTodo(text).then(
		response => {
			dispatch({
				type: 'ADD_TODO_SUCCESS',
				response: normalize(response, schema.todo),
			})
		}
	)
}


export const toggleTodo = (id) => (dispatch) =>
	api.toggleTodo(id).then(
		response =>
			dispatch({
				type: 'TOGGLE_TODO_SUCCESS',
				response: normalize(response, schema.todo)
			})
	)

export const deleteTodo = (id) => (dispatch) =>
	api.removeTodo(id).then(
		response =>
			dispatch({
				type: 'REMOVE_TODO_SUCCESS',
				response: normalize(response, schema.todo)
			})
	)
