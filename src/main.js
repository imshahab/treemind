import { Task } from './tasks/task.js'
import { BST } from './structures/bst.js'
import { TitleBST } from './structures/titleBst.js'
import { MaxHeap } from './structures/maxHeap.js'
import { visualize } from './visualization/visualize.js'
import { assignPositions } from './visualization/assignPositions.js'
import { createDoneList, createTasksList } from './tasks/tasksList.js'
import { v4 as uuidv4 } from 'uuid'

// get the completed tasks from local storage
// if non existant, create an empty array
let completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]')

// get heap and bst from local storage
let parsedHeap = JSON.parse(localStorage.getItem('heap'))
let parsedBst = JSON.parse(localStorage.getItem('bst'))
let parsedTitleBst = JSON.parse(localStorage.getItem('titleBst'))

// create a new heap and bst
let heap = new MaxHeap()
let bst = new BST()
let titleBst = new TitleBST()

// check if the heap and bst exist in local storage
if (parsedHeap && parsedHeap) {
	reviveStructure(parsedHeap, heap)
	reviveStructure(parsedBst, bst)
	reviveStructure(parsedTitleBst, titleBst)
}

// sample tree setup
// const task1 = new Task(5, 'Task 5', Date.now() + 3600000, 1)
// const task2 = new Task(3, 'Task 3', Date.now() + 7200000, 1)
// const task3 = new Task(7, 'Task 7', Date.now() + 1800000, 1, Date.now())
// const task4 = new Task(
// 	15,
// 	'Task 9999',
// 	Date.now() + 1800000,
// 	2,
// 	Date.now() - 500
// )
// const task5 = new Task(2, 'Task 2', Date.now() + 5400000, 1)
// const task6 = new Task(4, 'Task 4', Date.now() + 10800000, 1)
// const task7 = new Task(6, 'Task 6', Date.now() + 12600000, 1)
// const task8 = new Task(8, 'Task 8', Date.now() + 9000000, 1)
// const task9 = new Task(1, 'Task 1', Date.now() + 4500000, 1)
// const task10 = new Task(9, 'Task 9', Date.now() + 6300000, 1)
// const task11 = new Task(10, 'Task 10', Date.now() + 2700000, 1)
// const task12 = new Task(11, 'Task 11', Date.now() + 8100000, 1)

// bst.insert(task2)
// bst.insert(task1)
// bst.insert(task4)
// bst.insert(task6)
// bst.insert(task3)
// bst.insert(task5)
// bst.insert(task7)
// bst.insert(task8)
// bst.insert(task9)
// bst.insert(task10)
// bst.insert(task11)
// bst.insert(task12)

// heap.insert(task2)
// heap.insert(task1)
// heap.insert(task4)
// heap.insert(task6)
// heap.insert(task3)
// heap.insert(task5)
// heap.insert(task7)
// heap.insert(task8)
// heap.insert(task9)
// heap.insert(task10)
// heap.insert(task11)
// heap.insert(task12)

// visualize everything
updateVisualization()

// remove the maximum priority element from the heap and the bst
function obliterateMax() {
	// get the maximum priority task from the heap
	const maxNode = heap.peekMax()
	if (!maxNode) {
		throw new Error('Heap is empty')
	}
	maxId = maxNode.id

	// remove the maximum priority task from the heap
	heap.extractMax()
	// remove the maximum priority task from the bst
	bst.delete(maxId)
}

export function removeTask(id, title) {
	// remove the task from the heap
	heap.delete(id)
	// remove the task from the bst
	bst.delete(id)
	// remove the task from the title bst
	titleBst.delete(title)
	// update the local storage
	localStorage.setItem('heap', JSON.stringify(heap.tree))
	localStorage.setItem('bst', JSON.stringify(bst.traverse('pre')))
	localStorage.setItem('titleBst', JSON.stringify(titleBst.traverse('pre')))
	// update the visualization
	updateVisualization()
}

export function doneTask(id) {
	// add the task to the completed tasks array in the local storage
	completedTasks.push(bst.search(id))
	localStorage.setItem('completedTasks', JSON.stringify(completedTasks))
	// remove the task
	removeTask(id)
}

export function addTask(title, deadline, estimatedTime) {
	// create a new task
	const task = new Task(uuidv4(), title, deadline, Date.now(), estimatedTime)
	// add the task to the heap
	heap.insert(task)
	// add the task to the bst
	bst.insert(task)
	// add the task to the title bst
	titleBst.insert(task)
	// update the local storage
	localStorage.setItem('heap', JSON.stringify(heap.tree))
	localStorage.setItem('titleBst', JSON.stringify(titleBst.traverse('pre')))
	localStorage.setItem('bst', JSON.stringify(bst.traverse('pre')))
	// update the visualization
	updateVisualization()
}

export function searchTask(query) {
	let result = titleBst.search(query, true)
	if (result) {
		result = result.slice(0, 5)
		return [...new Set(result)]
	}
	return null
}

function updateVisualization() {
	// update heap and bst visualizations
	const heapElements = assignPositions(heap.buildTree()[0], 'heap')
	const bstElements = assignPositions(bst.root, 'bst')
	const titleBstElements = assignPositions(titleBst.root, 'titleBst')
	visualize(heapElements, 'heap')
	visualize(bstElements, 'bst')
	visualize(titleBstElements, 'titleBst')
	// update the task list
	createTasksList(heap)
	// update the done list
	createDoneList()
}

// revive the heap and bst from local storage
function reviveStructure(parsedStructure, structure) {
	if (!parsedStructure) {
		return null
	}
	for (const node of parsedStructure) {
		const task = new Task(
			node.id,
			node.title,
			node.deadline,
			node.createdAt,
			node.estimatedTime
		)
		structure.insert(task)
	}
	return structure
}
