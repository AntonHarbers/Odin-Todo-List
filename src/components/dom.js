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
    }

    renderTodos() {
        console.log("rendering todos");
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

    addProjectsToSelect(projects) {
        projects.forEach((project) => {
            const option = document.createElement("option");
            option.value = project.name;
            option.innerText = project.name;
            this.todoProjects.appendChild(option);
        });
    }        
}

export default Dom;
