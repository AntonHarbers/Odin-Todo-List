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
    }

    renderTodos(projects) {
        this.renderProjects(projects);
    }

    renderProjects(projects){
        console.log("rendering projects");
        this.projectContainer.innerHTML = "";
        projects.forEach((project) => {
            const projectDiv = document.createElement("div");
            projectDiv.classList.add("project");
            projectDiv.innerHTML = `
                <h3>${project.name}</h3>
            `;
            this.projectContainer.appendChild(projectDiv);
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

    closeModals(){
        this.todoForm.reset();
        this.projectForm.reset();
        this.projectModal.classList.add("hidden");
        this.todoModal.classList.add("hidden");
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
