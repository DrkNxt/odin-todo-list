class ProjectList {
  constructor() {
    this.projects = [];
  }

  static addProject(projectList, project) {
    projectList.projects.push(project);
  }

  static removeProject(projectList, project) {
    projectList.projects.splice(
      projectList.projects.findIndex((proj) => proj === project),
      1
    );
  }
}

export { ProjectList };
