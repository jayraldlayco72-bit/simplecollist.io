// Array to store tasks
let tasks = [];

// 1. Add a new task
function addTask() {
  const text = document.getElementById("taskInput").value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    document.getElementById("taskInput").value = "";
    renderTasks();
  }
}

// 2. Remove a task by index
function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// 3. Toggle task complete/incomplete
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// 4. Clear all completed tasks
function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  renderTasks();
}

// 5. Show all tasks
function showAll() {
  renderTasks(tasks);
}

// Show only active (not completed) tasks
function showActive() {
  renderTasks(tasks.filter(task => !task.completed));
}

// Show only completed tasks
function showCompleted() {
  renderTasks(tasks.filter(task => task.completed));
}

// 6. Render tasks list and update count
function renderTasks(displayTasks = tasks) {
  const list = document.getElementById("taskList");
  list.innerHTML = displayTasks
    .map((t, i) => `
      <li class="${t.completed ? "completed" : ""}">
        <span onclick="toggleTask(${i})">${t.text}</span>
        <button class="remove-btn" onclick="removeTask(${i})"></button>
      </li>
    `)
    .join("");

  // Update tasks remaining count
  document.getElementById("taskCount").textContent =
    `Tasks remaining: ${tasks.filter(t => !t.completed).length}`;
}

// Show all tasks on page load
showAll();
