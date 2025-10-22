import * as filterTodoItems from "../filter-todo-items.js";
import * as elementCreator from "./element-creator.js";
import * as todoItemCreator from "./todo-item-creator.js";
import { TodoList } from "../classes/todo-list.js";

const mainContainer = document.querySelector("#main");

function displayUpcomingTodoItems() {
  mainContainer.innerHTML = "";

  const todoLists = filterTodoItems.getUpcoming();
  if (todoLists.length < 1) {
    displayTodoItemsBy(new TodoList("Upcoming tasks", ""), false);
  } else {
    for (let todoList of todoLists) {
      displayTodoItemsBy(todoList, false);
    }
  }
}

function displayTodoItemsByPriority() {
  mainContainer.innerHTML = "";

  const todoLists = [
    filterTodoItems.getByPriority("priority-1", "Green"),
    filterTodoItems.getByPriority("priority-2", "Blue"),
    filterTodoItems.getByPriority("priority-3", "Yellow"),
    filterTodoItems.getByPriority("priority-4", "Red"),
    filterTodoItems.getByPriority("priority-5", "Purple"),
  ];
  for (let todoList of todoLists) {
    displayTodoItemsBy(todoList, false);
  }
}

function displayTodoItemsBy(todoList, emptyContainer = true) {
  if (emptyContainer) {
    mainContainer.innerHTML = "";
  }

  const todoListContainer = elementCreator.getElement(
    "div",
    "",
    "filter-todo-list"
  );
  const todoItemsContainer = elementCreator.getElement(
    "div",
    "",
    "filter-todo-items"
  );
  const todoListTopContent = elementCreator.getElement(
    "div",
    "",
    "filter-todo-list-top-content"
  );

  todoListTopContent.appendChild(
    elementCreator.getElement("h3", todoList.title, "filter-todo-list-title")
  );
  todoListContainer.appendChild(todoListTopContent);
  todoListContainer.appendChild(todoItemsContainer);

  // Display all todo items of this list
  todoItemCreator.displayTodoItems(todoList, todoItemsContainer);

  mainContainer.appendChild(todoListContainer);
}

export {
  displayUpcomingTodoItems,
  displayTodoItemsByPriority,
  displayTodoItemsBy,
};
