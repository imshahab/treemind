import { MaxHeap } from './maxHeap.js'
import { Task } from './task.js'

// get the tooltip element
const tooltip = document.getElementById('tooltip')

// sample tree setup
const heap = new MaxHeap()
heap.insert(new Task(5, 'Task 5', new Date(Date.now() + 3600000), 1))
heap.insert(new Task(3, 'Task 3', new Date(Date.now() + 7200000), 1))
heap.insert(new Task(7, 'Task 7', Date.now() + 1800000, 1, Date.now() - 500))
heap.insert(new Task(9999, 'Task 9999', Date.now() + 1800000, 2, Date.now()))
heap.insert(new Task(2, 'Task 2', new Date(Date.now() + 5400000), 1))
heap.insert(new Task(4, 'Task 4', new Date(Date.now() + 10800000), 1))
heap.insert(new Task(6, 'Task 6', new Date(Date.now() + 12600000), 1))
heap.insert(new Task(8, 'Task 8', new Date(Date.now() + 9000000), 1))
heap.insert(new Task(1, 'Task 1', new Date(Date.now() + 4500000), 1))
heap.insert(new Task(9, 'Task 9', new Date(Date.now() + 6300000), 1))
heap.insert(new Task(10, 'Task 10', new Date(Date.now() + 2700000), 1))
heap.insert(new Task(11, 'Task 11', new Date(Date.now() + 8100000), 1))

// the position of the node on the x-axis
let xPos = 0
// the distance between nodes on the x and y axes
const spacingX = 100
const spacingY = 100
// the elements array to hold the nodes and edges
const elements = []

// function to assign positions to nodes in the tree using in-order traversal
// and create elements for cytoscape
function assignPositions(node, depth, parentId = null) {
	if (!node) return

	console.log(node)
	// go left until the end and assign positions
	assignPositions(node.left, depth + 1, node.id)

	// position for this node
	const x = xPos * spacingX
	const y = depth * spacingY

	// increment xPos for the next node
	xPos++

	// add node
	elements.push({
		data: {
			id: node.id.toString(),
			label: `${node.priority}`,
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
	assignPositions(node.right, depth + 1, node.id)
}

// call the function to assign positions
assignPositions(heap.buildTree()[0], 0)

// initialize cytoscape
const cy = cytoscape({
	container: document.getElementById('cy'),
	elements,
	style: [
		{
			selector: 'node',
			style: {
				label: 'data(label)',
				'background-color': '#666',
				'text-valign': 'center',
				'text-halign': 'center',
				color: '#fff',
				'font-size': '16px',
				width: 50,
				height: 50,
				'border-width': 2,
				'border-color': '#555',
			},
		},
		{
			selector: 'edge',
			style: {
				width: 2,
				'line-color': '#999',
				'target-arrow-color': '#999',
				'target-arrow-shape': 'triangle',
				'curve-style': 'bezier',
			},
		},
		{
			selector: '.highlighted',
			style: {
				'background-color': '#f39c12',
				'line-color': '#f39c12',
				'target-arrow-color': '#f39c12',
				'transition-property': 'background-color, line-color',
				'transition-duration': '300ms',
			},
		},
	],
	layout: {
		name: 'preset',
	},
})

// highlight path and show tooltip on hover
cy.on('mouseover', 'node', (evt) => {
	// capture the node that triggered the event
	const node = evt.target
	// get the node's data (depth, id, title, priority, deadline, created at) for the tooltip
	const depth = node.data('depth')
	const id = node.data('id')
	const title = node.data('title') || `Node ${id}`
	const priority = node.data('priority')
	const deadline = node.data('deadline')
	const createdAt = node.data('createdAt')

	const path = []
	let current = node
	// traverse upwards to the root node
	// while there are incoming edges to the current node
	while (current.incomers('node').length > 0) {
		// push the current node to the path
		path.push(current)
		// push the incoming edges to the current node to the path
		path.push(current.incomers('edge'))
		// get the parent node
		current = current.incomers('node')[0]
	}
	// push the root node to the path
	path.push(current)

	// remove previous highlights
	cy.elements().removeClass('highlighted')
	// add highlight class to the path
	path.forEach((el) => el.addClass('highlighted'))

	// tooltip content
	tooltip.innerHTML = `
                <strong>${title}</strong><br/>
                ID: ${id}<br/>
				Priority: ${priority}<br/>
                Depth: ${depth}<br/>
				Deadline: ${new Date(deadline).toLocaleString()}<br/>
				Created At: ${new Date(createdAt).toLocaleString()}<br/>
            `

	// make tooltip visible
	tooltip.style.opacity = 1
})

// move tooltip with cursor
cy.on('mousemove', (event) => {
	tooltip.style.left = `${event.originalEvent.pageX + 15}px`
	tooltip.style.top = `${event.originalEvent.pageY + 15}px`
})

// remove highlight and hide tooltip on mouseout
cy.on('mouseout', 'node', () => {
	cy.elements().removeClass('highlighted')
	tooltip.style.opacity = 0
})
