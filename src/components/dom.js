import formatDistance from "date-fns/formatDistance";
import Todo from "./todo";

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
  }

  renderTodos(projects) {
    this.renderProjects(projects);
  }

  renderProjects(projects) {
    // clear all projects before rerender
    this.projectContainer.innerHTML = "";

    // add the projects to the project container
    projects.forEach((project) => {
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("project");
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
        const todoDiv = document.createElement("div");
        // a delete button for every todo
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-todo-btn");
        deleteBtn.innerText = "Delete";
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
        editBtn.innerText = "Edit";

        editBtn.addEventListener("click", () => {
          project.removeTodo(index);

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
            this.prioritySelect.style.backgroundColor = "#ff9980";
          } else if (todo.priority === "urgent") {
            this.prioritySelect.style.backgroundColor = "#ff471a";
          } else if (todo.priority === "medium") {
            this.prioritySelect.style.backgroundColor = "#ffc266";
          } else {
            this.prioritySelect.style.backgroundColor = "#85e085";
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
        todoDiv.innerHTML = `
                    <h4>${todo.title}</h4>
                    <p>${formatDistance(new Date(todo.dueDate), Date.now(), {
                      addSuffix: true,
                    })}</p>
                    `;

        todoDiv.appendChild(editBtn);
        todoDiv.appendChild(deleteBtn);

        // change the color of the todo based on the priority
        if (todo.priority === "high") {
          todoDiv.style.backgroundColor = "#ff9980";
        } else if (todo.priority === "urgent") {
          todoDiv.style.backgroundColor = "#ff471a";
        } else if (todo.priority === "medium") {
          todoDiv.style.backgroundColor = "#ffc266";
        } else {
          todoDiv.style.backgroundColor = "#85e085";
        }

        projectDiv.appendChild(todoDiv);
      });
    });
  }

  toggleProjectModal() {
    this.projectModal.classList.toggle("hidden");
    this.projectForm.reset();
    this.todoModal.classList.add("hidden");
  }

  toggleTodoModal() {
    this.todoModal.classList.toggle("hidden");
    this.todoForm.reset();
    this.projectModal.classList.add("hidden");
  }

  closeModals() {
    this.todoForm.reset();
    this.projectForm.reset();
    this.projectModal.classList.add("hidden");
    this.todoModal.classList.add("hidden");
    this.prioritySelect.style.backgroundColor = "#85e085";
  }

  addProjectsToSelect(projects) {
    // clear all options
    this.todoProjects.innerHTML = "";
    projects.forEach((project) => {
      const option = document.createElement("option");
      option.value = project.name;
      option.innerText = project.name;
      this.todoProjects.appendChild(option);
    });
  }
}

export default Dom;
