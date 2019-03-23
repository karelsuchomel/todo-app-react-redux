import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Action creators
import * as actions from '../actions/actionCreators.js'
// Selector
import { getErrorMessage, getVisibleTodos, getIsFetching } from '../reducers'

const Todo = ({
	text, 
	completed, 
	onClick,
	onDeleteClick
}) => (
	<li 
		className={completed ? "completed" : ""} 
		onClick={onClick}
		tabIndex={0}
	>
	{text}
		<button onClick={(e) => {
			e.stopPropagation()
			onDeleteClick()
		}}>
		</button>
	</li>
)

const TodoList = ({
	todos,
	onTodoClick,
	onDeleteClick
}) => (
	<ul>
		{todos.map(t => 
			<Todo
				{...t}
				key={t.id}
				onClick={() => onTodoClick(t.id)}
				onDeleteClick={() => {
					onDeleteClick(t.id)
				}}
			/>
		)}
	</ul>
)

class VisibleTodoList extends React.Component {
	componentDidMount() {
		this.fetchData()
	}

	componentDidUpdate(prevProps) {
		if (this.props.filter !== prevProps.filter) {
			this.fetchData()
		}
	}

	fetchData() {
		const {filter, fetchTodos} = this.props
		fetchTodos(filter)
	}

	render() {
		const {errorMessage, deleteTodo, toggleTodo, todos} = this.props

		return (
			<div>
				<TodoList 
					todos={todos}
					onTodoClick={toggleTodo}
					onDeleteClick={deleteTodo}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state, { match }) => {
	const filter = match.params.filter || 'all'
	return {
		todos: getVisibleTodos(state, filter),
		isFetching: getIsFetching(state, filter),
		errorMessage: getErrorMessage(state, filter),
		filter
	}
}

VisibleTodoList = withRouter(connect(
	mapStateToProps,
	actions
)(VisibleTodoList))

export default VisibleTodoList