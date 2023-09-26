const canvas = document.querySelector("#gameCanvas")
const ctx = canvas.getContext("2d");



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

let maxFrame = 4;

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


// updateGame()

function handleKeydown(e)
{
    switch(e.key)
    {
        case "ArrowLeft":
            moveX = -move1step;
            playerDriection = "left"; 
             break;
        case "ArrowRight":
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
}

function startGame()
{
    document.addEventListener("keydown", handleKeydown)
    document.addEventListener("keyup", handleKeyup)
    updateGame()
}

// function gameOver()
// {
// const currentTime = Date.now()

// console.log(currentTime)
// }
// gameOver()


let start = 0;
function updateGame()
{
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
                radius: stoneSize<15? 15: stoneSize
            }
        )
        // stoneSpeed = Math.random()*6;
    }
    for(let i = 0; i<stones.length; i++)
    {
        stones[i].y += stoneSpeed;
        drawStone(stones[i]);
    }

    // if(start % 1000 === 0) stoneSpeed++;
    // console.log(start)
    // console.log("update lần ", start)
    requestAnimationFrame(updateGame)
}
startGame()
// console.log(playerX)