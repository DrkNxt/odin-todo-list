import * as globals from "./globals.js";

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

function storeProjectList() {
    if (storageAvailable) {
        localStorage.setItem("projectList", JSON.stringify(globals.projectList));
    }
    
}

function getProjectList() {
    console.log(JSON.parse(localStorage.getItem("projectList")));
    return JSON.parse(localStorage.getItem("projectList"));
}

function isProjectListStored() {
    if (localStorage.getItem("projectList")) {
        return true;
    }
    return false;
}

console.log("Storage available: ");
console.log(storageAvailable("localStorage"));

export { storeProjectList, getProjectList, isProjectListStored };