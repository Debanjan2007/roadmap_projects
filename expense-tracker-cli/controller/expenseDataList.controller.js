const path = require('path');
const fs = require('fs');


const dirPath = path.join(__dirname, '../data'); // getting the path of the data directory

function listData() {
    const filePath = path.join(dirPath, 'expensesData.json')
    if (!fs.existsSync(dirPath)) {
        return console.log('You did not add any expenses yet');
    }
    if (!fs.existsSync(filePath)) {
        return console.log('You did not add any expenses yet');
    }
    const expenseFileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (expenseFileData.length > 0) {
        return console.table(expenseFileData);
    }
}

module.exports = { listData };