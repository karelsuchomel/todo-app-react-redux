import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import TodoApp from './App'
import { BrowserRouter, Route} from 'react-router-dom'

const Root = ({ store }) => (
	<Provider store={store}>
		<BrowserRouter>
			<Route path="/egghead-redux-1-and-2/s02-lesson-1-null-todo-app-example/build/:filter?" component={TodoApp} />
		</BrowserRouter> 
	</Provider>
)
Root.propTypes = {
	store: PropTypes.object.isRequired
}

export default Root
