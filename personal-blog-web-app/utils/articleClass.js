class Article {
    constructor(Title , data , date , time , status){
        this.id = Math.floor(Math.random() * 1000000) , // Random ID for the article auto generated
        this.Title = Title ,
        this.data = data ,
        this.date = date ,
        this.time = time 
        this.status = status || 'published' 
    }
}

module.exports = Article 