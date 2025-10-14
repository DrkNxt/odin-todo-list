import { ProjectList } from "./classes/project-list";

const projectList = new ProjectList();
let activeProject = projectList.projects[0];

function getActiveProject() {
    return activeProject;
}

function setActiveProject(project) {
    activeProject = project;
}

export { projectList, getActiveProject, setActiveProject };