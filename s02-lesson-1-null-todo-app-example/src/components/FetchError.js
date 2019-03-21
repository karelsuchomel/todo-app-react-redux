import React from 'react'

const FetchError = ({message, onRetry}) => (
	<div className='error-message-fetch-failure'>
		{message}
		<button onClick={onRetry}>Retry</button>
	</div>
)

export default FetchError