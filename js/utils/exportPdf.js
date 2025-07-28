import { store } from "../../redux/store.js";

export function exportTodosToPDF() {
  const state = store.getState();
  const todos = JSON.parse(localStorage.getItem("todos"));
  const container = document.createElement("div");
  container.style.fontFamily = "Vazirmatn, sans-serif";
  container.style.padding = "20px";
  container.style.maxWidth = "800px";
  container.style.margin = "0 auto";

  Array.isArray(todos) && todos.length > 0
    ? todos.forEach((todo, index) => {
        const block = document.createElement("div");
        block.style.border = "2px solid goldenrod";
        block.style.borderRadius = "10px";
        block.style.padding = "15px";
        block.style.marginBottom = "20px";
        block.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";

        block.innerHTML = `
      <h3>${index + 1} - ${todo.todoName || "No title"}</h3>
      <p><strong>⭐ Difficulty:</strong> ${todo.difficulty}</p>
      <p><strong>📂 Category:</strong> ${todo.category}</p>
      <p><strong>📝 Description:</strong> ${todo.todoDescription}</p>
      <p><strong>Status:</strong> ${
        todo.isCompleted ? "✅ Done" : "❌ Not Done"
      }</p>
    `;
        container.appendChild(block);
      })
    : "";

  const opt = {
    margin: 0.5,
    filename: "todo-list.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  html2pdf().set(opt).from(container).save();
}
