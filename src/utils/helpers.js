import { formatDistance } from 'date-fns';

const getProjectsFromLocalStorage = () => {
  if (localStorage.getItem('projects')) {
    return JSON.parse(localStorage.getItem('projects'));
  } else {
    return [];
  }
};

const updateProjectsInLocalStorage = (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

function CreateEditBtn() {
  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-todo-btn');
  editBtn.style.backgroundImage = 'url(./editIcon.png)';
  editBtn.style.height = '40px';
  editBtn.style.width = '40px';
  editBtn.style.backgroundSize = '40px 40px';
  return editBtn;
}

function CreateProjectDivHeader() {
  const projectDivHeader = document.createElement('div');
  projectDivHeader.classList.add('projectHeader');
  projectDivHeader.style.width = '100%';
  projectDivHeader.style.display = 'flex';
  projectDivHeader.style.justifyContent = 'space-between';
  projectDivHeader.style.alignItems = 'center';
  return projectDivHeader;
}

function CreateProjectDiv() {
  const projectDiv = document.createElement('div');
  projectDiv.classList.add('project');
  return projectDiv;
}

function CreateProjectNameH3(name) {
  const projectNameH3 = document.createElement('h3');
  projectNameH3.textContent = name;
  return projectNameH3;
}

function CreateDeleteProjectBtn() {
  const deleteProjectBtn = document.createElement('Button');
  deleteProjectBtn.classList.add('delete-project-btn');
  deleteProjectBtn.style.backgroundImage = 'url(./deleteIcon.png)';
  return deleteProjectBtn;
}

function CreateDeleteTodoBtn() {
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-todo-btn');
  deleteBtn.style.backgroundImage = 'url(./deleteIcon.png)';
  deleteBtn.style.height = '40px';
  deleteBtn.style.width = '40px';
  deleteBtn.style.backgroundSize = '40px 40px';
  return deleteBtn;
}

function CreateTodoDiv(todo) {
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  todoDiv.innerHTML = `
              <h4>${todo.title}</h4>
              <h3>${todo.description}</h3>
              <p>${formatDistance(new Date(todo.dueDate), Date.now(), {
                addSuffix: true,
              })}</p>
              `;
  return todoDiv;
}

function UpdateTodoColor(todoDiv, priority) {
  if (priority === 'high') {
    todoDiv.style.backgroundColor = '#FF4365';
  } else if (priority === 'urgent') {
    todoDiv.style.backgroundColor = '#7C3238';
  } else if (priority === 'medium') {
    todoDiv.style.backgroundColor = '#E5B25D';
  } else {
    todoDiv.style.backgroundColor = '#81F499';
  }
}

export {
  UpdateTodoColor,
  CreateTodoDiv,
  CreateDeleteTodoBtn,
  CreateDeleteProjectBtn,
  CreateProjectNameH3,
  CreateProjectDiv,
  CreateProjectDivHeader,
  CreateEditBtn,
  updateProjectsInLocalStorage,
  getProjectsFromLocalStorage,
};
