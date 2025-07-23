import cluster from 'cluster'
import os from 'os'
import express from 'express';

const cpus = os.availableParallelism() ;

const app = express() ;
const port = 4000 ; 

if(cpus.isPrimary){
    for(let i = 0 ; i < cpus ; i++){
        cluster.fork() ;
    }
    cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  }); 
}else(
    app.listen(port , () => {
        console.log(`App listening at port ${port} with worker ${process.pid}`);
        
    })
)