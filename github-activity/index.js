const promptSync = await import('prompt-sync');
const prompt = promptSync.default();
import fetch from 'node-fetch';

let username = prompt("Enter your github userName here : ") ;
const url = `https://api.github.com/users/${username.trim()}/events` ;

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
    // console.log(eventArr);
    const finalArr = [] ;
    const arrLen = Object.keys(eventArr).length ;
    for(let i = 0 ; i < arrLen ; i++){
        if(finalArr.findIndex(item => item.type == eventArr[i].type) === -1){
            const newObj = {
                type : eventArr[i].type ,
                count : 0 ,
                url : eventArr[i].url 
            }
            finalArr.push(newObj) ;
        }else{
            const index = finalArr.findIndex(item => item.type === eventArr[i].type) ;
            const count = finalArr[index].count ;
            finalArr[index].count = count + 1 ;
        }
    }    
    console.log("output : ");
    for(let item in finalArr){
        switch(finalArr[item].type){
            case 'PushEvent' : 
                console.log(`- Pushed ${finalArr[item].count} commits to ${finalArr[item].url}`);
                break ;
            case 'CreateEvent' :
                console.log(`- Started ${finalArr[item].url}`);
                break ;
            case 'PullRequestEvent':
                console.log(`- Pull request to ${finalArr[item].url}`);
                break ;
            case 'IssuesEvent' :
                console.log(`- Opend a new issue in ${finalArr[item].status}`);
                break ;
            case 'WatchEvent' :
                console.log(`- ${finalArr[item].url} is stared`);
                break ;
            default : 
                console.log('Nothing to show');
                break ;
        }
    }

})
.catch(error => {
    console.log("⚠️  User not exists check your userName ⚠️")
    const errmsg = {
  message: 'Not Found',
  documentation_url: 'https://docs.github.com/rest/activity/events#list-events-for-the-authenticated-user',
  status: '404'
} ;
    return console.log(JSON.stringify(errmsg , null , 2));
    ;
    
})

// used too much arrays cause no solution was coming on mind if any one have any better idea please create a branch and replace the code