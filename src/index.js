import "./styles.css";
import * as globals from "./globals.js";
import * as domManager from "./dom/dom-manager.js";
import "./data-manager.js";

domManager.updateProjectList();
domManager.updateProject(globals.projectList.projects[0]);

// TODO: add "Upcoming" section that displays tasks in order of closest due date
// TODO: add "Today" and "This Week" section that displays tasks due today / this week
// TODO: add "Completed" section that displays all completed tasks
// TODO: only display uncompleted tasks in every section (except "Completed" and Projects)
// TODO: option to only display todos of specific priority