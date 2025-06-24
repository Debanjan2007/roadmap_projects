class Article {
    constructor(Title , data , createdAt , updatedAt , status){
        this.id = Math.floor(Math.random() * 1000000) , // Random ID for the article auto generated
        this.Title = Title ,
        this.data = data ,
        this.createdAt = createdAt ,
        this.updatedAt = updatedAt || null ,
        this.status = status || 'published' 
    }
}

module.exports = Article 