const path = require('path');
const fs = require('fs');


const dirPath = path.join(__dirname, '../data'); // getting the path of the data directory
const filePath = path.join(dirPath , 'expensesData.json') ;

// Delete functionality
const deleteExpense = (option) => {
    const { id } = option ;
    if (!fs.existsSync(dirPath) || !fs.existsSync(filePath)) {
        return console.log('You did not add any expenses yet');
    }
    const expenseData = JSON.parse(fs.readFileSync(filePath , 'utf-8' , (err) => {
        if(err){
            return console.log("Something went wrong while fetching the data!");
        }
    }))
    if(id > expenseData.length || id <= 0){
        return console.log(`Please enter a valid id. It is from 1 to ${expenseData.length}`);
    }
    for(let expenseItem of expenseData){
        if(Number(expenseItem.id) === id){
            const index = expenseData.indexOf(expenseItem)
            expenseData.splice(index , 1);
            fs.writeFileSync(filePath , JSON.stringify(expenseData , null , 2) , 'utf-8')
            return console.log("Expense has been deleted successfully");
        }
    }    
}

module.exports = {
    deleteExpense 
}