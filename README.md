# Todo-List Demo - The Odin Project

A Todo list Webapp made with HTML, CSS and JS for the Odin Project. Bundled using Webpack.

[Live Link](https://antonharbers.github.io/Todo-List-Demo/)

![Repo Image](/src/images/repoImage.png)

## Folder Structure

## Key Concepts

### Javascript Classes

JavaScript classes, a syntax introduced in ES6, are a core concept in object-oriented programming. They provide a clear and concise way to create objects and handle inheritance. In web applications, classes are used to encapsulate and organize code. They represent entities like users, products, or in your case, projects and todos.

JS:

```
    class Todo {
        constructor(title, description, dueDate, priority, notes) {
            this.title = title;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
        }
        // ... other methods ...
    }
```

In my app, the Todo class encapsulates the properties and behaviors of a todo item. Each todo item is an instance of this class, making it easier to manage its attributes and methods.

Classes in JavaScript provide a more traditional object-oriented approach, making the code more readable, reusable, and easier to maintain.

### Separation of Logic

Separation of logic in programming involves dividing code into distinct sections, each handling specific tasks. This separation enhances code maintainability, readability, and testing. In web development, separating logic helps in organizing code into user interface (UI) manipulation, business logic, and data access layers.

JS:

```
    // In dom.js
    class Dom {
        renderProjects(projects) {
        // ... UI manipulation logic ...
        }
    }

    // In project.js
    class Project {
        removeTodo(index) {
        this.todos.splice(index, 1);
        }
    }
```

My app separates UI logic (handled in dom.js) from the business logic (like Project and Todo classes). This separation allows changing of the UI without affecting the core logic. Proper separation of logic is key to building scalable and maintainable applications. It allows different aspects of the application to evolve independently.

### Dates and date-fns Library

Handling dates in JavaScript can be complex due to time zones and formats. The date-fns library provides a set of reusable modules to simplify date operations. In applications, date-fns is used for formatting dates, calculating differences, or manipulating date/time values in a straightforward way.

JS:

```
    import { formatDistance } from 'date-fns';

    function CreateTodoDiv(todo) {
        // ... code ...
        `<p>${formatDistance(new Date(todo.dueDate), Date.now(), { addSuffix: true })}</p>`
        // ... code ...
    }
```

In the CreateTodoDiv function, date-fns is used to display the due date of a todo item relative to the current date. This makes the due date information user-friendly. Using a dedicated library like date-fns for date manipulation is a best practice, as it handles complexities and nuances of date/time calculations efficiently.

### localStorage

localStorage is a web storage API that allows storing key-value pairs in a web browser. It persists even when the browser is closed and reopened. It's commonly used for saving user preferences, storing application state, or caching data locally to improve performance.

JS:

```
    const getProjectsFromLocalStorage = () => {
        if (localStorage.getItem('projects')) {
            return JSON.parse(localStorage.getItem('projects'));
        } else {
            return [];
        }
    };
```

getProjectsFromLocalStorage fetches the saved projects. If there are no projects, it initializes an empty array. This function demonstrates how to retrieve and parse data from localStorage.

While localStorage is convenient for storing non-sensitive data, it's important to remember its limitations like storage capacity and lack of security for sensitive data.

## Final Notes

Absolutely, Brosef! Here's a more concise version of the final notes:

Throughout the development of my to-do list application, I've not only applied fundamental programming concepts but also gained insights into the nuances of building a functional web application. Utilizing JavaScript classes allowed me to structure my code more effectively, reinforcing the principles of object-oriented programming. The experience with localStorage was invaluable, teaching me about client-side data persistence and its crucial role in maintaining application state.

Integrating the date-fns library was a practical lesson in handling date manipulations in JavaScript, emphasizing the usefulness of external libraries in simplifying complex tasks. Additionally, the conscious effort to separate logic in the app's architecture proved essential for scalability and ease of maintenance. This project has been a significant step in my development journey, cementing my understanding of these concepts and showcasing the continuous learning process inherent in software development. Each challenge faced and feature implemented offered new learning opportunities, contributing to my growth as a programmer and deepening my appreciation for the intricacies of web development.

In essence, this project was more than just a coding exercise; it was a comprehensive learning experience that refined my skills in JavaScript and web application development. It stands as a testament to the importance of practical application in understanding and mastering programming concepts.
