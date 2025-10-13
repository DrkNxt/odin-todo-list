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
    const addTodoListDiv = document.createElement("div");
    addTodoListDiv.id = "add-todo-list-div";

    const addTodoListButton = createAddTodoListButton();
    addTodoListDiv.appendChild(addTodoListButton);
    todoListsElement.appendChild(addTodoListDiv);
}

function createAddTodoListButton() {
    const addTodoListButton = document.createElement("button");
    addTodoListButton.classList.add("add-todo-list-btn");
    addTodoListButton.textContent = "+";

    addTodoListButton.addEventListener("click", () => {
        addTodoList();
    });
    return addTodoListButton;
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

    const addTodoItemDiv = document.createElement("div");
    addTodoItemDiv.classList.add("add-todo-item-div");
    addTodoItemDiv.id = todoList.id;

    const addTodoItemButton = createAddTodoItemButton(todoList);

    addTodoItemDiv.appendChild(addTodoItemButton);
    todoItemsElement.appendChild(addTodoItemDiv);
    todoListsElement.appendChild(todoListElement);
}

// create addTodoItemButton and add to the end of TodoList
function createAddTodoItemButton(todoList) {
    const addTodoItemButton = document.createElement("button");
    addTodoItemButton.classList.add("add-todo-item-btn");
    addTodoItemButton.textContent = "+";

    addTodoItemButton.addEventListener("click", () => {
        addTodoItem(todoList);
    });

    return addTodoItemButton;
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
    addProjectTitleLabel.htmlFor = "project-title";
    addProjectTitleLabel.textContent = "Project Title";

    const addProjectTitle = document.createElement("input");
    addProjectTitle.type = "text";
    addProjectTitle.id = "project-title";
    addProjectTitle.name = "project-title";
    addProjectTitle.autocomplete = "off";
    addProjectTitle.placeholder = "New Project";

    const addProjectDescriptionLabel = document.createElement("label");
    addProjectDescriptionLabel.htmlFor = "project-description";
    addProjectDescriptionLabel.textContent = "Description";

    const addProjectDescription = document.createElement("textarea");
    addProjectDescription.id = "project-description";
    addProjectDescription.name = "project-description";
    addProjectDescription.rows = 5;
    addProjectDescription.autocomplete = "off";
    addProjectDescription.placeholder = "Project Description";

    const addProjectDiv = document.createElement("div");
    addProjectDiv.classList.add("form-buttons-project");

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

function addTodoList() {
    const addTodoListElement = document.querySelector("#add-todo-list-div");

    addTodoListElement.innerHTML = "";

    const addTodoListTitleLabel = document.createElement("label");
    addTodoListTitleLabel.htmlFor = "todo-list-title";
    addTodoListTitleLabel.textContent = "Todo List Title";

    const addTodoListTitle = document.createElement("input");
    addTodoListTitle.type = "text";
    addTodoListTitle.id = "todo-list-title";
    addTodoListTitle.name = "todo-list-title";
    addTodoListTitle.autocomplete = "off";
    addTodoListTitle.placeholder = "New Todo List";

    const addTodoListDescriptionLabel = document.createElement("label");
    addTodoListDescriptionLabel.htmlFor = "todo-list-description";
    addTodoListDescriptionLabel.textContent = "Description";

    const addTodoListDescription = document.createElement("textarea");
    addTodoListDescription.id = "todo-list-description";
    addTodoListDescription.name = "todo-list-description";
    addTodoListDescription.rows = 5;
    addTodoListDescription.autocomplete = "off";
    addTodoListDescription.placeholder = "Todo List Description";

    const addTodoListDiv = document.createElement("div");
    addTodoListDiv.classList.add("form-buttons-todo-list");

    const addTodoListSubmitButton = document.createElement("button");
    addTodoListSubmitButton.id = "add-new-todo-list-btn";
    addTodoListSubmitButton.textContent = "Add";
    addTodoListSubmitButton.type = "submit";

    const addTodoListCancelButton = document.createElement("button");
    addTodoListCancelButton.textContent = "Cancel";
    addTodoListCancelButton.id = "cancel-new-todo-list-btn";

    addTodoListElement.appendChild(addTodoListTitleLabel);
    addTodoListElement.appendChild(addTodoListTitle);
    addTodoListElement.appendChild(addTodoListDescriptionLabel);
    addTodoListElement.appendChild(addTodoListDescription);
    addTodoListDiv.appendChild(addTodoListSubmitButton);
    addTodoListDiv.appendChild(addTodoListCancelButton);
    addTodoListElement.appendChild(addTodoListDiv);

    addTodoListSubmitButton.addEventListener("click", (e) => {
        e.preventDefault();

        let title = addTodoListTitle.value == "" ? "New Todo List" : addTodoListTitle.value;
        let description = addTodoListDescription.value;
        todoManager.createTodoList(activeProject, title, description);

        addTodoListElement.innerHTML = "";
        displayProject(activeProject);
    })

    addTodoListCancelButton.addEventListener("click", () => {
        addTodoListElement.innerHTML = "";

        addTodoListElement.appendChild(createAddTodoListButton());
    })
}

function addTodoItem(todoList) {
    const addTodoItemElement = document.querySelector("#"+ CSS.escape(todoList.id));

    addTodoItemElement.innerHTML = "";

    const addTodoItemTitleLabel = document.createElement("label");
    addTodoItemTitleLabel.htmlFor = "todo-item-title";
    addTodoItemTitleLabel.textContent = "Todo Item Title";

    const addTodoItemTitle = document.createElement("input");
    addTodoItemTitle.type = "text";
    addTodoItemTitle.id = "todo-item-title";
    addTodoItemTitle.name = "todo-item-title";
    addTodoItemTitle.autocomplete = "off";
    addTodoItemTitle.placeholder = "New Todo Item";

    const addTodoItemPriorityLabel = document.createElement("label");
    addTodoItemPriorityLabel.htmlFor = "todo-item-priority";
    addTodoItemPriorityLabel.textContent = "Priority";

    const addTodoItemPriority = document.createElement("select");
    addTodoItemPriority.id = "todo-item-priority";
    addTodoItemPriority.name = "todo-item-priority";

    addTodoItemPriority.appendChild(createOptionElement("very-low", "Very Low"));
    addTodoItemPriority.appendChild(createOptionElement("low", "Low"));
    let selectedOption = createOptionElement("normal", "Normal")
    selectedOption.selected = true
    addTodoItemPriority.appendChild(selectedOption);
    addTodoItemPriority.appendChild(createOptionElement("high", "High"));
    addTodoItemPriority.appendChild(createOptionElement("very-high", "Very High"));

    const addTodoItemDateLabel = document.createElement("label");
    addTodoItemDateLabel.htmlFor = "todo-item-date";
    addTodoItemDateLabel.textContent = "Due Date";

    const addTodoItemDate = document.createElement("input");
    addTodoItemDate.type = "datetime-local";
    addTodoItemDate.id = "todo-item-date";
    addTodoItemDate.name = "todo-item-date";

    const addTodoItemNotesLabel = document.createElement("label");
    addTodoItemNotesLabel.htmlFor = "todo-item-notes";
    addTodoItemNotesLabel.textContent = "Notes";

    const addTodoItemNotes = document.createElement("textarea");
    addTodoItemNotes.id = "todo-item-notes";
    addTodoItemNotes.name = "todo-item-notes";
    addTodoItemNotes.rows = 5;
    addTodoItemNotes.autocomplete = "off";
    addTodoItemNotes.placeholder = "Todo Item Notes";

    const addTodoItemDiv = document.createElement("div");
    addTodoItemDiv.classList.add("form-buttons-todo-item");

    const addTodoItemSubmitButton = document.createElement("button");
    addTodoItemSubmitButton.id = "add-new-todo-item-btn";
    addTodoItemSubmitButton.textContent = "Add";
    addTodoItemSubmitButton.type = "submit";

    const addTodoItemCancelButton = document.createElement("button");
    addTodoItemCancelButton.textContent = "Cancel";
    addTodoItemCancelButton.id = "cancel-new-todo-item-btn";

    addTodoItemElement.appendChild(addTodoItemTitleLabel);
    addTodoItemElement.appendChild(addTodoItemTitle);
    addTodoItemElement.appendChild(addTodoItemDateLabel);
    addTodoItemElement.appendChild(addTodoItemDate);
    addTodoItemElement.appendChild(addTodoItemPriorityLabel);
    addTodoItemElement.appendChild(addTodoItemPriority);
    addTodoItemElement.appendChild(addTodoItemNotesLabel);
    addTodoItemElement.appendChild(addTodoItemNotes);
    addTodoItemDiv.appendChild(addTodoItemSubmitButton);
    addTodoItemDiv.appendChild(addTodoItemCancelButton);
    addTodoItemElement.appendChild(addTodoItemDiv);

    addTodoItemSubmitButton.addEventListener("click", (e) => {
        e.preventDefault();

        let title = addTodoItemTitle.value == "" ? "New Todo Item" : addTodoItemTitle.value;
        let priority = addTodoItemPriority.value;
        let dueDate = addTodoItemDate.value;
        let notes = addTodoItemNotes.value;
        todoManager.createTodoItem(todoList, title, priority, dueDate, notes);

        addTodoItemElement.innerHTML = "";
        displayProject(activeProject);
    })

    addTodoItemCancelButton.addEventListener("click", () => {
        addTodoItemElement.innerHTML = "";

        addTodoItemElement.appendChild(createAddTodoItemButton(todoList));
    })
}

function createOptionElement(value, text) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    return option;
}

export { displayProjectList, displayProject, displayTodoLists, addProject };