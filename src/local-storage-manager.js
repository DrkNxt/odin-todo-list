import * as globals from "./globals.js";
import { ProjectList } from "./classes/project-list";

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function storeObject(objName, obj) {
  if (storageAvailable) {
    localStorage.setItem(objName, JSON.stringify(obj));
  } else {
    throw new Error("Local storage is not available");
  }
}

function getObject(objName, fallbackObj) {
  if (isObjectStored(objName)) {
    return JSON.parse(localStorage.getItem(objName));
  }
  return fallbackObj();
}

function isObjectStored(objName) {
  if (localStorage.getItem(objName)) {
    return true;
  }
  return false;
}

function storeProjectList() {
  storeObject("projectList", globals.projectList);
}

function getProjectList() {
  return getObject("projectList", () => new ProjectList());
}

function storeSelectedTab() {
  storeObject("selectedTab", globals.getSelectedTab());
  storeObject("selectedProject", globals.getSelectedProjectIndex());
}

function getSelectedTab() {
  return getObject("selectedTab", () => globals.tabs.UPCOMING);
}

function getSelectedProject() {
  return getObject("selectedProject", () => globals.projectList.projects[0]);
}

export {
  storeProjectList,
  getProjectList,
  storeSelectedTab,
  getSelectedTab,
  getSelectedProject,
};
