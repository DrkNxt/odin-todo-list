import { ProjectList } from "./classes/project-list";
import * as localStorageManager from "./local-storage-manager.js";

let projectList;
if (localStorageManager.isProjectListStored()) {
    projectList = localStorageManager.getProjectList();
}
projectList = new ProjectList();


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

export { projectList, getActiveProject, setActiveProject };