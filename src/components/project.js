class Project{
    constructor(name, todos) {
        this.name = name;
        this.todos = todos;
    }

    addTodo() {
        this.todos.push(new Todo);
    }

    removeTodo(index) {
        this.todos.splice(index, 1);
    }
}

export default Project;