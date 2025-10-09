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

// 2. Render tasks list and update count
function renderTasks(displayTasks = tasks) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  displayTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button onclick="removeTask(${index})">Remove</button>
    `;

    list.appendChild(li);
  });

  // Update tasks remaining count
  const remaining = tasks.filter(task => !task.completed).length;
  document.getElementById("taskCount").textContent = `Tasks remaining: ${remaining}`;
}

// Show all tasks on page load
showAll();
