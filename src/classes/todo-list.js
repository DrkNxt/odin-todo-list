class TodoList {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.todoItems = [];
    this.id = crypto.randomUUID();
    this.isFolded = false;
    this.isCompletedHidden = false;
  }
  static get(todoList, todoItem) {
    return todoList.todoItems.findIndex((todo) => todo === todoItem);
  }

  static addTodoItems(todoList, todoItems) {
    for (let todoItem of todoItems) {
      TodoList.addTodoItem(todoList, todoItem);
    }
  }

  static addTodoItem(todoList, todoItem) {
    todoList.todoItems.push(todoItem);
  }

  static removeTodoItem(todoList, todoItem) {
    todoList.todoItems.splice(
      todoList.todoItems.findIndex((todo) => todo === todoItem),
      1
    );
  }

  static toggleFolded(todoList) {
    todoList.isFolded = !todoList.isFolded;
  }

  static toggleCompletedHidden(todoList) {
    todoList.isCompletedHidden = !todoList.isCompletedHidden;
  }
}

export { TodoList };
