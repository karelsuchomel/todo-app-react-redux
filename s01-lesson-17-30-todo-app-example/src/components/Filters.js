import React from 'react'
import { connect } from 'react-redux'

//action creators
import { setVisibilityFilter } from '../actionCreators/actionCreators.js'

const Link = ({
	active,
	children,
	onClick
}) => {
	if (active) {
		return <span>{children}</span>
	}

	return(
		<button onClick={onClick}>
		{children}
		</button>
	)
}

const mapStateToProps = (state, ownProps) => ({
		active: ownProps.filter === state.visibilityFilter
	}
)

const mapDispatchToProps = (dispatch, ownProps) => (
	{
		onClick: () => dispatch( setVisibilityFilter(ownProps.filter) )
	}
)

const FilterLink = connect(
	mapStateToProps,
	mapDispatchToProps
)(Link)

const Filters = () => {
	return(
		<div className="filters-container">
			<FilterLink 
				filter="SHOW_ALL" 
			>
				All
			</FilterLink>
			<FilterLink 
				filter="SHOW_ACTIVE" 
			>
				Active
			</FilterLink>
			<FilterLink 
				filter="SHOW_COMPLETED" 
			>
				Completed
			</FilterLink>
		</div>
	)
}

export default Filters