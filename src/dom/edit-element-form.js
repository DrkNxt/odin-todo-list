import * as globals from "../globals.js";
import * as elementCreator from "./element-creator.js";
import { updateAll, updateProjectList, updateProject } from "../dom/dom-manager.js";

const dialog = document.querySelector("#dialog");
const form = document.querySelector("#dialog-form");

function showTodoItemEditForm(todoItem) {
    form.innerHTML = "";
    
    const menu = elementCreator.getElement("menu", "");
    const titleInput = elementCreator.getInput("text", "todo-item-title", "todo-item-title", "New Todo", "off", todoItem.title);
    const priorityInput = elementCreator.getPrioritySelect("todo-item-priority", "todo-item-priority");
    const dueDateInput = elementCreator.getInput("datetime-local", "todo-item-date", "todo-item-date", "");
    dueDateInput.valueAsDate = todoItem.dueDate;
    const notesInput = elementCreator.getTextArea("todo-item-notes", "todo-item-notes", 3, "", todoItem.notes);
    const buttonsDiv = elementCreator.getElement("div", "", "form-buttons-todo-item");
    const confirmButton = elementCreator.getButton("confirm-delete-btn", "Confirm", "submit");
    const cancelButton = elementCreator.getButton("cancel-delete-btn", "Cancel")

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
    
    confirmButton.addEventListener("click", (e) => {
        e.preventDefault();
        todoItem.title = titleInput.value;
        todoItem.priority = priorityInput.value;
        todoItem.dueDate = new Date(dueDateInput.value);
        todoItem.notes = notesInput.value;
        dialog.close();
        updateProject(globals.getActiveProject());
    })
    
    cancelButton.addEventListener("click", () => {
        dialog.close();
    })
    
    dialog.showModal();
}

export { showTodoItemEditForm };