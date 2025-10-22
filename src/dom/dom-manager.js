import * as globals from "../globals.js";
import * as elementCreator from "./element-creator.js";
import * as dataManager from "../data-manager.js";
import * as projectsTabManager from "./projects-tab-manager.js";
import * as tabsManager from "./tabs-manager.js";
import * as filterTodoItems from "../filter-todo-items.js";
import "./sidebar-button-manager.js";

const projectListContainer = document.querySelector("#project-list");

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
            projectElement.id = "active-project";
        }

        projectElement.addEventListener("click", () => {
            displayProject(project);
            updateProjectList();
        });
    }
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

// Bei project ein active machen und nur wenn active ist der button markiert
function updateSelectedTab(selectedTab) {
    const displayUpcomingButton = document.querySelector("#display-upcoming-btn");
    const displayTodayButton = document.querySelector("#display-today-btn");
    const displayThisWeekButton = document.querySelector("#display-this-week-btn");
    const displayOverdueButton = document.querySelector("#display-overdue-btn");
    const displayPriorityButton = document.querySelector("#display-priority-btn");
    const displayCompletedButton = document.querySelector("#display-completed-btn");
    const projectList = document.querySelector("#project-list");

    displayUpcomingButton.classList.remove("active-tab");
    displayTodayButton.classList.remove("active-tab");
    displayThisWeekButton.classList.remove("active-tab");
    displayOverdueButton.classList.remove("active-tab");
    displayPriorityButton.classList.remove("active-tab");
    displayCompletedButton.classList.remove("active-tab");
    projectList.removeAttribute("class");

    switch(selectedTab) {
        case globals.tabs.UPCOMING: displayUpcomingButton.classList.add("active-tab"); break;
        case globals.tabs.TODAY: displayTodayButton.classList.add("active-tab"); break;
        case globals.tabs.THIS_WEEK: displayThisWeekButton.classList.add ("active-tab"); break;
        case globals.tabs.OVERDUE: displayOverdueButton.classList.add("active-tab"); break;
        case globals.tabs.PRIORITY: displayPriorityButton.classList.add("active-tab"); break;
        case globals.tabs.COMPLETED: displayCompletedButton.classList.add("active-tab"); break;
        case globals.tabs.PROJECT: projectList.classList.add("active-tab"); break;
    }
}

// Tab display functions
function displayUpcoming() {
    tabsManager.displayUpcomingTodoItems();
    updateSelectedTab(globals.tabs.UPCOMING);
}

function displayDueToday() {
    tabsManager.displayTodoItemsBy(filterTodoItems.getDueInXDays(1, "Today"));
    updateSelectedTab(globals.tabs.TODAY);
}

function displayDueThisWeek() {
    tabsManager.displayTodoItemsBy(filterTodoItems.getDueInXDays(7, "This week"));
    updateSelectedTab(globals.tabs.THIS_WEEK);
}

function displayOverdue() {
    tabsManager.displayTodoItemsBy(filterTodoItems.getOverdue());
    updateSelectedTab(globals.tabs.OVERDUE);
}

function displayByPriority(priority) {
    tabsManager.displayTodoItemsByPriority();
    updateSelectedTab(globals.tabs.PRIORITY);
}

function displayByCompleted() {
    tabsManager.displayTodoItemsBy(filterTodoItems.getCompleted());
    updateSelectedTab(globals.tabs.COMPLETED);
}

function displayProject(project) {
    projectsTabManager.displayProject(project);
    updateSelectedTab(globals.tabs.PROJECT);
}

export { updateAll, updateProjectList, displayProject, changeSelectedPriority, getSelectedPriority, displayUpcoming, displayDueToday, displayDueThisWeek, displayOverdue, displayByPriority, displayByCompleted };