import React from 'react'
import { NavLink } from 'react-router-dom'

const FilterLink = ({ filter, children }) => (
	<NavLink 
		exact
		to={'/todo-app-react-redux/s02-lesson-1-null-todo-app-example/build/' + (filter === 'all' ? '' : filter)}
		activeClassName="selected"
	>
		{children}
	</NavLink>
)

const Filters = () => {
	return(
		<div className="filters-container">
			<FilterLink 
				filter="all" 
			>
				All
			</FilterLink>
			<FilterLink 
				filter="active" 
			>
				Active
			</FilterLink>
			<FilterLink 
				filter="completed" 
			>
				Completed
			</FilterLink>
		</div>
	)
}

export default Filters