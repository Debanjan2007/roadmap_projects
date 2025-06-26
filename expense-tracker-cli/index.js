const { Command } = require('commander'); // importing command from the 'commander' package and creating a new instance of command

const program = new Command();

const { addExpense } = require('./controller/addExpense.controller.js'); // importing the addExpense function from the controller


// setting up the program with a description
program
    .name('expense-tracker')
    .description('A CLI tool to track your expenses')
    .version('1.0.0');

const addCommand = program
    .command('add')
    .description('Handle adding an expense');

addCommand
    .option('-d, --description <description of the expense>', 'Description of the expense')
    .option('-a, --amount <amount> ', 'Amount of the expense', parseFloat)
    .action(
        (options) => {
            addExpense(options);
        }
    )


// getting all the options from the program

program.parse(process.argv); // parsing the command line arguments

