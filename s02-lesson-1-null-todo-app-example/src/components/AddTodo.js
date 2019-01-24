import React from 'react'
import { connect } from 'react-redux'

// action creator
import { addTodo } from '../actions/actionCreators.js'

let nextTodoId = 0

let AddTodo = ({ dispatch }) => {

	let input

	return(
		<div className="create-todo-container">
			<input placeholder="Name your todo" ref={node => {
				input = node
			}} />
			<button onClick={() => {
				dispatch( addTodo(input.value) )
				input.value = ""
			}}>
			Add todo
			</button>
		</div>
	)
}

AddTodo = connect()(AddTodo)

export default AddTodo