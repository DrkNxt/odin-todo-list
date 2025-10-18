import * as globals from "../globals.js";
import * as elementCreator from "./element-creator.js";
import * as elementForms from "./forms-manager.js";
import * as dataManager from "../data-manager.js";
import { updateAll, changeSelectedPriority, getSelectedPriority } from "./dom-manager.js";

const currentProjectContainer = document.querySelector("#current-project");
const todoListsContainer = document.querySelector("#todo-lists");

// Update project elements
function updateProject(project) {
    globals.setActiveProject(project);
    currentProjectContainer.innerHTML = "";

    // Create delete button
    const deleteButtonContainer = elementCreator.getElement("div", "");
    const deleteTodoItem = elementCreator.getIcon("delete", "clickable-icon");
    deleteButtonContainer.appendChild(deleteTodoItem);
        
    deleteButtonContainer.addEventListener("click", (e) => {
        elementForms.showDeleteForm("Are you sure you want to delete this Project?<br> This can not be reverted and all Todo Lists and Todos in this Project will be deleted as well.", () => {
            dataManager.deleteProject(project);
            globals.setActiveProject(globals.projectList.projects[0]);
            updateAll();
        });
    })

    // Create edit button
    const editButtonContainer = elementCreator.getElement("div", "");
    const editProject = elementCreator.getIcon("edit", "clickable-icon");
    editButtonContainer.appendChild(editProject);
        
    editButtonContainer.addEventListener("click", (e) => {
        elementForms.showEditProjectForm(project);
    })

    const projectTopContent = elementCreator.getElement("div", "", "project-top-content");

    projectTopContent.appendChild(elementCreator.getElement("h2", project.title, "current-project-name"));
    projectTopContent.appendChild(editButtonContainer);
    projectTopContent.appendChild(deleteButtonContainer);
    currentProjectContainer.appendChild(projectTopContent);
    currentProjectContainer.appendChild(elementCreator.getElement("p", project.description, "current-project-description"));

    // Display all todo lists of this project
    updateTodoLists(project.todoLists);

    // Display addTodoListButton
    const addTodoListDiv = elementCreator.getElement("div", "", null, "add-todo-list-div");
    addTodoListDiv.appendChild(createAddTodoListButton());
    todoListsContainer.appendChild(addTodoListDiv);
}

function createAddTodoListButton() {
    const addTodoListButton = elementCreator.getButton(null, "", "button", "add-todo-list-btn");
    addTodoListButton.appendChild(elementCreator.getIcon("new", "todo-list-plus-icon"))
    addTodoListButton.addEventListener("click", () => {
        elementForms.showAddTodoListForm();
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
    const deleteTodoItem = elementCreator.getIcon("delete", "clickable-icon");
    deleteButtonContainer.appendChild(deleteTodoItem);
        
    deleteButtonContainer.addEventListener("click", (e) => {
        elementForms.showDeleteForm("Are you sure you want to delete this Todo List?<br> This can not be reverted and all Todos in this List will be deleted as well.", () => {
            dataManager.deleteTodoList(todoList, globals.getActiveProject());
            updateProject(globals.getActiveProject());
        });
    })

    // Create edit button
    const editButtonContainer = elementCreator.getElement("div", "");
    const editTodoList = elementCreator.getIcon("edit", "clickable-icon");
    editButtonContainer.appendChild(editTodoList);
        
    editButtonContainer.addEventListener("click", (e) => {
        elementForms.showEditTodoListForm(todoList);
    })

    const todoListContainer = elementCreator.getElement("div", "", "todo-list");
    const todoItemsContainer = elementCreator.getElement("div", "", "todo-items");
    const todoListTopContent = elementCreator.getElement("div", "", "todo-list-top-content")

    todoListTopContent.appendChild(elementCreator.getElement("h3", todoList.title, "todo-list-title"));
    todoListTopContent.appendChild(editButtonContainer);
    todoListTopContent.appendChild(deleteButtonContainer);
    todoListContainer.appendChild(todoListTopContent);
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
    const addTodoItemButton = elementCreator.getButton(null, "", "button", "add-todo-item-btn");
    addTodoItemButton.appendChild(elementCreator.getIcon("new", "todo-item-plus-icon"))
    addTodoItemButton.addEventListener("click", () => {
        elementForms.showAddTodoItemForm(todoList);
    });

    return addTodoItemButton;
}

// Update todo item elements
function displayTodoItems(todoList, todoItemsContainer) {
    for (let todoItem of todoList.todoItems) {
        // Create delete button
        const deleteButtonContainer = elementCreator.getElement("div", "");
        const deleteTodoItem = elementCreator.getIcon("delete", "clickable-icon");
        deleteButtonContainer.appendChild(deleteTodoItem);
        
        deleteButtonContainer.addEventListener("click", (e) => {
            if (todoItem.isCompleted) {
                dataManager.deleteTodoItem(todoItem, todoList);
                updateProject(globals.getActiveProject());
            }else {
                elementForms.showDeleteForm("Are you sure you want to delete this uncompleted Todo?<br> This can not be reverted.", () => {
                dataManager.deleteTodoItem(todoItem, todoList);
                updateProject(globals.getActiveProject());
            });
            }
        })

        // Create edit button
        const editButtonContainer = elementCreator.getElement("div", "");
        const editTodoItem = elementCreator.getIcon("edit", "clickable-icon");
        editButtonContainer.appendChild(editTodoItem);
        
        editButtonContainer.addEventListener("click", (e) => {
            elementForms.showEditTodoItemForm(todoItem);
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
        const todoItemTopContent = elementCreator.getElement("div", "", "todo-item-top-content");
        const TodoItemBottomContent = elementCreator.getElement("div", "", "todo-item-bottom-content");

        TodoItemBottomContent.addEventListener("click", (e) => {
            dataManager.toggleCompleted(todoItem);
            updateProject(globals.getActiveProject());
        })

        todoItemContainer.classList.add(todoItem.priority);
        todoItemContainer.dataset.isCompleted = todoItem.isCompleted;
        todoItemTopContent.appendChild(markCompletedButtonContainer);
        let dueDate;
        if (todoItem.dueDate instanceof Date && !isNaN(todoItem.dueDate)) {
            dueDate = todoItem.dueDate.toLocaleDateString();
        }else if (todoItem.dueDate == null) {
            dueDate = "";
        }else {
            todoItem.dueDate = (new Date(Date.parse(todoItem.dueDate)));
            dueDate = todoItem.dueDate.toLocaleDateString();
        }
        todoItemTopContent.appendChild(elementCreator.getElement("span", dueDate, "todo-item-due-date"));
        todoItemTopContent.appendChild(editButtonContainer);
        todoItemTopContent.appendChild(deleteButtonContainer);
        TodoItemBottomContent.appendChild(elementCreator.getElement("h4", todoItem.title, "todo-item-title"));
        TodoItemBottomContent.appendChild(elementCreator.getElement("p", todoItem.notes, "todo-item-notes"));
        todoItemContainer.appendChild(todoItemTopContent);
        todoItemContainer.appendChild(TodoItemBottomContent);
        todoItemsContainer.appendChild(todoItemContainer);
    }
}

export { updateProject, createAddTodoItemButton, createAddTodoListButton };