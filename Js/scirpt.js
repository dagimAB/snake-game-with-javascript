
// // getting canvas element
const canvas = document.querySelector(".canvas");

// // making the game context to 2D
const ctx = canvas.getContext("2d");


// // dividing canvas rectangle to 10 by 10 small units
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
console.log(canvas.height);

// // snake should be an array

const snake = [];

snake[0] = {
  x: (Math.floor(Math.random() * columns)) * scale,
  y: (Math.floor(Math.random() * rows)) * scale,
};

let snakesFood = {
  x: (Math.floor(Math.random() * columns)) * scale,
  y: (Math.floor(Math.random() * rows)) * scale,
};

// // the default direction
let d = "right";

document.onkeydown = direction;

function direction(event){
    let key = event.keyCode;
    if(key == 37 && d != "right"){
        d = "left";
    }else if(key == 38 && d != "down"){
         d = "up";
    }else if(key == 39 && d != "left"){
         d = "right";
    }else if(key == 40 && d != "up"){
         d = "down";
    }
}



// // score 
let score = 0;

// // drawing a rectangle inside the canvas on every 100 ms
let playGame = setInterval(draw,100);


function draw(){
  ctx.clearRect(0, 0, canvas.height, canvas.width);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "#ff0";
    ctx.strokeStyle = "red";
    ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
    ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
  }

  // // Food for the snake

  ctx.fillStyle = "#ff0";
  ctx.strokeStyle = "red";
  ctx.fillRect(snakesFood.x, snakesFood.y, scale, scale);
  ctx.strokeRect(snakesFood.x, snakesFood.y, scale,scale);

  // // X and Y position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // // changing the position(movement) by using it's direction
  if (d == "left") snakeX -= scale;
  if (d == "up") snakeY -= scale;
  if (d == "right") snakeX += scale;
  if (d == "down") snakeY += scale;

  if (snakeX > canvas.width) {
    // snakeX = 0;
    clearInterval(playGame);
    //  alert("Game Over!!!");
    alert(`Game Over!!!
        \nScore : ${score}`);
    window.location.reload();
    
  } else if (snakeY > canvas.height) {
    // snakeY = 0;
    clearInterval(playGame);
    //  alert("Game Over!!!");
    alert(`Game Over!!!
        \nScore : ${score}`);
    window.location.reload();
  } else if (snakeX < 0) {
    // snakeX = canvas.width;
    clearInterval(playGame);
    //  alert("Game Over!!!");
    alert(`Game Over!!!
        \nScore : ${score}`);
    window.location.reload();
  } else if (snakeY < 0) {
    // snakeY = canvas.height;
    clearInterval(playGame);
    //  alert("Game Over!!!");
    alert(`Game Over!!!
        \nScore : ${score}`);
    window.location.reload();
  }

  // // when the snake eat's his food

  if (snakeX == snakesFood.x && snakeY == snakesFood.y) {
score++;

    snakesFood = {
      x: (Math.floor(Math.random() * columns)) * scale,
      y: (Math.floor(Math.random() * rows)) * scale
    };

  }else {
  snake.pop();

  }

   let newHead = {
     x: snakeX,
     y: snakeY,
   };

   if(eatSelf(newHead,snake)){
     clearInterval(playGame);
    //  alert("Game Over!!!");
     alert(`Game Over!!!
        \nScore : ${score}`);
     window.location.reload();
   }
  snake.unshift(newHead);

}

function eatSelf(head,body){
    for(i=0; i<body.length; i++){
        if(head.x === body[i].x && head.y === body[i].y){
            return true;
        }else false;
    }
}
