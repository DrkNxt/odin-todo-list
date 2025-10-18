import * as globals from "../globals.js";
import * as elementCreator from "./element-creator.js";
import * as elementForms from "./forms-manager.js";
import * as dataManager from "../data-manager.js";
import * as projectManager from "./dom-project-manager.js";

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
                projectManager.displayProject(globals.getActiveProject());
            }else {
                elementForms.showDeleteForm("Are you sure you want to delete this uncompleted Todo?<br> This can not be reverted.", () => {
                dataManager.deleteTodoItem(todoItem, todoList);
                projectManager.displayProject(globals.getActiveProject());
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
            projectManager.displayProject(globals.getActiveProject());
        })

        const todoItemContainer = elementCreator.getElement("div", "", "todo-item");
        const todoItemTopContent = elementCreator.getElement("div", "", "todo-item-top-content");
        const TodoItemBottomContent = elementCreator.getElement("div", "", "todo-item-bottom-content");

        TodoItemBottomContent.addEventListener("click", (e) => {
            dataManager.toggleCompleted(todoItem);
            projectManager.displayProject(globals.getActiveProject());
        })

        todoItemContainer.classList.add(todoItem.priority);
        todoItemContainer.dataset.isCompleted = todoItem.isCompleted;
        todoItemTopContent.appendChild(markCompletedButtonContainer);
        let dueDate;
        let isOverdue = false;
        let startToday = new Date();
        startToday.setHours(0,0,0,0);
        if (todoItem.dueDate instanceof Date && !isNaN(todoItem.dueDate)) {
            dueDate = todoItem.dueDate.toLocaleDateString();
            isOverdue = todoItem.dueDate < startToday;
        }else if (todoItem.dueDate == null) {
            dueDate = "";
        }else {
            todoItem.dueDate = (new Date(Date.parse(todoItem.dueDate)));
            dueDate = todoItem.dueDate.toLocaleDateString();
            isOverdue = todoItem.dueDate < startToday;
        }
        const todoItemDueDate = elementCreator.getElement("span", dueDate, "todo-item-due-date");
        if (isOverdue && !todoItem.isCompleted) {
            todoItemDueDate.classList.add("overdue");
        }
        todoItemTopContent.appendChild(todoItemDueDate);
        todoItemTopContent.appendChild(editButtonContainer);
        todoItemTopContent.appendChild(deleteButtonContainer);
        TodoItemBottomContent.appendChild(elementCreator.getElement("h4", todoItem.title, "todo-item-title"));
        TodoItemBottomContent.appendChild(elementCreator.getElement("p", todoItem.notes, "todo-item-notes"));
        todoItemContainer.appendChild(todoItemTopContent);
        todoItemContainer.appendChild(TodoItemBottomContent);
        todoItemsContainer.appendChild(todoItemContainer);
    }
}

export { displayTodoItems };