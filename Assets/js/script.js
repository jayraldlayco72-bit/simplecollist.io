// Global variables
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

// 1. Add new task
function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    if (text) {
        tasks.push({ id: Date.now(), text, completed: false });
        input.value = '';
        saveAndRender();
    }
}

// 2. Toggle task completion or remove task
function toggleTask(id, action = 'toggle') {
    if (action === 'remove') {
        tasks = tasks.filter(task => task.id !== id);
    } else {
        const task = tasks.find(task => task.id === id);
        if (task) task.completed = !task.completed;
    }
    saveAndRender();
}

// 3. Filter tasks (all/active/completed)
function filterTasks(filter) {
    currentFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderTasks();
}

// 4. Clear completed tasks
function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveAndRender();
}

// 5. Render tasks to DOM
function renderTasks() {
    const taskList = document.getElementById('taskList');
    const filtered = tasks.filter(task => 
        currentFilter === 'all' || 
        (currentFilter === 'active' && !task.completed) || 
        (currentFilter === 'completed' && task.completed)
    );
    
    taskList.innerHTML = filtered.map(task => `
        <li class="${task.completed ? 'completed' : ''}" onclick="toggleTask(${task.id})">
            <span>${task.text}</span>
            <button class="remove-btn" onclick="event.stopPropagation(); toggleTask(${task.id}, 'remove')"></button>
        </li>
    `).join('');
    
    document.getElementById('taskCount').textContent = 
        `${tasks.filter(t => !t.completed).length} active, ${tasks.length} total`;
}

// 6. Save to localStorage and render
function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Shorthand filter functions
const showAll = () => filterTasks('all');
const showActive = () => filterTasks('active');
const showCompleted = () => filterTasks('completed');

// Enter key support
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('taskInput').addEventListener('keypress', e => {
        if (e.key === 'Enter') addTask();
    });
    renderTasks();
});
