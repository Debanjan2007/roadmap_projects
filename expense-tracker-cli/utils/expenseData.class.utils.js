class MyexpenseData {
    constructor(description , amount , id) {
        this.description = description;
        this.amount = amount;
        this.id = id;
    }
}

module.exports = MyexpenseData; // exporting the MyexpenseData class so that it can be used in other files