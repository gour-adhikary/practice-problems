const displayExpense = (expenses) => {
  console.table(expenses);
};

export const parseExpenses = (filePath) => {
  const existingExpenses = Deno.readTextFileSync(filePath);
  return JSON.parse(existingExpenses);
};

export const listExpenses = (filePath) => {
  const parsedExpenses = parseExpenses(filePath);
  return parsedExpenses;
};

const implementAction = (action, details, filePath) => {
  const availableActions = {
    list: () => listExpenses(filePath),
  };
  return displayExpense(availableActions[action]());
};

const main = (args) => {
  const filePath = "expense.json";
  const [action, ...details] = args;
  implementAction(action, details, filePath);
};

// main(Deno.args);
