import "./styles.css";
import { TodoList } from "./todo-list.js";
import { TodoItem } from "./todo-item.js";
import * as domManager from "./dom-manager.js";

const todoLists = [];

todoLists.push(new TodoList("Todo List", "Add a description for your todo list here :)"));
todoLists[0].addTodoItem(new TodoItem("Todo Item", "high", new Date(), "This is a description", "These are notes", ["Step1", "Step2", "Step3"]));
todoLists[0].addTodoItem(new TodoItem("Todo Item2", "low", new Date(), "This is also a description", "These are also notes", ["Step4", "Step5", "Step6"]));

domManager.displayTodoLists();

console.log(todoLists)
