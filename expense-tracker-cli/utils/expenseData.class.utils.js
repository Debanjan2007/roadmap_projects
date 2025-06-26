class MyexpenseData {
    constructor(description, amount, id) {
        const CurrentDateTime = (function (){
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');

            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            return dateTime;
        })() ;
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.DateTime = CurrentDateTime ;
    }
}

module.exports = MyexpenseData; // exporting the MyexpenseData class so that it can be used in other files