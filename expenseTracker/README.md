You need to build a command-line expense tracker using JavaScript (Deno). This tool will allow users to:
✅ Add expenses (category, amount, date, description)
✅ List expenses (sorted by date, category, or amount)
✅ Search expenses (by category or description)
✅ Filter expenses (e.g., "Show all expenses above $100")
✅ Delete an expense
✅ Generate a summary report (total expenses, highest expense, breakdown by category)

🛠 Requirements:
Store data in a JSON file (expenses.json).
Handle reading/writing to the JSON file properly.
Use error handling to prevent issues like missing files or invalid inputs.
Allow users to interact via command-line arguments (Deno.args).
Implement a sorting mechanism (date, amount, category).
Use a flexible filtering function.
Format output in a readable way.
📝 Example Usage:

```
deno run expenses.js add Food 12.50 "2025-02-10" "Lunch with friends"
deno run expenses.js list amount
deno run expenses.js search Food
deno run expenses.js filter "amount>100"
deno run expenses.js remove "Lunch with friends"
deno run expenses.js summary
```
