import * as elementCreator from "./element-creator";
import * as dataManager from "../data-manager";
import { updateProjectList, updateProject } from "./dom-manager";
import * as globals from "../globals";

// Display form to add a new project
function projectForm() {
    const addProjectContainer = document.querySelector("#add-project-form");

    addProjectContainer.innerHTML = "";

    const titleInput = elementCreator.getInput("text", "project-title", "project-title", "New Project");
    const descriptionInput = elementCreator.getTextArea("project-description", "project-description", 3);
    const buttonsDiv = elementCreator.getElement("div", "", "form-buttons-project");
    const submitButton = elementCreator.getButton("add-new-project-btn", "Add", "submit");
    const cancelButton = elementCreator.getButton("cancel-new-project-btn", "Cancel");

    // Append all elements required for the project form
    addProjectContainer.appendChild(elementCreator.getLabel("project-title", "Project Title"));
    addProjectContainer.appendChild(titleInput);
    addProjectContainer.appendChild(elementCreator.getLabel("project-description", "Description"));
    addProjectContainer.appendChild(descriptionInput);
    buttonsDiv.appendChild(submitButton);
    buttonsDiv.appendChild(cancelButton);
    addProjectContainer.appendChild(buttonsDiv);

    // Add project when "Add" button is clicked
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();

        let title = titleInput.value == "" ? "New Project" : titleInput.value;
        let description = descriptionInput.value == "" ? "Description" : descriptionInput.value;
        dataManager.createProject(title, description);

        addProjectContainer.innerHTML = "";
        updateProjectList();
    })

    // Close form when "Cancel" button is clicked
    cancelButton.addEventListener("click", () => {
        addProjectContainer.innerHTML = "";
    })
}

// Display form to add a new todo list to a project
function todoListForm() {
    const container = document.querySelector("#add-todo-list-div");

    container.innerHTML = "";

    const titleInput = elementCreator.getInput("text", "todo-list-title", "todo-list-title", "New Todo List");
    const descriptionInput = elementCreator.getTextArea("todo-list-description", "todo-list-description", 3, "");
    const buttonsDiv = elementCreator.getElement("div", "", "form-buttons-todo-list");
    const submitButton = elementCreator.getButton("add-new-todo-list-btn", "Add", "submit");
    const cancelButton = elementCreator.getButton("cancel-new-todo-list-btn", "Cancel");

    // Append all elements required for the todo list form
    container.appendChild(elementCreator.getLabel("todo-list-title", "Todo List Title"));
    container.appendChild(titleInput);
    container.appendChild(elementCreator.getLabel("todo-list-description", "Description"));
    container.appendChild(descriptionInput);
    buttonsDiv.appendChild(submitButton);
    buttonsDiv.appendChild(cancelButton);
    container.appendChild(buttonsDiv);

    // Add todo list when "Add" button is clicked
    submitButton.addEventListener("click", (e) => {
        e.preventDefault();

        let title = titleInput.value == "" ? "New Todo List" : titleInput.value;
        let description = descriptionInput.value;
        dataManager.createTodoList(globals.getActiveProject(), title, description);

        container.innerHTML = "";
        updateProject(globals.getActiveProject());
    })

    // Close form when "Cancel" button is clicked
    cancelButton.addEventListener("click", () => {
        container.innerHTML = "";

        container.appendChild(createAddTodoListButton());
    })
}

// Display form to add a new todo item to a todo list
function todoItemForm(todoList) {
    const container = document.querySelector("#"+ CSS.escape(todoList.id));

    container.innerHTML = "";

    const titleInput = elementCreator.getInput("text", "todo-item-title", "todo-item-title", "New Todo");
    const priorityInput = elementCreator.getPrioritySelect();
    const dueDateInput = elementCreator.getInput("datetime-local", "todo-item-date", "todo-item-date", "");
    const notesInput = elementCreator.getTextArea("todo-item-notes", "todo-item-notes", 3, "");
    const buttonsDiv = elementCreator.getElement("div", "", "form-buttons-todo-item");
    const submitButton = elementCreator.getButton("add-new-todo-item-btn", "Add", "submit");
    const cancelButton = elementCreator.getButton("cancel-new-todo-item-btn", "Cancel");

    // Append all elements required for the todo item form
    container.appendChild(elementCreator.getLabel("todo-item-title", "Title"));
    container.appendChild(titleInput);
    container.appendChild(elementCreator.getLabel("todo-item-priority", "Priority"));
    container.appendChild(priorityInput);
    container.appendChild(elementCreator.getLabel("todo-item-date", "Due Date"));
    container.appendChild(dueDateInput);
    container.appendChild(elementCreator.getLabel("todo-item-notes", "Notes"));
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
        dataManager.createTodoItem(todoList, title, priority, dueDate, notes);

        container.innerHTML = "";
        updateProject(globals.getActiveProject());
    })

    // Close form when "Cancel" button is clicked
    cancelButton.addEventListener("click", () => {
        container.innerHTML = "";

        container.appendChild(createAddTodoItemButton(todoList));
    })
}

export { projectForm, todoListForm, todoItemForm};