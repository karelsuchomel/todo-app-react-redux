import expect from 'expect'
import deepFreeze from 'deep-freeze'

const testAddTodo = (todosReducer) => {
	const stateBefore = []
	const action = {
		type: 'ADD_TODO',
		id: 1,
		text: 'learn Redux',
	}
	const stateAfter = [
		{
			id: 1,
			text: 'learn Redux',
			completed: false
		}
	]

	deepFreeze(stateBefore)
	deepFreeze(action)

	expect(
		todosReducer(stateBefore, action)
	).toEqual(stateAfter)

	console.log("All tests PASSED!")
}

export default testAddTodo