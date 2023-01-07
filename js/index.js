//game constants & variables
let inputDir = {x: 0, y:0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
const audioElement = document.getElementById('button2');
var elem = document.getElementById('start');
var globalId=0;
let speed = document.getElementById("speed");
let lastPaintTime =0;
let score=0;
let snakeArr = [
    {x: 13, y: 15}  //snake is an array, as it will eat food, its size will be increased
]
let food = {x: 6, y: 7};  //food is a particle or object, not an array

//game functions
function main(ctime) {  
    globalId = window.requestAnimationFrame(main);
    
    //console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/parseInt(speed.value))
        return;
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y)
            return true;
    }
    //if you bump into the wall
    if(snake[0].x <=0 || snake[0].x >= 18 || snake[0].y <=0 || snake[0].y >= 18)
        return true;
}

function quitgame(){
    window.close();
} 
function pauseMotion(){
    cancelAnimationFrame(globalId);
}
function gameEngine(){
    // musicSound.play();

    audioElement.addEventListener('click', ()=>{
        if(musicSound.paused){
            //foodSound.play();
            //moveSound.play();
            //gameOverSound.play();
            musicSound.play();
            console.log("Play: "+musicSound.currentTime);
            // audioElement.classList.remove('fa-volume-high');
            // audioElement.classList.add('fa-volume-xmark');
        }
        else if(musicSound.currentTime>0){
            // foodSound.pause();
            // moveSound.pause();
            // gameOverSound.pause();
            musicSound.pause();
            console.log("Pause: "+musicSound.currentTime);
            // audioElement.classList.remove('fa-volume-xmark');
            // audioElement.classList.add('fa-volume-high');
        }
    });

    //part 1: update the snake array & food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir ={x:0, y:0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x:13, y:15}];
        
        score=0;
    }

    //if you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y == food.y && snakeArr[0].x == food.x){     //snakeArr[0] means the head of the snake
        foodSound.play();
        score += 1;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score: "+ hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
    }  

    //moving the snake
    for(let i = snakeArr.length-2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part 2: display the snake and food
    //displaying the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        // if(pauseMotion())
        //     break;
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        // if(pauseMotion())
        //     break;
        board.appendChild(snakeElement);
    });
    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



//main logic starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore==null){
    hiscoreval=0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: "+ hiscore;
}
// window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x:0, y:1};  //start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        
        default:
            break;
    }
})



// (foodSound.paused || moveSound.paused || gameOverSound.paused) && 


// window.addEventListener('click', ()=>{
//     inputDir = {x:0, y:1};  //start the game
//     moveSound.play();
//     if(arrowUp()){
//         console.log("ArrowUp");
//         inputDir.x = 0;
//         inputDir.y = -1;
//     }
//     else if(arrowDown()){
//         console.log("ArrowDown");
//         inputDir.x = 0;
//         inputDir.y = 1;
//     }
//     else if(arrowLeft()){
//         console.log("ArrowLeft");
//         inputDir.x = -1;
//         inputDir.y = 0;
//     }
//     else if(arrowRight()){
//         console.log("ArrowRight");
//         inputDir.x = 1;
//         inputDir.y = 0;
//     }
// });

function arrowUp(){
    inputDir = {x:0, y:1};  //start the game
    moveSound.play();
    console.log("ArrowUp");
    inputDir.x = 0;
    inputDir.y = -1;
}
function arrowDown(){
    inputDir = {x:0, y:1};  //start the game
    moveSound.play();
    console.log("ArrowDown");
    inputDir.x = 0;
    inputDir.y = 1;
}
function arrowLeft(){
    inputDir = {x:0, y:1};  //start the game
    moveSound.play();
    console.log("ArrowLeft");
    inputDir.x = -1;
    inputDir.y = 0;
}
function arrowRight(){
    inputDir = {x:0, y:1};  //start the game
    moveSound.play();
    console.log("ArrowRight");
    inputDir.x = 1;
    inputDir.y = 0;
}
