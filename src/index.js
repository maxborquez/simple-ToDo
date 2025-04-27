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

  return parsed.map((projectData) => {
    const project = new Project(projectData.name);
    project.project_id = projectData.project_id;

    project.tasks = projectData.tasks.map((taskData) => {
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
  projects_array = [project_1, project_2];
  saveToLocalStorage();
}

const projectColumn = document.querySelector("#projectColumn");
const editPDialog = document.querySelector("#editPDialog");
const editPForm = document.querySelector("#editPForm");
const cancelEditP = document.querySelector("#cancelEditP");
const editPInput = document.querySelector("#editProjectName");

let currentProject;
let currentEditingProject;

function populateProjects(projects_array) {
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

    edit_project.dataset.projectId = element.project_id;
    li.appendChild(edit_project);

    projectButton.addEventListener("click", () => {
      currentProject = element;
      populateTasks(element);
    });

    edit_project.addEventListener("click", (e) => {
      const projectId = e.currentTarget.dataset.projectId;
      const project = projects_array.find((p) => p.project_id === projectId);

      if (project) {
        currentEditingProject = project;
        editPInput.value = project.name;
        editPDialog.showModal();
      }
    });
  });
}

editPForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newName = editPInput.value.trim();
  if (newName && currentEditingProject) {
    currentEditingProject.name = newName;
    saveToLocalStorage();
    populateProjects(projects_array);
    editPDialog.close();
  }
});

cancelEditP.addEventListener("click", () => editPDialog.close());

const editTDialog = document.querySelector("#editTDialog");
const editTForm = document.querySelector("#editTForm");
const editTInput = document.querySelector("#editTName");
const editTCategory = document.querySelector("#category")
const cancelEditT = document.querySelector("#cancelEditT");
let currentEditingTask;

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
        edit_task.dataset.taskId = task.task_id;
        li.appendChild(edit_task);
        toDoUl.appendChild(li);
        break;
      case "doing":
        li.classList.add("taskCard");
        li.textContent = task.description;
        edit_task.classList.add("editTaskButton");
        edit_task.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`;
        edit_task.dataset.taskId = task.task_id;
        li.appendChild(edit_task);
        doingUl.appendChild(li);
        break;
      case "done":
        li.classList.add("taskCard");
        li.textContent = task.description;
        edit_task.classList.add("editTaskButton");
        edit_task.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`;
        edit_task.dataset.taskId = task.task_id;
        li.appendChild(edit_task);
        doneUl.appendChild(li);
        break;
      default:
        break;
    }

    edit_task.addEventListener("click", (e) => {
      const taskId = e.currentTarget.dataset.taskId;

      currentEditingTask = currentProject.tasks.find(
        (task) => task.task_id === taskId
      );

      if (currentEditingTask) {
        editTInput.value = currentEditingTask.description;
        editTCategory.value = currentEditingTask.status;
        editTDialog.showModal();
      }
    });
  });
}

editTForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newDescription = editTInput.value.trim();
  const newCategory = editTCategory.value;
  if (newDescription && currentEditingTask) {
    currentEditingTask.description = newDescription;
    currentEditingTask.status = newCategory;
    saveToLocalStorage();
    populateTasks(currentProject);
    editTDialog.close();
  }
});

cancelEditT.addEventListener("click", () => editTDialog.close());

populateProjects(projects_array);

const newProjectBtn = document.querySelector("#newProject");
const cancelPBtn = document.querySelector("#cancelP");

const newPDialog = document.getElementById("newPDialog");
const newPForm = document.getElementById("newPForm");

newProjectBtn.addEventListener("click", () => newPDialog.showModal());

function createP(projectName) {
  const project = new Project(projectName);
  projects_array.push(project);
  saveToLocalStorage();
}

newPForm.addEventListener("submit", () => {
  const newPName = document.querySelector("#newPName");
  createP(newPName.value);

  populateProjects(projects_array);

  newPDialog.close();
});

cancelPBtn.addEventListener("click", () => newPDialog.close());

const newTDialog = document.getElementById("newTDialog");
const newTForm = document.getElementById("newTForm");
const newTButton = document.querySelector("#newTask");

newTButton.addEventListener("click", () => newTDialog.showModal());
const cancelTBtn = document.querySelector("#cancelT");

cancelTBtn.addEventListener("click", () => newTDialog.close());

newTForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const newTName = document.querySelector("#newTName").value;

  if (!currentProject) {
    alert("Please select a project first.");
    return;
  }

  const newT = new Task(newTName);
  currentProject.addTask(newT);
  saveToLocalStorage();

  populateTasks(currentProject);
  newTDialog.close();
  newTForm.reset();
});

const editPButton = document.querySelector("#editP");

editPButton.addEventListener("click", () => editPDialog.showModal());
