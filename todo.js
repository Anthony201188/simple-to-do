// script.js

let tasks = [];

function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = storedTasks || [];
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(filteredTasks = tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add('completed');
        }

        li.addEventListener('click', () => toggleTask(task.id));
        taskList.appendChild(li);
    });

    saveTasks(); // Save tasks to local storage after rendering
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text !== '') {
        tasks.push({ id: Date.now(), text, completed: false });
        taskInput.value = '';
        renderTasks();
    }
}

function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
}

function filterTasks(status) {
    let filteredTasks;

    switch (status) {
        case 'active':
            filteredTasks = tasks.filter(task => !task.completed);
            break;
        case 'completed':
            filteredTasks = tasks.filter(task => task.completed);
            break;
        default:
            filteredTasks = tasks;
    }

    renderTasks(filteredTasks);
}

loadTasks(); // Load tasks from local storage on page load
