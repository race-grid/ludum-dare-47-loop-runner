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
var cell_w = 50;

function map_1_game_state() {
  return new_game_state({
      grid_w: 6,
      grid_h: 2,
      active_character_i: 0,
      // TODO don't start with ghost. Add it later
      characters: [new_character(new_position(2, 0), true), new_character(new_position(3, 0), false)],
      traps: [new_position(0, 0)],
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
}

var game_state = map_1_game_state();

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

  game_state.characters.forEach(c => {
    // TODO draw ghost differently
    ctx.drawImage(
        figure_image, c.position.x * cell_w, c.position.y * cell_w, cell_w, cell_w);
  });

  // Draw grid
  for (var i = 0; i <= game_state.grid_w; i ++) {
    ctx.beginPath();
    ctx.moveTo(i * cell_w, 0);
    ctx.lineTo(i * cell_w, game_state.grid_h * cell_w);
    ctx.stroke();
  }
  for (var j = 0; j <= game_state.grid_h; j ++) {
    ctx.beginPath();
    ctx.moveTo(0, j * cell_w);
    ctx.lineTo(game_state.grid_w * cell_w, j * cell_w);
    ctx.stroke();
  }
}

function handle_character_movement(game_state, character_i, movement) {
  if (movement[0] == 0 && movement[1] == 0){
    return;
  }

  move_result = perform_character_movement(game_state, character_i, movement[0], movement[1]);
  if (move_result == MOVEMENT_NOT_READY) {
    return;
  }

  // TODO: if player: record this move into a list

  if (move_result == TRAP_COLLISION) {
    console.log("someone died");
    death_sound.play();
    // we assume that character was removed from list (death)
    game_state.active_character_i = game_state.active_character_i  % game_state.characters.length;
  } else if (move_result == GOAL_COLLISION) {
    console.log("YOU WIN");
    game_state.game_over = true;
    victory_sound.play();
  }

  game_state.active_character_i = (game_state.active_character_i + 1)  % game_state.characters.length;

  player_movement_sound.play();
}

function loop(timestamp) {
  var elapsed_time = timestamp - lastRender;

  if (!game_state.game_over) {
    if (game_state.characters.length == 0) {
      // TODO restart game with one additional ghost (based on what you just did)
    }

    active_character = game_state.characters[game_state.active_character_i];
    // TODO move ghost according to its plan
    ghost_movement = [-1, 0];
    handle_character_movement(game_state, game_state.active_character_i,
      active_character.is_player ? player_movement : ghost_movement);

    if (active_character.is_player) {
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
  game_state = map_1_game_state();
  console.log("Game was reset");
}

console.log("End of game.js");