import "./styles.css";
import * as globals from "./globals.js";
import { ProjectList } from "./project-list.js";
import { Project } from "./project.js";
import { TodoList } from "./todo-list.js";
import { TodoItem } from "./todo-item.js";
import { loadDefaultProject } from "./defaultProject.js";
import * as domManager from "./dom-manager.js";
import "./button-manager.js";
import "./todo-manager.js";

loadDefaultProject(globals.projectList);

domManager.displayProjectList(globals.projectList);
domManager.displayProject(globals.projectList.projects[0]);
