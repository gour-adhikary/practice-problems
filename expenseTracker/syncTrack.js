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

export const searchExpenses = (filePath, details) => {
  const [keyword] = details;
  const parsedExpenses = parseExpenses(filePath);
  const foundExpense = parsedExpenses.find(
    ({ category }) => category === keyword
  );
  if (!foundExpense) {
    console.log("No searches found!");
    return [];
  }
  return [foundExpense];
};

export const updateExpense = (filePath, details) => {
  const [category, amount, date, description] = details;
  const parsedExpenses = parseExpenses(filePath);
  const newExpense = {
    category: category,
    amount: amount,
    date: date,
    description: description,
  };
  return [...parsedExpenses, newExpense];
};

const addExpenses = (filePath, details) => {
  try {
    const updatedExpenses = updateExpense(filePath, details);
    Deno.writeTextFileSync(filePath, JSON.stringify(updatedExpenses));
    console.log("expense added successfully");
    return [];
  } catch (err) {
    return new Error(err).message;
  }
};

const implementAction = (action, details, filePath) => {
  const availableActions = {
    add: () => addExpenses(filePath, details),
    search: () => searchExpenses(filePath, details),
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
