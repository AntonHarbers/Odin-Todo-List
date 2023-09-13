import './styles/buttons.css';
import './styles/modals.css';
import './styles/style.css';
import './styles/project-cards.css';

import Dom from './components/dom';
import Project from './components/project';
import Todo from './components/todo';

const dom = new Dom();
// get projects from local storage, otherwise create default project
const projects = localStorage.getItem('projects')
  ? JSON.parse(localStorage.getItem('projects'))
  : [];
if (projects.length === 0) {
  const project = new Project('Default');
  projects.push(project);
}

dom.addProjectsToSelect(projects);
dom.renderTodos(projects);

// event listeners
dom.addProjectBtn.addEventListener('click', () => {
  dom.toggleProjectModal();
});

dom.addTodoBtn.addEventListener('click', () => {
  dom.toggleTodoModal();
});

dom.projectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // check if project name is empty
  if (dom.projectNameInput.value === '') {
    dom.projectNameInput.classList.add('error');
    dom.projectNameInput.placeholder = 'Please enter a project name';
    return;
  }

  // check if project name already exists
  if (
    projects.some(
      (project) => project.name === dom.projectNameInput.value.trim()
    )
  ) {
    dom.projectNameInput.classList.add('error');
    dom.projectNameInput.value = '';
    dom.projectNameInput.placeholder = 'Project already exists';
    return;
  }

  dom.projectNameInput.classList.remove('error');
  dom.projectNameInput.placeholder = 'Project name';

  const project = new Project(dom.projectNameInput.value);
  projects.push(project);
  dom.addProjectsToSelect(projects);
  dom.toggleProjectModal();
  dom.renderProjects(projects);

  localStorage.setItem('projects', JSON.stringify(projects));
});

dom.todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  dom.toggleTodoModal();
});

dom.prioritySelect.addEventListener("change", (e) => {
  var selectedValue = dom.prioritySelect.value;
  dom.prioritySelect.style.fontWeight = "normal"; // Reset font weight
  if (selectedValue === "low") {
    dom.prioritySelect.style.backgroundColor = "#4CAF50"; // Green
  } else if (selectedValue === "medium") {
    dom.prioritySelect.style.backgroundColor = "#FFC107"; // Yellow
  } else if (selectedValue === "high" || selectedValue === "urgent") {
    dom.prioritySelect.style.backgroundColor = "#FF5733"; // Red
    if (selectedValue === "urgent") {
      dom.prioritySelect.style.fontWeight = "bold";
    } else {
      dom.prioritySelect.style.fontWeight = "normal";
    }
  } else {
    dom.prioritySelect.style.backgroundColor = "#ffffff"; // White (reset)
    dom.prioritySelect.style.fontWeight = "normal"; // Reset font weight
  }
});

// when clicking escape, close modals
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    dom.closeModals();
  }
});

