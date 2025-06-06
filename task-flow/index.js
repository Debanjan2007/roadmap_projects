const { error } = require('console');
const fs = require('fs');


const pathOperation = process.argv.slice(2)?.[0] ;

// adds a task to the tasks.json file
const addTask = (task) => {
    if(!task){
        return console.log("⚠ Please enter a task to add ⚠");
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
        return console.log("⚠ You are trying to add same task again ⚠ \n Your task exists with id : ",(i+1));
        }
    }
    
    const newTask = {
        id: todoId + 1 ,
        task: task ,
        status: 'todo'
    } ;
    fetchedTasks.push(newTask) ;
    fs.writeFileSync('tasks.json' , JSON.stringify(fetchedTasks , null , 2)) ;
    console.log(`✅ Task added successfully ✅ \n taskId : ${newTask.id} `);
}
// updates task status to done or todo
const updateTask = async (taskId , newTask) => {
    if(!newTask || !taskId){
        return console.log("⚠ make sure you enter a valid index or update msg ⚠");
    }
    const tasks = JSON.parse(fs.readFileSync('tasks.json' , 'utf-8' , (err) => {
        console.log(err);
        return ;
    })) ;
    const tasktoupdate = tasks[taskId - 1] ; // getting the requested task
    if(!tasktoupdate){
        return console.log("⚠ No task found with that index ⚠");
    }
    const updatedtask = {
        id: index.id ,
        task: newTask ,
        status: 'todo'
    }
    tasks.splice(index.id - 1 , 1 , updatedtask) ;
    fs.writeFile('tasks.json' , JSON.stringify(tasks , null , 2) , (err) => {
        if(err)
            console.log(err);
    }) ;
    console.log("update complete");
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

