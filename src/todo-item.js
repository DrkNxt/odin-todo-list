class TodoItem {
    constructor(title, priority, completed, dueDate, description, notes, checklist) {
        this.title = title;
        this.priority = priority;
        this.finished = false;
        this.dueDate = dueDate;
        this.description = description;
        this.notes = notes;
        this.checklist = checklist;
        this.id = crypto.randomUUID();
    }

    toggleCompleted() {
        this.finished = !this.finished;
    }
}

export { TodoItem };