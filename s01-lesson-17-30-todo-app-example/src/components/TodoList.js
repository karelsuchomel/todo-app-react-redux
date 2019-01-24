import React from 'react'
import { connect } from 'react-redux'

// Action creator
import { toggleTodo } from '../actionCreators/actionCreators.js'

const Todo = ({
	text, 
	completed, 
	onClick
}) => (
	<li 
		className={completed ? "completed" : ""} 
		onClick={onClick}
		tabIndex={0}
	>
	{text}
	</li>
)

const TodoList = ({
	todos,
	onTodoClick
}) => (
	<ul>
		{todos.map(t => 
			<Todo
				key={t.id}
				onClick={() => onTodoClick(t.id)}
				{...t}
			/>
		)}
	</ul>
)

const getVisibleTodos = ( 
	todos, 
	filter 
) => {
	switch(filter) {
		case 'SHOW_ALL':
			return todos
		case 'SHOW_ACTIVE':
			return todos.filter(
				t => !t.completed
			)
		case 'SHOW_COMPLETED':
			return todos.filter(
				t => t.completed
			)
	}
}

const mapStateToProps = (state) => (
	{
		todos: getVisibleTodos(
			state.todos,
			state.visibilityFilter
		)
	}
)

const mapDispatchToProps = (dispatch) => {
	return {
		onTodoClick: (id) => {
			dispatch( toggleTodo(id) )
		}
	}
}

const VisibleTodoList = connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoList)

export default VisibleTodoList