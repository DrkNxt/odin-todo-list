import * as todoManager from "./todo-manager.js";
import * as globals from "./globals.js";

const projectListElement = document.querySelector("#project-list");
const currentProjectElement = document.querySelector("#current-project");
const todoListsElement = document.querySelector("#todo-lists");
const addProjectElement = document.querySelector("#add-project-form");

let activeProject = globals.projectList.projects[0];

// Update project list elements
function displayProjectList(projectList) {
    console.log("displayProjectList() called. Displaying:")
    console.log(projectList);

    // remove all current elements
    projectListElement.innerHTML = "";

    for (let project of projectList.projects) {
        createProjectElement(project);
    }
}

function createProjectElement(project) {
    const projectElement = document.createElement("div");
    projectElement.classList.add("project");
    projectElement.textContent = project.title;
    projectListElement.appendChild(projectElement);

    projectElement.addEventListener("click", () => {
        displayProject(project);
    });
}


// Update project elements
function displayProject(project) {
    console.log("displayProject() called. Displaying:")
    console.log(project);

    activeProject = project;

    // remove all current elements
    currentProjectElement.innerHTML = "";

    createCurrentProjectElement(project);

    displayTodoLists(project.todoLists);

    // create addTodoListButton and add to the end of TodoLists
    const addTodoListButton = document.createElement("button");
    addTodoListButton.classList.add("add-todo-list-btn");
    addTodoListButton.textContent = "+";
    todoListsElement.appendChild(addTodoListButton);

    addTodoListButton.addEventListener("click", () => {

        // TODO: functionality to add new TodoList

        displayProject(project);
    });
}

function createCurrentProjectElement(project) {
    const currentProjectTitle = document.createElement("h2");
    currentProjectTitle.classList.add("current-project-name");
    currentProjectTitle.textContent = project.title;
    currentProjectElement.appendChild(currentProjectTitle);

    const currentProjectDescription = document.createElement("p");
    currentProjectDescription.classList.add("current-project-description");
    currentProjectDescription.textContent = project.description;
    currentProjectElement.appendChild(currentProjectDescription);
}


// Update todo list elements
function displayTodoLists(todoLists) {
    console.log("displayTodoLists() called. Displaying:")
    console.log(todoLists);

    // remove all current elements
    todoListsElement.innerHTML = "";

    for (let todoList of todoLists) {
        createTodoListElement(todoList, todoLists);
    }
}

function createTodoListElement(todoList, todoLists) {
    const todoListElement = document.createElement("div");
    todoListElement.classList.add("todo-list");

    const todoListTitle = document.createElement("h3");
    todoListTitle.classList.add("todo-list-name");
    todoListTitle.textContent = todoList.title;
    todoListElement.appendChild(todoListTitle);

    const todoListDescription = document.createElement("p");
    todoListDescription.classList.add("todo-list-description");
    todoListDescription.textContent = todoList.description;
    todoListElement.appendChild(todoListDescription);

    const todoItemsElement = document.createElement("div");
    todoItemsElement.classList.add("todo-items");
    todoListElement.appendChild(todoItemsElement);

    displayTodoItems(todoList.todoItems, todoItemsElement);

    // create addTodoItemButton and add to the end of TodoList
    const addTodoItemButton = document.createElement("button");
    addTodoItemButton.classList.add("add-todo-item-btn");
    addTodoItemButton.textContent = "+";
    todoItemsElement.appendChild(addTodoItemButton);

    addTodoItemButton.addEventListener("click", () => {

        displayProject(activeProject);

        // TODO: functionality to add new TodoItem
        
    });

    todoListsElement.appendChild(todoListElement);
}


// Update todo item elements
function displayTodoItems(todoItems, todoItemsElement) {
    console.log("displayTodoItems() called. Displaying:")
    console.log(todoItems);

    for (let todoItem of todoItems) {
        createTodoItemElement(todoItem, todoItemsElement);
    }
}

function createTodoItemElement(todoItem, todoItemsElement) {
    const todoItemElement = document.createElement("div");
    todoItemElement.classList.add("todo-item");
    
    const todoItemTitle = document.createElement("h4");
    todoItemTitle.classList.add("todo-item-title");
    todoItemTitle.textContent = todoItem.title;
    todoItemElement.appendChild(todoItemTitle);

    const todoItemPriority = document.createElement("span");
    todoItemPriority.classList.add("todo-item-priority");
    todoItemPriority.textContent = todoItem.priority;
    todoItemElement.appendChild(todoItemPriority);

    const todoItemFinished = document.createElement("div");
    todoItemFinished.classList.add("todo-item-finished");
    todoItemFinished.textContent = todoItem.finished;
    todoItemElement.appendChild(todoItemFinished);

    const todoItemDueDate = document.createElement("span");
    todoItemDueDate.classList.add("todo-item-due-date");
    todoItemDueDate.textContent = todoItem.dueDate;
    todoItemElement.appendChild(todoItemDueDate);

    const todoItemNotes = document.createElement("p");
    todoItemNotes.classList.add("todo-item-notes");
    todoItemNotes.textContent = todoItem.notes;
    todoItemElement.appendChild(todoItemNotes);

    todoItemsElement.appendChild(todoItemElement);
}


function addProject() {

    addProjectElement.innerHTML = "";

    const addProjectTitleLabel = document.createElement("label");
    addProjectTitleLabel.for = "project-title";
    addProjectTitleLabel.textContent = "Project Title";

    const addProjectTitle = document.createElement("input");
    addProjectTitle.type = "text";
    addProjectTitle.id = "project-title";
    addProjectTitle.name = "project-title";
    addProjectTitle.autocomplete = "off";
    addProjectTitle.placeholder = "New Project";

    const addProjectDescriptionLabel = document.createElement("label");
    addProjectDescriptionLabel.for = "project-description";
    addProjectDescriptionLabel.textContent = "Description";

    const addProjectDescription = document.createElement("textarea");
    addProjectDescription.id = "project-description";
    addProjectDescription.name = "project-description";
    addProjectDescription.rows = 5;
    addProjectDescription.autocomplete = "off";
    addProjectDescription.placeholder = "Project Description";

    const addProjectDiv = document.createElement("div");
    addProjectDiv.classList.add("form-buttons");

    const addProjectSubmitButton = document.createElement("button");
    addProjectSubmitButton.id = "add-new-project-btn";
    addProjectSubmitButton.textContent = "Add";
    addProjectSubmitButton.type = "submit";

    const addProjectCancelButton = document.createElement("button");
    addProjectCancelButton.textContent = "Cancel";
    addProjectCancelButton.id = "cancel-new-project-btn";

    addProjectElement.appendChild(addProjectTitleLabel);
    addProjectElement.appendChild(addProjectTitle);
    addProjectElement.appendChild(addProjectDescriptionLabel);
    addProjectElement.appendChild(addProjectDescription);
    addProjectDiv.appendChild(addProjectSubmitButton);
    addProjectDiv.appendChild(addProjectCancelButton);
    addProjectElement.appendChild(addProjectDiv);

    addProjectSubmitButton.addEventListener("click", (e) => {
        e.preventDefault();

        let title = addProjectTitle.value == "" ? "New Project" : addProjectTitle.value;
        let description = addProjectDescription.value == "" ? "Project description" : addProjectDescription.value;
        todoManager.createProject(title, description);

        addProjectElement.innerHTML = "";
        displayProjectList(globals.projectList);
    })

    addProjectCancelButton.addEventListener("click", () => {
        addProjectElement.innerHTML = "";
    })
}

export { displayProjectList, displayProject, displayTodoLists, addProject };