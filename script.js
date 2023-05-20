// Array to store tasks
let tasks = [];

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'taskItem';
       
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        //checkbox.checked = task.completed;
        checkbox.addEventListener('change', function() {
            if (checkBox.checked) {
                taskText.style.textDecoration = 'line-through';
            } else {
                taskText.style.textDecoration = 'none';
            }
        });

        const taskText = document.createElement('span');
        taskText.innerText = task.title;

        
        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.className = 'edit';
        editButton.addEventListener('click', function() {
            const newTitle = prompt('Enter new task title', task.title);
            if (newTitle) {
                tasks[index].title = newTitle;
                saveTasks();
                renderTasks();
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'fas fa-trash trash delete-icon';
        deleteButton.addEventListener('click', function() {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
        
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}

// Function to render completed tasks
function renderCompletedTasks() {
    const completedTaskList = document.getElementById('completedTaskList');
    completedTaskList.innerHTML = '';

    completedTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'taskItem completed';

        const taskText = document.createElement('span');
        taskText.innerText = task.title;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', function() {
            completedTasks.splice(index, 1);
            saveTasks();
            renderCompletedTasks();
        });

        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteButton);

        completedTaskList.appendChild(taskItem);
    });
}

// Function to handle the add task button click event
function handleAddTask() {
    const taskInput = document.getElementById('taskInput');
    const taskTitle = taskInput.value.trim();
    if (taskTitle !== '') {
        const newTask = {
            title: taskTitle,
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        taskInput.value = '';
        renderTasks();
    }
}

// Function to handle the delete all tasks button click event
function handleDeleteAllTasks() {
    tasks = [];
    saveTasks();
    renderTasks();
}

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    const savedCompletedTasks = localStorage.getItem('completedTasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
    if (savedCompletedTasks) {
        completedTasks = JSON.parse(savedCompletedTasks);
        renderCompletedTasks();
    }
}

// Event listeners
document.getElementById('addButton').addEventListener('click', handleAddTask);
document.getElementById('deleteAllButton').addEventListener('click', handleDeleteAllTasks);

// Load tasks on page load
window.addEventListener('load', loadTasks);
