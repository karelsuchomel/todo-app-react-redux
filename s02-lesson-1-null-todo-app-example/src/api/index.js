import v4 from '../utils/uuid'

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.


const delay = (ms) => 
{
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
	return new Promise(resolve => setTimeout(resolve(fakeDatabase), ms))
}

export const fetchTodos = (filter) =>
	delay(500).then( response => {
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


	