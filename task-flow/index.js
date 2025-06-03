const { error } = require('console');
const fs = require('fs');
const path = require('path');

const taskfile = path.join(__dirname , 'taskfile.json') ;



//  funstion for adding a task
function addTask(task) {
    if(!task){
        return console.log('Please provide a task to add');
    }

    if(!fs.existsSync(taskfile)){
        fs.writeFileSync(taskfile , JSON.stringify([]) , 'utf-8' , (err , data) => {
            if(err){
                throw new err
            }
            console.log('Task file created');
        })
        
    }

    const tasks = fs.readFileSync(taskfile , 'utf-8' , (err , data) =>{
        if(err){
            throw new err;
        }
        console.log(data);
    })
    const taskId = JSON.parse(tasks)
    console.log(typeof taskId);
    
    
}
addTask(process.argv.slice(2)[1]) ;