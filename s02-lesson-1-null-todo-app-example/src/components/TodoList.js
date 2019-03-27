import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Action creators
import * as actions from '../actions/actionCreators.js'
// Selector
import { getErrorMessage, getVisibleTodos, getIsFetching } from '../reducers'
// Components
import Todo from './Todo.js'
// Images
import tumbleweedIconUrl from '../images/tumbleweed.svg'


const TodoList = ({
	todos,
	toggleTodo,
	deleteTodo,
	editTodo
}) => (
	<ul>
		{todos.map(t => 
			<Todo
				{...t}
				key={t.id}
				reduxId={t.id}
				toggleTodo={() => toggleTodo(t.id)}
				editTodo={() => editTodo(t.id)}
				deleteTodo={() => deleteTodo(t.id)}
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
		const {isFetching, editTodo, deleteTodo, toggleTodo, todos} = this.props

		return (
			<div>
				{!isFetching && todos.length === 0 ?
					(<img id="tumbleweed" src={tumbleweedIconUrl} />) :
					(<TodoList 
						todos={todos}
						toggleTodo={toggleTodo}
						editTodo={editTodo}
						deleteTodo={deleteTodo}  />)
				}
			</div>
		)
	}
}

const mapStateToProps = (state, { match }) => {
	const filter = match.params.filter || 'all'
	return {
		todos: getVisibleTodos(state, filter),
		isFetching: getIsFetching(state, filter),
		filter
	}
}

VisibleTodoList = withRouter(connect(
	mapStateToProps,
	actions
)(VisibleTodoList))

export default VisibleTodoList