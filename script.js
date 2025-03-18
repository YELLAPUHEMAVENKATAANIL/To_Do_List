document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskValue = taskInput.value.trim();
    if (taskValue === "") return;

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");
    li.innerHTML = `<span onclick="toggleTask(this)">${taskValue}</span> <button class='delete' onclick='removeTask(this)'>X</button>`;
    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}

function removeTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function toggleTask(span) {
    span.classList.toggle("completed");
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.children[0].textContent,
            completed: li.children[0].classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `<span onclick="toggleTask(this)" class="${task.completed ? 'completed' : ''}">${task.text}</span> <button class='delete' onclick='removeTask(this)'>X</button>`;
        taskList.appendChild(li);
    });
}
