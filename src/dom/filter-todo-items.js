import * as globals from "../globals.js";
import { TodoList } from "../classes/todo-list.js";
import { formatDistance, subDays } from 'date-fns'

function getAll() {
    const projectList = globals.projectList;
    const allTodoItems = new TodoList("All Todos", "");
    for (let project of projectList.projects) {
        for (let todoList of project.todoLists) {
            for (let todoItem of todoList.todoItems) {
                allTodoItems.todoItems.push(todoItem);
            }
        }
    }
    return allTodoItems;
}

function getUpcoming() {
    const allTodoItems = getAll();

    // Sort TodoItems by dueDate
    const sortedTodoItems = allTodoItems.todoItems
        .filter(todoItem => todoItem.dueDate !== null && todoItem.dueDate instanceof Date && !isNaN(todoItem.dueDate))
        .sort((a, b) => a.dueDate - b.dueDate);
    
    // Group by date
    const groupedByDate = {};
    for (let todoItem of sortedTodoItems) {
        const dateKey = todoItem.dueDate.toDateString();
        if (!groupedByDate[dateKey]) {
            groupedByDate[dateKey] = [];
        }
        groupedByDate[dateKey].push(todoItem);
    }

    const dueDatelessTodoItems = allTodoItems.todoItems
        .filter(todoItem => todoItem.dueDate === null || !(todoItem.dueDate instanceof Date) || isNaN(todoItem.dueDate));
    
    // create TodoLists for each date
    const todoLists = [];
    for (let dateKey in groupedByDate) {
        const date = new Date(dateKey);
        date.setUTCHours(0,0,0,0);
        let startToday = new Date();
        startToday.setUTCHours(0,0,0,0);
        const formattedDate = formatDistance(date, startToday);
        const todoList = new TodoList(`Due in ${formattedDate}`, "");
        if (date < startToday) {
            todoList.title = `Due ${formattedDate} ago`;
        }else if (formattedDate === "less than a minute") {
            todoList.title = `Due Today`
        }
        todoList.todoItems = groupedByDate[dateKey];
        todoLists.push(todoList);
    }

    const dueDatelessTodoList = new TodoList("No due date", "");
    dueDatelessTodoList.todoItems = dueDatelessTodoItems;
    todoLists.push(dueDatelessTodoList);
    
    return todoLists;
}

function getDueInXDays(days) {
    const allTodoItems = getAll();
    const overdueTodoItems = new TodoList("Today", "");
    overdueTodoItems.todoItems = allTodoItems.todoItems
        .filter((todoItem) => { 
            let startToday = new Date();
            startToday.setUTCHours(0,0,0,0);
            let endToday = addDays(startToday, days);
            // Convert todoItem.dueDate to a valid date (if it isn't already)
            if (todoItem.dueDate === null) {
                return false;
            }else if (!(todoItem.dueDate instanceof Date && !isNaN(todoItem.dueDate))) {
                todoItem.dueDate = (new Date(Date.parse(todoItem.dueDate)));
            }
            return todoItem.dueDate > startToday && todoItem.dueDate < endToday;  
        });
    return overdueTodoItems;
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getOverdue() {
    const allTodoItems = getAll();
    const overdueTodoItems = new TodoList("Overdue", "");
    overdueTodoItems.todoItems = allTodoItems.todoItems
    .filter((todoItem) => { 
        let today = new Date();
        today.setUTCHours(0,0,0,0);
        // Convert todoItem.dueDate to a valid date (if it isn't already)
        if (todoItem.dueDate === null) {
            return false;
        }else if (!(todoItem.dueDate instanceof Date && !isNaN(todoItem.dueDate))) {
            todoItem.dueDate = (new Date(Date.parse(todoItem.dueDate)));
        }
        return todoItem.dueDate < today;  
    });
    return overdueTodoItems;
}

function getCompleted() {
    const allTodoItems = getAll();
    const completedTodoItems = new TodoList("Completed", "");
    completedTodoItems.todoItems = allTodoItems.todoItems
        .filter((todoItem) => todoItem.isCompleted);
    return completedTodoItems;
}

function getByPriority(priority) {
    const allTodoItems = getAll();
    const priorityTodoItems = new TodoList("Priority", "");
    priorityTodoItems.todoItems = allTodoItems.todoItems
        .filter((todoItem) => todoItem.priority === priority);
    return priorityTodoItems;
}

export { getUpcoming, getDueInXDays, getOverdue, getCompleted, getByPriority };