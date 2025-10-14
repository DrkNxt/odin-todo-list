import * as domManager from "./dom/dom-manager.js";

const addProjectButton = document.querySelector("#add-project-btn");

addProjectButton.addEventListener("click", () => {
    domManager.addProject();
})