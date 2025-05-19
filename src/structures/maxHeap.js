// maxHeap node class
class MaxHeapNode {
	constructor(task) {
		this.title = task.title
		this.id = task.id
		this.priority = task.priority
		this.deadline = task.deadline
		this.createdAt = task.createdAt
		this.estimatedTime = task.estimatedTime
	}
}

export class MaxHeap {
	constructor() {
		this.tree = []
	}

	// insert a new task into the heap
	insert(task) {
		// create a new node
		const newNode = new MaxHeapNode(task)
		// add the new node to the end of the tree
		this.tree.push(newNode)
		// bubble up the new node
		this.#bubbleUp(this.tree.length - 1)
	}

	// private method to swap two nodes in the tree
	#swap(index1, index2) {
		// swap the nodes at the given indices
		const temp = this.tree[index1]
		this.tree[index1] = this.tree[index2]
		this.tree[index2] = temp
	}

	// private method to bubble up the node to its correct position
	#bubbleUp(index) {
		// get the index of the parent node
		const parentIndex = this.#getParentIndex(index)
		// make sure that the current node is not the root and that its priority is greater than its parent's priority
		if (
			index > 0 &&
			this.tree[index].priority > this.tree[parentIndex].priority
		) {
			// swap the current node with its parent
			this.#swap(index, parentIndex)
			// recursively bubble up the parent node
			this.#bubbleUp(parentIndex)
		} else if (
			index > 0 &&
			this.tree[index].priority === this.tree[parentIndex].priority
		) {
			// if the priorities are equal, check the deadlines
			if (this.tree[index].deadline != this.tree[parentIndex].deadline) {
				if (
					this.tree[index].deadline < this.tree[parentIndex].deadline
				) {
					// swap the current node with its parent
					this.#swap(index, parentIndex)
					// recursively bubble up the parent node
					this.#bubbleUp(parentIndex)
				}
			} else {
				if (
					this.tree[index].createdAt <
					this.tree[parentIndex].createdAt
				) {
					// swap the current node with its parent
					this.#swap(index, parentIndex)
					// recursively bubble up the parent node
					this.#bubbleUp(parentIndex)
				}
			}
		}
	}

	// traverse the tree
	traverse(type = 'level') {
		if (type === 'level') {
			return this.#levelOrder()
		} else {
			throw new Error('Invalid traversal type')
		}
	}

	// private method to perform level-order traversal
	#levelOrder() {
		const result = []
		// queue to store the nodes to be visited
		const queue = []
		// if the tree is not empty, add the root node to the queue
		if (this.tree.length > 0) {
			queue.push(this.tree[0])
		}
		// while there are nodes in the queue, visit the current node and add its children to the queue
		while (queue.length > 0) {
			// remove the first node from the queue
			const currentNode = queue.shift()
			// get the index of the current node in the tree
			// this is used to find the left and right child indices
			const currentIndex = this.tree.indexOf(currentNode)
			// add the removed node to the result array
			result.push(currentNode)
			// get the indices of the left and right child nodes
			const leftIndex = this.#getChildIndex('left', currentIndex)
			const rightIndex = this.#getChildIndex('right', currentIndex)
			// if the left child exists, add it to the queue
			if (this.tree[leftIndex]) {
				queue.push(this.tree[leftIndex])
			}
			// if the right child exists, add it to the queue
			if (this.tree[rightIndex]) {
				queue.push(this.tree[rightIndex])
			}
		}
		return result
	}

	// remove the maximum element from the heap and return it
	extractMax() {
		// if the tree is empty, return null
		if (this.tree.length === 0) {
			return null
		}
		// get the max node (the root node)
		const maxNode = this.tree[0]
		// get the last node in the tree and remove it from the tree
		const lastNode = this.tree.pop()
		// make sure that the tree is not empty after removing the last node
		if (this.tree.length > 0) {
			// replace the root node with the last node
			this.tree[0] = lastNode
			// and bubble down the root node
			this.#maxHeapify(0)
		}
		return maxNode
	}

	// remove a task by its ID
	delete(id) {
		const index = this.search(id)
		if (index === -1) {
			throw new Error('Task not found')
		}

		// Replace the element to be removed with the last element
		const last = this.tree.length - 1
		if (index !== last) {
			this.tree[index] = this.tree[last]
		}

		// Remove the last element
		this.tree.pop()

		// Restore heap property
		this.#maxHeapify(index) // bubble down
	}

	// peek at the maximum element without removing it
	peekMax() {
		// if the tree is empty, return null
		if (this.tree.length === 0) {
			return null
		}
		// return the root node (the max node)
		return this.tree[0]
	}

	// private method to bubble down the node to its correct position
	#maxHeapify(index) {
		// get the indices of the left and right child nodes
		const leftIndex = this.#getChildIndex('left', index)
		const rightIndex = this.#getChildIndex('right', index)
		// get the length of the tree
		// this is used to check if the child indices are within bounds
		const length = this.tree.length

		// assume that the current node is the largest
		let largestIndex = index

		// check if the left child exists and is greater than the current node
		if (
			leftIndex < length &&
			this.tree[leftIndex].priority > this.tree[largestIndex].priority
		) {
			// if so, update the largest index to the left child index
			largestIndex = leftIndex
		}

		// check if the right child exists and is greater than the current node
		if (
			rightIndex < length &&
			this.tree[rightIndex].priority > this.tree[largestIndex].priority
		) {
			// if so, update the largest index to the right child index
			largestIndex = rightIndex
		}
		// if the largest index is not the current node, swap the current node with the largest child
		if (largestIndex !== index) {
			const temp = this.tree[index]
			this.tree[index] = this.tree[largestIndex]
			this.tree[largestIndex] = temp
			// and recursively bubble down the largest child
			this.#maxHeapify(largestIndex)
		}
	}

	// increase the priority of a task
	increasePriority(id, newPriority) {
		// find the index of the task in the tree
		const index = this.search(id)
		// if the task is not found, throw an error
		if (!index) {
			throw new Error('Task not found')
		}
		// change the priority of the task
		const oldPriority = this.tree[index].priority
		this.tree[index].priority = newPriority
		// if the new priority is greater than the old priority, bubble up the task
		if (newPriority > oldPriority) {
			this.#bubbleUp(index)
		}
		// otherwise, bubble down the task
		else {
			this.#maxHeapify(index)
		}
	}

	// find a task by its ID using linear search
	search(id) {
		// if the tree is empty, return null
		if (this.tree.length === 0) {
			return null
		}
		let resultIndex = null
		// iterate through the tree to find the task with the given ID
		this.tree.forEach((node, index) => {
			if (node.id === id) {
				resultIndex = index
				return // return the index of the task
			}
		})
		// if the task is not found, return null
		return resultIndex
	}

	// sort the tree using heap sort
	heapSort() {
		const sortedArray = []
		// create a copy of the original tree to avoid modifying it
		const originalTree = [...this.tree]
		// extract the maximum element until the tree is empty
		while (this.tree.length > 0) {
			sortedArray.push(this.extractMax())
		}
		// restore the original tree
		this.tree = originalTree
		return sortedArray // return the sorted array in descending order
	}

	// get the count of nodes in the tree
	size() {
		return this.tree.length
	}

	// get the index of the parent node
	#getParentIndex(index) {
		return Math.floor((index - 1) / 2)
	}

	// get the index of the child node
	#getChildIndex(side, index) {
		if (side === 'left') {
			return index * 2 + 1
		}
		if (side === 'right') {
			return index * 2 + 2
		}
	}

	// build an array with the left and right child properties included
	buildTree() {
		const array = []

		// first: create all nodes
		this.tree.forEach((node) => {
			array.push({
				title: node.title,
				id: node.id,
				priority: node.priority,
				deadline: node.deadline,
				createdAt: node.createdAt,
				estimatedTime: node.estimatedTime,
				left: null,
				right: null,
			})
		})

		// then: assign references
		array.forEach((node, index) => {
			const leftIndex = this.#getChildIndex('left', index)
			const rightIndex = this.#getChildIndex('right', index)
			node.left = array[leftIndex] ?? null
			node.right = array[rightIndex] ?? null
		})

		return array
	}
}
