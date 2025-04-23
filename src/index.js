import "./style.css";

class Project {
  constructor(name) {
    this.project_id = crypto.randomUUID();
    this.name = name;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }
}

class Task {
  constructor(description) {
    this.task_id = crypto.randomUUID();
    this.description = description;
    this.date = new Date().toISOString().split("T")[0];
    this.status = "toDo";
  }
}

const project_1 = new Project("Daily tasks");
const project_2 = new Project("Exercises");

const task1 = new Task("First task");
task1.status = "done";
const task2 = new Task("Second task");
task2.status = "doing";
const task3 = new Task("Third task");

const task4 = new Task("10 Push Up");
const task5 = new Task("40 squats");
const task6 = new Task("30 bicep curls");

project_1.addTask(task1);
project_1.addTask(task2);
project_1.addTask(task3);

project_2.addTask(task4);
project_2.addTask(task5);
project_2.addTask(task6);

function saveToLocalStorage() {
  localStorage.setItem("projects", JSON.stringify(projects_array));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem("projects");
  if (!data) return [];

  const parsed = JSON.parse(data);

  // Reconstruir las instancias de Project y Task
  return parsed.map(projectData => {
    const project = new Project(projectData.name);
    project.project_id = projectData.project_id;

    project.tasks = projectData.tasks.map(taskData => {
      const task = new Task(taskData.description);
      task.task_id = taskData.task_id;
      task.status = taskData.status;
      task.date = taskData.date;
      return task;
    });

    return project;
  });
}

let projects_array = loadFromLocalStorage();
if (projects_array.length === 0) {
  // Si no hay datos guardados, usa los por defecto
  projects_array = [project_1, project_2];
  saveToLocalStorage();
}

function populateProjects(projects_array) {
  const projectColumn = document.querySelector("#projectColumn");
  projectColumn.innerHTML = ``;

  projects_array.forEach((element) => {
    const li = document.createElement("li");
    li.classList.add("projectName");
    projectColumn.appendChild(li);
    const projectButton = document.createElement("button");
    projectButton.classList.add("projectButton");
    projectButton.textContent = element.name;
    li.appendChild(projectButton);
    const edit_project = document.createElement("button");
    edit_project.classList.add("editProjectButton");
    edit_project.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`;
    li.appendChild(edit_project);

    projectButton.addEventListener("click", () => populateTasks(element));
  });
}

function populateTasks(project) {
  const toDoUl = document.querySelector("#toDoUl");
  toDoUl.innerHTML = ``;
  const doingUl = document.querySelector("#doingUl");
  doingUl.innerHTML = ``;
  const doneUl = document.querySelector("#doneUl");
  doneUl.innerHTML = ``;

  const task_array = project.tasks;
  task_array.forEach((task) => {
    const li = document.createElement("li");
    const edit_task = document.createElement("button");
    switch (task.status) {
      case "toDo":
        li.classList.add("taskCard");
        li.textContent = task.description;
        edit_task.classList.add("editTaskButton");
        edit_task.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`;
        li.appendChild(edit_task);
        toDoUl.appendChild(li);
        break;
      case "doing":
        li.classList.add("taskCard");
        li.textContent = task.description;
        edit_task.classList.add("editTaskButton");
        edit_task.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`;
        li.appendChild(edit_task);
        doingUl.appendChild(li);
        break;
      case "done":
        li.classList.add("taskCard");
        li.textContent = task.description;
        edit_task.classList.add("editTaskButton");
        edit_task.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`;
        li.appendChild(edit_task);
        doneUl.appendChild(li);
        break;
      default:
        break;
    }
  });
}

populateProjects(projects_array);

const newProjectBtn = document.querySelector("#newProject")
const cancelProjectBtn = document.querySelector("#cancelProject")

// Get dialog and form
const newProjectDialog = document.getElementById("newProjectDialog");
const newProjectForm = document.getElementById("newProjectForm");

newProjectBtn.addEventListener("click", () => newProjectDialog.showModal())

function createProject(projectName){
  const project = new Project(projectName);
  projects_array.push(project);
  saveToLocalStorage(); // Guarda al agregar
}


newProjectForm.addEventListener("submit", () => {
  const newProjectName = document.querySelector("#newProjectName");
  createProject(newProjectName.value);

  populateProjects(projects_array);

  newProjectDialog.close(); // Cierra el diálogo
})

cancelProjectBtn.addEventListener("click", () => newProjectDialog.close())

const newTaskDialog = document.getElementById("newTaskDialog");
const newTaskForm = document.getElementById("newTaskForm");
const newTaskButton = document.querySelector("#newTask")

newTaskButton.addEventListener("click", () => newTaskDialog.showModal());
const cancelTaskBtn = document.querySelector("#cancelTask")

cancelTaskBtn.addEventListener("click", () => newTaskDialog.close())