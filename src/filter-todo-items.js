import * as globals from "./globals.js";
import { TodoList } from "./classes/todo-list.js";
import { formatDistance } from "date-fns";

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

function getAllUncompleted() {
  const allTodoItems = getAll();
  const allUncompletedTodoItems = new TodoList("Uncompleted Todos", "");
  allUncompletedTodoItems.todoItems = allTodoItems.todoItems.filter(
    (todoItem) => !todoItem.isCompleted
  );
  return allUncompletedTodoItems;
}

function sortByDueDate(todoList) {
  todoList.todoItems = todoList.todoItems
    .filter((todoItem) => {
      if (todoItem.dueDate === null) {
        return false;
      } else if (!(todoItem.dueDate instanceof Date && !isNaN(todoItem.dueDate))) {
        todoItem.dueDate = new Date(Date.parse(todoItem.dueDate));
      }
      return todoItem.dueDate instanceof Date && !isNaN(todoItem.dueDate);
    })
    .sort((a, b) => a.dueDate - b.dueDate);
  return todoList;
}

function sortByUncompleted(todoList) {
  const uncompletedTodoItems = todoList.todoItems.filter((todoItem) => !todoItem.isCompleted);
  const completedTodoItems = todoList.todoItems.filter((todoItem) => todoItem.isCompleted);
  todoList.todoItems = uncompletedTodoItems;
  TodoList.addTodoItems(todoList, completedTodoItems);
  return todoList;
}

function getDueDateless(todoList) {
  todoList.todoItems = todoList.todoItems.filter(
    (todoItem) =>
      todoItem.dueDate === null || !(todoItem.dueDate instanceof Date) || isNaN(todoItem.dueDate)
  );
  return todoList;
}

function getSortedTodoItems() {
  const sortedTodoItems = sortByDueDate(getAll());
  TodoList.addTodoItems(sortedTodoItems, getDueDateless(getAll()).todoItems);
  return sortedTodoItems;
}

function getUpcoming() {
  const sortedTodoItems = sortByDueDate(getAllUncompleted());

  // Group by date
  const groupedByDate = {};
  for (let todoItem of sortedTodoItems.todoItems) {
    const dateKey = todoItem.dueDate.toDateString();
    if (!groupedByDate[dateKey]) {
      groupedByDate[dateKey] = [];
    }
    groupedByDate[dateKey].push(todoItem);
  }

  const dueDatelessTodoItems = getDueDateless(getAllUncompleted());

  // create TodoLists for each date
  const todoLists = [];
  for (let dateKey in groupedByDate) {
    const date = new Date(dateKey);
    date.setHours(0, 0, 0, 0);
    let startToday = new Date();
    startToday.setHours(0, 0, 0, 0);
    const formattedDate = formatDistance(date, startToday);
    const todoList = new TodoList(`Due in ${formattedDate}`, "");
    if (date < startToday) {
      todoList.title = `Due ${formattedDate} ago`;
    } else if (formattedDate === "less than a minute") {
      todoList.title = `Due Today`;
    }
    todoList.todoItems = groupedByDate[dateKey];
    todoLists.push(todoList);
  }

  // Add list for todos without a date, if there are any
  if (dueDatelessTodoItems.todoItems.length > 0) {
    const dueDatelessTodoList = new TodoList("No due date", "");
    dueDatelessTodoList.todoItems = dueDatelessTodoItems.todoItems;
    todoLists.push(dueDatelessTodoList);
  }

  return todoLists;
}

function getDueInXDays(days, title) {
  const allTodoItems = getAllUncompleted();
  const dueInXDaysTodoItems = new TodoList(title, "");
  dueInXDaysTodoItems.todoItems = allTodoItems.todoItems.filter((todoItem) => {
    let startToday = new Date();
    startToday.setHours(0, 0, 0, 0);
    let endToday = addDays(startToday, days);
    // Convert todoItem.dueDate to a valid date (if it isn't already)
    if (todoItem.dueDate === null) {
      return false;
    } else if (!(todoItem.dueDate instanceof Date && !isNaN(todoItem.dueDate))) {
      todoItem.dueDate = new Date(Date.parse(todoItem.dueDate));
    }
    return todoItem.dueDate > startToday && todoItem.dueDate < endToday;
  });
  return sortByDueDate(dueInXDaysTodoItems);
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getOverdue() {
  const allTodoItems = getAllUncompleted();
  const overdueTodoItems = new TodoList("Overdue", "");
  overdueTodoItems.todoItems = allTodoItems.todoItems.filter((todoItem) => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    // Convert todoItem.dueDate to a valid date (if it isn't already)
    if (todoItem.dueDate === null) {
      return false;
    } else if (!(todoItem.dueDate instanceof Date && !isNaN(todoItem.dueDate))) {
      todoItem.dueDate = new Date(Date.parse(todoItem.dueDate));
    }
    return todoItem.dueDate < today;
  });
  return sortByDueDate(overdueTodoItems);
}

function getCompleted() {
  const allTodoItems = getSortedTodoItems();
  const completedTodoItems = new TodoList("Completed", "");
  completedTodoItems.todoItems = allTodoItems.todoItems.filter((todoItem) => todoItem.isCompleted);
  return completedTodoItems;
}

function getByPriority(priority, name) {
  const allTodoItems = getAllUncompleted();
  const priorityTodoItems = new TodoList(name, "");
  priorityTodoItems.todoItems = allTodoItems.todoItems.filter(
    (todoItem) => todoItem.priority === priority
  );
  return sortByDueDate(priorityTodoItems);
}

export { getUpcoming, getDueInXDays, getOverdue, getCompleted, getByPriority, sortByUncompleted };
