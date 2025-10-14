import { Project } from "./classes/project.js";
import { TodoList } from "./classes/todo-list.js";
import { TodoItem } from "./classes/todo-item.js";

function loadDefaultProject(projectList) {
    addDefaultProjectWork(projectList);
    addDefaultProjectUni(projectList);
    addDefaultProjectMisc(projectList);
}


function addDefaultProjectWork(projectList) {
    projectList.addProject(new Project("Work", `This is where I put all my work related tasks`));

    projectList.projects[projectList.projects.length - 1].addTodoList(new TodoList("Presentation", "Donec suscipit semper iaculis. Morbi sit amet nunc accumsan, molestie dolor vel, tempus ipsum."));
    projectList.projects[projectList.projects.length - 1].todoLists[0].addTodoItem(new TodoItem("Prepare introduction", "high", new Date(), null));
    projectList.projects[projectList.projects.length - 1].todoLists[0].addTodoItem(new TodoItem("Simplify slide layouts", "low", new Date(), "These are optional notes"));

    projectList.projects[projectList.projects.length - 1].addTodoList(new TodoList("Onboarding", "Sed molestie metus ut leo porta maximus."));
    projectList.projects[projectList.projects.length - 1].todoLists[1].addTodoItem(new TodoItem("Nullam et semper mi.", "low", new Date(), null));
    projectList.projects[projectList.projects.length - 1].todoLists[1].addTodoItem(new TodoItem("Vestibulum a iaculis nunc.", "low", new Date(), "These are optional notes"));
    projectList.projects[projectList.projects.length - 1].todoLists[1].addTodoItem(new TodoItem("Aliquam mattis nulla tempus diam.", "high", new Date(), "These are optional notes"));

    projectList.projects[projectList.projects.length - 1].addTodoList(new TodoList("Conference", "Ut non ante sagittis augue mollis condimentum nec ut lacus. Nam eleifend, nunc commodo viverra faucibus, dolor justo sodales nisl, vel imperdiet neque erat in libero."));
    projectList.projects[projectList.projects.length - 1].todoLists[2].addTodoItem(new TodoItem("In hendrerit sed nulla eget.", "low", new Date(), null));
    projectList.projects[projectList.projects.length - 1].todoLists[2].addTodoItem(new TodoItem("Maecenas porta consequat est sit.", "high", new Date(), "These are optional notes"));
    projectList.projects[projectList.projects.length - 1].todoLists[2].addTodoItem(new TodoItem("Maecenas a enim quis est.", "high", new Date(), null));
    projectList.projects[projectList.projects.length - 1].todoLists[2].addTodoItem(new TodoItem("Suspendisse non interdum sapien.", "low", new Date(), "These are optional notes"));

    projectList.projects[projectList.projects.length - 1].addTodoList(new TodoList("Meeting", "Donec placerat urna vel arcu condimentum, ut tristique ex semper."));
    projectList.projects[projectList.projects.length - 1].todoLists[3].addTodoItem(new TodoItem("Phasellus posuere tincidunt dui, at.", "high", new Date(), null));
    projectList.projects[projectList.projects.length - 1].todoLists[3].addTodoItem(new TodoItem("Duis sit amet mollis diam.", "low", new Date(), "These are optional notes"));
    projectList.projects[projectList.projects.length - 1].todoLists[3].addTodoItem(new TodoItem("Phasellus eleifend quam lectus, eget.", "low", new Date(), "These are optional notes"));

    projectList.projects[projectList.projects.length - 1].addTodoList(new TodoList("Project", "Aenean rhoncus auctor velit, sed porttitor tellus convallis ut."));
    projectList.projects[projectList.projects.length - 1].todoLists[4].addTodoItem(new TodoItem("Donec lacinia quam nibh, id.", "high", new Date(), null));
    projectList.projects[projectList.projects.length - 1].todoLists[4].addTodoItem(new TodoItem("Mauris et vulputate leo. Vestibulum.", "high", new Date(), "These are optional notes"));
    projectList.projects[projectList.projects.length - 1].todoLists[4].addTodoItem(new TodoItem("Nullam ut elit id urna.", "low", new Date(), "These are optional notes"));
}

function addDefaultProjectUni(projectList) {
    projectList.addProject(new Project("University", `This is where I put all my university related tasks`));

    projectList.projects[projectList.projects.length - 1].addTodoList(new TodoList("Class", "Fusce consequat, tortor eu mollis hendrerit, purus est placerat odio, eu vulputate ante justo nec orci."));
    projectList.projects[projectList.projects.length - 1].todoLists[0].addTodoItem(new TodoItem("Etiam vel dignissim urna.", "high", new Date(), null));
    projectList.projects[projectList.projects.length - 1].todoLists[0].addTodoItem(new TodoItem("Vestibulum varius neque sed augue.", "low", new Date(), "These are optional notes"));
    projectList.projects[projectList.projects.length - 1].todoLists[0].addTodoItem(new TodoItem("Phasellus posuere tincidunt dui, at.", "high", new Date(), null));
    projectList.projects[projectList.projects.length - 1].todoLists[0].addTodoItem(new TodoItem("Duis sit amet mollis diam.", "low", new Date(), "These are optional notes"));
    projectList.projects[projectList.projects.length - 1].todoLists[0].addTodoItem(new TodoItem("Phasellus eleifend quam lectus, eget.", "low", new Date(), "These are optional notes"));
}

function addDefaultProjectMisc(projectList) {
    projectList.addProject(new Project("Misc", `This is where I put all my misc tasks`));

    projectList.projects[projectList.projects.length - 1].addTodoList(new TodoList("Clean", "Sed nec nunc enim. Praesent finibus leo orci, et volutpat erat condimentum eu."));
    projectList.projects[projectList.projects.length - 1].todoLists[0].addTodoItem(new TodoItem("Integer nec mi eu quam.", "high", new Date(), null));
    projectList.projects[projectList.projects.length - 1].todoLists[0].addTodoItem(new TodoItem("Ut pellentesque magna tortor, sit.", "low", new Date(), "These are optional notes"));

    projectList.projects[projectList.projects.length - 1].addTodoList(new TodoList("Shopping", "Quisque id nulla sit amet neque rutrum ultricies nec ac ligula. Vestibulum lobortis faucibus blandit. Vestibulum tristique consectetur metus."));
    projectList.projects[projectList.projects.length - 1].todoLists[1].addTodoItem(new TodoItem("Praesent vitae orci nec tortor.", "low", new Date(), null));
    projectList.projects[projectList.projects.length - 1].todoLists[1].addTodoItem(new TodoItem("Pellentesque at felis venenatis, scelerisque.", "low", new Date(), "These are optional notes"));
    projectList.projects[projectList.projects.length - 1].todoLists[1].addTodoItem(new TodoItem("Etiam sed risus nec ex.", "high", new Date(), "These are optional notes"));
}

export { loadDefaultProject };