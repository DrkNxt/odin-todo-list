const projectListElement = document.querySelector("#project-list");
const currentProjectElement = document.querySelector("#current-project");
const todoListsElement = document.querySelector("#todo-lists");

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

    // remove all current elements
    currentProjectElement.innerHTML = "";

    createCurrentProjectElement(project);

    displayTodoLists(project.todoLists);
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
        createTodoListElement(todoList);
    }
}

function createTodoListElement(todoList) {
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

export { displayProjectList, displayProject, displayTodoLists };