import * as globals from "./globals.js";
import { Project } from "./project.js";
import { TodoList } from "./todo-list.js";
import { TodoItem } from "./todo-item.js";
import { previousFridayWithOptions } from "date-fns/fp";

function createProject(title, description) {
    globals.projectList.addProject(new Project(title, description));
}

function createTodoList(project, title, description) {
    project.addTodoList(new TodoList(title, description));
}

function createTodoItem(todoList, title, priority, dueDate, notes) {
    todoList.addTodoItem( new TodoItem(title, priority, dueDate, notes));
}

export { createProject, createTodoList, createTodoItem };