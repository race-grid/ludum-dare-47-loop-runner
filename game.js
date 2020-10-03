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

var figure_image = new Image();
figure_image.src = "assets/figure.svg";

var fire1_image = new Image();
fire1_image.src = "assets/fire1.svg";

var fire2_image = new Image();
fire2_image.src = "assets/fire2.svg";

var key_image = new Image();
key_image.src = "assets/key.svg"

var door_image = new Image();
door_image.src = "assets/door.svg"

var flag_image = new Image();
flag_image.src = "assets/flag.svg"

time_since_flip = 0;

var w = 400;
var h = 400;
var cell_w = 40;

const player_position = new_position(2, 0);

var use_fire1 = true;
var time_since_flip = 0;

function update_character(position, dx, dy) {
  const next_position = new_position(position.x + dx, position.y + dy);
  if (contains_obstacle(next_position)) {
    return;
  }

  position.x = next_position.x;
  position.y = next_position.y;

  for (var i = 0; i < keys_and_doors.length; i++) {
    if (character_occupies(position, keys_and_doors[i].key)) {
      keys_and_doors.splice(i, 1);
    }
  }

  for (var i = 0; i < traps.length; i++) {
    if (character_occupies(position, traps[i])) {
      console.log("YOU LOSE!");
      traps.splice(i, 1);
      game_over = true;
      player_position.x = -1
      player_position.y = -1
    }
  }
  if (character_occupies(position, goal_position)) {
    console.log("YOU WIN!");
    game_over = true;
  }
}

function contains_obstacle(position) {
  for (var i = 0; i < obstacles.length; i++) {
    if (character_occupies(position, obstacles[i])) {
      return true;
    }
  }
  for (var i = 0; i < keys_and_doors.length; i++) {
    if (character_occupies(position, keys_and_doors[i].door)) {
      return true;
    }
  }
  return false;
}

function update_objects(elapsed_time) {
  time_since_flip += elapsed_time;
  if (time_since_flip >= 500) {
    time_since_flip = 0;
    use_fire1 = !use_fire1;
  }
}

function character_occupies(character, pos) {
  return character.x == pos.x && character.y == pos.y;
}

var traps = [new_position(0, 0), new_position(5, 5)];
var obstacles = [
  new_position(0, 1),
  new_position(1, 1),
  new_position(2, 1),
  new_position(3, 1),
  new_position(4, 1),
  new_position(5, 1),
];
var keys_and_doors = [{ "key": new_position(1, 0), "door": new_position(4, 0) }]
let goal_position = new_position(5, 0);

function new_position(x, y) {
  return { "x": x, "y": y };
}

ctx.fillRect(player_position.x * cell_w, player_position.y * cell_w, cell_w, cell_w);

function draw() {
  ctx.clearRect(0, 0, w, h);

  ctx.drawImage(flag_image, (goal_position.x + .1) * cell_w, (goal_position.y + .1) * cell_w, cell_w * .8, cell_w * .9);

  ctx.fillStyle = "#000000";
  obstacles.forEach(o => {
    ctx.fillRect(o.x * cell_w, o.y * cell_w, cell_w, cell_w, cell_w);
  });

  keys_and_doors.forEach(o => {
    ctx.drawImage(key_image, o.key.x * cell_w, o.key.y * cell_w, cell_w, cell_w);
    ctx.drawImage(door_image, o.door.x * cell_w, o.door.y * cell_w, cell_w, cell_w);
  });

  traps.forEach(o => {
    ctx.drawImage(use_fire1 ? fire1_image : fire2_image, o.x * cell_w, o.y * cell_w, cell_w, cell_w);
  });

  ctx.drawImage(figure_image, player_position.x * cell_w, player_position.y * cell_w, cell_w, cell_w);

  for (var x = 0; x < w; x += cell_w) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (var y = 0; y < h; y += cell_w) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
}

var game_over = false;

function loop(timestamp) {
  var elapsed_time = timestamp - lastRender;

  if (!game_over) {
    update_character(player_position, player_dx, player_dy);
    player_dx = player_dy = 0;
  }
  update_objects(elapsed_time);
  draw();

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}

lastRender = 0
window.requestAnimationFrame(loop)

console.log("End of game.js");