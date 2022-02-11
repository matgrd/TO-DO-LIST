{
  let tasks = [
    { content: "wypić kawę", done: true },
    { content: "zasadzić drzewo", done: false },
  ];

  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent, done: false }];
    render();
  };

  const removedTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const markAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;

    render();
  };

  const addRemoveEvents = () => {
    const removeButton = document.querySelectorAll(".js-remove");

    removeButton.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removedTask(taskIndex);
      });
    });
  };

  const addToggleDoneEvents = () => {
    const taskToggleDoneButton =
      document.querySelectorAll(".js-taskToggleDone");

    taskToggleDoneButton.forEach((taskToggleDoneButton, taskIndex) => {
      taskToggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };

  const renderTasks = () => {
    const taskToHTML = (task) =>
      ` <li class="listTasks__item
          ${task.done && hideDoneTasks ? "listTasks__item--hidden" : ""}">
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

    const tasksElement = document.querySelector(".js-listTasks");
    tasksElement.innerHTML = tasks.map(taskToHTML).join("");
  };

  const renderButtons = () => {
    const listTasksButtonsElement = document.querySelector(".js-buttons");

    if (!tasks.length) {
      listTasksButtonsElement.innerHTML = "";
      return;
    }

    listTasksButtonsElement.innerHTML = `
        <button class="buttons__button js-toggleHideTasksDone">
          ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="buttons__button js-markAllTasksDone"
        ${tasks.every(({ done }) => done) ? "disabled" : ""}>
          Ukończ wszystkie
        </button>
      `;
  };

  const addButtonsEvents = () => {
    const markAllTasksDoneButton = document.querySelector(
      ".js-markAllTasksDone"
    );

    if (markAllTasksDoneButton) {
      markAllTasksDoneButton.addEventListener("click", markAllTasksDone);
    }

    const toggleHideTasksDoneButton = document.querySelector(
      ".js-toggleHideTasksDone"
    );

    if (toggleHideTasksDoneButton) {
      toggleHideTasksDoneButton.addEventListener("click", toggleHideDoneTasks);
    }
  };

  const render = () => {
    renderTasks();
    addRemoveEvents();
    addToggleDoneEvents();

    renderButtons();
    addButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }
    newTaskElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
