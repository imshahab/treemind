export function assignPositions(node, type) {
	let xPos = 0
	// the distance between nodes on the x and y axes
	const spacingX = 100
	const spacingY = 100
	// the elements array to hold the nodes and edges
	const elements = []

	// function to assign positions to nodes in the tree using in-order traversal
	// and create elements for cytoscape
	function _assignPositions(node, depth, parentId = null) {
		if (!node) return

		// go left until the end and assign positions
		_assignPositions(node.left, depth + 1, node.id)

		// position for this node
		const x = xPos * spacingX
		const y = depth * spacingY

		// increment xPos for the next node
		xPos++

		// add node
		elements.push({
			data: {
				id: node.id.toString(),
				label: type === 'heap' ? `${node.priority}` : `${node.id}`,
				priority: node.priority,
				title: node.title,
				createdAt: node.createdAt,
				deadline: node.deadline,
				estimatedTime: node.estimatedTime,
				depth,
			},
			position: { x, y },
		})

		// edge to parent
		if (parentId !== null) {
			elements.push({
				data: {
					id: `${parentId}->${node.id}`,
					source: parentId.toString(),
					target: node.id.toString(),
				},
			})
		}

		// right
		_assignPositions(node.right, depth + 1, node.id)
	}

	// call the function to assign positions
	_assignPositions(node, 0)
	return elements
}
