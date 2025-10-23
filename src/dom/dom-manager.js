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
  displaySelectedTab(globals.getSelectedTab());
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
    if (project === globals.getSelectedProject()) {
      projectElement.id = "active-project";
    }

    projectElement.addEventListener("click", () => {
      displaySelectedTab(globals.tabs.PROJECT, project);
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

// Display selected tab
function displaySelectedTab(selectedTab, project = globals.getSelectedProject()) {
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

  switch (selectedTab) {
    case globals.tabs.UPCOMING:
      tabsManager.displayUpcomingTodoItems();
      displayUpcomingButton.classList.add("active-tab");
      break;
    case globals.tabs.TODAY:
      tabsManager.displayTodoItemsBy(filterTodoItems.getDueInXDays(1, "Today"));
      displayTodayButton.classList.add("active-tab");
      break;
    case globals.tabs.THIS_WEEK:
      tabsManager.displayTodoItemsBy(filterTodoItems.getDueInXDays(7, "This week"));
      displayThisWeekButton.classList.add("active-tab");
      break;
    case globals.tabs.OVERDUE:
      tabsManager.displayTodoItemsBy(filterTodoItems.getOverdue());
      displayOverdueButton.classList.add("active-tab");
      break;
    case globals.tabs.PRIORITY:
      tabsManager.displayTodoItemsByPriority();
      displayPriorityButton.classList.add("active-tab");
      break;
    case globals.tabs.COMPLETED:
      tabsManager.displayTodoItemsBy(filterTodoItems.getCompleted());
      displayCompletedButton.classList.add("active-tab");
      break;
    case globals.tabs.PROJECT:
      projectsTabManager.displayProject(project);
      projectList.classList.add("active-tab");
      break;
  }
  globals.setSelectedTab(selectedTab);
}

export {
  updateAll,
  updateProjectList,
  changeSelectedPriority,
  getSelectedPriority,
  displaySelectedTab,
};
