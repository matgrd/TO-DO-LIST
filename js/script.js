{
  const tasks = [];

  const addFocus = () => {
    document.querySelector(".js-newTask").focus();
  };

  const clearInput = () => {
    document.querySelector(".js-newTask").value = "";
  };

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });
    render();
    clearInput();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const addToggleDoneEvents = () => {
    const taskDoneButton = document.querySelectorAll(".js-taskDone");

    taskDoneButton.forEach((taskDoneButton, taskIndex) => {
      taskDoneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };

  const addRemoveEvents = () => {
    const removeButton = document.querySelectorAll(".js-remove");

    removeButton.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
          <li class="listTasks__item">
            <button class="list__button js-taskDone">
              ${task.done ? "✔" : ""}
            </button> 
            <span class="listTasks__content
            ${task.done ? "listTasks__content--done" : ""}">
              ${task.content}
            </span>
            <button class="list__button list__button--remove js-remove">
              🗑️
            </button> 
          </li>
        `;
    }

    const toDoList = document.querySelector(".js-listTasks");
    toDoList.innerHTML = htmlString;

    addRemoveEvents();
    addToggleDoneEvents();
  };

  const onFormFocus = () => {
    const button = document.querySelector(".js-formButton");

    button.addEventListener("click", addFocus);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
  };

  const init = () => {
    render();
    onFormFocus();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
