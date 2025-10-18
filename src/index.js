import "./styles.css";
import * as globals from "./globals.js";
import * as domManager from "./dom/dom-manager.js";
import "./data-manager.js";
import { getUpcoming, getDueInXDays, getOverdue, getCompleted, getByPriority } from "./filter-todo-items.js";

domManager.updateProjectList();
domManager.displayProject(globals.projectList.projects[0]);


// TODO: make project header editable directly (?)