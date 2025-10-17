import "./styles.css";
import * as globals from "./globals.js";
import * as domManager from "./dom/dom-project-manager.js";
import "./data-manager.js";

domManager.updateProjectList();
domManager.updateProject(globals.projectList.projects[0]);

// TODO: add "Upcoming" section that displays tasks in order of closest due date
// TODO: add "Today" and "This Week" section that displays tasks due today / this week
// TODO: add "Overdue" section that displays tasks that have a due date in the past
// TODO: add "Completed" section that displays all completed tasks
// TODO: only display uncompleted tasks in every section (except "Completed" and Projects)
// TODO: option to only display todos of specific priority (?)

// TODO: github link at bottom of page

// TODO: make project header editable directly (?)