const path = require('path');
const fs = require('fs');
const MyexpenseData = require('../utils/expenseData.class.utils.js');


const dirPath = path.join(__dirname, '../data'); // getting the path of the data directory

const listData = (allCommands) => {
    const filePath = path.join(dirPath, 'expensesData.json');
    if(!dirPath){
        return console.log('You did not add any expenses yet');
    }
    if(!filePath){
        return console.log('You did not add any expenses yet');
    }
    const expenseFileData = JSON.parse(fs.readFileSync(filePath , 'utf-8')) ;
    if(expenseFileData.length > 0){
        return console.table(expenseFileData) ;
    }
}