console.log("Start of game.js");

// WASD
var KEY_RIGHT = 68;
var KEY_UP = 87;
var KEY_LEFT = 65;
var KEY_DOWN = 83;

INPUT = {
  right_held: false,
  up_held: false,
  left_held: false,
  down_held: false,
  onkeydown: function (e) {
    var e = e || window.event;
    var code = e.keyCode;

    if (code == KEY_RIGHT && !INPUT.right_held) {
      INPUT.right_held = true;
      player_dx = 1;
      player_dy = 0;
    } else if (code == KEY_UP && !INPUT.up_held) {
      INPUT.up_held = true;
      player_dx = 0;
      player_dy = -1;
    } else if (code == KEY_LEFT && !INPUT.left_held) {
      INPUT.left_held = true;
      player_dx = -1;
      player_dy = 0;
    } else if (code == KEY_DOWN && !INPUT.down_held) {
      INPUT.down_held = true;
      player_dx = 0;
      player_dy = 1;
    }
  },
  onkeyup: function (e) {
    var e = e || window.event;
    var code = e.keyCode;

    if (code == KEY_RIGHT) {
      INPUT.right_held = false;
    } else if (code == KEY_UP) {
      INPUT.up_held = false;
    } else if (code == KEY_LEFT) {
      INPUT.left_held = false;
    } else if (code == KEY_DOWN) {
      INPUT.down_held = false;
    }
  }
}

var player_dx = 0;
var player_dy = 0;

document.onkeydown = INPUT.onkeydown;
document.onkeyup = INPUT.onkeyup;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var figure = new Image();
figure.src = "figure.svg";

player_x = 0;
var player_y = 0;
time_since_movement = 0;

var w = 400;
var h = 400;
var cell_w = 40;

function update(elapsed_time) {
  player_x += player_dx;
  player_y += player_dy;
  player_dx = player_dy = 0;
//  time_since_movement += elapsed_time;
//  if (time_since_movement >= 1000) {
//    console.log("Moving player")
//    time_since_movement = 0;
//    player_x++;
//  }
}

function draw() {
  ctx.clearRect(0, 0, w, h);

  for (x = 0; x < w; x += cell_w) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (y = 0; y < h; y += cell_w) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  ctx.drawImage(figure, player_x * cell_w, player_y * cell_w, cell_w, cell_w);
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