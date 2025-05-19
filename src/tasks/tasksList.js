import { removeTask, doneTask, addTask } from '../main.js'

document.addEventListener('DOMContentLoaded', () => {
	const tasksListEl = document.querySelector('#tasks-container #tasks-list')
	const taskInputEl = document.querySelector('#task-input')
	const taskDeadlineEl = document.querySelector('#task-deadline')
	const taskEstimatedTimeEl = document.querySelector('#task-estimated-time')
	const addTaskBtnEl = document.querySelector('#add-task-btn')

	// Add event listener to the delete button
	tasksListEl.addEventListener('click', (e) => {
		if (e.target.classList.contains('delete-task')) {
			const taskId = e.target.id
			const taskTitle = e.target.title
			removeTask(taskId, taskTitle)
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

	// Add event listener to the add task button
	addTaskBtnEl.addEventListener('click', () => {
		const taskTitle = taskInputEl.value.trim()
		const deadline = new Date(taskDeadlineEl.value).getTime()
		const estimatedTime = parseInt(taskEstimatedTimeEl.value) // in hours
		if (taskTitle && deadline && estimatedTime) {
			addTask(taskTitle, deadline, estimatedTime)
		} else {
			alert('Please fill in all fields')
		}
	})
})

export function createTasksList(heap) {
	const tasks = heap.traverse('level')
	const tasksList = tasks
		.map((task) => {
			return `
        <button class="delete-task" id="${task.id}" title="${task.title}">Delete</button>
        <li><label for=${task.id}>${task.title}</label></li>
        <input type="checkbox" id="${task.id}" />
        `
		})
		.join('')

	const tasksListEl = document.querySelector('#tasks-container #tasks-list')
	tasksListEl.innerHTML = tasksList
}

export function createDoneList() {
	const completedTasks =
		JSON.parse(localStorage.getItem('completedTasks')) || []
	const doneList = completedTasks
		.map((task) => {
			return `<li><label for=${task.id} style="text-decoration: line-through;">${task.title}</label></li>`
		})
		.join('')

	const doneListEl = document.querySelector('#done-container #done-list')
	doneListEl.innerHTML = doneList
}
