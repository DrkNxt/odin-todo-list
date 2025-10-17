import "./styles.css";
import * as globals from "./globals.js";
import { loadDefaultProject } from "./default-project.js";
import * as domManager from "./dom/dom-manager.js";
import "./data-manager.js";

loadDefaultProject(globals.projectList);

domManager.updateProjectList();
domManager.updateProject(globals.projectList.projects[0]);

// TODO: add "Upcoming" section that displays tasks in order of closest due date

// TODO: add "Today" and "This Week" section that displays tasks due today / this week

// TODO: add "Completed" section that displays all completed tasks

// TODO: only display uncompleted tasks in every section (except "Completed" and Projects)

// TODO: implement local storage

// TODO: change element creation to use dialog (?)

// TODO: change create, edit and delete forms to have border below heading and no border above buttons

// TODO: option to only display todos of specific priority

// TODO: make due date optional