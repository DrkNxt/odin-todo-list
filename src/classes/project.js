class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.todoLists = []
        this.id = crypto.randomUUID();
    }
    get(todoList) {
        return this.todoLists.findIndex((todo) => todo === todoList);
    }

    addTodoList(todoList) {
        this.todoLists.push(todoList);
    }

    removeTodoList(todoList) {
        this.todoLists.splice(this.todoLists.findIndex((todo) => todo === todoList), 1);
    }
}

export { Project };