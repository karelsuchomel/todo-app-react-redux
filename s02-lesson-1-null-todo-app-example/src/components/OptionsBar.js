import React from 'react'

const OptionsBar = ({toggleTodo, editTodo, deleteTodo}) => (
	<div className="options-container">
		<button onClick={toggleTodo} className="toggle-todo"></button>
		<button onClick={editTodo} className="edit-todo"></button>
		<button onClick={deleteTodo} className="delete-todo"></button>
	</div>
)

export default OptionsBar