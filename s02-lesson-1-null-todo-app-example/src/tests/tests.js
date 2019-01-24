import React from 'react'
import PropTypes from 'prop-types'

// action creators
import { addTodo, toggleTodo } from '../actionCreators/actionCreators.js'

export default class FillTheStore extends React.Component {
	componentDidMount() {
		const { store } = this.context
		// Fill the store
		store.dispatch( addTodo('Cleaning my room') )
		store.dispatch( addTodo('Making lunch') )
		store.dispatch( toggleTodo(1) )
		store.dispatch( addTodo('Reading "From knowledge to wisdom" by Nicolas Maxwell') )
		store.dispatch( addTodo('Making appointements with schools and kindergardens') )
	}
	render() {
		return null
	}
}
FillTheStore.contextTypes = {
	store: PropTypes.object
}