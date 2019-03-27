import React from 'react'

const TodoOptions = ({toggleTodo, editTodo, deleteTodo}) => (
	<div className="options-container">
		<button onClick={toggleTodo} className="toggle-todo">Toggle</button>
		<button onClick={editTodo} className="edit-todo">Edit</button>
		<button onClick={deleteTodo} className="delete-todo">Delete</button>
	</div>
)

export default TodoOptions