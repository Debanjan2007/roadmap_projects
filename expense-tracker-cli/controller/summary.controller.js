const path = require('path');
const fs = require('fs');

const dirPath = path.join(__dirname, '../data'); // getting the path of the data directory
const filePath = path.join(dirPath , 'expensesData.json') ;

const globalMonths = [
    "January",
    "February" ,
    "March" , 
    "April" , 
    "May" ,
    "June" ,
    "July", 
    "August" ,
    "September" ,
    "october" ,
    "November" ,
    "December"
]

const summaryexpense = () => {
    if (!fs.existsSync(dirPath) || !fs.existsSync(filePath)) {
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

// expense summary according to month
const summaryOFmonth = (options) => {
    const { month } = options ;
    if(month > 12 || month <= 0){
        return console.log("Please Enter a valid month");        
    }
    if (!fs.existsSync(dirPath) || !fs.existsSync(filePath)) {
        return console.log('Nothing added to track your expense!');
    }
    const expenseData = JSON.parse(fs.readFileSync(filePath , 'utf-8' , (err) => {
        console.log(err);
    })) ;
    let subTotal = 0 ;
    for(let expenseItem of expenseData){
        const Date = Number(expenseItem.Date.split('-')[1]); 
        if(Date === month){
            subTotal += Number(expenseItem.amount) || 0 ;
        }
    }
    return console.log(`Total expense in ${globalMonths[month - 1]} : ${subTotal} INR`) ;
}
module.exports = {
    summaryexpense ,
    summaryOFmonth
};