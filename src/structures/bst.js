// the bst node class
export class BSTNode {
	constructor(task) {
		this.title = task.title
		this.id = task.id
		this.deadline = task.deadline
		this.createdAt = task.createdAt
		this.estimatedTime = task.estimatedTime
		this.left = null
		this.right = null
	}
}

// the bst class
export class BST {
	constructor() {
		this.root = null
	}

	// insert a new node
	insert(task) {
		// create a new node
		const newNode = new BSTNode(task)
		// if the tree is empty set the new node as the root
		if (this.root === null) {
			this.root = newNode
			// if the tree is not empty insert the new node in the correct position
		} else {
			this.#insert(this.root, newNode)
		}
	}

	// private method to insert a new node in the correct position
	#insert(current, newNode) {
		// if the new node's id is less than the current node's id, insert it in the left subtree
		if (newNode.id < current.id) {
			!current.left
				? (current.left = newNode)
				: this.#insert(current.left, newNode)
		}
		// otherwise insert it in the right subtree
		else {
			!current.right
				? (current.right = newNode)
				: this.#insert(current.right, newNode)
		}
	}

	// search for a node with the given id
	search(id) {
		return this.#search(this.root, id)
	}

	// private method to search for a node with the given id
	#search(current, id) {
		// if the current node is null, return null
		if (current === null) {
			return null
		}
		// if the current node's id is equal to the given id, return the current node
		if (current.id === id) {
			return current
		}
		// if the given id is less than the current node's id, search in the left subtree
		if (id < current.id) {
			return this.#search(current.left, id)
		}
		// otherwise search in the right subtree
		return this.#search(current.right, id)
	}

	// delete a node with the given id
	delete(id) {
		this.root = this.#delete(this.root, id)
	}

	// private method to delete a node with the given id
	#delete(node, id) {
		// if the current node is null, return null
		if (!node) return null

		// if the given id is less than the current node's id, search in the left subtree
		if (id < node.id) {
			node.left = this.#delete(node.left, id)
			// if the given id is greater than the current node's id, search in the right subtree
		} else if (id > node.id) {
			node.right = this.#delete(node.right, id)
			// found the node!
		} else {
			if (!node.left && !node.right) return null // case 1: no children
			if (!node.left) return node.right // case 2a: one child (right)
			if (!node.right) return node.left // case 2b: one child (left)

			// case 3: two children, replace node with successor node
			const tempRef = { node: null } // temporary reference to handle special case
			const successor = this.#detachMin(node.right, tempRef) // detach the successor node (the minimum node in the right subtree)
			// if the tempRef node is not null, set the right child of the current node to the tempRef node
			if (tempRef.node) {
				node.right = tempRef.node
			}
			// set the left child of the successor node to the left child of the current node
			successor.left = node.left
			// set the right child of the successor node to the right child of the current node
			successor.right = node.right

			return successor // return the successor node
		}

		return node // return the current node
	}

	// private method to detach the minimum node from the given node
	#detachMin(node, tempRef) {
		// go left until we find the minimum node, also keep track of the parent node
		let parent = null
		while (node.left) {
			parent = node
			node = node.left
		}

		// if there's a parent, meaning the node is not the root, set the left child of the parent to the right child of the current node
		if (parent) {
			parent.left = node.right
			// if there's no parent, meaning the node is the root, set the tempRef.node value to the right child of the current node
			// this is because we can't manipulate the node variable from within the function, since it's a reference passed by value:(
			// so we need to use a temporary reference to handle this special case and manipulate the tree later on, in the caller function
		} else {
			tempRef.node = node.right
		}

		// return the detached minimum node
		return node
	}

	// traverse the tree
	traverse(type = 'pre') {
		const result = []
		if (type === 'pre') {
			this.#preOrder(this.root, result)
		} else if (type === 'in') {
			this.#inOrder(this.root, result)
		} else if (type === 'post') {
			this.#postOrder(this.root, result)
		} else {
			throw new Error('Invalid traversal type')
		}
		// return the result of the traversal
		return result
	}

	// private method to perform pre-order traversal
	#preOrder(node, result) {
		if (node) {
			result.push(node)
			this.#preOrder(node.left, result)
			this.#preOrder(node.right, result)
		}
	}

	// private method to perform in-order traversal
	#inOrder(node, result) {
		if (node) {
			this.#inOrder(node.left, result)
			result.push(node)
			this.#inOrder(node.right, result)
		}
	}

	// private method to perform post-order traversal
	#postOrder(node, result) {
		if (node) {
			this.#postOrder(node.left, result)
			this.#postOrder(node.right, result)
			result.push(node)
		}
	}

	// check if the tree is empty
	isEmpty() {
		return this.root === null
	}

	// get the count of nodes in the tree
	size(node = this.root) {
		if (!node) return 0
		return 1 + this.size(node.left) + this.size(node.right)
	}
}
