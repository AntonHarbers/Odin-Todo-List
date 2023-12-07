import './styles/style.css';
import Dom from './components/dom';
import Project from './components/project';
import Todo from './components/todo';
import {
  getProjectsFromLocalStorage,
  updateProjectsInLocalStorage,
} from './utils/helpers';

// unhides content on load (prevents flash of unstyled content)
const content = document.getElementById('content');
content.hidden = false;

/**========================================================================
 *                           Instantiate State
 *========================================================================**/

const dom = new Dom();

// get projects from local storage, otherwise create default project
const loadedProjects = getProjectsFromLocalStorage();
if (loadedProjects.length === 0) {
  const defaultProject = new Project('Default', []);
  updateProjectsInLocalStorage(loadedProjects);
  loadedProjects.push(defaultProject);
}

const reconstructedProjects = loadedProjects.map((projectData) => {
  const tempProject = new Project();
  tempProject.name = projectData.name;
  tempProject.todos = projectData.todos.map((todoData) => {
    const tempTodo = new Todo();
    tempTodo.title = todoData.title;
    tempTodo.description = todoData.description;
    tempTodo.dueDate = todoData.dueDate;
    tempTodo.priority = todoData.priority;
    tempTodo.notes = todoData.notes;
    return tempTodo;
  });

  return tempProject;
});

dom.addProjectsToSelect(reconstructedProjects);
dom.renderTodos(reconstructedProjects);

/**========================================================================
 *                           Event Listeners
 *========================================================================**/

dom.addProjectBtn.addEventListener('click', () => {
  dom.toggleProjectModal();
});

dom.addTodoBtn.addEventListener('click', () => {
  dom.toggleTodoModal();
});

// add a new project
dom.projectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (dom.projectNameInput.value === '') {
    dom.projectNameInput.classList.add('error');
    dom.projectNameInput.placeholder = 'Please enter a project name';
    return;
  }

  // check if project name already exists
  if (
    reconstructedProjects.some(
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

  const project = new Project(dom.projectNameInput.value, []);
  reconstructedProjects.push(project);
  dom.addProjectsToSelect(reconstructedProjects);
  dom.toggleProjectModal();
  dom.renderProjects(reconstructedProjects);

  updateProjectsInLocalStorage(reconstructedProjects);
});

// validate todo name on input change
dom.todoNameInput.addEventListener('input', (e) => {
  if (dom.todoNameInput.value === '') {
    dom.todoNameInput.classList.add('error');
    dom.todoNameInput.placeholder = 'Please enter a todo name';
  } else {
    dom.todoNameInput.classList.remove('error');
    dom.todoNameInput.placeholder = 'Todo name';
  }
});

// validate todo due date on input change
dom.todoDueDateInput.addEventListener('input', (e) => {
  if (dom.todoDueDateInput.value === '') {
    dom.todoDueDateInput.classList.add('error');
  } else {
    dom.todoDueDateInput.classList.remove('error');
  }
});

// add a new todo
dom.todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  dom.todoSubmitBtn.value = 'Create Todo';
  // check if todo name is empty
  if (dom.todoNameInput.value === '') {
    dom.todoNameInput.classList.add('error');
    dom.todoNameInput.placeholder = 'Please enter a todo name';
    return;
  } else {
    dom.todoNameInput.classList.remove('error');
    dom.todoNameInput.placeholder = 'Todo name';
  }

  // check if todo date is empty
  if (dom.todoDueDateInput.value === '') {
    dom.todoDueDateInput.classList.add('error');
    return;
  } else {
    dom.todoDueDateInput.classList.remove('error');
  }

  // create a new todo based on the user inputs of name, desc, due date, priority, and project
  const todo = new Todo(
    dom.todoNameInput.value,
    dom.todoDescInput.value,
    dom.todoDueDateInput.value,
    dom.prioritySelect.value,
    dom.projectSelect.value
  );
  // add the todo to the selected project
  reconstructedProjects.forEach((project) => {
    if (project.name === dom.projectSelect.value) {
      project.todos.push(todo);
    }
  });

  dom.renderTodos(reconstructedProjects);
  updateProjectsInLocalStorage(reconstructedProjects);
  dom.toggleTodoModal();
});

// change color of priority select based on selected value
dom.prioritySelect.addEventListener('change', (e) => {
  var selectedValue = dom.prioritySelect.value;
  dom.prioritySelect.style.fontWeight = 'normal'; // Reset font weight
  if (selectedValue === 'low') {
    dom.prioritySelect.style.backgroundColor = '#81F499'; // Green
  } else if (selectedValue === 'medium') {
    dom.prioritySelect.style.backgroundColor = '#E5B25D'; // Yellow
  } else if (selectedValue === 'high' || selectedValue === 'urgent') {
    dom.prioritySelect.style.backgroundColor = '#FF4365'; // Red
    if (selectedValue === 'urgent') {
      dom.prioritySelect.style.fontWeight = 'bold';
      dom.prioritySelect.style.backgroundColor = '#7C3238'; // Red
    }
  } else {
    dom.prioritySelect.style.backgroundColor = '#81F499'; // White (reset)
    dom.prioritySelect.style.fontWeight = 'normal'; // Reset font weight
  }
});

// when clicking escape, close modals
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    dom.closeModals();
  }
});

export default function deleteProject(index) {
  reconstructedProjects.splice(index, 1);
  dom.renderTodos(reconstructedProjects);
  updateProjectsInLocalStorage(reconstructedProjects);
  dom.addProjectsToSelect(reconstructedProjects);
  console.log('Works');
}
