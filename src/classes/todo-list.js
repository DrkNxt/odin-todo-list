class TodoList {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.todoItems = []
        this.id = crypto.randomUUID();
    }
    get(todoItem) {
        return this.todoItems.findIndex((todo) => todo === todoItem);
    }

    addTodoItem(todoItem) {
        this.todoItems.push(todoItem);
    }

    removeTodoItem(todoItem) {
        this.todoItems.splice(this.todoItems.findIndex((todo) => todo === todoItem), 1);
    }
}

export { TodoList };