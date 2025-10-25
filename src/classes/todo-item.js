class TodoItem {
  constructor(title, priority, dueDate, notes, isCompleted = false, isFolded = false) {
    this.title = title;
    this.priority = priority;
    this.isCompleted = isCompleted;
    this.dueDate = dueDate;
    this.notes = notes;
    this.id = crypto.randomUUID();
    this.isFolded = isFolded;
  }

  static toggleCompleted(todoItem) {
    todoItem.isCompleted = !todoItem.isCompleted;
  }

  static toggleFolded(todoItem) {
    todoItem.isFolded = !todoItem.isFolded;
  }
}

export { TodoItem };
