import './styles/style.css';
import Dom from './components/dom';
import Project from './components/project';
import Todo from './components/todo';

// unhides content on load (prevents flash of unstyled content)
const content = document.getElementById('content');
content.hidden = false;

/**========================================================================
 *                           Instantiate State
 *========================================================================**/

const dom = new Dom();
// get projects from local storage, otherwise create default project
const projects = localStorage.getItem('projects')
  ? JSON.parse(localStorage.getItem('projects'))
  : [];
if (projects.length === 0) {
  const project = new Project('Default', []);
  localStorage.setItem('projects', JSON.stringify(projects));
  projects.push(project);
}

dom.addProjectsToSelect(projects);
dom.renderTodos(projects);

/**========================================================================
 *                           Event Listeners
 *========================================================================**/

// open project modal
dom.addProjectBtn.addEventListener('click', () => {
  dom.toggleProjectModal();
});

// open todo modal
dom.addTodoBtn.addEventListener('click', () => {
  dom.toggleTodoModal();
});

// add a new project
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

  const project = new Project(dom.projectNameInput.value, []);
  projects.push(project);
  dom.addProjectsToSelect(projects);
  dom.toggleProjectModal();
  dom.renderProjects(projects);

  localStorage.setItem('projects', JSON.stringify(projects));
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
  projects.forEach((project) => {
    if (project.name === dom.projectSelect.value) {
      project.todos.push(todo);
    }
  });
  // render the todos of the selected project
  dom.renderTodos(projects);
  // save the projects to local storage
  localStorage.setItem('projects', JSON.stringify(projects));
  dom.toggleTodoModal();
});

// change color of priority select based on selected value
dom.prioritySelect.addEventListener('change', (e) => {
  var selectedValue = dom.prioritySelect.value;
  dom.prioritySelect.style.fontWeight = 'normal'; // Reset font weight
  if (selectedValue === 'low') {
    dom.prioritySelect.style.backgroundColor = '#4CAF50'; // Green
  } else if (selectedValue === 'medium') {
    dom.prioritySelect.style.backgroundColor = '#FFC107'; // Yellow
  } else if (selectedValue === 'high' || selectedValue === 'urgent') {
    dom.prioritySelect.style.backgroundColor = '#FF5733'; // Red
    if (selectedValue === 'urgent') {
      dom.prioritySelect.style.fontWeight = 'bold';
    } else {
      dom.prioritySelect.style.fontWeight = 'normal';
    }
  } else {
    dom.prioritySelect.style.backgroundColor = '#ffffff'; // White (reset)
    dom.prioritySelect.style.fontWeight = 'normal'; // Reset font weight
  }
});

// when clicking escape, close modals
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    dom.closeModals();
  }
});
