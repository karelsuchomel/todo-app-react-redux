import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Action creators
import * as actions from '../actions/actionCreators.js'
// Selector
import { getErrorMessage, getVisibleTodos, getIsFetching } from '../reducers'
// Components
import Filters from './Filters'
import FetchError from './FetchError'

class Header extends React.Component {
	render() {
		const {isFetching, errorMessage, filter, fetchTodos} = this.props

		return (
			<div id="header-bar">
				<Filters />
				{errorMessage !== null &&
					<FetchError message={errorMessage} onRetry={() => fetchTodos(filter)}/>
				}
				{isFetching &&
					<div className="loading-indicator">
						Loading
						<div className="loading-icon">
							<div className="loading-circle"></div>
							<div className="loading-circle"></div>
						</div>
					</div>
				}
			</div>
		)
	}
}

const mapStateToProps = (state, { match }) => {
	const filter = match.params.filter || 'all'
	return {
		isFetching: getIsFetching(state, filter),
		errorMessage: getErrorMessage(state, filter),
		filter
	}
}

Header = withRouter(connect(
	mapStateToProps,
	actions
)(Header))

export default Header
