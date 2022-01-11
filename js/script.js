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
        <li>
          ${task.content}
        </li>
        `;
    }
    document.querySelector(".js-listTasks").innerHTML = htmlString;
  };

  const init = () => {
    render();
  };

  init();
}
