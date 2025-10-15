import * as globals from "./globals.js";
import { Project } from "./classes/project.js";
import { TodoList } from "./classes/todo-list.js";
import { TodoItem } from "./classes/todo-item.js";

function createProject(title, description) {
    globals.projectList.addProject(new Project(title, description));
}

function createTodoList(project, title, description) {
    project.addTodoList(new TodoList(title, description));
}

function createTodoItem(todoList, title, priority, dueDate, notes) {
    todoList.addTodoItem( new TodoItem(title, priority, dueDate, notes));
}

function deleteProject(project) {
    globals.projectList.removeProject(project);
}

function deleteTodoList(todoList, project) {
    project.removeTodoList(todoList);
}

function deleteTodoItem(todoItem, todoList) {
    todoList.removeTodoItem(todoItem);
}

export { createProject, createTodoList, createTodoItem, deleteProject, deleteTodoList, deleteTodoItem };