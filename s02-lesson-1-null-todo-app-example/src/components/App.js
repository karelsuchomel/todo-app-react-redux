import React from 'react'

// components
import Header from './Header.js'
import VisibleTodos from './VisibleTodos.js'
import AddTodo from './AddTodo.js'

const TodoApp = () => (
	<div id="todos-wrapper">
		<Header />
		<VisibleTodos />
		<AddTodo />
	</div>
)


export default TodoApp