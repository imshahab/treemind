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
			let searchResultTitle = `			
				<h3 class="text-lg font-semibold mt-4 mb-2 text-gray-700">
					Suggestions
				</h3>`
			searchResultEl.innerHTML = searchResultTitle + searchResult
		} else {
			searchResultEl.innerHTML = 'No results found'
		}
	})
})
