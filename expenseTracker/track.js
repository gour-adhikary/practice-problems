const parseExistingExpenses = (filePath) => {
  return Deno.readTextFile(filePath).then((data) => JSON.parse(data));
};

const filterOut = (threshold, filePath, operator) => {
  return parseExistingExpenses(filePath).then((existingExpenses) => {
    return existingExpenses.filter(({ amount }) =>
      operator === "<" ? Number(amount) < threshold : Number(amount) > threshold
    );
  });
};

const filterExpenses = (details, filePath) => {
  const stringifiedDetails = details.toString();
  const [predicate, threshold] = stringifiedDetails
    .match(/([<>])(\d+)/)
    .slice(1);
  filterOut(Number(threshold), filePath, predicate).then((filteredExpenses) => {
    console.table(filteredExpenses);
  });
};

const searchExpenses = (details, filePath) => {
  const [keyword] = details;
  parseExistingExpenses(filePath).then((existingExpenses) => {
    const foundExpense = existingExpenses.find(
      ({ category }) => category === keyword
    );
    if (!foundExpense) {
      console.log("No matches found!");
      return;
    }
    console.table(foundExpense);
  });
};

const sortExpenses = (parsedExpenses) => {
  return parsedExpenses.sort(
    ({ amount: amt1 }, { amount: amt2 }) => amt2 - amt1
  );
};

const listExpenses = (filePath) => {
  parseExistingExpenses(filePath).then((parsedExpenses) => {
    const sortedExpenses = sortExpenses(parsedExpenses);
    console.table(sortedExpenses);
  });
};

const addExpense = (details, filePath) => {
  const [category, amount, date, description] = details;
  parseExistingExpenses(filePath).then((parsedExpenses) => {
    const newExpense = {
      category: category,
      amount: amount,
      date: date,
      description: description,
    };
    parsedExpenses.push(newExpense);
    Deno.writeTextFile(filePath, JSON.stringify(parsedExpenses)).then(() => {
      console.log("Expense added successfully!");
    });
  });
};

const implementAction = (providedAction, details, filePath) => {
  const availableActions = {
    add: () => addExpense(details, filePath),
    list: () => listExpenses(filePath),
    search: () => searchExpenses(details, filePath),
    filter: () => filterExpenses(details, filePath),
  };
  availableActions[providedAction]();
};

const main = (args) => {
  const filePath = "expense.json";
  const [action, ...details] = args;
  implementAction(action, details, filePath);
};

main(Deno.args);
