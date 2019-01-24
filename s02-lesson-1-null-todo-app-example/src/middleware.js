export const logger = (store) => (next) => {
	if (!console.group) {
		return next
	}

	return (action) => {
		console.group(action.type)
		console.log('%c prev state', 'color: grey', store.getState())
		console.log('%c action', 'color: blue', action.type)
		const returnValue = next(action)
		console.log('%c next state', 'color: green', store.getState())
		console.groupEnd(action.type)
		return returnValue
	}
}

export const promise = (store) => (next) => (action) => {
	if(typeof action.then === 'function') {
		return action.then(next)
	}

	return next(action)
}