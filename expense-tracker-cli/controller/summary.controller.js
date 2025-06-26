const path = require('path');
const fs = require('fs');

const dirPath = path.join(__dirname, '../data'); // getting the path of the data directory

const summaryexpense = () => {
    if(!fs.existsSync(dirPath)){
        return console.log("Nothing added to track your expense!");
    }
    const filePath = path.join(dirPath , 'expensesData.json') ;
    if(!fs.existsSync(filePath)){
        return console.log('Nothing added to track your expense!');
    }
    const expesedata = JSON.parse(fs.readFileSync(filePath , 'utf-8' , (err) => {
        if(err){
            return console.log(err);
        }
    }))
    let subTotal = 0 ;
    for(let expenseItem of expesedata){
        subTotal += expenseItem.amount ;
    }
    return console.log(`Total expenses: ${subTotal} INR`);
    
}
module.exports = {
    summaryexpense
};