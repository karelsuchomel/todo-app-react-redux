import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { DragDropContext } from  'react-beautiful-dnd'

// Action creators
import * as actions from '../actions/actionCreators.js'
// Selector
import { getErrorMessage, getVisibleTodos, getIsFetching } from '../reducers'
// Components
import TodoList from './TodoList.js'
// Images
import tumbleweedIconUrl from '../images/tumbleweed.svg'

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

class VisibleTodoList extends React.Component {
	constructor(props) {
		super(props)
		this.onDragEnd = this.onDragEnd.bind(this)
	}

	onDragEnd(result) {
		// dropped outside the list
		if (!result.destination) {
			return
		}

		const todos = reorder(
			this.props.todos,
			result.source.index,
			result.destination.index
		)
		console.log('todos: ', todos)

		const {filter, reorderTodos} = this.props
		reorderTodos(filter, todos)

		// this.setState({
		// 	todos
		// })
	}

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
			<DragDropContext onDragEnd={this.onDragEnd}>
				{!isFetching && todos.length === 0 ?
					(<img id="tumbleweed" src={tumbleweedIconUrl} />) :
					(<TodoList 
						todos={todos}
						toggleTodo={toggleTodo}
						editTodo={editTodo}
						deleteTodo={deleteTodo}  />)
				}
			</DragDropContext>
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