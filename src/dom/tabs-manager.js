import * as elementCreator from "./element-creator.js";
import * as todoItemCreator from "./todo-item-creator.js";

const mainContainer = document.querySelector("#main");

function displayTodoItemsBy(todoList, title) {
    mainContainer.innerHTML = "";

    const todoListContainer = elementCreator.getElement("div", "", "filter-todo-list");
    const todoItemsContainer = elementCreator.getElement("div", "", "filter-todo-items");
    const todoListTopContent = elementCreator.getElement("div", "", "filter-todo-list-top-content")

    todoListTopContent.appendChild(elementCreator.getElement("h3", title, "filter-todo-list-title"));
    todoListContainer.appendChild(todoListTopContent);
    todoListContainer.appendChild(todoItemsContainer);

    // Display all todo items of this list
    todoItemCreator.displayTodoItems(todoList, todoItemsContainer);

    mainContainer.appendChild(todoListContainer);
}

export { displayTodoItemsBy };