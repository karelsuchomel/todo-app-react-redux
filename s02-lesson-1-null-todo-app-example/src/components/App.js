import React from 'react'

// components
import Filters from './Filters'
import VisibleTodoList from './TodoList'
import AddTodo from './AddTodo'

const TodoApp = () => (
	<div id="todos-wrapper">
    <Filters />
    <VisibleTodoList />
    <AddTodo />
	</div>
)

export default TodoApp