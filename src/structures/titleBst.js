// the bst node class
class TitleBSTNode {
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
export class TitleBST {
	constructor() {
		this.root = null
	}

	// insert a new node
	insert(task) {
		// create a new node
		const newNode = new TitleBSTNode(task)
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
		// if the new node's title is less than the current node's title, insert it in the left subtree
		if (newNode.title < current.title) {
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

	// search for a node with the given title
	search(title, fuzzy) {
		return this.#search(this.root, title, fuzzy)
	}

	// private method to search for a node with the given title
	#search(current, title, fuzzy = false) {
		this.traverse('in')
		// if the current node is null, return null
		if (current === null) {
			return null
		}
		// if the current node's title is equal to the given title, return the current node
		if (current.title === title) {
			return fuzzy ? [current, ...this.traverse('in', current)] : current
		}
		// if the given title is less than the current node's title, search in the left subtree
		if (title < current.title) {
			return this.#search(current.left, title, fuzzy)
		}
		// otherwise search in the right subtree
		return this.#search(current.right, title, fuzzy)
	}

	// delete a node with the given title
	delete(title) {
		this.root = this.#delete(this.root, title)
	}

	// private method to delete a node with the given title
	#delete(node, title) {
		// if the current node is null, return null
		if (!node) return null

		// if the given title is less than the current node's title, search in the left subtree
		if (title < node.title) {
			node.left = this.#delete(node.left, title)
			// if the given title is greater than the current node's title, search in the right subtree
		} else if (title > node.title) {
			node.right = this.#delete(node.right, title)
			// found the node!
		} else {
			// case 1: no children
			if (!node.left && !node.right) return null
			// case 2a: one child (right)
			if (!node.left) return node.right
			// case 2b: one child (left)
			if (!node.right) return node.left

			// case 3: two children
			// find the minimum node in the right subtree (successor)
			let successor = this.#findMin(node.right)

			// create a new node with the successor's values to avoid circular references
			const newNode = new TitleBSTNode({
				title: successor.title,
				id: successor.id,
				deadline: successor.deadline,
				createdAt: successor.createdAt,
				estimatedTime: successor.estimatedTime,
			})

			// recursively delete the successor from the right subtree
			newNode.right = this.#delete(node.right, successor.title)
			// preserve the left subtree
			newNode.left = node.left

			return newNode
		}

		return node // return the current node
	}

	// helper method to find the minimum node in a subtree
	#findMin(node) {
		let current = node
		while (current && current.left) {
			current = current.left
		}
		return current
	}

	// traverse the tree
	traverse(type = 'pre', node = this.root) {
		const result = []
		if (type === 'pre') {
			this.#preOrder(node, result)
		} else if (type === 'in') {
			this.#inOrder(node, result)
		} else if (type === 'post') {
			this.#postOrder(node, result)
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
