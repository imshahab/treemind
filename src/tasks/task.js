export class Task {
	constructor(id, title, deadline, estimatedTime, createdAt = new Date()) {
		this.id = id
		this.title = title
		this.deadline = deadline
		this.estimatedTime = estimatedTime // in hours
		this.createdAt = createdAt
		this.priority = this.calculatePriority() // priority score
	}

	// calculate the priority score using the least slack time first algorithm
	calculatePriority() {
		const now = new Date() // current time
		const timeUntilDeadline = (this.deadline - now) / (1000 * 60 * 60) // time until the deadline in hours
		// slack time is the difference between the time until the deadline and the estimated time
		const slack = timeUntilDeadline - this.estimatedTime // slack time in hours
		if (slack <= 0) {
			return Infinity // task is either due now or overdue, so give it the highest priority
		} else {
			return 1 / Math.max(1, slack)
		}
	}
}
