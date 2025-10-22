import * as globals from "../globals.js";
import * as domManager from "./dom-manager.js";
import * as elementForms from "./forms-manager.js";
import { loadDefaultProject } from "../default-project.js";

const displayUpcomingButton = document.querySelector("#display-upcoming-btn");
const displayTodayButton = document.querySelector("#display-today-btn");
const displayThisWeekButton = document.querySelector("#display-this-week-btn");
const displayOverdueButton = document.querySelector("#display-overdue-btn");
const displayPriorityButton = document.querySelector("#display-priority-btn");
const displayCompletedButton = document.querySelector("#display-completed-btn");

const addProjectButton = document.querySelector("#add-project-btn");
const addTemplateProjectsButton = document.querySelector("#add-template-projects-btn");

displayUpcomingButton.addEventListener("click", () => {
    domManager.displaySelectedTab(globals.tabs.UPCOMING);
})

displayTodayButton.addEventListener("click", () => {
    domManager.displaySelectedTab(globals.tabs.TODAY);
})

displayThisWeekButton.addEventListener("click", () => {
    domManager.displaySelectedTab(globals.tabs.THIS_WEEK);
})

displayOverdueButton.addEventListener("click", () => {
    domManager.displaySelectedTab(globals.tabs.OVERDUE);
})

displayPriorityButton.addEventListener("click", () => {
    domManager.displaySelectedTab(globals.tabs.PRIORITY);
})

displayCompletedButton.addEventListener("click", () => {
    domManager.displaySelectedTab(globals.tabs.COMPLETED);
})

addProjectButton.addEventListener("click", () => {
    elementForms.showAddProjectForm();
})

addTemplateProjectsButton.addEventListener("click", () => {
    loadDefaultProject();
})