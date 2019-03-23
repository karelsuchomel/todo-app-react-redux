import React from 'react'

// components
import Header from './Header'
import VisibleTodoList from './TodoList'
import AddTodo from './AddTodo'

const TodoApp = () => (
	<div id="todos-wrapper">
    <Header />
    <VisibleTodoList />
    <AddTodo />
	</div>
)

export default TodoApp