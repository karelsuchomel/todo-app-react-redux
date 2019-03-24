import React from 'react'
import iconUrl from '../images/icon-what-is-this.svg'

const FetchError = ({message, onRetry}) => (
	<div className='error-message-fetch-failure'>
		<label htmlFor="details-check-box">
			{message}
			<img src={iconUrl} alt="What happened here?" />
			<input type="checkbox" id="details-check-box" />
			<div className="detailed-info">
				This error is thrown artificially in 10% cases, to show the application behaviour in such circumstance.
			</div>
		</label>
		<button onClick={onRetry}>Retry</button>
	</div>
)

export default FetchError