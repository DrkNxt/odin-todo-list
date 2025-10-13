import * as globals from "./globals.js";
import { Project } from "./project.js";
import * as domManager from "./dom-manager.js";

const addProjectButton = document.querySelector("#add-project-btn");

addProjectButton.addEventListener("click", () => {
    domManager.addProject();
})