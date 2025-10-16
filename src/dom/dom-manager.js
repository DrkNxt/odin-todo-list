import * as globals from "../globals.js";
import * as elementCreator from "./element-creator.js";
import * as newForm from "./new-element-forms.js";
import * as dataManager from "../data-manager.js";
import * as deleteForm from "./delete-element-forms.js";
import * as editForm from "./edit-element-forms.js";

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

    // Create delete button
    const deleteButtonContainer = elementCreator.getElement("div", "");
    const deleteTodoItem = elementCreator.getIcon("delete-outline", "clickable-icon");
    deleteButtonContainer.appendChild(deleteTodoItem);
        
    deleteButtonContainer.addEventListener("click", (e) => {
        deleteForm.showDeleteForm("Are you sure you want to delete this Project?<br> This can not be reverted and all Todo Lists and Todos in this Project will be deleted as well.", () => {
            dataManager.deleteProject(project);
            globals.setActiveProject(globals.projectList.projects[0]);
            updateAll();
        });
    })

    // Create edit button
    const editButtonContainer = elementCreator.getElement("div", "");
    const editProject = elementCreator.getIcon("pencil-outline", "clickable-icon");
    editButtonContainer.appendChild(editProject);
        
    editButtonContainer.addEventListener("click", (e) => {
        editForm.showProjectEditForm(project);
    })

    currentProjectContainer.appendChild(deleteButtonContainer);
    currentProjectContainer.appendChild(editButtonContainer);

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
    // Create delete button
    const deleteButtonContainer = elementCreator.getElement("div", "");
    const deleteTodoItem = elementCreator.getIcon("delete-outline", "clickable-icon");
    deleteButtonContainer.appendChild(deleteTodoItem);
        
    deleteButtonContainer.addEventListener("click", (e) => {
        deleteForm.showDeleteForm("Are you sure you want to delete this Todo List?<br> This can not be reverted and all Todos in this List will be deleted as well.", () => {
            dataManager.deleteTodoList(todoList, globals.getActiveProject());
            updateProject(globals.getActiveProject());
        });
    })

    // Create edit button
    const editButtonContainer = elementCreator.getElement("div", "");
    const editTodoList = elementCreator.getIcon("pencil-outline", "clickable-icon");
    editButtonContainer.appendChild(editTodoList);
        
    editButtonContainer.addEventListener("click", (e) => {
        editForm.showTodoListEditForm(todoList);
    })

    const todoListContainer = elementCreator.getElement("div", "", "todo-list");
    const todoItemsContainer = elementCreator.getElement("div", "", "todo-items");

    todoListContainer.appendChild(deleteButtonContainer);
    todoListContainer.appendChild(editButtonContainer);
    todoListContainer.appendChild(elementCreator.getElement("h3", todoList.title, "todo-list-title"));
    todoListContainer.appendChild(elementCreator.getElement("p", todoList.description, "todo-list-description"));
    todoListContainer.appendChild(todoItemsContainer);

    // Display all todo items of this list
    displayTodoItems(todoList, todoItemsContainer);

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
function displayTodoItems(todoList, todoItemsContainer) {
    for (let todoItem of todoList.todoItems) {
        // Create delete button
        const deleteButtonContainer = elementCreator.getElement("div", "");
        const deleteTodoItem = elementCreator.getIcon("delete-outline", "clickable-icon");
        deleteButtonContainer.appendChild(deleteTodoItem);
        
        deleteButtonContainer.addEventListener("click", (e) => {
            deleteForm.showDeleteForm("Are you sure you want to delete this Todo?<br> This can not be reverted.", () => {
                dataManager.deleteTodoItem(todoItem, todoList);
                updateProject(globals.getActiveProject());
            });
        })

        // Create edit button
        const editButtonContainer = elementCreator.getElement("div", "");
        const editTodoItem = elementCreator.getIcon("pencil-outline", "clickable-icon");
        editButtonContainer.appendChild(editTodoItem);
        
        editButtonContainer.addEventListener("click", (e) => {
            editForm.showTodoItemEditForm(todoItem);
        })

        // Create mark completed button
        const markCompletedButtonContainer = elementCreator.getElement("div", "");
        const markCompletedCheckbox = elementCreator.getInput("checkbox", null, "markChecked", "");
        markCompletedCheckbox.checked = todoItem.isCompleted;
        markCompletedButtonContainer.appendChild(markCompletedCheckbox);
        markCompletedCheckbox.addEventListener("click", (e) => {
            dataManager.toggleCompleted(todoItem);
            updateProject(globals.getActiveProject());
        })

        const todoItemContainer = elementCreator.getElement("div", "", "todo-item");
        todoItemContainer.dataset.isCompleted = todoItem.isCompleted;
        todoItemContainer.appendChild(markCompletedButtonContainer);
        todoItemContainer.appendChild(deleteButtonContainer);
        todoItemContainer.appendChild(editButtonContainer);
        todoItemContainer.appendChild(elementCreator.getElement("h4", todoItem.title, "todo-item-title"));
        todoItemContainer.appendChild(elementCreator.getElement("span", todoItem.priority, "todo-item-priority"));
        todoItemContainer.appendChild(elementCreator.getElement("div", todoItem.isCompleted, "todo-item-status"));
        todoItemContainer.appendChild(elementCreator.getElement("span", todoItem.dueDate.toLocaleString(), "todo-item-due-date"));
        todoItemContainer.appendChild(elementCreator.getElement("p", todoItem.notes, "todo-item-notes"));
        todoItemsContainer.appendChild(todoItemContainer);
    }
}

export { updateAll, updateProjectList, updateProject, createAddTodoItemButton, createAddTodoListButton };