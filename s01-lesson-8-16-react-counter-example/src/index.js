import React from 'react'
import ReactDOM from 'react-dom'
import expect from 'expect'

import createStore from './redux'
import './index.sass'
import avoidingArrayMutations from './avoiding-array-mutations'

avoidingArrayMutations()

const counter = (state = 0, action) => {
	switch(action.type) {
		case "INCREMENT":
			return state + 1
		case "DECREMENT":
			return state - 1
		default:
			return state
	}
}

// tests
expect(
	counter(0, {type: "INCREMENT"})
).toEqual(1)

expect(
	counter(3, {type: "DECREMENT"})
).toEqual(2)

expect(
	counter(undefined, {})
).toEqual(0)

expect(
	counter(2, {type: "SOMETHING_ELSE"})
).toEqual(2)
console.log('Passed all tests!')

// react component
const Counter = ({ value, onIncrement, onDecrement }) => {
	return(
		<div id="counter-wrapper">
			<h1>{value}</h1>
			<div>
				<button onClick={onIncrement}>+</button>
				<button onClick={onDecrement}>-</button>
			</div>
		</div>
	)
}

const store = createStore(counter)

const render = () => {
ReactDOM.render(
	<Counter
		value={store.getState()}
		onIncrement={() => {
			store.dispatch({type: "INCREMENT"})
		}}
		onDecrement={() => {
			store.dispatch({type: "DECREMENT"})
		}}
	/>,
	document.getElementById('root')
)}
render()

store.subscribe(render)

