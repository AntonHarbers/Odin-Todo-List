import formatDistance from 'date-fns/formatDistance';
import deleteProject from '../index.js';
import {
  updateProjectsInLocalStorage,
  CreateEditBtn,
  CreateProjectDivHeader,
  CreateProjectDiv,
  CreateProjectNameH3,
  CreateDeleteProjectBtn,
  CreateDeleteTodoBtn,
  CreateTodoDiv,
  UpdateTodoColor,
} from '../utils/helpers.js';

class Dom {
  constructor() {
    this.projectContainer = document.getElementById('projects');
    this.addProjectBtn = document.getElementById('add-project-btn');
    this.addTodoBtn = document.getElementById('add-todo-btn');
    this.projectModal = document.getElementById('project-modal');
    this.todoModal = document.getElementById('todo-modal');
    this.projectForm = document.getElementById('project-form');
    this.todoForm = document.getElementById('todo-form');
    this.todoProjects = document.getElementById('todo-projects');
    this.projectNameInput = document.getElementById('project-name-input');
    this.projectSelect = document.getElementById('todo-projects');
    this.prioritySelect = document.getElementById('todo-priority');
    this.todoNameInput = document.getElementById('todo-name');
    this.todoDescInput = document.getElementById('todo-desc');
    this.todoDueDateInput = document.getElementById('todo-date');
    this.todoSubmitBtn = document.getElementById('todo-submit-btn');
  }

  renderTodos(projects) {
    this.renderProjects(projects);
  }

  renderProjects(projects) {
    // clear all projects before rerender
    this.projectContainer.innerHTML = '';

    projects.sort((a, b) => b.todos.length - a.todos.length);

    // add the projects to the project container
    projects.forEach((project, projectIndex) => {
      const projectDiv = CreateProjectDiv();
      const projectDivHeader = CreateProjectDivHeader();
      projectDivHeader.appendChild(CreateProjectNameH3(project.name));
      projectDiv.appendChild(projectDivHeader);

      this.projectContainer.appendChild(projectDiv);
      // add remove button if project is not named default
      if (project.name !== 'Default') {
        const deleteProjectBtn = CreateDeleteProjectBtn();
        projectDivHeader.appendChild(deleteProjectBtn);
        deleteProjectBtn.addEventListener('click', () => {
          deleteProject(projectIndex);
        });
      }

      // sort todos by due date, soonest first
      project.todos.sort((a, b) => {
        return new Date(a.dueDate) - new Date(b.dueDate);
      });

      // add the todos in every project to the project div
      project.todos.forEach((todo, index) => {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        const deleteBtn = CreateDeleteTodoBtn();
        deleteBtn.addEventListener('click', () => {
          project.removeTodo(index);
          updateProjectsInLocalStorage(projects);
          this.renderTodos(projects);
        });

        // an edit button for every todo
        const editBtn = CreateEditBtn();

        editBtn.addEventListener('click', () => {
          project.removeTodo(index);
          this.todoSubmitBtn.value = 'Update Todo';
          this.toggleTodoModal();

          this.todoNameInput.value = todo.title;
          this.todoDescInput.value = todo.description;
          this.todoDueDateInput.value = todo.dueDate;
          this.prioritySelect.value = todo.priority;
          this.todoProjects.value = project.name;

          // change the color of the priority select based on the priority
          if (todo.priority === 'high') {
            this.prioritySelect.style.backgroundColor = '#FF4365';
          } else if (todo.priority === 'urgent') {
            this.prioritySelect.style.backgroundColor = '#7C3238';
          } else if (todo.priority === 'medium') {
            this.prioritySelect.style.backgroundColor = '#E5B25D';
          } else {
            this.prioritySelect.style.backgroundColor = '#81F499';
          }

          // add an event listener to the form to update the todo
          this.todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.todoNameInput.value === '') {
              this.todoNameInput.classList.add('error');
              this.todoNameInput.placeholder = 'Please enter a todo name';
              return;
            } else {
              this.todoNameInput.classList.remove('error');
              this.todoNameInput.placeholder = 'Todo name';
            }

            if (this.todoDueDateInput.value === '') {
              this.todoDueDateInput.classList.add('error');
              return;
            } else {
              this.todoDueDateInput.classList.remove('error');
            }

            todo.updateTodo(
              this.todoNameInput.value,
              this.todoDescInput.value,
              this.todoDueDateInput.value,
              this.prioritySelect.value,
              this.todoProjects.value
            );
            updateProjectsInLocalStorage(projects);
            this.renderTodos(projects);
            this.toggleTodoModal();
            this.todoForm.removeEventListener('submit', () => {});
          });
        });

        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(deleteBtn);

        const todoDiv = CreateTodoDiv(todo);
        todoDiv.appendChild(buttonContainer);
        UpdateTodoColor(todoDiv, todo.priority);

        projectDiv.appendChild(todoDiv);
      });
    });
  }

  toggleProjectModal() {
    this.projectModal.classList.toggle('hidden');
    this.projectForm.reset();
    this.todoModal.classList.add('hidden');
  }

  toggleTodoModal() {
    this.todoModal.classList.toggle('hidden');
    this.todoForm.reset();
    this.projectModal.classList.add('hidden');
    this.todoNameInput.classList.remove('error');
    this.prioritySelect.style.backgroundColor = '#81F499';
  }

  closeModals() {
    this.todoForm.reset();
    this.projectForm.reset();
    this.projectModal.classList.add('hidden');
    this.todoModal.classList.add('hidden');
    this.prioritySelect.style.backgroundColor = '#81F499';
    this.todoSubmitBtn.value = 'Create Todo';
  }

  addProjectsToSelect(projects) {
    // clear all options
    this.todoProjects.innerHTML = '';
    projects.forEach((project) => {
      const option = document.createElement('option');
      option.value = project.name;
      option.innerText = project.name;
      this.todoProjects.appendChild(option);
    });
  }
}

export default Dom;
