import cytoscape from 'cytoscape'

export function visualize(elements, type) {
	// check the type
	let elementId
	if (type === 'heap') {
		elementId = '#heap'
	} else if (type === 'bst') {
		elementId = '#bst'
	} else if (type === 'titleBst') {
		elementId = '#title-bst'
	}

	// get the tooltip element
	const tooltip = document.getElementById('tooltip')

	// create a new instance of cytoscape
	const cy = cytoscape({
		container: document.querySelector(`${elementId} #cy`),
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
		// get the node's data (depth, id, title) for the tooltip
		const depth = node.data('depth')
		const id = node.data('id')
		const title = node.data('title') || `Node ${id}`

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
		if (type === 'heap') {
			tooltip.innerHTML = `
                <strong>${title}</strong><br/>
                ID: ${id}<br/>
                Depth: ${depth}<br/>
                Priority: ${node.data('priority')}<br/>
                Deadline: ${new Date(
					node.data('deadline')
				).toLocaleString()}<br/>
                Created At: ${new Date(
					node.data('createdAt')
				).toLocaleString()}<br/>
            `
		} else if (type === 'bst' || type === 'titleBst') {
			tooltip.innerHTML = `
                <strong>${title}</strong><br/>
                ID: ${id}<br/>
                Depth: ${depth}<br/>
                Deadline: ${new Date(
					node.data('deadline')
				).toLocaleString()}<br/>
                Created At: ${new Date(
					node.data('createdAt')
				).toLocaleString()}<br/>
            `
		}

		// make tooltip visible
		tooltip.style.opacity = 1
	})

	// lock all nodes to prevent dragging
	cy.nodes().forEach((node) => {
		node.lock()
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
}
