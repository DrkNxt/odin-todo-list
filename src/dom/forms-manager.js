import * as globals from "../globals.js";
import * as elementCreator from "./element-creator.js";
import * as dataManager from "../data-manager.js";
import { updateProjectList, updateAll, updateProject, changeSelectedPriority, getSelectedPriority } from "./dom-project-manager.js";
import * as localStorageManager from "../local-storage-manager.js";

const dialog = document.querySelector("#dialog");
const form = document.querySelector("#dialog-form");

function showProjectForm(mode, element) {
    form.innerHTML = "";

    const menu = elementCreator.getElement("menu", "");
    let titleInput;
    let descriptionInput;
    let confirmButton;
    let cancelButton;

    // Edit element mode
    if (mode === "edit") {
        titleInput = elementCreator.getInput("text", "project-title", "project-title", "New Project", "off", element.title);
        descriptionInput = elementCreator.getTextArea("project-description", "project-description", 5, "", element.description);
        confirmButton = elementCreator.getButton("confirm-edit-btn", "Confirm", "submit");
        cancelButton = elementCreator.getButton("cancel-edit-btn", "Cancel")
        form.appendChild(elementCreator.getElement("h2", "Edit Project"));

        // Edit todo list when "Confirm" button is clicked
        confirmButton.addEventListener("click", (e) => {
            e.preventDefault();
            element.title = titleInput.value;
            element.description = descriptionInput.value;
            dialog.close();
            updateAll();
            localStorageManager.storeProjectList();
        })
    }
    // Add new element mode
    else {
        titleInput = elementCreator.getInput("text", "project-title", "project-title", "New Project");
        descriptionInput = elementCreator.getTextArea("project-description", "project-description", 5, "");
        confirmButton = elementCreator.getButton("add-new-project-btn", "Confirm", "submit");
        cancelButton = elementCreator.getButton("cancel-new-project-btn", "Cancel")
        form.appendChild(elementCreator.getElement("h2", "New Project"));

        // Add todo list when "Confirm" button is clicked
        confirmButton.addEventListener("click", (e) => {
            e.preventDefault();
            let title = titleInput.value == "" ? "New Project" : titleInput.value;
            let description = descriptionInput.value;
            dataManager.createProject(title, description);
            dialog.close();
            updateAll();
        })
    }

    // Handel cancel button click
    cancelButton.addEventListener("click", () => {
        dialog.close();
    })

    // Append all elements required for the todo list form
    form.appendChild(elementCreator.getLabel("project-title", "Title"));
    form.appendChild(titleInput);
    form.appendChild(elementCreator.getLabel("project-description", "Description"));
    form.appendChild(descriptionInput);
    menu.appendChild(confirmButton);
    menu.appendChild(cancelButton);
    form.appendChild(menu);
    
    dialog.showModal();
}

function showAddProjectForm() {
    showProjectForm("add", null);
}

function showEditProjectForm(project) {
    showProjectForm("edit", project);
}

function showTodoListForm(mode, element) {
    form.innerHTML = "";

    const menu = elementCreator.getElement("menu", "");
    let titleInput;
    let descriptionInput;
    let confirmButton;
    let cancelButton;

    // Edit element mode
    if (mode === "edit") {
        titleInput = elementCreator.getInput("text", "todo-list-title", "todo-list-title", "New Todo List", "off", element.title);
        descriptionInput = elementCreator.getTextArea("todo-list-description", "todo-list-description", 5, "", element.description);
        confirmButton = elementCreator.getButton("confirm-edit-btn", "Confirm", "submit");
        cancelButton = elementCreator.getButton("cancel-edit-btn", "Cancel")
        form.appendChild(elementCreator.getElement("h2", "Edit Todo List"));

        // Edit todo list when "Confirm" button is clicked
        confirmButton.addEventListener("click", (e) => {
            e.preventDefault();
            element.title = titleInput.value;
            element.description = descriptionInput.value;
            dialog.close();
            updateProject(globals.getActiveProject());
            localStorageManager.storeProjectList();
        })
    } 
    // Add new element mode
    else {
        titleInput = elementCreator.getInput("text", "todo-list-title", "todo-list-title", "New Todo List");
        descriptionInput = elementCreator.getTextArea("todo-list-description", "todo-list-description", 5, "");
        confirmButton = elementCreator.getButton("add-new-todo-list-btn", "Confirm", "submit");
        cancelButton = elementCreator.getButton("cancel-new-todo-list-btn", "Cancel")
        form.appendChild(elementCreator.getElement("h2", "New Todo List"));

        // Add todo list when "Confirm" button is clicked
        confirmButton.addEventListener("click", (e) => {
            e.preventDefault();
            let title = titleInput.value == "" ? "New Todo List" : titleInput.value;
            let description = descriptionInput.value;
            dataManager.createTodoList(globals.getActiveProject(), title, description);
            dialog.close();
            updateProject(globals.getActiveProject());
        })
    }

    // Handel cancel button click
    cancelButton.addEventListener("click", () => {
        dialog.close();
    })

    // Append all elements required for the todo list form
    form.appendChild(elementCreator.getLabel("todo-list-title", "Todo List Title"));
    form.appendChild(titleInput);
    form.appendChild(elementCreator.getLabel("todo-list-description", "Description"));
    form.appendChild(descriptionInput);
    menu.appendChild(confirmButton);
    menu.appendChild(cancelButton);
    form.appendChild(menu);
    
    dialog.showModal();
}

function showAddTodoListForm() {
    showTodoListForm("add", globals.getActiveProject());
}

function showEditTodoListForm(todoList) {
    showTodoListForm("edit", todoList);
}

function showTodoItemForm(mode, element) {
    form.innerHTML = "";
    
    const menu = elementCreator.getElement("menu", "");
    const priorityDueDateContainer = elementCreator.getElement("div", "", "priority-due-date-container");
    const priorityInput = elementCreator.getPrioritySelect("todo-item-priority", "todo-item-priority");
    const dueDateContainer = elementCreator.getElement("div", "", "todo-item-date-container");
    const dueDateOption = elementCreator.getInput("checkbox", "todo-item-date-option", "todo-item-date-option", "");
    const dueDateInput = elementCreator.getInput("date", "todo-item-date", "todo-item-date", "");
    let titleInput;
    let notesInput;
    let confirmButton;
    let cancelButton;

    // Due date checkbox functionality
    dueDateOption.addEventListener("click", () => {
        if (dueDateOption.checked) {
            dueDateInput.disabled = false;
        }else {
            dueDateInput.disabled = true;
        }
    });
    dueDateOption.checked = true;
    dueDateInput.disabled = false;
    
    // Edit element mode
    if (mode === "edit") {
        // Check dueDateOption if date is valid
        if (element.dueDate instanceof Date && !isNaN(element.dueDate)) {
            dueDateOption.checked = true;
            dueDateInput.disabled = false;
            dueDateInput.valueAsDate = element.dueDate === null ? new Date() : element.dueDate;
        }else {
            dueDateOption.checked = false;
            dueDateInput.disabled = true;
        }

        titleInput = elementCreator.getInput("text", "todo-item-title", "todo-item-title", "New Todo", "off", element.title);
        notesInput = elementCreator.getTextArea("todo-item-notes", "todo-item-notes", 3, "", element.notes);
        confirmButton = elementCreator.getButton("confirm-edit-btn", "Confirm", "submit");
        cancelButton = elementCreator.getButton("cancel-edit-btn", "Cancel")
        form.appendChild(elementCreator.getElement("h2", "Edit Todo"));
        changeSelectedPriority(priorityInput, element.priority);

        // Edit todo item when "Confirm" button is clicked
        confirmButton.addEventListener("click", (e) => {
            e.preventDefault();
            element.title = titleInput.value;
            element.priority = getSelectedPriority(priorityInput);
            let dueDate = new Date(dueDateInput.valueAsNumber);
            if (!(dueDate instanceof Date && !isNaN(dueDate)) || !dueDateOption.checked) {
                dueDate = null;
            }
            element.dueDate = dueDate;
            element.notes = notesInput.value;
            dialog.close();
            updateProject(globals.getActiveProject());
            localStorageManager.storeProjectList();
        })
    } 
    // Add new element mode
    else {
        titleInput = elementCreator.getInput("text", "todo-item-title", "todo-item-title", "New Todo");
        dueDateInput.valueAsNumber = new Date();
        notesInput = elementCreator.getTextArea("todo-item-notes", "todo-item-notes", 3, "");
        confirmButton = elementCreator.getButton("add-new-todo-item-btn", "Confirm", "submit");
        cancelButton = elementCreator.getButton("cancel-new-todo-item-btn", "Cancel")
        changeSelectedPriority(priorityInput, "priority-1");
        form.appendChild(elementCreator.getElement("h2", "New Todo"));

        // Add todo item when "Confirm" button is clicked
        confirmButton.addEventListener("click", (e) => {
            e.preventDefault();
            let title = titleInput.value == "" ? "New Todo" : titleInput.value;
            let priority = getSelectedPriority(priorityInput);
            let dueDate = new Date(dueDateInput.valueAsNumber);
            if (!(dueDate instanceof Date && !isNaN(dueDate)) || !dueDateOption.checked) {
                dueDate = null;
            }
            let notes = notesInput.value;
            dataManager.createTodoItem(element, title, priority, dueDate, notes);
            dialog.close();
            updateProject(globals.getActiveProject());
        })
    }

    // Close form when "Cancel" button is clicked
    cancelButton.addEventListener("click", () => {
        dialog.close();
    })

    // Append all elements to form
    form.appendChild(elementCreator.getLabel("todo-item-title", "Title"));
    form.appendChild(titleInput);
    dueDateContainer.appendChild(dueDateOption);
    dueDateContainer.appendChild(dueDateInput);
    priorityDueDateContainer.appendChild(elementCreator.getLabel("todo-item-priority", "Priority"));
    priorityDueDateContainer.appendChild(elementCreator.getLabel("todo-item-date", "Due Date"));
    priorityDueDateContainer.appendChild(priorityInput);
    priorityDueDateContainer.appendChild(dueDateContainer);
    form.appendChild(priorityDueDateContainer);
    form.appendChild(elementCreator.getLabel("todo-item-notes", "Notes"));
    form.appendChild(notesInput);
    menu.appendChild(confirmButton);
    menu.appendChild(cancelButton);
    form.appendChild(menu);
    
    dialog.showModal();
}

function showAddTodoItemForm(todoList) {
    showTodoItemForm("add", todoList);
}

function showEditTodoItemForm(todoItem) {
    showTodoItemForm("edit", todoItem);
}

function showDeleteForm(text, action) {
    const dialog = document.querySelector("#dialog");
    const form = document.querySelector("#dialog-form");
    form.innerHTML = "";

    form.appendChild(elementCreator.getElement("h2", "Confirm deletion"));
    form.appendChild(elementCreator.getElement("p", text));
    const menu = elementCreator.getElement("menu", "");
    const confirmButton = elementCreator.getButton("confirm-delete-btn", "Delete", "submit");
    const cancelButton = elementCreator.getButton("cancel-delete-btn", "Cancel")
    menu.appendChild(confirmButton);
    menu.appendChild(cancelButton);
    form.appendChild(menu);

    confirmButton.addEventListener("click", (e) => {
        e.preventDefault();
        action();
        dialog.close();
    })

    cancelButton.addEventListener("click", () => {
        dialog.close();
    })

    dialog.showModal();
}

export { showAddProjectForm, showEditProjectForm, showAddTodoListForm, showEditTodoListForm, showAddTodoItemForm, showEditTodoItemForm, showDeleteForm };