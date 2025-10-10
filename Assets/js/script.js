// Array to store tasks
let tasks = [];

// 1. Add a new task
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text !== "") {
    tasks.push({ text: text, completed: false });
    input.value = ""; // clear input
    renderTasks();
  }
}

// 6. Render tasks list and update count
function renderTasks(displayTasks = tasks) {
  const list = document.getElementById("taskList");
  list.innerHTML = displayTasks
    .map((t, i) => `
      <li class="${t.completed ? "completed" : ""}">
        <span onclick="toggleTask(${i})">${t.text}</span>
        <button onclick="removeTask(${i})">Remove</button>
      </li>
    `)
    .join("");

  // Update tasks remaining count
  document.getElementById("taskCount").textContent =
    `Tasks remaining: ${tasks.filter(t => !t.completed).length}`;
}

// Show all tasks on page load
showAll();
