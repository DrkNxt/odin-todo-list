import * as globals from "../globals.js";
import * as elementCreator from "./element-creator.js";
import * as newForm from "./new-element-forms.js";

const projectListContainer = document.querySelector("#project-list");
const currentProjectContainer = document.querySelector("#current-project");
const todoListsContainer = document.querySelector("#todo-lists");
const addProjectButton = document.querySelector("#add-project-btn");

addProjectButton.addEventListener("click", () => {
    newForm.projectForm();
})

function updateAll() {
    updateProjectList();
    updateProject(globals.getActiveProject());
}

// Update project list elements
function updateProjectList() {

    projectListContainer.innerHTML = "";

    for (let project of globals.projectList.projects) {
        const projectElement = elementCreator.getElement("div", project.title, "project");
        projectListContainer.appendChild(projectElement);

        projectElement.addEventListener("click", () => {
            updateProject(project);
        });
    }
}

// Update project elements
function updateProject(project) {
    globals.setActiveProject(project);
    currentProjectContainer.innerHTML = "";

    // Display title and description
    currentProjectContainer.appendChild(elementCreator.getElement("h2", project.title, "current-project-name"));
    currentProjectContainer.appendChild(elementCreator.getElement("p", project.description, "current-project-description"));

    // Display all todo lists of this project
    updateTodoLists(project.todoLists);

    // Display addTodoListButton
    const addTodoListDiv = elementCreator.getElement("div", "", null, "add-todo-list-div");
    addTodoListDiv.appendChild(createAddTodoListButton());
    todoListsContainer.appendChild(addTodoListDiv);
}

function createAddTodoListButton() {
    const addTodoListButton = elementCreator.getButton(null, "+", "button", "add-todo-list-btn");
    addTodoListButton.addEventListener("click", () => {
        newForm.todoListForm();
    });
    return addTodoListButton;
}

// Update todo list elements
function updateTodoLists(todoLists) {
    todoListsContainer.innerHTML = "";

    for (let todoList of todoLists) {
        createTodoListElement(todoList, todoLists);
    }
}

// Create single todo list
function createTodoListElement(todoList, todoLists) {
    const todoListContainer = elementCreator.getElement("div", "", "todo-list");
    const todoItemsContainer = elementCreator.getElement("div", "", "todo-items");

    todoListContainer.appendChild(elementCreator.getElement("h3", todoList.title, "todo-list-title"));
    todoListContainer.appendChild(elementCreator.getElement("p", todoList.description, "todo-list-description"));
    todoListContainer.appendChild(todoItemsContainer);

    // Display all todo items of this list
    displayTodoItems(todoList.todoItems, todoItemsContainer);

    const addTodoItemDiv = elementCreator.getElement("div", "", "add-todo-item-div", todoList.id);

    addTodoItemDiv.appendChild(createAddTodoItemButton(todoList));
    todoItemsContainer.appendChild(addTodoItemDiv);
    todoListsContainer.appendChild(todoListContainer);
}

function createAddTodoItemButton(todoList) {
    const addTodoItemButton = elementCreator.getButton(null, "+", "button", "add-todo-item-btn");

    addTodoItemButton.addEventListener("click", () => {
        newForm.todoItemForm(todoList);
    });

    return addTodoItemButton;
}

// Update todo item elements
function displayTodoItems(todoItems, todoItemsContainer) {
    for (let todoItem of todoItems) {
        const todoItemContainer = elementCreator.getElement("div", "", "todo-item");
        todoItemContainer.appendChild(elementCreator.getElement("h4", todoItem.title, "todo-item-title"));
        todoItemContainer.appendChild(elementCreator.getElement("span", todoItem.priority, "todo-item-priority"));
        todoItemContainer.appendChild(elementCreator.getElement("div", todoItem.isCompleted, "todo-item-status"));
        todoItemContainer.appendChild(elementCreator.getElement("span", todoItem.dueDate, "todo-item-due-date"));
        todoItemContainer.appendChild(elementCreator.getElement("p", todoItem.notes, "todo-item-notes"));
        todoItemsContainer.appendChild(todoItemContainer);
    }
}

export { updateProjectList, updateProject };