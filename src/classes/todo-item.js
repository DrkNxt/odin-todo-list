class TodoItem {
    constructor(title, priority, dueDate, notes) {
        this.title = title;
        this.priority = priority;
        this.isCompleted = false;
        this.dueDate = dueDate;
        this.notes = notes;
        this.id = crypto.randomUUID();
    }

    toggleCompleted() {
        this.isCompleted = !this.isCompleted;
    }
}

export { TodoItem };