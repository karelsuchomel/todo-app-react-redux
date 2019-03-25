import React from 'react'

// Components
import OptionsBar from './OptionsBar.js'

class Todo extends React.Component {
	constructor(props) {
    super(props)
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef()
    this.makeTodoEditable = this.makeTodoEditable.bind(this)
  }

	makeTodoEditable() {
		this.textInput.current.focus()
		this.textInput.current.contentEditable = 'true'
		this.textInput.current.selectionEnd
		// this.props.editTodo

		// make editable content of a particular todo

		// focus the content editable

		// setup event listeners for "done" and "close" buttons

		// if "done", dispatch editTodo action with the text and id
	}

	render() {
		const {text, completed, toggleTodo, deleteTodo} = this.props

		return (
			<li 
				className={completed ? "completed" : ""} 
				tabIndex={0}
				ref={this.textInput}>
				{text}
				<OptionsBar
					toggleTodo={toggleTodo}
					editTodo={this.makeTodoEditable}
					deleteTodo={deleteTodo}/>
			</li>
		)
	}
}

export default Todo