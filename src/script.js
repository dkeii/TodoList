"use strict";

// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
  // Prevent from submitting
  event.preventDefault();

  // Input value
  let inputValue = todoInput.value;

  // Todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create 'li'
  const newTodo = document.createElement("li");
  newTodo.innerText = inputValue;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // Add todo to Local Storage
  saveLocalTodos(inputValue);

  // Check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // Trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // Append to list
  todoList.appendChild(todoDiv);

  // Clear input
  todoInput.value = "";
}

function deleteCheck(event) {
  const item = event.target;

  // Delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;

    // Animation
    todo.classList.add("fall");

    removeLocalTodos(todo);

    // Waits til animation is finished
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // Check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        todo.classList.contains("completed")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none");
        break;
      case "uncompleted":
        !todo.classList.contains("completed")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none");
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // Check --- Do i already have thing in there?
  let todos;
  localStorage.getItem("todos") === null;
  todos = []
    ? (todos = JSON.parse(localStorage.getItem("todos")))
    : console.log(todos);
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  localStorage.getItem("todos") === null;
  todos = []
    ? (todos = JSON.parse(localStorage.getItem("todos")))
    : console.log(todos);

  todos.forEach((el) => {
    // Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create 'li'
    const newTodo = document.createElement("li");
    newTodo.innerText = el;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  // Check --- Do i already have thing in there?
  let todos;
  localStorage.getItem("todos") === null;
  todos = []
    ? (todos = JSON.parse(localStorage.getItem("todos")))
    : console.log(todos);

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
