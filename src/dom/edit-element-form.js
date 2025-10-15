import * as globals from "../globals.js";
import * as elementCreator from "./element-creator.js";
import { updateAll, updateProject } from "../dom/dom-manager.js";

const dialog = document.querySelector("#dialog");
const form = document.querySelector("#dialog-form");

function showProjectEditForm(project) {
    form.innerHTML = "";

    const menu = elementCreator.getElement("menu", "");
    const titleInput = elementCreator.getInput("text", "project-title", "project-title", "New Project", "off", project.title);
    const descriptionInput = elementCreator.getTextArea("project-description", "project-description", 5, "", project.description);
    const confirmButton = elementCreator.getButton("confirm-edit-btn", "Confirm", "submit");
    const cancelButton = elementCreator.getButton("cancel-edit-btn", "Cancel")

    // Append all elements required for the project form
    form.appendChild(elementCreator.getLabel("project-title", "Title"));
    form.appendChild(titleInput);
    form.appendChild(elementCreator.getLabel("project-description", "Description"));
    form.appendChild(descriptionInput);
    menu.appendChild(confirmButton);
    menu.appendChild(cancelButton);
    form.appendChild(menu);

    // Handel confirm button click
    confirmButton.addEventListener("click", (e) => {
        e.preventDefault();
        project.title = titleInput.value;
        project.description = descriptionInput.value;
        dialog.close();
        updateAll();
    })
    
    // Handel cancel button click
    cancelButton.addEventListener("click", () => {
        dialog.close();
    })
    
    dialog.showModal();
}


function showTodoListEditForm(todoList) {
    form.innerHTML = "";

    const menu = elementCreator.getElement("menu", "");
    const titleInput = elementCreator.getInput("text", "todo-list-title", "todo-list-title", "New Todo List", "off", todoList.title);
    const descriptionInput = elementCreator.getTextArea("todo-list-description", "todo-list-description", 5, "", todoList.description);
    const confirmButton = elementCreator.getButton("confirm-edit-btn", "Confirm", "submit");
    const cancelButton = elementCreator.getButton("cancel-edit-btn", "Cancel")

    // Append all elements required for the todo list form
    form.appendChild(elementCreator.getLabel("todo-list-title", "Todo List Title"));
    form.appendChild(titleInput);
    form.appendChild(elementCreator.getLabel("todo-list-description", "Description"));
    form.appendChild(descriptionInput);
    menu.appendChild(confirmButton);
    menu.appendChild(cancelButton);
    form.appendChild(menu);

    // Handel confirm button click
    confirmButton.addEventListener("click", (e) => {
        e.preventDefault();
        todoList.title = titleInput.value;
        todoList.description = descriptionInput.value;
        dialog.close();
        updateProject(globals.getActiveProject());
    })
    
    // Handel cancel button click
    cancelButton.addEventListener("click", () => {
        dialog.close();
    })
    
    dialog.showModal();
}

function showTodoItemEditForm(todoItem) {
    form.innerHTML = "";
    
    const menu = elementCreator.getElement("menu", "");
    const titleInput = elementCreator.getInput("text", "todo-item-title", "todo-item-title", "New Todo", "off", todoItem.title);
    const priorityInput = elementCreator.getPrioritySelect("todo-item-priority", "todo-item-priority");
    const dueDateInput = elementCreator.getInput("date", "todo-item-date", "todo-item-date", "");
    dueDateInput.valueAsDate = todoItem.dueDate;
    const notesInput = elementCreator.getTextArea("todo-item-notes", "todo-item-notes", 3, "", todoItem.notes);
    const confirmButton = elementCreator.getButton("confirm-edit-btn", "Confirm", "submit");
    const cancelButton = elementCreator.getButton("cancel-edit-btn", "Cancel")

    // Preselect the correct priority
    priorityInput.querySelector(".normal").selected = false;
    switch(todoItem.priority) {
        case "very-low": priorityInput.querySelector(".very-low").selected = true; break;
        case "low": priorityInput.querySelector(".low").selected = true; break;
        case "high": priorityInput.querySelector(".high").selected = true; break;
        case "very-high": priorityInput.querySelector(".very-high").selected = true; break;
        default: priorityInput.querySelector(".normal").selected = true; break;
    }

    // Append all elements required for the todo item form
    form.appendChild(elementCreator.getElement("h2", "Edit Todo"));
    form.appendChild(elementCreator.getLabel("todo-item-title", "Title"));
    form.appendChild(titleInput);
    form.appendChild(elementCreator.getLabel("todo-item-priority", "Priority"));
    form.appendChild(priorityInput);
    form.appendChild(elementCreator.getLabel("todo-item-date", "Due Date"));
    form.appendChild(dueDateInput);
    form.appendChild(elementCreator.getLabel("todo-item-notes", "Notes"));
    form.appendChild(notesInput);
    menu.appendChild(confirmButton);
    menu.appendChild(cancelButton);
    form.appendChild(menu);
    
    // Handle confirm button click
    confirmButton.addEventListener("click", (e) => {
        e.preventDefault();
        todoItem.title = titleInput.value;
        todoItem.priority = priorityInput.value;
        todoItem.dueDate = new Date(dueDateInput.valueAsNumber);
        todoItem.notes = notesInput.value;
        dialog.close();
        updateProject(globals.getActiveProject());
    })
    
    // Handel cancel button click
    cancelButton.addEventListener("click", () => {
        dialog.close();
    })
    
    dialog.showModal();
}

export { showProjectEditForm, showTodoListEditForm, showTodoItemEditForm };