{
  const tasks = [
    {
      content: "zjeść kolację",
      done: true,
    },
    {
      content: "iść spać",
      done: false,
    },
  ];

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });
    render();
  };

  const removeTask = (index) => {
    tasks.splice(index, 1);
    render();
  };

  const doneTask = (index) => {
    tasks[index].done = !tasks[index].done;
    render();
  };

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
          <li ${task.done ? 'style="text-decoration: line-through"' : ""}>
          <button class="js-taskDone">✔</button>
          <button class="js-remove">Usuń zadanie</button>  
          ${task.content}
          </li>
        `;
    }

    const toDoList = document.querySelector(".js-toDoList");
    toDoList.innerHTML = htmlString;

    const taskDoneButton = document.querySelectorAll(".js-taskDone");

    taskDoneButton.forEach((taskDoneButton, index) => {
      taskDoneButton.addEventListener("click", () => {
        doneTask(index);
      });
    });

    const removeButton = document.querySelectorAll(".js-remove");

    removeButton.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
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

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
