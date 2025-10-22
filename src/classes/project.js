class Project {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.todoLists = [];
    this.id = crypto.randomUUID();
  }
  static get(project, todoList) {
    return project.todoLists.findIndex((todo) => todo === todoList);
  }

  static addTodoList(project, todoList) {
    project.todoLists.push(todoList);
  }

  static removeTodoList(project, todoList) {
    project.todoLists.splice(
      project.todoLists.findIndex((todo) => todo === todoList),
      1
    );
  }
}

export { Project };
