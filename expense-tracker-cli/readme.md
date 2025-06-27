# Expense Tracker CLI

A simple command-line tool to track your expenses, view summaries, and manage your expense data.

## Features

- Add new expenses with description and amount
- List all recorded expenses
- Delete expenses by ID
- View total expense summary
- View monthly expense summary

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Debanjan2007/roadmap_projects.git
    cd expense-tracker-cli
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Usage

Run the CLI using Node.js:

```sh
node index.js <command> [options]
```

### Commands

#### Add an Expense

```sh
node index.js add -d "Description" -a 100
```

#### List All Expenses

```sh
node index.js list
```

#### Delete an Expense

```sh
node index.js delete -i <expenseId>
```

#### View Total Expense Summary

```sh
node index.js summary
```

#### View Monthly Expense Summary

```sh
node index.js summary -m <monthNumber>
```
- Example: `node index.js summary -m 5` (for May)

## Data Storage

- Expenses are stored in `data/expensesData.json` as a JSON array.
- Each expense has an `id`, `description`, `amount`, and `Date`.

## Project Structure

```
.
├── controller/
│   ├── addExpense.controller.js
│   ├── deleteExpense.controller.js
│   ├── expenseDataList.controller.js
│   └── summary.controller.js
├── data/
├── utils/
│   └── expenseData.class.utils.js
├── index.js
├── package.json
└── .gitignore
```


Made by Debanjan Das