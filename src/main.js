import { Task } from './task.js'
import { BST } from './bst.js'

const task1 = new Task(1, 'Task 1', new Date('2023-10-01'), 2)
const task2 = new Task(2, 'Task 2', new Date('2023-10-02'), 1)
const task3 = new Task(3, 'Task 3', new Date('2023-10-03'), 3)
const task4 = new Task(4, 'Task 4', new Date('2023-10-04'), 2)
const task5 = new Task(5, 'Task 5', new Date('2023-10-05'), 1)
const task6 = new Task(6, 'Task 6', new Date('2023-10-06'), 3)

const bst = new BST()
const heap = new MaxHeap()

bst.insert(task2)
bst.insert(task1)
bst.insert(task4)
bst.insert(task6)
bst.insert(task3)
bst.insert(task5)

heap.insert(task2)
heap.insert(task1)
heap.insert(task4)
heap.insert(task6)
heap.insert(task3)
heap.insert(task5)

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
