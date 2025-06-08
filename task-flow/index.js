const fs = require('fs');




// adds a task to the tasks.json file
const addTask = (task) => {
    if(!task){
        return console.log("⚠️️️️️️ Please enter a task to add ⚠️️️️️️");
    }
    if(!fs.existsSync('tasks.json')){
        const tasks = [
            {
                id: 1 ,
                task: task ,
                status: 'todo'
            }
        ] ; 
        fs.writeFileSync('tasks.json' , JSON.stringify(tasks , null , 2)) ; 
        return console.log("Task added successfully \n taskId : 1");
    }
    const fetchedTasks = JSON.parse(fs.readFileSync('tasks.json' , 'utf-8' , (error) => {
        console.log("Error reading tasks.json file: " + error);
    })) ;
    const todoId = Object.keys(fetchedTasks).length ; // the length of the todo s already added 
    for(i = 0 ; i < todoId ; i++){
        if(fetchedTasks[i].task == task){
        return console.log("⚠️️️️️️ You are trying to add same task again ⚠️️️️️️ \n Your task exists with id : ",(i+1));
        }
    }
    
    const newTask = {
        id: todoId + 1 ,
        task: task ,
        status: 'todo'
    } ;
    fetchedTasks.push(newTask) ;
    fs.writeFileSync('tasks.json' , JSON.stringify(fetchedTasks , null , 2)) ;
    console.log(JSON.stringify(newTask , null , 2));
    console.log(`✔️Task added successfully ✔️\n taskId : ${newTask.id} `);
}
// updates task status to done or todo
const updateTask = async (taskId , newTask) => {
    if(!newTask || !taskId){
        return console.log("⚠️️️️️️ make sure you enter a valid index or update msg ⚠️️️️️️");
    }
     if(!fs.existsSync('tasks.json')){
            return console.log("⚠️ There is no file for todos! ⚠️");        
        }
    const tasks = JSON.parse(fs.readFileSync('tasks.json' , 'utf-8' , (err) => {
        console.log(err);
        return ;
    })) ;
    if(!tasks){
        console.log("There is nothing to update add tasks first");
    }
    const tasktoupdate = tasks[taskId - 1] ; // getting the requested task
    if(!tasktoupdate){
        return console.log("⚠️️️️️ No task found with that index ⚠️️️️️️");
    }
    const updatedtask = {
        id: tasktoupdate.id ,
        task: newTask ,
        status: 'todo'
    }
    tasks.splice(taskId - 1 , 1 , updatedtask) ;
    fs.writeFile('tasks.json' , JSON.stringify(tasks , null , 2) , (err) => {
        if(err)
            console.log(err);
    }) ;
    console.log("✔️update complete ✅");
}

// deletes task by id
const deltask = (taskId) => {
    if(!taskId || taskId < 0){
        return console.log("Enter right id to delete task");
    }
     if(!fs.existsSync('tasks.json')){
            return console.log("⚠️ There is no file for todos! ⚠️");        
        }
    const tasks = JSON.parse(fs.readFileSync('tasks.json' , 'utf-8' , (err) => {
        if(err)
            console.log(err);
    })) ;
    if(!tasks){
        console.log("There is nothing to delete add tasks first");
    }
    tasks.splice(taskId - 1 , 1) ;

    fs.writeFileSync('tasks.json' , JSON.stringify(tasks , null , 2))
    console.log("todo deleted with the id : " , taskId);
}

const listTodo = () => {
    try {
        if(!fs.existsSync('tasks.json')){
            return console.log("⚠️ There is no file for todos! ⚠️");        
        }
        const todos = JSON.parse(fs.readFileSync('tasks.json' , 'utf-8' ,  (err) => {
            if(err){
                throw new err ;
            }
        })) ;
        // taskLen = Object.keys(tasks).length ;
        let tasks = [] ; 
        todos.forEach(elm => {
            if(elm.status === "in-progress"){
                tasks.push(elm) ;
            }
        });
        if(tasks.length <= 0 ){ return console.log(null);}
        console.log(JSON.stringify(tasks , null , 2));
    } catch (error) {
        throw new error
    }
};

const listDone = () => {
    if(!fs.existsSync('tasks.json')){
        return console.log("There is no file for todos!");        
    }
    const todos = JSON.parse(fs.readFileSync('tasks.json' , 'utf-8' ,  (err) => {
        if(err){
            throw new err ;
        }
    })) ;
    let tasks = [] ; 
    todos.forEach(elm => {
        if(elm.status === "done"){
            tasks.push(elm) ;
        }
    });
    if(tasks.length <= 0 ){ return console.log(null);}
    console.log(JSON.stringify(tasks , null , 2));
}
// listt all the todos or tasks 
const listAll = () => {
    if(!fs.existsSync('tasks.json')){
        return console.log("There is no file for todos!");        
    }
    const todos = JSON.parse(fs.readFileSync('tasks.json' , 'utf-8' ,  (err) => {
        if(err){
            throw new err ;
        }
    })) ;

    console.log(JSON.stringify(todos , null , 2));
}

// mark done functionality 
const markDone = (todoId) => {
    if(!todoId){
        return console.log("⚠️️️️️️ Provide is please ⚠️️️️️️") ;
    }
     if(!fs.existsSync('tasks.json')){
            return console.log("⚠️ There is no file for todos! ⚠️");        
        }
    const tasks = JSON.parse(fs.readFileSync('tasks.json' , 'utf-8' , (err) => {
        if(err) {throw new err}
    })) ;
    if(!tasks){
        console.log("Can't find any logs may be an server issue");
    }
    tasks.forEach((elm => {
        if(elm.id == todoId){
            elm.status = 'done' ;
            return ;
        }
    }));
    fs.writeFileSync('tasks.json' , JSON.stringify(tasks , null , 2))
    console.log("✔️ Todo marked as Done ✔️");
}

// mark in progress functiobnality 
const markInProg = (todoId) => {
    if(!todoId){
        return console.log("⚠️️️️️️ Provide is please ⚠️️️️️️") ;
    }
     if(!fs.existsSync('tasks.json')){
            return console.log("⚠️ There is no file for todos! ⚠️");        
        }
    const tasks = JSON.parse(fs.readFileSync('tasks.json' , 'utf-8' , (err) => {
        if(err) {throw new err}
    })) ;
    if(!tasks){
        console.log("Can't find any logs may be an server issue");
    }
    tasks.forEach((elm => {
        if(elm.id == todoId){
            elm.status = 'in-progress' ;
            return ;
        }
    }));
    fs.writeFileSync('tasks.json' , JSON.stringify(tasks , null , 2))
    console.log("✔️ Todo marked as Done ✔️");

}
// path operations dynamic routes for the functionality 
const pathOperation = process.argv.slice(2)?.[0] ;

switch (pathOperation){
    case 'add' : //add functionality ✔️
        if(process.argv.slice(2).length >= 3){
            console.log('Enter just one task at a time');
            return ;
        }
        const task = process.argv.slice(2)[1] ;
        addTask(task);
        break;
    case 'list' : // list functionality ✔️ 
        if(process.argv.slice(2)[1] === 'in-progress'){
            listTodo() ;
            break ;
        }
        if(process.argv.slice(2)[1] === 'done'){
            listDone() ;
            break ;
        }
        if(process.argv.slice(2)[1] === 'todo'){
            listAll() ;
            break ;
        }
        console.log("list task properly");
        break ; 
    case 'update' : // update functionalilty ✔️ 
        if(process.argv.slice(2).length >= 4){
            console.log('Enter just one task at a time');
            return ;
        }
        if(!process.argv.slice(2)[1] || !process.argv.slice(2)[2]){
            console.log('Enter task id and new task properly');
            return ;
        }
        const taskId = process.argv.slice(2)[1] ;
        const newtask =  process.argv.slice(2)[2] ;
        updateTask(taskId , newtask) ;
        break ;
    case 'del' : // delete functionality ✔️
        if(process.argv.slice(2).length > 2){
            console.log('Enter just one task at a time');
            return ;
        }
        if(!process.argv.slice(2)[1]){
            console.log("Enter task id properly");
            return ;
        }
        const deltaskId = process.argv.slice(2)[1] ;
        deltask(deltaskId) ;
        break ;
    case 'mark-done':
        const marktaskId = process.argv.slice(2)[1] ;
        markDone(marktaskId) ;
        break ;
    case 'mark-in-progress': 
        const id = process.argv.slice(2)[1] ;
        markInProg(id) ;
        break ;
    default : 
        console.log("Invalid operation. Use 'add', 'list', 'update', or 'del'.");
        break ;
}

