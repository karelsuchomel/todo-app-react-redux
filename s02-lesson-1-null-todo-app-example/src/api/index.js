import v4 from '../utils/uuid'

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

const fakeDatabase = {
	todos: [{
		id: v4(),
		text: 'Never let the future disturb you. You will meet it, if you have to, with the same weapons of reason which today arm you against the present. ',
		completed: true,
	}, {
		id: v4(),
		text: 'Accept the things to which fate binds you, and love the people with whom fate brings you together, but do so with all your heart. ',
		completed: true,
	}, {
		id: v4(),
		text: 'A man\'s worth is no greater than his ambitions.',
		completed: false,
	}],
}

const delay = (ms = 400) => 
{
	return new Promise(resolve => setTimeout(resolve, ms, fakeDatabase))
}

export const fetchTodos = (filter) => 
	delay().then( response => {

		if(Math.random() < 0.1) {
			throw new Error('Couldn\'t fetch todos. This error is thrown in 10% cases, to show how will the application handle it.')
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
	delay().then(() => {
		let todo = {
			id: v4(),
			completed: false,
			text
		}
		fakeDatabase.todos.push(todo)
		return todo
	})



export const toggleTodo = (id) =>
	delay().then(() => {
		const todo = fakeDatabase.todos.find(t => t.id === id )
		todo.completed = !todo.completed
		return todo
	})

export const removeTodo = (id) =>
	delay().then(() => {
		const todo = fakeDatabase.todos.find(t => t.id === id )
		fakeDatabase.todos = fakeDatabase.todos.filter(t => t.id !== id)
		return todo
	})



	