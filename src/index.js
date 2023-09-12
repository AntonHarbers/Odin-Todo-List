import "./styles/buttons.css";
import "./styles/modals.css";
import "./styles/style.css";

import Dom from "./components/dom";
import Project from "./components/project";
import Todo from "./components/todo";

const dom = new Dom();
// get projects from local storage, otherwise create default project
const projects = localStorage.getItem("projects")
  ? JSON.parse(localStorage.getItem("projects"))
  : [];
if (projects.length === 0) {
  const project = new Project("Default");
  projects.push(project);
}

dom.addProjectsToSelect(projects);
dom.renderTodos(projects);

// event listeners
dom.addProjectBtn.addEventListener("click", () => {
  dom.toggleProjectModal();
});

dom.addTodoBtn.addEventListener("click", () => {
  dom.toggleTodoModal();
});

dom.projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const project = new Project(dom.projectNameInput.value);
  projects.push(project);
  dom.addProjectsToSelect(projects);
  dom.toggleProjectModal();
  dom.renderProjects(projects);
  // save projects to local storage
  localStorage.setItem("projects", JSON.stringify(projects));
});

dom.todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  dom.toggleTodoModal();
});
