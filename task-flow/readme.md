# Task Flow CLI

A simple Node.js command-line tool to manage your tasks (todo list) using a local `tasks.json` file.

## Features

- Add new tasks
- List tasks by status (all, in-progress, done)
- Update task description
- Delete tasks
- Mark tasks as done or in-progress

## Usage

Run commands using:

```sh
node index.js <command> [arguments]
```

### Commands

#### Add a Task

```sh
node index.js add "Your task description"
```

#### List Tasks

- All tasks:
  ```sh
  node index.js list todo
  ```
- In-progress tasks:
  ```sh
  node index.js list in-progress
  ```
- Done tasks:
  ```sh
  node index.js list done
  ```

#### Update a Task

```sh
node index.js update <taskId> "New task description"
```

#### Delete a Task

```sh
node index.js del <taskId>
```

#### Mark Task as Done

```sh
node index.js mark-done <taskId>
```

#### Mark Task as In-Progress

```sh
node index.js mark-in-progress <taskId>
```

## Notes

- All tasks are stored in `tasks.json` in the same directory.
- Task IDs start from 1.
- Only one task can be added, updated, or deleted at a time.

## Example

```sh
node index.js add "Buy groceries"
node index.js list todo
node index.js update 1 "Buy groceries and cook dinner"
node index.js mark-done 1
node index.js list done
node index.js del 1
```

---



Made with ❤️ using Node.js