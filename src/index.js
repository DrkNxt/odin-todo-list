import "./styles.css";
import * as globals from "./globals.js";
import { loadDefaultProject } from "./default-project.js";
import * as domManager from "./dom/dom-manager.js";
import "./data-manager.js";

loadDefaultProject(globals.projectList);

domManager.updateProjectList();
domManager.updateProject(globals.projectList.projects[0]);
