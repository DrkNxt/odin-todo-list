import * as todoManager from "../todo-manager.js";
import * as globals from "../globals.js";
import * as domElementCreator from "./element-creator.js";

const projectListContainer = document.querySelector("#project-list");
const currentProjectContainer = document.querySelector("#current-project");
const todoListsContainer = document.querySelector("#todo-lists");
const addProjectContainer = document.querySelector("#add-project-form");

let activeProject = globals.projectList.projects[0];

// Update project list elements
function displayProjectList(projectList) {
    projectListContainer.innerHTML = "";

    for (let project of projectList.projects) {
        const projectElement = domElementCreator.getElement("div", project.title, "project");
        projectListContainer.appendChild(projectElement);

        projectElement.addEventListener("click", () => {
            displayProject(project);
        });
    }
}

// Update project elements
function displayProject(project) {
    activeProject = project;
    currentProjectContainer.innerHTML = "";

    // Display title and description
    currentProjectContainer.appendChild(domElementCreator.getElement("h2", project.title, "current-project-name"));
    currentProjectContainer.appendChild(domElementCreator.getElement("p", project.description, "current-project-description"));

    // Display all todo lists of this project
    displayTodoLists(project.todoLists);

    // Display addTodoListButton
    const addTodoListDiv = domElementCreator.getElement("div", "", null, "add-todo-list-div");
    addTodoListDiv.appendChild(createAddTodoListButton());
    todoListsContainer.appendChild(addTodoListDiv);
}

function createAddTodoListButton() {
    const addTodoListButton = domElementCreator.getButton(null, "+", "button", "add-todo-list-btn");
    addTodoListButton.addEventListener("click", () => {
        addTodoList();
    });
    return addTodoListButton;
}

// Update todo list elements
function displayTodoLists(todoLists) {
    todoListsContainer.innerHTML = "";

    for (let todoList of todoLists) {
        createTodoListElement(todoList, todoLists);
    }
}

// Create single todo list
function createTodoListElement(todoList, todoLists) {
    const todoListContainer = domElementCreator.getElement("div", "", "todo-list");
    const todoItemsContainer = domElementCreator.getElement("div", "", "todo-items");

    todoListContainer.appendChild(domElementCreator.getElement("h3", todoList.title, "todo-list-title"));
    todoListContainer.appendChild(domElementCreator.getElement("p", todoList.description, "todo-list-description"));
    todoListContainer.appendChild(todoItemsContainer);

    // Display all todo items of this list
    displayTodoItems(todoList.todoItems, todoItemsContainer);

    const addTodoItemDiv = domElementCreator.getElement("div", "", "add-todo-item-div", todoList.id);

    addTodoItemDiv.appendChild(createAddTodoItemButton(todoList));
    todoItemsContainer.appendChild(addTodoItemDiv);
    todoListsContainer.appendChild(todoListContainer);
}

function createAddTodoItemButton(todoList) {
    const addTodoItemButton = domElementCreator.getButton(null, "+", "button", "add-todo-item-btn");

    addTodoItemButton.addEventListener("click", () => {
        addTodoItem(todoList);
    });

    return addTodoItemButton;
}

// Update todo item elements
function displayTodoItems(todoItems, todoItemsContainer) {
    for (let todoItem of todoItems) {
        const todoItemContainer = domElementCreator.getElement("div", "", "todo-item");
        todoItemContainer.appendChild(domElementCreator.getElement("h4", todoItem.title, "todo-item-title"));
        todoItemContainer.appendChild(domElementCreator.getElement("span", todoItem.priority, "todo-item-priority"));
        todoItemContainer.appendChild(domElementCreator.getElement("div", todoItem.isCompleted, "todo-item-status"));
        todoItemContainer.appendChild(domElementCreator.getElement("span", todoItem.dueDate, "todo-item-due-date"));
        todoItemContainer.appendChild(domElementCreator.getElement("p", todoItem.notes, "todo-item-notes"));
        todoItemsContainer.appendChild(todoItemContainer);
    }
}

// Display form to add a new project
function addProject() {
    addProjectContainer.innerHTML = "";

    const titleInput = domElementCreator.getInput("text", "project-title", "project-title", "New Project");
    const descriptionInput = domElementCreator.getTextArea("project-description", "project-description", 3);
    const buttonsDiv = domElementCreator.getElement("div", "", "form-buttons-project");
    const submitButton = domElementCreator.getButton("add-new-project-btn", "Add", "submit");
    const cancelButton = domElementCreator.getButton("cancel-new-project-btn", "Cancel");

    // Append all elements required for the project form
    addProjectContainer.appendChild(domElementCreator.getLabel("project-title", "Project Title"));
    addProjectContainer.appendChild(titleInput);
    addProjectContainer.appendChild(domElementCreator.getLabel("project-description", "Description"));
    addProjectContainer.appendChild(descriptionInput);
    buttonsDiv.appendChild(submitButton);
    buttonsDiv.appendChild(cancelButton);
    addProjectContainer.appendChild(buttonsDiv);

    // Add project when "Add" button is clicked
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();

        let title = titleInput.value == "" ? "New Project" : titleInput.value;
        let description = descriptionInput.value == "" ? "Description" : descriptionInput.value;
        todoManager.createProject(title, description);

        addProjectContainer.innerHTML = "";
        displayProjectList(globals.projectList);
    })

    // Close form when "Cancel" button is clicked
    cancelButton.addEventListener("click", () => {
        addProjectContainer.innerHTML = "";
    })
}

// Display form to add a new todo list to a project
function addTodoList() {
    const container = document.querySelector("#add-todo-list-div");

    container.innerHTML = "";

    const titleInput = domElementCreator.getInput("text", "todo-list-title", "todo-list-title", "New Todo List");
    const descriptionInput = domElementCreator.getTextArea("todo-list-description", "todo-list-description", 3, "");
    const buttonsDiv = domElementCreator.getElement("div", "", "form-buttons-todo-list");
    const submitButton = domElementCreator.getButton("add-new-todo-list-btn", "Add", "submit");
    const cancelButton = domElementCreator.getButton("cancel-new-todo-list-btn", "Cancel");

    // Append all elements required for the todo list form
    container.appendChild(domElementCreator.getLabel("todo-list-title", "Todo List Title"));
    container.appendChild(titleInput);
    container.appendChild(domElementCreator.getLabel("todo-list-description", "Description"));
    container.appendChild(descriptionInput);
    buttonsDiv.appendChild(submitButton);
    buttonsDiv.appendChild(cancelButton);
    container.appendChild(buttonsDiv);

    // Add todo list when "Add" button is clicked
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();

        let title = titleInput.value == "" ? "New Todo List" : titleInput.value;
        let description = descriptionInput.value;
        todoManager.createTodoList(activeProject, title, description);

        container.innerHTML = "";
        displayProject(activeProject);
    })

    // Close form when "Cancel" button is clicked
    cancelButton.addEventListener("click", () => {
        container.innerHTML = "";

        container.appendChild(createAddTodoListButton());
    })
}

// Display form to add a new todo item to a todo list
function addTodoItem(todoList) {
    const container = document.querySelector("#"+ CSS.escape(todoList.id));

    container.innerHTML = "";

    const titleInput = domElementCreator.getInput("text", "todo-item-title", "todo-item-title", "New Todo");
    const priorityInput = domElementCreator.getPrioritySelect();
    const dueDateInput = domElementCreator.getInput("datetime-local", "todo-item-date", "todo-item-date", "");
    const notesInput = domElementCreator.getTextArea("todo-item-notes", "todo-item-notes", 3, "");
    const buttonsDiv = domElementCreator.getElement("div", "", "form-buttons-todo-item");
    const submitButton = domElementCreator.getButton("add-new-todo-item-btn", "Add", "submit");
    const cancelButton = domElementCreator.getButton("cancel-new-todo-item-btn", "Cancel");

    // Append all elements required for the todo item form
    container.appendChild(domElementCreator.getLabel("todo-item-title", "Title"));
    container.appendChild(titleInput);
    container.appendChild(domElementCreator.getLabel("todo-item-priority", "Priority"));
    container.appendChild(priorityInput);
    container.appendChild(domElementCreator.getLabel("todo-item-date", "Due Date"));
    container.appendChild(dueDateInput);
    container.appendChild(domElementCreator.getLabel("todo-item-notes", "Notes"));
    container.appendChild(notesInput);
    buttonsDiv.appendChild(submitButton);
    buttonsDiv.appendChild(cancelButton);
    container.appendChild(buttonsDiv);

    // Add todo item when "Add" button is clicked
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();

        let title = titleInput.value == "" ? "New Todo" : titleInput.value;
        let priority = priorityInput.value;
        let dueDate = dueDateInput.value;
        let notes = notesInput.value;
        todoManager.createTodoItem(todoList, title, priority, dueDate, notes);

        container.innerHTML = "";
        displayProject(activeProject);
    })

    // Close form when "Cancel" button is clicked
    cancelButton.addEventListener("click", () => {
        container.innerHTML = "";

        container.appendChild(createAddTodoItemButton(todoList));
    })
}

export { displayProjectList, displayProject, displayTodoLists, addProject };