import deepFreeze from 'deep-freeze'
import expect from 'expect'

// Avoiding Array Mutations
const wrapper = () => {

	// // Immutable arrays
	// const addCounter = (list) => {
	// 	list.push(0)
	// 	return list
	// }
	// example above would crash the script. Cannot mutate freezed arrays.

	const addCounter = (list) => {
		return [...list, 0]
	}
	
	const testAddCounter = () => {
		const listBefore = []
		const listAfter = [0]

		deepFreeze(listBefore)

		expect(
			addCounter(listBefore)
		).toEqual(listAfter)
	}

	testAddCounter()

	// const removeCounter = (list, index) => {
	// 	list.splice(index, 1)
	// 	return list
	// }
	// This would also mutate the array

	const removeCounter = (list, index) => {
		return [
			...list.slice(0, index),
			...list.slice(index + 1)
		]
	}

	const testRemoveCounter = () => {
		const listBefore = [0, 10, 20]
		const listAfter = [0, 20]

		expect(
			removeCounter(listBefore, 1)
		).toEqual(listAfter)
	}

	testRemoveCounter()

	// const incrementCounter = (list, index) => {
	//   list[index]++
	//   return list
	// }
	// Mutates an array, crasher the script

	const incrementCounter = (list, index) => {
		return [
			...list.slice(0, index),
			list[index] + 1,
			...list.slice(index + 1)
		]
	}

	const testIncrementCounter = () => {
		const listBefore = [0, 10, 20]
		const listAfter = [0, 11, 20]

		deepFreeze(listBefore)

		expect(
			incrementCounter(listBefore, 1)
		).toEqual(listAfter)
	}

	console.log('All test passed!')
}

export default wrapper