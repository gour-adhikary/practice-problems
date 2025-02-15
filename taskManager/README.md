## Task Management CLI Tool

- Objective: Build a command-line task management tool where users can add, remove, list, and filter tasks.

## Requirements:

1. Features
   - Add a Task: Users should be able to add a task with a title, description, and priority (High, Medium, Low).
   - List Tasks: Show all tasks in a sorted order based on priority.
   - Filter Tasks: Allow filtering tasks by priority.
   - Remove a Task: Remove a task by index or title.
   - Save & Load Tasks: Store tasks in a local JSON file for persistence.
   - Search Tasks (Bonus): Allow searching tasks using regular expressions.

Example Usage

```
$ node task-cli.js add "Finish JS project" "Complete all features" High
Task added successfully!

$ node task-cli.js list

1. [HIGH] Finish JS project - Complete all features

$ node task-cli.js remove "Finish JS project"
Task removed successfully!

$ node task-cli.js search "project"
Found 1 task: Finish JS project - Complete all features
```
