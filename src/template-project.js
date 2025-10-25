import * as globals from "./globals.js";
import { Project } from "./classes/project.js";
import { TodoList } from "./classes/todo-list.js";
import { TodoItem } from "./classes/todo-item.js";
import { ProjectList } from "./classes/project-list.js";
import { updateAll } from "./dom/dom-manager.js";
import { saveChanges } from "./data-manager.js";

function loadDefaultProject() {
  addDefaultProjectWork(globals.projectList);
  globals.setSelectedProject(globals.projectList.projects[globals.projectList.projects.length - 1]);
  updateAll();
  saveChanges();
}

function getDate(days) {
  let date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

function addDefaultProjectWork(projectList) {
  ProjectList.addProject(
    globals.projectList,
    new Project("Todo List Website", `Things I want to add to this website`)
  );
  const project = projectList.projects[projectList.projects.length - 1];

  Project.addTodoList(
    project,
    new TodoList("Tabs", "Add some new tabs for different display options")
  );
  TodoList.addTodoItem(
    project.todoLists[0],
    new TodoItem(
      "Make todos editable/deletable in all tabs",
      "priority-4",
      null,
      "Change (a lot of) stuff, so buttons do the correct thing (almost works already somehow?)",
      true,
      true
    )
  );
  TodoList.addTodoItem(
    project.todoLists[0],
    new TodoItem(
      `"Upcoming" section`,
      "priority-2",
      getDate(-2),
      `add "Upcoming" section that displays tasks in order of closest due date`,
      true,
      true
    )
  );
  TodoList.addTodoItem(
    project.todoLists[0],
    new TodoItem(
      `"Today", "This Week" section`,
      "priority-2",
      getDate(-7),
      `add "Today" and "This Week" section that displays tasks due today / this week`,
      true,
      true
    )
  );
  TodoList.addTodoItem(
    project.todoLists[0],
    new TodoItem(
      `"Overdue" section`,
      "priority-1",
      getDate(-7),
      `add "Overdue" section that displays tasks that have a due date in the past`,
      true,
      true
    )
  );
  TodoList.addTodoItem(
    project.todoLists[0],
    new TodoItem(
      `"Completed" section`,
      "priority-1",
      getDate(-2),
      `add "Completed" section that displays all completed tasks`,
      true,
      true
    )
  );
  TodoList.addTodoItem(
    project.todoLists[0],
    new TodoItem(
      `"Priority" section`,
      "priority-5",
      getDate(0),
      `add "Priority" section that only displays task of the selected priority`,
      true,
      true
    )
  );
  TodoList.addTodoItem(
    project.todoLists[0],
    new TodoItem(
      `Add buttonManager`,
      "priority-2",
      getDate(1),
      `Do all the button eventListener assignments in one js file`,
      true,
      true
    )
  );

  Project.addTodoList(project, new TodoList("Small changes", ""));
  TodoList.addTodoItem(
    project.todoLists[1],
    new TodoItem(
      `Add message to "Upcoming" tab`,
      "priority-3",
      getDate(1),
      `Add message to "Upcoming" tab when there is nothing else to display (no uncompleted TodoItems)`,
      true,
      true
    )
  );
  TodoList.addTodoItem(
    project.todoLists[1],
    new TodoItem(
      "Remember last selected tab",
      "priority-3",
      null,
      "Remember the last selected tab and reopen that tab when reloading the website"
    )
  );
  TodoList.addTodoItem(
    project.todoLists[1],
    new TodoItem(
      "Priority tab",
      "priority-5",
      getDate(-4),
      "Make filter priority selectable in priority tab (Maybe just show them all at once)",
      true,
      true
    )
  );
  TodoList.addTodoItem(
    project.todoLists[1],
    new TodoItem(
      "Remove/move completed TodoItems (in Projects)",
      "priority-2",
      getDate(0),
      "Either remove completed TodoItems, or move them to the bottom of the TodoList",
      true,
      true
    )
  );
  TodoList.addTodoItem(
    project.todoLists[1],
    new TodoItem(
      "Tweaks to todo creation",
      "priority-5",
      getDate(-4),
      "dueDate and priority selection in same row",
      true,
      true
    )
  );
  TodoList.addTodoItem(
    project.todoLists[1],
    new TodoItem(
      "GitHub link",
      "priority-1",
      getDate(0),
      "add GitHub link at bottom of page (maybe sidebar)",
      true,
      true
    )
  );
  TodoList.addTodoItem(
    project.todoLists[1],
    new TodoItem(
      "Make filters ignore already completed tasks",
      "priority-1",
      getDate(0),
      null,
      true,
      true
    )
  );
  TodoList.addTodoItem(
    project.todoLists[1],
    new TodoItem(
      "Highlight uncompleted overdue Todo Items",
      "priority-4",
      getDate(0),
      "",
      true,
      true
    )
  );
  TodoList.addTodoItem(
    project.todoLists[1],
    new TodoItem(
      "No todos message",
      "priority-3",
      getDate(0),
      "Small message when no there are no todos in this tab",
      true,
      true
    )
  );

  Project.addTodoList(project, new TodoList("Possible Features", ""));
  TodoList.addTodoItem(
    project.todoLists[2],
    new TodoItem(
      "Draggable objects",
      "priority-1",
      getDate(5),
      "TodoItems, TodoLists and Projects can be dragged and dropped to change their display order"
    )
  );
  TodoList.addTodoItem(
    project.todoLists[2],
    new TodoItem(
      "Foldable TodoLists",
      "priority-4",
      null,
      "Add ability to fold TodoLists so their TodoItems are hidden"
    )
  );
  TodoList.addTodoItem(
    project.todoLists[2],
    new TodoItem("Better Masonry layout", "priority-1", null, null)
  );
  TodoList.addTodoItem(
    project.todoLists[2],
    new TodoItem(
      "Directly editable elements",
      "priority-4",
      getDate(30),
      "Make elements like the project header editable directly"
    )
  );
  TodoList.addTodoItem(
    project.todoLists[2],
    new TodoItem(`Add "In Progress" tag`, "priority-4", getDate(0), null)
  );
  TodoList.addTodoItem(
    project.todoLists[2],
    new TodoItem(
      "Foldable TodoItems (?)",
      "priority-2",
      getDate(0),
      "Add ability to fold TodoItems so their description is hidden"
    )
  );

  Project.addTodoList(project, new TodoList("UI Update", ""));
  TodoList.addTodoItem(
    project.todoLists[3],
    new TodoItem(
      "UI Update #3",
      "priority-3",
      null,
      `"Upcoming", "This week", "Overdue" and "Priority" tab with (better) masonry?`
    )
  );
  TodoList.addTodoItem(
    project.todoLists[3],
    new TodoItem(
      "UI Update #1",
      "priority-1",
      getDate(1),
      `"Today" and "Completed" tabs with normal grid layout?`,
      true,
      true
    )
  );
  TodoList.addTodoItem(
    project.todoLists[3],
    new TodoItem(
      "UI Update #2",
      "priority-2",
      getDate(0),
      `Display all priorities in "Priority" tab at the same time, in different TodoLists`,
      true,
      true
    )
  );

  Project.addTodoList(project, new TodoList("Sidebar Update", ""));
  TodoList.addTodoItem(
    project.todoLists[4],
    new TodoItem(
      "Hidable sidebar",
      "priority-4",
      getDate(-2),
      "Add a button to hide/show the sidebar body grid-template-columns: 0px auto hide sidebar"
    )
  );
  TodoList.addTodoItem(
    project.todoLists[4],
    new TodoItem(
      "Separate scrolling",
      "priority-5",
      getDate(-3),
      "Make sidebar scoll seperately from rest of website"
    )
  );
}

export { loadDefaultProject };
