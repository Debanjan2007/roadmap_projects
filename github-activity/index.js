const promptSync = await import('prompt-sync');
const prompt = promptSync.default();
import fetch from 'node-fetch';

let username = "Debanjan2007" ;
const url = `https://api.github.com/users/${username}/events` ;

fetch(url)
.then(res => res.json())
.then(events => {
    const eventArr = [] ;
    const eventlen = Object.keys(events).length ;
    for(let i = 0 ; i < eventlen ; i++) {
        const eventswithurl = {
            type : events[i].type ,
            url : events[i].repo.name ,
        }
        eventArr.push(eventswithurl) ;
    }
    console.log(eventArr);
    const finalArr = [] ;
    eventArr.map((item) => {
        // do something 
    })
})

