<<<<<<< HEAD
import formatDistance from 'date-fns/formatDistance';

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
=======
import formatDistance from "date-fns/formatDistance";
import deleteProject from "../index.js"

class Dom {
  constructor() {
    this.projectContainer = document.getElementById("projects");
    this.addProjectBtn = document.getElementById("add-project-btn");
    this.addTodoBtn = document.getElementById("add-todo-btn");
    this.projectModal = document.getElementById("project-modal");
    this.todoModal = document.getElementById("todo-modal");
    this.projectForm = document.getElementById("project-form");
    this.todoForm = document.getElementById("todo-form");
    this.todoProjects = document.getElementById("todo-projects");
    this.projectNameInput = document.getElementById("project-name-input");
    this.projectSelect = document.getElementById("todo-projects");
    this.prioritySelect = document.getElementById("todo-priority");
    this.todoNameInput = document.getElementById("todo-name");
    this.todoDescInput = document.getElementById("todo-desc");
    this.todoDueDateInput = document.getElementById("todo-date");
    this.todoSubmitBtn = document.getElementById("todo-submit-btn");
>>>>>>> 94c324759f049fd2de74ef79c74d54a6a986f4d7
  }

  renderTodos(projects) {
    this.renderProjects(projects);
  }

  renderProjects(projects) {
    // clear all projects before rerender
<<<<<<< HEAD
    this.projectContainer.innerHTML = '';

    // add the projects to the project container
    projects.forEach((project) => {
      const projectDiv = document.createElement('div');
      projectDiv.classList.add('project');
      projectDiv.innerHTML = `
                <h3>${project.name}</h3>
            `;
      this.projectContainer.appendChild(projectDiv);

      // sort todos by due date, soonest first

      project.todos.sort((a, b) => {
        return new Date(a.dueDate) - new Date(b.dueDate);
      });

      // add the todos in every project to the project div
      project.todos.forEach((todo, index) => {
        const todoDiv = document.createElement('div');
        // a delete button for every todo
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-todo-btn');
        deleteBtn.innerText = 'Delete';
        deleteBtn.addEventListener('click', () => {
          // remove the todo from the project
          project.todos.splice(index, 1);
          // save the projects to local storage
          localStorage.setItem('projects', JSON.stringify(projects));

          this.renderTodos(projects);
        });
        // an edit button for every todo
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-todo-btn');
        editBtn.innerText = 'Edit';

        todoDiv.classList.add('todo');
=======
    this.projectContainer.innerHTML = "";

    projects.sort((a,b) => b.todos.length - a.todos.length)

    // add the projects to the project container
    projects.forEach((project, projectIndex) => {
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("project");
      const projectDivHeader = document.createElement("div");
      projectDivHeader.classList.add("projectHeader")
      const projectNameH3 = document.createElement("h3");
      projectNameH3.textContent = project.name;
      projectDivHeader.appendChild(projectNameH3);
      projectDiv.appendChild(projectDivHeader);

      projectDivHeader.style.width = "100%"
      projectDivHeader.style.display = "flex";
      projectDivHeader.style.justifyContent = "space-between";
      projectDivHeader.style.alignItems = "center";

      this.projectContainer.appendChild(projectDiv);
      // add remove button if project is not named default
      if(project.name !== "Default"){
        const deleteProjectBtn = document.createElement("Button");
        deleteProjectBtn.classList.add("delete-project-btn");
        deleteProjectBtn.style.backgroundImage = "url(./deleteIcon.png)";
        projectDivHeader.appendChild(deleteProjectBtn)
        deleteProjectBtn.addEventListener("click", () => {
          console.log('works');
          console.log(deleteProject)
          deleteProject(projectIndex)
        })
      }

      // sort todos by due date, soonest first
      project.todos.sort((a, b) => {
        return new Date(a.dueDate) - new Date(b.dueDate);
      });

      // add the todos in every project to the project div
      project.todos.forEach((todo, index) => {
        const todoDiv = document.createElement("div");
        const buttonContainer = document.createElement("div");
        buttonContainer.style.display = "flex";
        // a delete button for every todo
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-todo-btn");
        deleteBtn.style.backgroundImage = "url(./deleteIcon.png)"
        deleteBtn.style.height = "40px";
        deleteBtn.style.width = "40px";
        deleteBtn.style.backgroundSize = "40px 40px";
        deleteBtn.addEventListener("click", () => {
          // remove the todo from the project
          project.removeTodo(index);
          // save the projects to local storage
          localStorage.setItem("projects", JSON.stringify(projects));

          this.renderTodos(projects);
        });
        // an edit button for every todo
        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-todo-btn");
        editBtn.style.backgroundImage = "url(./editIcon.png)";
        editBtn.style.height = '40px'
        editBtn.style.width = '40px'
        editBtn.style.backgroundSize = "40px 40px"

        editBtn.addEventListener("click", () => {
          project.removeTodo(index);
          console.log(this.todoSubmitBtn)
          this.todoSubmitBtn.value = "Update Todo"

          // open a modal to edit the todo
          this.toggleTodoModal();
          // fill the form with the todo information
          this.todoNameInput.value = todo.title;
          this.todoDescInput.value = todo.description;
          this.todoDueDateInput.value = todo.dueDate;
          this.prioritySelect.value = todo.priority;
          this.todoProjects.value = project.name;
          // change the color of the priority select based on the priority
          if (todo.priority === "high") {
            this.prioritySelect.style.backgroundColor = "#FF4365";
          } else if (todo.priority === "urgent") {
            this.prioritySelect.style.backgroundColor = "#7C3238";
          } else if (todo.priority === "medium") {
            this.prioritySelect.style.backgroundColor = "#E5B25D";
          } else {
            this.prioritySelect.style.backgroundColor = "#81F499";
          }

          // add an event listener to the form to update the todo
          this.todoForm.addEventListener("submit", (e) => {
            e.preventDefault();
            // check if todo name is empty
            if (this.todoNameInput.value === "") {
              this.todoNameInput.classList.add("error");
              this.todoNameInput.placeholder = "Please enter a todo name";
              return;
            } else {
              this.todoNameInput.classList.remove("error");
              this.todoNameInput.placeholder = "Todo name";
            }

            // check if todo date is empty
            if (this.todoDueDateInput.value === "") {
              this.todoDueDateInput.classList.add("error");
              return;
            } else {
              this.todoDueDateInput.classList.remove("error");
            }

            // update the todo
            todo.updateTodo(
              this.todoNameInput.value,
              this.todoDescInput.value,
              this.todoDueDateInput.value,
              this.prioritySelect.value,
              this.todoProjects.value
            );
            // save the projects to local storage
            localStorage.setItem("projects", JSON.stringify(projects));
            // render the todos
            this.renderTodos(projects);
            // close the modal
            this.toggleTodoModal();
            this.todoForm.removeEventListener("submit", () => {});

          });
        });

        todoDiv.classList.add("todo");
>>>>>>> 94c324759f049fd2de74ef79c74d54a6a986f4d7
        todoDiv.innerHTML = `
                    <h4>${todo.title}</h4>
                    <p>${formatDistance(new Date(todo.dueDate), Date.now(), {
                      addSuffix: true,
                    })}</p>
                    `;

<<<<<<< HEAD
        todoDiv.appendChild(editBtn);
        todoDiv.appendChild(deleteBtn);

        // change the color of the todo based on the priority
        if (todo.priority === 'high') {
          todoDiv.style.backgroundColor = '#ff9980';
        } else if (todo.priority === 'urgent') {
          todoDiv.style.backgroundColor = '#ff471a';
        } else if (todo.priority === 'medium') {
          todoDiv.style.backgroundColor = '#ffc266';
        } else {
          todoDiv.style.backgroundColor = '#85e085';
=======
        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(deleteBtn);
        todoDiv.appendChild(buttonContainer);

        // change the color of the todo based on the priority
        if (todo.priority === "high") {
          todoDiv.style.backgroundColor = "#FF4365";
        } else if (todo.priority === "urgent") {
          todoDiv.style.backgroundColor = "#7C3238";
        } else if (todo.priority === "medium") {
          todoDiv.style.backgroundColor = "#E5B25D";
        } else {
          todoDiv.style.backgroundColor = "#81F499";
>>>>>>> 94c324759f049fd2de74ef79c74d54a6a986f4d7
        }

        projectDiv.appendChild(todoDiv);
      });
    });
  }

  toggleProjectModal() {
<<<<<<< HEAD
    this.projectModal.classList.toggle('hidden');
    this.projectForm.reset();
    this.todoModal.classList.add('hidden');
  }

  toggleTodoModal() {
    this.todoModal.classList.toggle('hidden');
    this.todoForm.reset();
    this.projectModal.classList.add('hidden');
  }

  closeModals() {
    this.todoForm.reset();
    this.projectForm.reset();
    this.projectModal.classList.add('hidden');
    this.todoModal.classList.add('hidden');
    this.prioritySelect.style.backgroundColor = '#85e085';
  }

  addProjectsToSelect(projects) {
    // clear all options
    this.todoProjects.innerHTML = '';
    projects.forEach((project) => {
      const option = document.createElement('option');
=======
    this.projectModal.classList.toggle("hidden");
    this.projectForm.reset();
    this.todoModal.classList.add("hidden");
  }

  toggleTodoModal() {
    this.todoModal.classList.toggle("hidden");
    this.todoForm.reset();
    this.projectModal.classList.add("hidden");
    this.todoNameInput.classList.remove("error");
    this.prioritySelect.style.backgroundColor = "#81F499";

  }

  closeModals() {
    this.todoForm.reset();
    this.projectForm.reset();
    this.projectModal.classList.add("hidden");
    this.todoModal.classList.add("hidden");
    this.prioritySelect.style.backgroundColor = "#81F499";
    this.todoSubmitBtn.value = "Create Todo"
  }

  addProjectsToSelect(projects) {
    // clear all options
    this.todoProjects.innerHTML = "";
    projects.forEach((project) => {
      const option = document.createElement("option");
>>>>>>> 94c324759f049fd2de74ef79c74d54a6a986f4d7
      option.value = project.name;
      option.innerText = project.name;
      this.todoProjects.appendChild(option);
    });
  }
<<<<<<< HEAD
=======

>>>>>>> 94c324759f049fd2de74ef79c74d54a6a986f4d7
}

export default Dom;
