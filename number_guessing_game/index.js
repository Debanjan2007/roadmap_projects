const promptSync = await import('prompt-sync');
const prompt = promptSync.default();

const difficulty = ["easy" , "medium" , "hard"]; // difficulties in an array

const CheckForCorrection = (range, answer) => { // function to check te number 
    for(let i = 0 ; i < range ; i++){
        const choice = Number(prompt("Enter your guess 🚀: "))
        if(choice === answer){
            console.log(`🎉Congratulations! You guessed the correct number in ✔️ ${i} attempts.`);
            return ;
        }else if(choice < 0 || choice > 100){
            console.log("💩 incorrect! you are not in range the range is 0 to 100");
        }else{
            if(choice < answer){
                console.log(`💩 Incorrect! The number is greater than ${choice}`);
                continue ;
            }else{
                console.log(`💩 Incorrect! The number is less than ${choice}`);
                continue ;
            }
        }
    }
    console.log("😟Oh! you lost the game!");
    console.log(`The number was ${answer}`);
    
    console.log("🍀Better luck next time!👍");
}

const main = () => { // using IFEE 
    console.log("Welcome to the Number Guessing Game! \n \nI'm thinking of a number between 1 and 100. \nYou have 5 chances to guess the correct number.");
    console.log("\n \nPlease select the difficulty level:");
    console.log("1. Easy (10 chances)");
    console.log("2. Medium (5 chances)");
    console.log("3. Hard (3 chances)");
    
    const diffChoice = prompt("\nEnter your choice : ") ; // chossing difficulty level with code 
    if(diffChoice > 3 || diffChoice <= 0){
        console.log("You entered a wrong choice so please choose a appropiate code.");
        main() ; 
    }else{
        console.log(`Great! You have selected the ${difficulty[diffChoice - 1]} difficulty level. `);
        console.log("Let's start the game!");
        const randNo = Math.floor(Math.random() * 100)
        switch(diffChoice){
            case '1' :
                CheckForCorrection(10 , randNo) ;
                break ;
            case '2' : 
                CheckForCorrection(5 , randNo) ;
                break ;
            case '3' : 
                CheckForCorrection(3 , randNo) ;
                break ;
            default :
                console.log("You entered a wrong choice so please choose a appropiate code.");
                
        }
    }
}

main() ;