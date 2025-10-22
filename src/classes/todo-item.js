class TodoItem {
  constructor(title, priority, dueDate, notes, isCompleted = false) {
    this.title = title;
    this.priority = priority;
    this.isCompleted = isCompleted;
    this.dueDate = dueDate;
    this.notes = notes;
    this.id = crypto.randomUUID();
  }

  static toggleCompleted(todoItem) {
    todoItem.isCompleted = !todoItem.isCompleted;
  }
}

export { TodoItem };
