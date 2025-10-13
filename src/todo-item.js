class TodoItem {
    constructor(title, priority, dueDate, notes) {
        this.title = title;
        this.priority = priority;
        this.finished = false;
        this.dueDate = dueDate;
        this.notes = notes;
        this.id = crypto.randomUUID();
    }

    toggleCompleted() {
        this.finished = !this.finished;
    }
}

export { TodoItem };