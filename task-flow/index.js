const fs = require('fs');


const pathOperation = process.argv.slice(2)?.[0] ;

// adds a task to the tasks.json file
const addTask = (task) => {
    if(!task){
        console.log("Enter task properly");
            return ;
    }
    
    if(!fs.existsSync('tasks.json')){
        const taskId = 0 ;
    console.log(taskId);
    const taskObj = {
        id : `${taskId + 1}\n` ,
        task : `${task}\n` ,
        status : 'todo'
    }
        fs.writeFileSync('tasks.json', JSON.stringify([taskObj]), (err, data) => {
            if(err){
                throw new err ;
            }
        });
        console.log("Task added successfully");
        return ;
    }
    const tasks = fs.readFileSync('tasks.json', (err, data) => {
        if(err){
            throw new err ;
        }
    });
    const taskId = JSON.parse(tasks).length;
    const taskObj = {
        id : `${taskId + 1}\n` ,
        task : `${task}\n` ,
        status : 'todo'
    }
    fs.appendFileSync('tasks.json' , JSON.stringify(taskObj), (err , data) => {
        if(err){
            throw new err ;
        }
    });
    console.log("Task added successfully");
}
// updates task status to done or todo
const updateTask = (taskId , newTask) => {
    console.log("updating task with id: " + taskId + " to new task: " + newTask);
}

// deletes task by id
const deltask = (taskId) => {
    console.log("deleting task with id: " + taskId);
}

switch (pathOperation){
    case 'add' : 
        if(process.argv.slice(2).length >= 3){
            console.log('Enter just one task at a time');
            return ;
        }
        const task = process.argv.slice(2)[1] ;
        addTask(task);
        break;
    case 'list' :
        if(process.argv.slice(2)[1] === 'todo'){
            listTodo() ;
            break ;
        }
        if(process.argv.slice(2)[1] === 'done'){
            listDone() ;
            break ;
        }
        if(!process.argv.slice(2)[1]){
            listAll() ;
            break ;
        }
        console.log("list task properly");
        break ; 
    case 'update' :
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
    case 'del' :
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
    default : 
        console.log("Invalid operation. Use 'add', 'list', 'update', or 'del'.");
        break ;
}

