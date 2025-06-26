class MyexpenseData {
    constructor(description, amount, id) {
        const CurrentDate = (function (){
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const dateTime = `${year}-${month}-${day}`;
            return dateTime;
        })() ;
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.Date = CurrentDate;
    }
}

module.exports = MyexpenseData; // exporting the MyexpenseData class so that it can be used in other files