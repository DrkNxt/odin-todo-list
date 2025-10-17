class TodoList {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.todoItems = []
        this.id = crypto.randomUUID();
    }
    static get(todoList, todoItem) {
        return todoList.todoItems.findIndex((todo) => todo === todoItem);
    }
    static setTodoItems(todoList, todoItems) {
        for(let todoItem of todoItems) {
            TodoList.addTodoItem(todoList, todoItem);
        }
    }

    static addTodoItem(todoList, todoItem) {
        todoList.todoItems.push(todoItem);
    }

    static removeTodoItem(todoList, todoItem) {
        todoList.todoItems.splice(todoList.todoItems.findIndex((todo) => todo === todoItem), 1);
    }
}

export { TodoList };