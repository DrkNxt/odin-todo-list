import * as globals from "./globals.js";
import { Project } from "./classes/project.js";
import { TodoList } from "./classes/todo-list.js";
import { TodoItem } from "./classes/todo-item.js";
import { ProjectList } from "./classes/project-list.js";

function createProject(title, description) {
    let project = new Project(title, description);
    ProjectList.addProject(globals.projectList, project);
    globals.setActiveProject(project);
}

function createTodoList(project, title, description) {
    Project.addTodoList(project, new TodoList(title, description));
}

function createTodoItem(todoList, title, priority, dueDate, notes) {
    if (!(dueDate instanceof Date && !isNaN(dueDate))) {
        dueDate = null;
    }
    TodoList.addTodoItem(todoList, new TodoItem(title, priority, dueDate, notes));
}

function deleteProject(project) {
    ProjectList.removeProject(globals.projectList, project);
    if (globals.projectList.projects.length < 1) {
        createProject("New Project", "Description");
    }
}

function deleteTodoList(todoList, project) {
    Project.removeTodoList(project, todoList);
}

function deleteTodoItem(todoItem, todoList) {
    TodoList.removeTodoItem(todoList, todoItem);
}

function toggleCompleted(todoItem) {
    TodoItem.toggleCompleted(todoItem);
    return todoItem.isCompleted;
}

export { createProject, createTodoList, createTodoItem, deleteProject, deleteTodoList, deleteTodoItem, toggleCompleted };