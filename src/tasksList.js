import { removeTask, doneTask } from './main.js'

document.addEventListener('DOMContentLoaded', () => {
	const tasksListEl = document.querySelector('#tasks-container #tasks-list')
	// Add event listener to the delete button
	tasksListEl.addEventListener('click', (e) => {
		if (e.target.classList.contains('delete-task')) {
			const taskId = e.target.id
			removeTask(taskId)
		}
	})
	// Add event listener to the checkbox
	tasksListEl.addEventListener('change', (e) => {
		if (e.target.type === 'checkbox') {
			const taskId = e.target.id
			if (e.target.checked) {
				doneTask(taskId)
			}
		}
	})
})

export function createTasksList(heap) {
	const tasks = heap.traverse('level')
	const tasksList = tasks
		.map((task) => {
			return `
        <button class="delete-task" id="${task.id}">Delete</button>
        <li><label for=${task.id}>${task.title}</label></li>
        <input type="checkbox" id="${task.id}" />
        `
		})
		.join('')

	const tasksListEl = document.querySelector('#tasks-container #tasks-list')
	tasksListEl.innerHTML = tasksList
}
