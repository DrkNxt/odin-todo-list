import * as localStorageManager from "./local-storage-manager.js";
import { TodoList } from "./classes/todo-list.js";

const tabs = Object.freeze({
  UPCOMING: "upcoming",
  TODAY: "today",
  THIS_WEEK: "thisWeek",
  OVERDUE: "overdue",
  PRIORITY: "priority",
  COMPLETED: "completed",
  PROJECT: "project",
});

let projectList = localStorageManager.getProjectList();
let selectedTab;
let selectedProject =
  projectList.projects[localStorageManager.getSelectedProject()];
setSelectedTab(localStorageManager.getSelectedTab());

function getSelectedProject() {
  if (!projectList.projects.includes(selectedProject)) {
    selectedProject = projectList.projects[0];
  }
  return selectedProject;
}

function getSelectedProjectIndex() {
  return projectList.projects.findIndex((proj) => proj === selectedProject);
}

function setSelectedProject(project) {
  if (!projectList.projects.includes(project)) {
    selectedProject = projectList.projects[0];
  } else {
    selectedProject = project;
  }
}

function getSelectedTab() {
  return selectedTab;
}

function setSelectedTab(tab) {
  if (Object.values(tabs).includes(tab)) {
    selectedTab = tab;
  } else {
    selectedTab = tabs.UPCOMING;
  }
  localStorageManager.storeSelectedTab();
}

function getTodoListOf(todoItem) {
  for (let project of projectList.projects) {
    for (let todoList of project.todoLists) {
      if (TodoList.get(todoList, todoItem) > -1) {
        return todoList;
      }
    }
  }
}

export {
  tabs,
  projectList,
  getSelectedProject,
  getSelectedProjectIndex,
  setSelectedProject,
  getSelectedTab,
  setSelectedTab,
  getTodoListOf,
};
