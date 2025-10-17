import * as globals from "./globals.js";
import { Project } from "./classes/project.js";
import { TodoList } from "./classes/todo-list.js";
import { TodoItem } from "./classes/todo-item.js";
import { ProjectList } from "./classes/project-list.js";

function loadDefaultProject(projectList) {
    addDefaultProjectWork(projectList);
    addDefaultProjectUni(projectList);
    addDefaultProjectMisc(projectList);
}


function addDefaultProjectWork(projectList) {
    ProjectList.addProject(globals.projectList, new Project("Work", `This is where I put all my work related tasks`));
    const project = projectList.projects[projectList.projects.length - 1];

    Project.addTodoList(project, new TodoList("Presentation", "Donec suscipit semper iaculis. Morbi sit amet nunc accumsan, molestie dolor vel, tempus ipsum."));
    TodoList.addTodoItem(project.todoLists[0], new TodoItem("Prepare introduction", "priority-4", null, null));
    TodoList.addTodoItem(project.todoLists[0], new TodoItem("Simplify slide layouts", "priority-2", new Date(), "These are optional notes", true));

    Project.addTodoList(project, new TodoList("Onboarding", "Sed molestie metus ut leo porta maximus."));
    TodoList.addTodoItem(project.todoLists[1], new TodoItem("Nullam et semper mi.", "priority-1", new Date(), null, true));
    TodoList.addTodoItem(project.todoLists[1], new TodoItem("Vestibulum a iaculis nunc.", "priority-3", null, "These are optional notes"));
    TodoList.addTodoItem(project.todoLists[1], new TodoItem("Aliquam mattis nulla tempus diam.", "priority-5", new Date(), "These are optional notes", true));

    Project.addTodoList(project, new TodoList("Conference", "Ut non ante sagittis augue mollis condimentum nec ut lacus. Nam eleifend, nunc commodo viverra faucibus, dolor justo sodales nisl, vel imperdiet neque erat in libero."));
    TodoList.addTodoItem(project.todoLists[2], new TodoItem("In hendrerit sed nulla eget.", "priority-1", new Date(), null));
    TodoList.addTodoItem(project.todoLists[2], new TodoItem("Maecenas porta consequat est sit.", "priority-5", null, "These are optional notes"));
    TodoList.addTodoItem(project.todoLists[2], new TodoItem("Maecenas a enim quis est.", "priority-3", null, null, true));
    TodoList.addTodoItem(project.todoLists[2], new TodoItem("Suspendisse non interdum sapien.", "priority-3", new Date(), "These are optional notes"));

    Project.addTodoList(project, new TodoList("Meeting", "Donec placerat urna vel arcu condimentum, ut tristique ex semper."));
    TodoList.addTodoItem(project.todoLists[3], new TodoItem("Phasellus posuere tincidunt dui, at.", "priority-3", null, null));
    TodoList.addTodoItem(project.todoLists[3], new TodoItem("Duis sit amet mollis diam.", "priority-1", new Date(), "These are optional notes", true));
    TodoList.addTodoItem(project.todoLists[3], new TodoItem("Phasellus eleifend quam lectus, eget.", "priority-2", new Date(), "These are optional notes"));

    Project.addTodoList(project, new TodoList("Project", "Aenean rhoncus auctor velit, sed porttitor tellus convallis ut."));
    TodoList.addTodoItem(project.todoLists[4], new TodoItem("Donec lacinia quam nibh, id.", "priority-4", new Date(), null));
    TodoList.addTodoItem(project.todoLists[4], new TodoItem("Mauris et vulputate leo. Vestibulum.", "priority-5", new Date(), "These are optional notes"));
    TodoList.addTodoItem(project.todoLists[4], new TodoItem("Nullam ut elit id urna.", "priority-2", null, "These are optional notes"));
}

function addDefaultProjectUni(projectList) {
    ProjectList.addProject(globals.projectList, new Project("University", `This is where I put all my university related tasks`));
    const project = projectList.projects[projectList.projects.length - 1];

    Project.addTodoList(project, new TodoList("Class", "Fusce consequat, tortor eu mollis hendrerit, purus est placerat odio, eu vulputate ante justo nec orci."));
    TodoList.addTodoItem(project.todoLists[0], new TodoItem("Etiam vel dignissim urna.", "priority-5", new Date(), null));
    TodoList.addTodoItem(project.todoLists[0], new TodoItem("Vestibulum varius neque sed augue.", "priority-4", new Date(), "These are optional notes"));
    TodoList.addTodoItem(project.todoLists[0], new TodoItem("Phasellus posuere tincidunt dui, at.", "priority-3", new Date(), null));
    TodoList.addTodoItem(project.todoLists[0], new TodoItem("Duis sit amet mollis diam.", "priority-2", new Date(), "These are optional notes"));
    TodoList.addTodoItem(project.todoLists[0], new TodoItem("Phasellus eleifend quam lectus, eget.", "priority-1", new Date(), "These are optional notes"));
}

function addDefaultProjectMisc(projectList) {
    ProjectList.addProject(globals.projectList, new Project("Misc", `This is where I put all my misc tasks`));
    const project = projectList.projects[projectList.projects.length - 1];

    Project.addTodoList(project, new TodoList("Clean", "Sed nec nunc enim. Praesent finibus leo orci, et volutpat erat condimentum eu."));
    TodoList.addTodoItem(project.todoLists[0], new TodoItem("Integer nec mi eu quam. Integer nec mi eu quam. Integer nec mi eu quam. Integer nec mi eu quam.", "priority-4", new Date(), "These are optional notes These are optional notesThese are optional notes These are optional notes These are optional notes These are optional notes Integer nec mi eu quam. Integer nec mi eu quam.", true));
    TodoList.addTodoItem(project.todoLists[0], new TodoItem("Ut pellentesque magna tortor, sit.", "priority-2", null, "These are optional notes"));

    Project.addTodoList(project, new TodoList("Shopping", "Quisque id nulla sit amet neque rutrum ultricies nec ac ligula. Vestibulum lobortis faucibus blandit. Vestibulum tristique consectetur metus."));
    TodoList.addTodoItem(project.todoLists[1], new TodoItem("Praesent vitae orci nec tortor.", "priority-5", null, null));
    TodoList.addTodoItem(project.todoLists[1], new TodoItem("Pellentesque at felis venenatis, scelerisque.", "priority-1", new Date(), "These are optional notes"));
    TodoList.addTodoItem(project.todoLists[1], new TodoItem("Etiam sed risus nec ex.", "priority-4", new Date(), "These are optional notes", true));
}

export { loadDefaultProject };