import { ProjectList } from "./classes/project-list";
import * as localStorageManager from "./local-storage-manager.js";

const tabs = Object.freeze({
    UPCOMING:   "upcoming",
    TODAY:  "today",
    THIS_WEEK: "thisWeek",
    OVERDUE:  "overdue",
    PRIORITY:  "priority",
    COMPLETED:  "completed",
    PROJECT:  "project",
});

let selectedTab = tabs.THIS_WEEK;
let projectList;
if (localStorageManager.isProjectListStored()) {
    projectList = localStorageManager.getProjectList();
}else {
    projectList = new ProjectList();
}

let activeProject = projectList.projects[0];

function getActiveProject() {
    if (!projectList.projects.includes(activeProject)){
        activeProject = projectList.projects[0];
    }
    return activeProject;
}

function setActiveProject(project) {
    if (!projectList.projects.includes(project)){
        activeProject = projectList.projects[0];
    }else {
        activeProject = project;
    }
    
}

export { tabs, selectedTab, projectList, getActiveProject, setActiveProject };