const taskName = document.querySelector("#task-name");
const btnCreateTask = document.querySelector("#btn-create-task");
const tasksList = document.querySelector(".task-manager-list");
let tasksArray = [];

btnCreateTask.addEventListener("click", function () {
  if (taskName.value !== "") {
    const currentTaskName = taskName.value;
    const task = {
      id: tasksArray.length + 1,
      name: currentTaskName,
      status: false,
    };

    createElement(
      "div",
      "task-manager-list-item",
      '<div class="task-manager-list-item__btn-complete">' +
        `<button type="button" class="btn btn-secondary btn-complete-task-${task.id}">Complete</button>` +
        "</div>" +
        '<div class="task-manager-list-item__btn-delete">' +
        `<button type="button" class="btn btn-danger btn-delete-task-${task.id}">Delete</button>` +
        "</div>" +
        '<div class="task-manager-list-item__task-name">' +
        `<p class="task-manager-list-item__task-name-text-${task.id}">${currentTaskName}</p>` +
        "</div>",
      `task-${task.id}`,
      tasksList
    );
    tasksArray.push(task);
    taskName.value = "";

    // Обработка нажатия на кнопку Delete
    const btnDeleteTask = document.querySelector(`.btn-delete-task-${task.id}`);
    btnDeleteTask.addEventListener("click", function () {
      tasksArray.forEach((element, index) => {
        if (task.id === element.id) {
          tasksArray.splice(index, 1);
        }
      });
      const btnParentElement = btnDeleteTask.parentElement.parentElement;
      btnParentElement.remove();
    });

    // Обработка нажатия на кнопку Complete
    const btnCompleteTask = document.querySelector(
      `.btn-complete-task-${task.id}`
    );
    const taskNameText = document.querySelector(
      `.task-manager-list-item__task-name-text-${task.id}`
    );
    btnCompleteTask.addEventListener("click", function () {
      tasksArray.forEach((element, index) => {
        if (task.id === element.id) {
          if (!element.status) {
            element.status = true;
            btnCompleteTask.innerHTML = "Undo";
            taskNameText.style.textDecoration = "line-through";
          } else {
            element.status = false;
            btnCompleteTask.innerHTML = "Complete";
            taskNameText.style.textDecoration = "none";
          }
        }
      });
    });
  } else {
    alert("Вы ничего не ввели");
  }
});

function createElement(tagName, className, html, id, ship) {
  let element = document.createElement(tagName);
  element.className = className;
  element.innerHTML = html;
  element.id = id;
  ship.append(element);
}
