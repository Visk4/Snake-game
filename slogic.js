let inputDir = {x:0,y:0};
const gameOverSound = new Audio('gameover.mp3');
const foodSound = new Audio('food.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 9;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x:13,y:13}
]
let food ={x:13,y:15}
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed)
    return;
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(sarr){
    //Bump into itself
    for(let i=1;i<sarr.length;i++){
        if(sarr[0].x === sarr[i].x && sarr[0].y === sarr[i].y)
        return true;
    }
    //If bumb into wall
    if(sarr[0].x<=0 || sarr[0].x>=18 || sarr[0].y<=0 || sarr[0].y>=18)
    return true;
}
function gameEngine(){

    //Update Snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0,y:0};
        alert("Game Over! Press any key to play again!");
        score = 0;
        snakeArr = [{x:13,y:13}];
    }

    //If you have eaten food ,increment score,regenerate food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "HighScore : " + hiscoreval;
        }
        scoreBox.innerHTML = "Score : " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())};
    }
    
    // Moving snake
    for(let i = snakeArr.length - 2; i >= 0; i--){
        snakeArr[i + 1] = {...snakeArr[i]};
    }
    // Update the head position based on inputDir
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //Display snake and food
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement)
    });

        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement)

}
window.requestAnimationFrame(main);
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HighScore : " + hiscoreval;
}
window.addEventListener('keydown',e=>{
    //Start game
    inputDir = {x:0,y:0};
    musicSound.play();
    moveSound.play();
    switch(e.key){
        case 'ArrowUp':
            console.log("UP");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
            
    case 'ArrowDown':
        console.log("Down");
        inputDir.x = 0;
        inputDir.y = 1;
        break;

    case 'ArrowLeft':
        console.log("Left");
        inputDir.x = -1;
        inputDir.y = 0;
        break;

    case 'ArrowRight':
        console.log("Right");
        inputDir.x = 1;
        inputDir.y = 0;
        break;

    default:
        break;

}})
