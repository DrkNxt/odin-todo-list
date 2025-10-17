import * as globals from "./globals.js";
import { Project } from "./classes/project.js";
import { TodoList } from "./classes/todo-list.js";
import { TodoItem } from "./classes/todo-item.js";

function createProject(title, description) {
    let project = new Project(title, description);
    globals.projectList.addProject(project);
    globals.setActiveProject(project);
}

function createTodoList(project, title, description) {
    project.addTodoList(new TodoList(title, description));
}

function createTodoItem(todoList, title, priority, dueDate, notes) {
    todoList.addTodoItem( new TodoItem(title, priority, dueDate, notes));
}

function deleteProject(project) {
    globals.projectList.removeProject(project);
    if (globals.projectList.projects.length < 1) {
        createProject("New Project", "Description");
    }
}

function deleteTodoList(todoList, project) {
    project.removeTodoList(todoList);
}

function deleteTodoItem(todoItem, todoList) {
    todoList.removeTodoItem(todoItem);
}

function toggleCompleted(todoItem) {
    todoItem.toggleCompleted();
    return todoItem.isCompleted;
}

export { createProject, createTodoList, createTodoItem, deleteProject, deleteTodoList, deleteTodoItem, toggleCompleted };