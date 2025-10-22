import * as globals from "./globals.js";
import { Project } from "./classes/project.js";
import { TodoList } from "./classes/todo-list.js";
import { TodoItem } from "./classes/todo-item.js";
import { ProjectList } from "./classes/project-list.js";
import * as localStorageManager from "./local-storage-manager.js";

function createProject(title, description) {
    let project = new Project(title, description);
    ProjectList.addProject(globals.projectList, project);
    globals.setSelectedProject(project);
    saveChanges();
}

function createTodoList(project, title, description) {
    Project.addTodoList(project, new TodoList(title, description));
    saveChanges();
}

function createTodoItem(todoList, title, priority, dueDate, notes) {
    if (!(dueDate instanceof Date && !isNaN(dueDate))) {
        dueDate = null;
    }
    TodoList.addTodoItem(todoList, new TodoItem(title, priority, dueDate, notes));
    saveChanges();
}

function deleteProject(project) {
    ProjectList.removeProject(globals.projectList, project);
    if (globals.projectList.projects.length < 1) {
        createProject("New Project", "Description");
    }
    saveChanges();
}

function deleteTodoList(todoList, project) {
    Project.removeTodoList(project, todoList);
    saveChanges();
}

function deleteTodoItem(todoItem, todoList) {
    TodoList.removeTodoItem(todoList, todoItem);
    saveChanges();
}

function toggleCompleted(todoItem) {
    TodoItem.toggleCompleted(todoItem);
    saveChanges();
    return todoItem.isCompleted;
}

function saveChanges() {
    localStorageManager.storeProjectList(globals.projectList);
}

export { createProject, createTodoList, createTodoItem, deleteProject, deleteTodoList, deleteTodoItem, toggleCompleted, saveChanges };