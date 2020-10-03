console.log("Start of game.js");

var player_movement = [0, 0];

setup_input_handler(
  function () {player_movement = [1, 0]},
  function () {player_movement = [0, -1]},
  function () {player_movement = [-1, 0]},
  function () {player_movement = [0, 1]},
);

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

var player_movement_sound = new Audio('assets/beep.mp3');
var death_sound = new Audio('assets/explosion.mp3');
var victory_sound = new Audio('assets/victory.mp3');

var w = 400;
var h = 400;
var cell_w = 40;
var grid_w = w / cell_w;
var grid_h = h / cell_w;
if (!Number.isInteger(grid_w) || !Number.isInteger(grid_h)){
  console.error("Invalid grid dimensions: " + grid_w + ", " + grid_h);
}

// This is the data for one specific map
var game_state = new_game_state({
    grid_w: grid_w,
    grid_h: grid_h,
    player_position: new_position(2, 0),
    traps: [new_position(0, 0), new_position(5, 5)],
    obstacles: [
      new_position(0, 1),
      new_position(1, 1),
      new_position(2, 1),
      new_position(3, 1),
      new_position(4, 1),
      new_position(5, 1),
    ],
    keys_and_doors: [{ "key": new_position(1, 0), "door": new_position(4, 0) }],
    goal_position: new_position(5, 0)
  });

function draw(game_state) {
  ctx.clearRect(0, 0, w, h);

  ctx.drawImage(
    flag_image, (game_state.goal_position.x + .1) * cell_w,
    (game_state.goal_position.y + .1) * cell_w, cell_w * .8, cell_w * .9);

  ctx.fillStyle = "#000000";
  game_state.obstacles.forEach(o => {
    ctx.fillRect(o.x * cell_w, o.y * cell_w, cell_w, cell_w, cell_w);
  });

  game_state.keys_and_doors.forEach(o => {
    ctx.drawImage(key_image, o.key.x * cell_w, o.key.y * cell_w, cell_w, cell_w);
    ctx.drawImage(door_image, o.door.x * cell_w, o.door.y * cell_w, cell_w, cell_w);
  });
  game_state.traps.forEach(o => {
    ctx.drawImage(game_state.use_fire1 ? fire1_image : fire2_image, o.x * cell_w, o.y * cell_w, cell_w, cell_w);
  });

  ctx.drawImage(
    figure_image, game_state.player_position.x * cell_w,
    game_state.player_position.y * cell_w, cell_w, cell_w);

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

function loop(timestamp) {
  var elapsed_time = timestamp - lastRender;

  if (!game_state.game_over) {
    if (!(player_movement[0] == 0 && player_movement[1] == 0)) {
      collision = perform_player_movement(game_state, player_movement[0], player_movement[1]);
      if (collision == TRAP_COLLISION) {
        console.log("YOU LOSE");
        game_state.game_over = true;
        death_sound.play();
      } else if (collision == GOAL_COLLISION) {
        console.log("YOU WIN");
        game_state.game_over = true;
        victory_sound.play();
      }
      player_movement_sound.play();
      player_movement = [0, 0];
    }
  }
  update_objects(game_state, elapsed_time);
  draw(game_state);

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}

lastRender = 0
window.requestAnimationFrame(loop)

document.getElementById("btn-reset").onclick = function (e) {
  game_state = new_game_state();
  console.log("Game was reset");
}

console.log("End of game.js");