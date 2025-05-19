import { searchTask } from './main'

document.addEventListener('DOMContentLoaded', () => {
	const searchInputEl = document.querySelector(
		'#search-container #search-input'
	)
	const searchResultEl = document.querySelector(
		'#search-container #search-result'
	)

	searchInputEl.addEventListener('change', () => {
		let searchResult = searchTask(searchInputEl.value)
		if (searchResult) {
			searchResult = searchResult
				.map((task) => {
					return `
            <li>${task.title}</li>
            `
				})
				.join('')
			searchResultEl.innerHTML = searchResult
		} else {
			searchResultEl.innerHTML = 'No results found'
		}
	})
})
