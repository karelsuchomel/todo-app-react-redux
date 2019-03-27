import React from 'react'

const TodoEditOptions = ({updateTodo, cancelEditing}) => (
	<div className="options-container">
		<button onClick={updateTodo} className="update-todo">Update</button>
		<button onClick={cancelEditing} className="cancel-update">Cancel</button>
	</div>
)

export default TodoEditOptions