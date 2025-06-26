const { Command } = require('commander'); // importing command from the 'commander' package and creating a new instance of command

const program = new Command();
const { addExpense } = require('./controller/addExpense.controller.js'); // importing the addExpense function from the controller
const { listData } = require('./controller/expenseDataList.controller.js')
const { summaryexpense } = require('./controller/summary.controller.js')


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
    .action(
        () =>{
            summaryexpense() ;
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
    

// getting all the options from the program

program.parse(process.argv); // parsing the command line arguments

