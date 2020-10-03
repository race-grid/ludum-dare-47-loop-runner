console.log("Start of game.js");

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


player_x = 0;
var player_y = 0;
time_since_movement = 0;

var w = 400;
var h = 400;
var cell_w = 40;

function update(elapsed_time) {
  time_since_movement += elapsed_time;
  if (time_since_movement >= 1000) {
    console.log("Moving player")
    time_since_movement = 0;
    player_x ++;
  }
}

function draw() {
  ctx.clearRect(0, 0, w, h);

  for (x = 0; x < w; x+= cell_w){
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (y = 0; y < h; y+= cell_w){
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  ctx.fillRect(player_x * cell_w, player_y * cell_w, cell_w, cell_w);
}

function loop(timestamp) {
  var elapsed_time = timestamp - lastRender;

  update(elapsed_time);
  draw();

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}

lastRender = 0
window.requestAnimationFrame(loop)

console.log("End of game.js");