import "./styles.css";
import * as globals from "./globals.js";
import { loadDefaultProject } from "./default-project.js";
import * as domManager from "./dom/dom-manager.js";
import "./button-manager.js";
import "./todo-manager.js";

loadDefaultProject(globals.projectList);

domManager.displayProjectList(globals.projectList);
domManager.displayProject(globals.projectList.projects[0]);
