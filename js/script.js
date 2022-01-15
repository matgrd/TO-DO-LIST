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

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
          <li ${task.done ? 'style="text-decoration: line-through"' : ""}>
            ${task.content}
          </li>
        `;
    }

    const toDoList = document.querySelector(".js-toDoList");
    toDoList.innerHTML = htmlString;
  };

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });
    render();
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
