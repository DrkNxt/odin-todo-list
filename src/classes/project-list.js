class ProjectList {
    constructor() {
        this.projects = []
    }
    get(project) {
        return this.projects.findIndex((proj) => proj === project);
    }

    addProject(project) {
        this.projects.push(project);
    }

    removeProject(project) {
        this.projects.splice(this.projects.findIndex((proj) => proj === project), 1);
    }
}

export { ProjectList };