import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { createStore, combineReducers } from 'redux'

// tests and dummy data
import FillTheStore from './tests/tests.js'
import './index.sass'

// components
import Filters from './components/Filters'
import VisibleTodoList from './components/TodoList'
import AddTodo from './components/AddTodo'


const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
          completed: !state.completed
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      );
    default:
      return state;
  }
};

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const todoApp = combineReducers({todos, visibilityFilter})

const TodoApp = () => (
	<div id="todos-wrapper">
    <FillTheStore />
    <Filters />
    <VisibleTodoList />
    <AddTodo />
	</div>
)

const renderEntireApp = () => {
	ReactDOM.render(
		<Provider store={createStore(todoApp)} >
			<TodoApp  />
		</Provider>,
		document.getElementById('root')
	)
}

renderEntireApp()