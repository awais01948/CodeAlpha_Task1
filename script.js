// Select elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load saved tasks from localStorage
window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTask(task.text, task.completed));
};

// Add button click event
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    saveTasks();
    taskInput.value = "";
  }
});

// Add task function
function addTask(text, completed = false) {
  const li = document.createElement("li");
  li.className = "task";
  if (completed) li.classList.add("completed");
  li.innerHTML = `
    <span>${text}</span>
    <div>
      <button class="done-btn">Done</button>
      <button class="delete-btn">Remove</button>
    </div>
  `;

  // Complete task
  li.querySelector(".done-btn").addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete task
  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
}

// Save all tasks to localStorage
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