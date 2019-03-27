import React from 'react'
import { connect } from 'react-redux'

// Action creators
import {updateTodo} from '../actions/actionCreators.js'
// Components
import TodoOptions from './TodoOptions.js'
import TodoEditOptions from './TodoEditOptions.js'

class Todo extends React.Component {
	constructor(props) {
    super(props)
    // create a ref to store the textInput DOM element
    this.state = {
    	editable: false
    }
    this.textInput = React.createRef()
    this.textInput = React.createRef()
    this.toggleTodoEditable = this.toggleTodoEditable.bind(this)
    this.updateContentOfTodo = this.updateContentOfTodo.bind(this)
  }

  updateContentOfTodo() {
  	// strip <HTML/>
  	const doc = new DOMParser().parseFromString(this.textInput.current.innerHTML, 'text/html')
   	const content = doc.body.textContent || ''
   	this.textInput.current.innerHTML = content

  	const {updateTodo} = this.props
  	this.toggleTodoEditable()
  	updateTodo(this.props.reduxId, content)
  }

	toggleTodoEditable() {
		const contEl = this.textInput.current

		// setup the field to be editable
		contEl.contentEditable = this.state.editable ? 'false' : 'true'
		contEl.className = this.state.editable ? '' : 'editable'
		!this.state.editable && contEl.focus()

		// when 'Enter' key pressed, run updateTodo
		const closeOnKey = (event) => {
			if (event.key === 'Enter' || event.key === 'Escape') {
				this.updateContentOfTodo()
				contEl.removeEventListener('keydown', closeOnKey)
			}
		}

		if (!this.state.editable) {
			contEl.addEventListener('keydown', closeOnKey)
		} 

		// set state is asynchronous, so you can only count on the previous state
		this.setState({editable: !this.state.editable})
	}

	render() {
		const {text, completed, toggleTodo, deleteTodo} = this.props

		return (
			<li 
				className={completed ? "completed" : ""} 
				tabIndex={0}>
				<div ref={this.textInput}>
					{text}
				</div>
				{!this.state.editable ? (
					<TodoOptions
						toggleTodo={toggleTodo}
						editTodo={this.toggleTodoEditable}
						deleteTodo={deleteTodo}/>
				) : (
					<TodoEditOptions
						updateTodo={this.updateContentOfTodo}
						cancelEditing={this.toggleTodoEditable}/>
				)}
			</li>
		)
	}
}

Todo = connect(
	false,
	{updateTodo: updateTodo}
)(Todo)

export default Todo