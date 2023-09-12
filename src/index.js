import "./styles/style.css";
import Dom from "./components/dom";
import Project from "./components/project";
import Todo from "./components/todo";

const project = new Project("Default", []);
const project1 = new Project("Project 1", []);

const dom = new Dom();
dom.renderTodos();

dom.addProjectBtn.addEventListener("click", () => {
    dom.toggleProjectModal();
});

dom.addTodoBtn.addEventListener("click", () => {
    dom.toggleTodoModal();
});

dom.projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    dom.toggleProjectModal();
});

dom.todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    dom.toggleTodoModal();
});

dom.addProjectsToSelect([project, project1]);