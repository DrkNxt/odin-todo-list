import * as globals from "../globals.js";
import * as elementCreator from "./element-creator.js";
import * as elementForms from "./forms-manager.js";
import * as dataManager from "../data-manager.js";
import * as projectManager from "./dom-project-manager.js";
import { loadDefaultProject } from "../default-project.js";

const projectListContainer = document.querySelector("#project-list");
const addProjectButton = document.querySelector("#add-project-btn");
const addTemplateProjectsButton = document.querySelector("#add-template-projects-btn");

addProjectButton.addEventListener("click", () => {
    elementForms.showAddProjectForm();
})

addTemplateProjectsButton.addEventListener("click", () => {
    loadDefaultProject();
})

function updateAll() {
    updateProjectList();
    displayProject(globals.getActiveProject());
}

// Update project list elements
function updateProjectList() {

    if (globals.projectList.projects.length < 1) {
            dataManager.createProject("New Project", "Description");
    }

    projectListContainer.innerHTML = "";

    for (let project of globals.projectList.projects) {
        const projectElement = elementCreator.getElement("button", project.title, "project-btn");
        projectListContainer.appendChild(projectElement);
        if (project === globals.getActiveProject()) {
            projectElement.id = "active-project-btn";
        }

        projectElement.addEventListener("click", () => {
            displayProject(project);
            updateProjectList();
        });
    }
}

function displayProject(project) {
    projectManager.updateProject(project);
}

function changeSelectedPriority(prioritySelect, selectedPriority) {
    for (let priority of prioritySelect.children) {
        priority.dataset.selected = "false";
        priority.innerHTML = "";
        priority.appendChild(elementCreator.getIcon("circle"));
    }
    const priority = prioritySelect.querySelector(`.${selectedPriority}`);
    priority.dataset.selected = "true";
    priority.innerHTML = "";
    priority.appendChild(elementCreator.getIcon("circle-outline"));
}

function getSelectedPriority(prioritySelect) {
    return prioritySelect.querySelector(`[data-selected="true"]`).className;
}

export { updateAll, updateProjectList, displayProject, changeSelectedPriority, getSelectedPriority };