let tasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const dateInput = document.getElementById("dateInput");

    if (taskInput.value.trim() === "") return alert("Task cannot be empty!");

    tasks.push({
        id: Date.now(),
        text: taskInput.value,
        date: dateInput.value || "-",
        status: "on-progress"
    });

    taskInput.value = "";
    dateInput.value = "";

    renderTasks();
}

function renderTasks(filter = "all") {
    const tbody = document.getElementById("todoList");
    tbody.innerHTML = "";

    tasks
        .filter(t => (filter === "all" ? true : t.status === filter))
        .forEach(task => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${task.text}</td>
                <td>${task.date}</td>
                <td>
                    <button class="status-btn ${task.status}"
                        onclick="toggleStatus(${task.id})">
                        ${task.status}
                    </button>
                </td>
                <td>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">
                        Delete
                    </button>
                </td>
            `;

            tbody.appendChild(row);
        });
}

function toggleStatus(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.status = task.status === "done" ? "on-progress" : "done";
        }
        return task;
    });

    applyFilter();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    applyFilter();
}

function deleteAll() {
    if (confirm("Clear all tasks?")) {
        tasks = [];
        renderTasks();
    }
}

function applyFilter() {
    const filter = document.getElementById("filterStatus").value;
    renderTasks(filter);
}
