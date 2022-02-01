{
  let tasks = [
    { content: "wypić kawę", done: true },
    { content: "zasadzić drzewo", done: false },
  ];

  const focusOnInput = () => {
    document.querySelector(".js-newTask").focus();
  };

  const clearInput = () => {
    document.querySelector(".js-newTask").value = "";
  };

  const tasksWithNewItem = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent, done: false }];
    render();
    clearInput();
  };

  const tasksWithRemovedTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const taskToggleDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const addToggleDoneEvents = () => {
    const taskToggleDoneButton =
      document.querySelectorAll(".js-taskToggleDone");

    taskToggleDoneButton.forEach((taskToggleDoneButton, taskIndex) => {
      taskToggleDoneButton.addEventListener("click", () => {
        taskToggleDone(taskIndex);
      });
    });
  };

  const addRemoveEvents = () => {
    const removeButton = document.querySelectorAll(".js-remove");

    removeButton.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        tasksWithRemovedTask(taskIndex);
      });
    });
  };

  const renderTasks = () => {
    let tasksListHTMLContent = "";

    for (const task of tasks) {
      tasksListHTMLContent += `
          <li class="listTasks__item">
            <button class="list__button list__button--toggleDone js-taskToggleDone">
              ${task.done ? "✔" : ""}
            </button> 
            <span class="listTasks__content
            ${task.done ? "listTasks__content--done" : ""}">
              ${task.content}
            </span>
            <button class="list__button list__button--remove js-remove">
              🗑
            </button> 
          </li>
        `;
    }

    const toDoList = document.querySelector(".js-listTasks");
    toDoList.innerHTML = tasksListHTMLContent;
  };

  const renderButtons = () => {};

  const addButtonsEvents = () => {};

  const render = () => {
    renderTasks();
    renderButtons();

    addRemoveEvents();
    addToggleDoneEvents();
    addButtonsEvents();
  };

  const onFormFocus = () => {
    const button = document.querySelector(".js-formButton");

    button.addEventListener("click", focusOnInput);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }

    tasksWithNewItem(newTaskContent);
  };

  const init = () => {
    render();
    onFormFocus();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
