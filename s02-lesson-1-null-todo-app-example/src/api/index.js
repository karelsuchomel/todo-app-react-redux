import v4 from '../utils/uuid'

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

const fakeDatabase = {
	todos: [{
		id: v4(),
		text: 'All the lonely people, from where do they come from?',
		completed: true,
	}, {
		id: v4(),
		text: 'Ridiculus! Ridiculus! Ridiculus!',
		completed: true,
	}, {
		id: v4(),
		text: 'Something rather mischievous',
		completed: false,
	}],
}

const delay = (ms) => 
{
	return new Promise(resolve => setTimeout(resolve, ms, fakeDatabase))
}

export const fetchTodos = (filter) => 
	delay(400).then( response => {

		if(Math.random() < 0.25) {
			throw new Error('This error is thrown in 25% cases, to show how will the application handle it.')
		}

		switch (filter) {
			case 'all':
				return response.todos
			case 'active':
				return response.todos.filter(t => !t.completed)
			case 'completed':
				return response.todos.filter(t => t.completed)
			default:
				throw new Error(`Unknown filter: ${filter}`)
		}
	})

export const addTodo = (text) =>
	delay(400).then(response => {
		let newTodo = {
			id: v4(),
			completed: false,
			text
		}
		fakeDatabase.todos.push(newTodo)
		return newTodo
	})



export const toggleTodo = (id) =>
	delay(400).then(response => {
		fakeDatabase.todos[id].completed = !fakeDatabase.todos[id].completed
		return fakeDatabase.todos[id]
	})



	