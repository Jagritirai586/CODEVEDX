const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");

const total = document.getElementById("total");
const completed = document.getElementById("completed");
const pending = document.getElementById("pending");

function saveTasks() {
    const tasks = [];

    document.querySelectorAll(".task").forEach(task => {
        tasks.push({
            text: task.querySelector("span").innerText,
            completed: task.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStats() {
    const tasks = document.querySelectorAll(".task");

    total.textContent = tasks.length;

    const completedTasks =
        document.querySelectorAll(".task.completed").length;

    completed.textContent = completedTasks;
    pending.textContent = tasks.length - completedTasks;
}

function createTask(text, isCompleted = false) {

    const task = document.createElement("div");
    task.classList.add("task");

    if (isCompleted) {
        task.classList.add("completed");
    }

    task.innerHTML = `
        <div>
            <input type="checkbox" class="check" ${isCompleted ? "checked" : ""}>
            <span>${text}</span>
        </div>

        <div class="actions">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
    `;

    taskList.appendChild(task);

    const checkbox = task.querySelector(".check");

    checkbox.addEventListener("change", () => {
        task.classList.toggle("completed");
        updateStats();
        saveTasks();
    });

    task.querySelector(".delete")
        .addEventListener("click", () => {
            task.remove();
            updateStats();
            saveTasks();
        });

    task.querySelector(".edit")
        .addEventListener("click", () => {

            let span = task.querySelector("span");

            let newTask =
                prompt("Edit Task", span.innerText);

            if (newTask && newTask.trim() !== "") {
                span.innerText = newTask;
                saveTasks();
            }
        });

    updateStats();
    saveTasks();
}

addBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if (text === "") return;

    createTask(text);

    taskInput.value = "";
});

searchInput.addEventListener("keyup", () => {

    const value =
        searchInput.value.toLowerCase();

    document.querySelectorAll(".task")
        .forEach(task => {

            task.style.display =
                task.innerText.toLowerCase()
                    .includes(value)
                ? "flex"
                : "none";
        });
});

document
    .querySelectorAll(".filter-btn")
    .forEach(btn => {

        btn.addEventListener("click", () => {

            const filter =
                btn.dataset.filter;

            document
                .querySelectorAll(".task")
                .forEach(task => {

                    if (filter === "all")
                        task.style.display = "flex";

                    else if (filter === "completed")
                        task.style.display =
                            task.classList.contains("completed")
                            ? "flex" : "none";

                    else
                        task.style.display =
                            !task.classList.contains("completed")
                            ? "flex" : "none";
                });
        });
    });

document
    .getElementById("themeBtn")
    .addEventListener("click", () => {
        document.body.classList.toggle("light");
    });

function updateDateTime() {
    const now = new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    const date = now.toLocaleDateString("en-IN", options);
    const time = now.toLocaleTimeString("en-IN");

    document.getElementById("dateTime").innerHTML =
        `${date} | ${time}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();

const savedTasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

savedTasks.forEach(task => {
    createTask(task.text, task.completed);
});

updateStats();