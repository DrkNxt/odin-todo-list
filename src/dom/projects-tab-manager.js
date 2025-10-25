import * as globals from "../globals.js";
import * as elementCreator from "./element-creator.js";
import * as elementForms from "./forms-manager.js";
import * as dataManager from "../data-manager.js";
import * as todoItemCreator from "./todo-item-creator.js";
import * as localStorageManager from "../local-storage-manager.js";
import { updateAll } from "./dom-manager.js";

const mainContainer = document.querySelector("#main");

// Update project elements
function displayProject(project) {
  globals.setSelectedProject(project);
  mainContainer.innerHTML = "";

  // Create project container
  const currentProjectContainer = elementCreator.getElement("div", "", null, "current-project");
  const todoListsContainer = elementCreator.getElement("div", "", null, "todo-lists");
  mainContainer.appendChild(currentProjectContainer);
  mainContainer.appendChild(todoListsContainer);

  // Create delete button
  const deleteButtonContainer = elementCreator.getElement("div", "");
  const deleteTodoItem = elementCreator.getIcon("delete", "clickable-icon");
  deleteButtonContainer.appendChild(deleteTodoItem);

  deleteButtonContainer.addEventListener("click", () => {
    elementForms.showDeleteForm(
      "Are you sure you want to delete this Project?<br> This can not be reverted and all Todo Lists and Todos in this Project will be deleted as well.",
      () => {
        dataManager.deleteProject(project);
        // Set new selected project to correct index
        globals.setSelectedProject(
          globals.projectList.projects[localStorageManager.getSelectedProject() - 1]
        );
        updateAll();
      }
    );
  });

  // Create edit button
  const editButtonContainer = elementCreator.getElement("div", "");
  const editProject = elementCreator.getIcon("edit", "clickable-icon");
  editButtonContainer.appendChild(editProject);

  editButtonContainer.addEventListener("click", () => {
    elementForms.showEditProjectForm(project);
  });

  const projectTopContent = elementCreator.getElement("div", "", "project-top-content");

  projectTopContent.appendChild(
    elementCreator.getElement("h2", project.title, "current-project-name")
  );
  projectTopContent.appendChild(editButtonContainer);
  projectTopContent.appendChild(deleteButtonContainer);
  currentProjectContainer.appendChild(projectTopContent);
  currentProjectContainer.appendChild(
    elementCreator.getElement("p", project.description, "current-project-description")
  );

  // Display all todo lists of this project
  updateTodoLists(project.todoLists);

  // Display addTodoListButton
  const addTodoListDiv = elementCreator.getElement("div", "", null, "add-todo-list-div");
  addTodoListDiv.appendChild(createAddTodoListButton());
  todoListsContainer.appendChild(addTodoListDiv);
}

function createAddTodoListButton() {
  const addTodoListButton = elementCreator.getButton(null, "", "button", "add-todo-list-btn");
  addTodoListButton.appendChild(elementCreator.getIcon("new", "todo-list-plus-icon"));
  addTodoListButton.addEventListener("click", () => {
    elementForms.showAddTodoListForm();
  });
  return addTodoListButton;
}

// Update todo list elements
function updateTodoLists(todoLists) {
  const todoListsContainer = document.querySelector("#todo-lists");
  todoListsContainer.innerHTML = "";

  for (let todoList of todoLists) {
    createTodoListElement(todoList);
  }
}

// Create single todo list
function createTodoListElement(todoList) {
  const todoListsContainer = document.querySelector("#todo-lists");
  const todoListContainer = elementCreator.getElement("div", "", "project-todo-list");
  const todoItemsContainer = elementCreator.getElement("div", "", "project-todo-items");
  const todoListTopContent = elementCreator.getElement("div", "", "project-todo-list-top-content");

  // Create hide button
  const hideButtonContainer = elementCreator.getElement("div", "");

  let hideTodoItem;
  if (todoList.isCompletedHidden) {
    hideTodoItem = elementCreator.getIcon("hidden", "clickable-icon");
  } else {
    hideTodoItem = elementCreator.getIcon("shown", "clickable-icon");
  }
  hideButtonContainer.appendChild(hideTodoItem);
  hideButtonContainer.addEventListener("click", () => {
    todoListContainer.classList.toggle("folded");
    dataManager.toggleTodoListCompletedHidden(todoList);
    displayProject(globals.getSelectedProject());
  });

  // Create fold button
  const foldButtonContainer = elementCreator.getElement("div", "");

  let foldTodoItem;
  if (todoList.isFolded) {
    foldTodoItem = elementCreator.getIcon("folded", "clickable-icon");
  } else {
    foldTodoItem = elementCreator.getIcon("unfolded", "clickable-icon");
  }
  foldButtonContainer.appendChild(foldTodoItem);
  foldButtonContainer.addEventListener("click", () => {
    todoListContainer.classList.toggle("folded");
    dataManager.toggleTodoListFolded(todoList);
    displayProject(globals.getSelectedProject());
  });

  // Create delete button
  const deleteButtonContainer = elementCreator.getElement("div", "");
  const deleteTodoItem = elementCreator.getIcon("delete", "clickable-icon");
  deleteButtonContainer.appendChild(deleteTodoItem);

  deleteButtonContainer.addEventListener("click", () => {
    elementForms.showDeleteForm(
      "Are you sure you want to delete this Todo List?<br> This can not be reverted and all Todos in this List will be deleted as well.",
      () => {
        dataManager.deleteTodoList(todoList, globals.getSelectedProject());
        displayProject(globals.getSelectedProject());
      }
    );
  });

  // Create edit button
  const editButtonContainer = elementCreator.getElement("div", "");
  const editTodoList = elementCreator.getIcon("edit", "clickable-icon");
  editButtonContainer.appendChild(editTodoList);

  editButtonContainer.addEventListener("click", () => {
    elementForms.showEditTodoListForm(todoList);
  });

  todoListTopContent.appendChild(
    elementCreator.getElement("h3", todoList.title, "project-todo-list-title")
  );
  todoListTopContent.appendChild(foldButtonContainer);
  todoListTopContent.appendChild(hideButtonContainer);
  todoListTopContent.appendChild(editButtonContainer);
  todoListTopContent.appendChild(deleteButtonContainer);
  todoListContainer.appendChild(todoListTopContent);
  todoListContainer.appendChild(
    elementCreator.getElement("p", todoList.description, "todo-list-description")
  );
  todoListContainer.appendChild(todoItemsContainer);

  // Display all todo items of this list
  todoItemCreator.displayTodoItems(todoList, todoItemsContainer, false);

  const addTodoItemDiv = elementCreator.getElement("div", "", "add-todo-item-div", todoList.id);

  if (!todoList.isFolded) {
    addTodoItemDiv.appendChild(createAddTodoItemButton(todoList));
  }
  todoItemsContainer.appendChild(addTodoItemDiv);
  todoListsContainer.appendChild(todoListContainer);
}

function createAddTodoItemButton(todoList) {
  const addTodoItemButton = elementCreator.getButton(null, "", "button", "add-todo-item-btn");
  addTodoItemButton.appendChild(elementCreator.getIcon("new", "todo-item-plus-icon"));
  addTodoItemButton.addEventListener("click", () => {
    elementForms.showAddTodoItemForm(todoList);
  });

  return addTodoItemButton;
}

export { displayProject, createAddTodoItemButton, createAddTodoListButton };
