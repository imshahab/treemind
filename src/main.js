import { Task } from './task.js'
import { BST } from './data-structures/structures/bst.js'
import { MaxHeap } from './data-structures/structures/maxHeap.js'
import { visualize } from './data-structures/visualization/visualize.js'
import { assignPositions } from './data-structures/visualization/assignPositions.js'

// sample tree setup
const task1 = new Task(5, 'Task 5', Date.now() + 3600000, 1)
const task2 = new Task(3, 'Task 3', Date.now() + 7200000, 1)
const task3 = new Task(7, 'Task 7', Date.now() + 1800000, 1, Date.now())
const task4 = new Task(
	15,
	'Task 9999',
	Date.now() + 1800000,
	2,
	Date.now() - 500
)
const task5 = new Task(2, 'Task 2', Date.now() + 5400000, 1)
const task6 = new Task(4, 'Task 4', Date.now() + 10800000, 1)
const task7 = new Task(6, 'Task 6', Date.now() + 12600000, 1)
const task8 = new Task(8, 'Task 8', Date.now() + 9000000, 1)
const task9 = new Task(1, 'Task 1', Date.now() + 4500000, 1)
const task10 = new Task(9, 'Task 9', Date.now() + 6300000, 1)
const task11 = new Task(10, 'Task 10', Date.now() + 2700000, 1)
const task12 = new Task(11, 'Task 11', Date.now() + 8100000, 1)

const bst = new BST()
const heap = new MaxHeap()

bst.insert(task2)
bst.insert(task1)
bst.insert(task4)
bst.insert(task6)
bst.insert(task3)
bst.insert(task5)
bst.insert(task7)
bst.insert(task8)
bst.insert(task9)
bst.insert(task10)
bst.insert(task11)
bst.insert(task12)

heap.insert(task2)
heap.insert(task1)
heap.insert(task4)
heap.insert(task6)
heap.insert(task3)
heap.insert(task5)
heap.insert(task7)
heap.insert(task8)
heap.insert(task9)
heap.insert(task10)
heap.insert(task11)
heap.insert(task12)

// visualize the bst
const bstElements = assignPositions(bst.root, 'bst')
visualize(bstElements, 'bst')

// visualize the heap
const heapElements = assignPositions(heap.buildTree()[0], 'heap')
visualize(heapElements, 'heap')

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
