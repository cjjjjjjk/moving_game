const canvas = document.querySelector("#gameCanvas")
const ctx = canvas.getContext("2d");
const scoreBox = document.querySelector('#score_block')
// scoreBox.textContent = "100"
// console.log(scoreBox.innerHTML)

const playerHeight = 48;
const playerWidth = 48;
const playerImg = new Image()
const stoneImg = new Image()

// variables

let playerDriection = "indie-right"
let playerFrame     = 0;      // Frame of image (0-1-2-3)
let playerX = canvas.width / 2 - playerWidth;
let playerY = canvas.height - playerHeight;
let stones = []
let move1step = 2;
let moveX = 0;
let stoneSpeed = 3;
let isGameover = false;
let isGamestart = false
let maxFrame = 4;

let startTime = Date.now() // Starting cout points

playerImg.src = "./assets/player-indie-right.png"
stoneImg.src = "./assets/stone.png"


function drawPlayer() // Crate player
{
    if(playerDriection === "right") 
    {
        maxFrame = 6;
        playerImg.src = "./assets/player-right.png";
    }
    if(playerDriection === "left")
    {
        maxFrame = 6;
        playerImg.src = "./assets/player-left.png";
    }
    if(playerDriection === "indie-left")
    {
        maxFrame = 4;
        playerImg.src = "./assets/player-indie-left.png"
    }
    if(playerDriection === "indie-right")
    {
        maxFrame = 4;
        playerImg.src = "./assets/player-indie-right.png"
    }

    ctx.drawImage(playerImg, 64*playerFrame, 0 , 64, 64, playerX - playerWidth, playerY - playerHeight, playerWidth*2, playerHeight*2);
}

function drawStone(stone)
{
    ctx.drawImage(stoneImg, stone.x - stone.radius, stone.y - stone.radius,  stone.radius*2, stone.radius*2);
}


function handleKeydown(e)
{
    switch(e.key)
    {
        case "ArrowLeft":
            moveX = -move1step;
            playerDriection = "left"; 
            isGamestart = true
            break;
            case "ArrowRight":
            isGamestart = true
            playerDriection = "right";
            moveX = move1step;
            break;
    }

}
function handleKeyup(e)
{
    switch(e.key)
    {
        case "ArrowLeft":
            moveX = 0;
            playerDriection = "indie-left";
            break;
            case "ArrowRight":
            playerDriection = "indie-right";
            moveX = 0;
            break;
    }
    // isGamestart = true

}

function startGame()
{
    document.addEventListener("keydown", handleKeydown)
    document.addEventListener("keyup", handleKeyup)
    // console.log(isGamestart)
    updateGame()
}

function gameOver()
{
const finalTime = Date.now()
const totalPoints = Math.floor((finalTime-startTime)/1000);

ctx.font = "Bold 50px Consolas";
ctx.fillStyle = "black";
ctx.fillText("GAME OVER", canvas.width / 2 - 130, canvas.height / 2 - 20);

ctx.font = "Bold 20px Consolas";
ctx.fillStyle = "black";
ctx.fillText(`Your score: ${totalPoints}`, canvas.width / 2 - 100, canvas.height / 2 + 30);

console.log(finalTime)
}
gameOver()

let coutPoint = 0;
let start = 0;
function updateGame()
{ 
    let currentTime = Date.now()
    coutPoint =Math.floor((currentTime-startTime)/1000)
    scoreBox.textContent = `${coutPoint}`
    if(isGamestart) ;
    console.log(isGamestart)
    ctx.clearRect(0,0, canvas.width, canvas.height)

    playerX += moveX;
    // console.log(playerX)
    playerX = Math.max(10, Math.min(playerX, canvas.width - playerWidth/2+8))
    drawPlayer()
    start++;
    playerFrame = Math.floor(start/10) % maxFrame; // delay update (It 's too speed)
    
// Stones
    if(Math.random() < 0.05)
    {
        const randomX = Math.random()*canvas.width;
        let stoneSize = Math.random()*50
        stones.push(
            {
                x: randomX,
                y: 0,
                radius: stoneSize<15? 15: stoneSize,
                speed: Math.random()*5 +1
            }
        )
        // stoneSpeed = Math.random()*6;
    }
    for(let i = 0; i<stones.length; i++)
    {
        stones[i].y += stones[i].speed;
        drawStone(stones[i]);
    }

    // if(start % 1000 === 0) stoneSpeed++;
    // console.log(start)
    // console.log("update lần ", start)
    requestAnimationFrame(updateGame)
}
// document.addEventListener(, startGame)
startGame()
// console.log(playerX)