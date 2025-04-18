class Project {
  constructor(name){
    this.project_id = crypto.randomUUID();;
    this.name = name;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }
}

class Task{
  constructor(description){
    this.task_id = crypto.randomUUID();;
    this.description = description;
    this.date = new Date().toISOString().split('T')[0];
    this.status = "toDo";
  }
}

const project_1 = new Project ("Daily tasks");
const project_2 = new Project ("exercises");

const task1 = new Task("First task");
const task2 = new Task("Second task");
const task3 = new Task("Third task");

const task4 = new Task("10 Push Up");
const task5= new Task("40 squats");
const task6= new Task("30 bicep curls");

project_1.addTask(task1);
project_1.addTask(task2);
project_1.addTask(task3);

project_2.addTask(task4);
project_2.addTask(task5);
project_2.addTask(task6);

let projects_array = [project_1,project_2];


function populateProjects(projects_array){
  const projectColumn = document.querySelector("#projectColumn");

  projects_array.forEach(element => {
    const li = document.createElement("li");
    li.classList.add("projectName");
    li.textContent = element.name;
    projectColumn.appendChild(li);
  });
}

populateProjects(projects_array);