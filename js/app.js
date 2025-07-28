import { addTodo, removeTodo, todoCompleted } from "../redux/creator.js";
import { store } from "../redux/store.js";
import { showLoader, hideLoader } from "../js/loader.js";
import { applyFiltersAndSort } from "./utils/filterSort.js";
import { getIranDateTime } from "./utils/dateUtils.js";
import { validateForm } from "./utils/validateForm.js";
import { renderTodos } from "./utils/renderTodos.js";
import { exportTodosToPDF } from "./utils/exportPdf.js";

const setThemeLight = document.querySelector(".setThemeLight");
const setThemeDark = document.querySelector(".setThemeDark");
const colorOption = document.querySelectorAll(".color__change");
const todoContainer = document.querySelector(".todo__list");
const formTodos = document.querySelector(".form__addTodo");
const colorOptionReset = document.querySelector(".color__option__reset");
const stars = document.querySelectorAll(".star");
const difficultyValue = document.querySelector(".getDifficultyValue");
const emptyTodo = document.querySelector(".addTodo__button");
const addTodoInput = document.querySelector(".add__input");
const filterSelect = document.getElementById("selectBox1");
const sortSelect = document.getElementById("selectBox2");

const timers = {};

let filterValue = "all";
let sortValue = null;

document.addEventListener("DOMContentLoaded", () => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  showLoader();
  // load theme from localStorage
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.remove("body_dark");
  } else if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("body_dark");
  } else {
    document.body.classList.remove("body_dark");
  }
  if (localStorage.getItem("theme") === "light") {
    if (localStorage.getItem("ThemeColor")) {
      setColorTheme("0c07079c");
    } else {
      setColorTheme("#cfc9c99c");
    }
  }

  const themeColor = localStorage.getItem("ThemeColor");
  themeColor ? setColorTheme(themeColor) : "";
  setTimeout(() => {
    hideLoader();
    if (Array.isArray(todos) && todos.length > 0) {
      renderTodos(todos);
    }
  }, 1000);
});

const updateTodosUI = () => {
  const todos = store.getState();
  const filteredAndSorted = applyFiltersAndSort(todos, filterValue, sortValue);
  renderTodos(filteredAndSorted);
};

const clearErrors = () => {
  document.querySelector(".todoName__Error").textContent = "";
  document.querySelector(".todoCategory_Error").textContent = "";
  document.querySelector(".todoDifficulty_Error").textContent = "";
  document.querySelector(".todoDescription_Error").textContent = "";
};

window.removeTodoHandler = (id) => {
  store.dispatch(removeTodo(id));
};

window.doneTodoHandler = (id) => {
  store.dispatch(todoCompleted(id));
};

const getTodos = (event) => {
  const todos = store.getState();
  event.preventDefault();
  let formData = new FormData(formTodos);
  let todoName = formData.get("todoName");
  let todoDescription = formData.get("todoDescription");
  let difficulty = formData.get("difficulty__value");
  let category = formData.get("category");
  let obj = {
    id: todos ? todos.length + 1 : 1,
    todoName,
    category,
    difficulty,
    todoDescription,
    isCompleted: false,
    dateModified: getIranDateTime(),
  };
  const formErrors = validateForm(obj);
  console.log(obj.dateModified);
  clearErrors();
  if (Object.keys(formErrors).length === 0) {
    store.dispatch(addTodo(obj));
    formTodos.reset();
    return;
  } else if (formErrors) {
    if (formErrors.todoName) {
      document.querySelector(".todoName__Error").innerHTML =
        formErrors.todoName;
      document
        .querySelector(".todoName__Error")
        .classList.add(".error__margin");
    }
    if (formErrors.category) {
      document.querySelector(".todoCategory_Error").textContent =
        formErrors.category;
      document
        .querySelector(".todoCategory_Error")
        .classList.add(".error__margin");
    }
    if (formErrors.difficulty) {
      document.querySelector(".todoDifficulty_Error").textContent =
        formErrors.difficulty;
    }
    if (formErrors.todoDescription) {
      document.querySelector(".todoDescription_Error").textContent =
        formErrors.todoDescription;
    }
  } else {
    formTodos.reset();
  }
};

const handleStars = (value) => {
  console.log(value);
  stars.forEach((star, index) => {
    if (index + 1 <= value) {
      star.classList.add("star__active");
    } else {
      star.classList.remove("star__active");
    }
  });
};

const handleResetColor = () => {
  if (
    localStorage.getItem("theme") == "light" ||
    !localStorage.getItem("theme")
  ) {
    setColorTheme("#0c07079c");
    localStorage.setItem("ThemeColor", "#0c07079c");
  } else {
    setColorTheme("#cfc9c99c");
    localStorage.setItem("ThemeColor", "#cfc9c99c");
  }
  colorOption.forEach((b) => b.classList.remove("color__option_active"));
};

const setColorTheme = (color) => {
  document.documentElement.style.setProperty("--border-color", color);
  document.documentElement.style.setProperty("--text-colors", color);
  document.documentElement.style.setProperty("--icon-color", color);
};

let startTime = null;
let timerId = null;
let totalTime = 0;

function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
}

filterSelect.addEventListener("change", (e) => {
  filterValue = e.target.value;
  updateTodosUI();
});

sortSelect.addEventListener("change", (e) => {
  sortValue = e.target.value;
  updateTodosUI();
});

emptyTodo.addEventListener("click", () => {
  addTodoInput.focus();
});

setThemeDark.addEventListener("click", () => {
  document.body.classList.remove("body_light");

  const themeColor = localStorage.getItem("ThemeColor");
  document.body.classList.add("body_dark");
  if (!themeColor || themeColor == "#0c07079c") {
    localStorage.setItem("ThemeColor", "#cfc9c99c");
    setColorTheme("#cfc9c99c");
    console.log("themeColor");
  } else if (themeColor) {
    setColorTheme(themeColor);
  }

  localStorage.setItem("theme", "dark");
});

setThemeLight.addEventListener("click", () => {
  document.body.classList.remove("body_dark");
  document.body.classList.add("body_light");
  localStorage.setItem("theme", "light");
  const themeColor = localStorage.getItem("ThemeColor");

  if (themeColor !== "#cfc9c99c") {
    setColorTheme(themeColor);
  } else if (themeColor == "#cfc9c99c") {
    localStorage.setItem("ThemeColor", "#0c07079c");
  }
});

colorOption.forEach((box) => {
  box.classList.remove("color__option_active");
  box.addEventListener("click", () => {
    colorOption.forEach((b) => b.classList.remove("color__option_active"));
    setColorTheme(box.dataset.color);
    localStorage.setItem("ThemeColor", box.dataset.color);
    box.classList.add("color__option_active");
  });
});

store.subscribe(() => {
  const todos = store.getState();
  localStorage.setItem("todos", JSON.stringify(todos));
  updateTodosUI();
});

stars.forEach((star) => {
  star.addEventListener("click", () => {
    star.classList.add("star__active");
    handleStars(star.dataset.value);
    difficultyValue.value = star.dataset.value;
  });
});

formTodos.addEventListener("submit", (event) => getTodos(event));
colorOptionReset.addEventListener("click", (e) => handleResetColor(e));

document.querySelector(".startBtn")?.addEventListener("click", () => {
  if (!startTime) {
    startTime = Date.now();
    timerId = setInterval(() => {
      const elapsed = Date.now() - startTime + totalTime;
      document.getElementsByClassName("timerDisplay").textContent =
        formatTime(elapsed);
    }, 1000);
  }
});

document.querySelector(".stopBtn")?.addEventListener("click", () => {
  if (startTime) {
    clearInterval(timerId);
    totalTime += Date.now() - startTime;
    startTime = null;
    document.getElementsByClassName("timerDisplay").textContent =
      formatTime(totalTime);
  }
});

document
  .querySelector(".export__button")
  .addEventListener("click", exportTodosToPDF);
