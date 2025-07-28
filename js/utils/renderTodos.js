import { timers, setupTimerButtons } from "./timerHandler.js";

export function renderTodos(todos) {
  const todoContainer = document.querySelector(".todo__list");
  todoContainer.innerHTML = "";

  todos.forEach((todo) => {
    const html = `
      <div class="todo-item">
        <div class="todo-header">
          <div class="header-up">
            <div class='header__upside'>
              <h3 class='${todo.isCompleted ? "DoneTodo" : ""}'>${todo.id} - ${
      todo.todoName
    }</h3>
              <div class='timerDisplay__wrapper'>
                <button class="startBtn button" data-id="${
                  todo.id
                }">start</button>
                <div class="timerDisplay" data-id="${todo.id}">00:00:00</div>
                <button class="stopBtn button" data-id="${
                  todo.id
                }">stop</button>
              </div>
            </div>
          </div>
          <div class="todo-rating">
            <span class='todo__ratting__title'>${todo.difficulty} ⭐️</span>
          </div>
        </div>
        <p class='todo__description'>${todo.todoDescription}</p>

        <div class='todolist__icons'>
          <svg class="size-6 icon removeTodo" onclick='removeTodoHandler(${
            todo.id
          })'><use xlink:href="#trash"/></svg>
          
          <svg class="size-6 icon" onclick='doneTodoHandler(${
            todo.id
          })'><use xlink:href="#done"/></svg>
        </div>
      </div>
    `;
    todoContainer.insertAdjacentHTML("beforeend", html);
  });

  todos.forEach((todo) => setupTimerButtons(todo.id));
}
