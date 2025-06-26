const path = require('path');
const fs = require('fs');
const MyexpenseData = require('../utils/expenseData.class.utils.js');


const dirPath = path.join(__dirname, '../data'); // getting the path of the data directory


const addExpense = (allCommands) => {
    try {
        const { description, amount } = allCommands;
        if(amount < 0){
            return console.log('Negative value can not be assigned!')
        }
        const filePath = path.join(dirPath, 'expensesData.json'); // getting the path of the expenses.json file
        if (!description || !amount) {
            console.error('Please provide both description and amount for the expense.');
            return;
        }
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true }); // creating the data directory if it doesn't exist
        }
        let expensesData = null;
        if (!fs.existsSync(filePath)) {
            expensesData = new MyexpenseData(description, amount, 1);
            fs.writeFileSync(filePath, JSON.stringify([expensesData], null, 2), 'utf-8', (err) => {
                if (err) {
                    console.error('Error while writing to file:', err);
                    return;
                }
            });
            console.log(' Expense added successfully (ID: 1)');
            return console.table(expensesData)
        } else {
            const expenseFileData = JSON.parse(fs.readFileSync(filePath, 'utf-8')); // reading the expenses.json file
            const expenseLen = expenseFileData.length;
            expensesData = new MyexpenseData(description, amount, expenseLen + 1);
            expenseFileData.push(expensesData); // pushing the new expense data to the array
            fs.writeFileSync(filePath, JSON.stringify(expenseFileData, null, 2), 'utf-8', (err) => {
                if (err) {
                    console.error('Error while writing to file:', err);
                    return;
                }
            });

        }
        console.log(`Expense added successfully (ID: ${expensesData.id})`);
        return console.table(expensesData) ;
    } catch (error) {
        console.error('Error while adding expense:', error);
    }
}


module.exports = { addExpense } // exporting the addExpense function to be used in the index.js file