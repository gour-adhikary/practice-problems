const readJson = (path) => Deno.readTextFile(path);

const displayTasks = (tasks) => {
  tasks.forEach((task, index) => {
    const format = `${index + 1}. [${task.priority}] ${task.name} - ${
      task.description
    }`;
    console.log(format);
  });
};

const mySort = (current, next) => {
  //convert to numbers and use objects, why?
  const priorityOf = {
    high: 1,
    medium: 2,
    low: 3,
  };

  return priorityOf[current] - priorityOf[next];
};

const listTasks = (filePath) => {
  readJson(filePath).then((tasks) => {
    const parsedTasks = Object.values(JSON.parse(tasks));
    const sortedTasks = parsedTasks.sort((firstTask, secondTask) =>
      mySort(
        firstTask.priority.toLowerCase(),
        secondTask.priority.toLowerCase()
      )
    );
    displayTasks(sortedTasks);
  });
};

const searchTask = (taskDetails, filePath) => {
  const [searchKeyword] = taskDetails;
  readJson(filePath).then((tasks) => {
    const parseTasks = Object.values(JSON.parse(tasks));
    //regex to display all the successful searches or simply filter!!!
    const taskToSearch = parseTasks.find(({ name }) =>
      name.includes(searchKeyword)
    );

    if (!taskToSearch) {
      console.log("Found 0 tasks");
      return;
    }
    const format = `Found 1 task: ${taskToSearch.name} - ${taskToSearch.description}`;
    console.log(format);
  });
};

const updateTasks = (taskDetails, filePath, op) => {
  const [name, description, priority] = taskDetails;
  return readJson(filePath).then((existingTasks) => {
    const parsedTasks = JSON.parse(existingTasks);
    if (op === "add") {
      parsedTasks[name] = {
        name: name,
        description: description,
        priority: priority,
      };
      return parsedTasks;
    }

    const { [name]: _deletedTask, ...remainingTasks } = parsedTasks;
    return remainingTasks;
  });
};

const removeTask = (taskDetails, filePath) => {
  updateTasks(taskDetails, filePath, "rem").then((details) => {
    Deno.writeTextFile(filePath, JSON.stringify(details)).then(() => {
      console.log("Task removed successfully");
    });
  });
};

const addTask = (taskDetails, filePath) => {
  updateTasks(taskDetails, filePath, "add").then((details) => {
    Deno.writeTextFile(filePath, JSON.stringify(details)).then(() => {
      console.log("Task added successfully");
    });
  });
};

const handleCommands = (command, taskDetails, filePath) => {
  const commandActions = {
    add: () => addTask(taskDetails, filePath),
    list: () => listTasks(filePath),
    remove: () => removeTask(taskDetails, filePath),
    search: () => searchTask(taskDetails, filePath),
  };
  if (!(command in commandActions)) {
    throw new Error("Enter valid command!");
  }
  commandActions[command]();
};

const main = (args) => {
  try {
    const filePath = "tasks.json";
    const [command, ...taskDetails] = args;
    handleCommands(command, taskDetails, filePath);
  } catch (err) {
    console.error(err.message);
  }
};

main(Deno.args);
