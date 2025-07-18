const { Command } = require('commander'); // importing command from the 'commander' package and creating a new instance of command

const program = new Command();
const { addExpense } = require('./controller/addExpense.controller.js'); // importing the addExpense function from the controller
const { listData } = require('./controller/expenseDataList.controller.js')
const { summaryexpense, summaryOFmonth } = require('./controller/summary.controller.js')
const { deleteExpense } = require('./controller/deleteExpense.controller.js')

// setting up the program with a description 
program
    .name('expense-tracker')
    .description('A CLI tool to track your expenses')
    .version('1.0.0');

// adding CLI commands to use them
const addCommand = program
    .command('add')
    .description('Handle adding an expense');

// list all data 
program
    .command('list')
    .description('Handle listing or showing all the data')
    .action(
        () => {
            listData();
        }
    )

// summary of expense 
program
    .command('summary')
    .description('total Expense Summary')
    .option('-m, --month <add the month code here>', 'Month to calculate the summary by month', parseInt)
    .action(
        (options) => {
            if (options.month) {
                summaryOFmonth(options)
            } else {
                summaryexpense();
            }
        }
    )



addCommand
    .option('-d, --description <description of the expense>', 'Description of the expense')
    .option('-a, --amount <amount> ', 'Amount of the expense', parseFloat)
    .action(
        (options) => {
            addExpense(options);
        }
    )

// delete expense 
program
    .command('delete')
    .description('Delertes an expense with the expense id')
    .option('-i, --id <expenseId>', 'Delete the expense with assosiated id', parseInt)
    .action(
        (options) => {
            deleteExpense(options)
        }
    )


// getting all the options from the program

program.parse(process.argv); // parsing the command line arguments

