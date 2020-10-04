console.log("Start of game.js");

const STATE_PLAYING = "__PLAYING__";
const STATE_BETWEEN_LOOPS = "__BETWEEN_LOOPS__";

var current_state = STATE_PLAYING;
var elapsed_time_since_loop_ended = 0;

var player_movement = [0, 0];
var loop_index = 0;

setup_input_handler(
  function () { player_movement = [1, 0] },
  function () { player_movement = [0, -1] },
  function () { player_movement = [-1, 0] },
  function () { player_movement = [0, 1] },
  function () {
    if (current_state == STATE_BETWEEN_LOOPS && elapsed_time_since_loop_ended > 1000) {
      var ghost_movement_plans = game_state.ghost_movement_plans;
      ghost_movement_plans.push(recorded_player_moves);
      game_state = map_1_game_state(ghost_movement_plans);
      recorded_player_moves = [];
      current_state = STATE_PLAYING;
      loop_index++;
      document.getElementById("loop-text").textContent = loop_index + 1;
    }
  }
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
const MAX_NUM_MOVES = 10;

// This list is filled up with moves as you play, and then used for ghost
recorded_player_moves = [];

reset_game();

function draw(game_state) {
  ctx.clearRect(0, 0, w, h);

  ctx.drawImage(
    flag_image, (game_state.goal_position.x + .1) * cell_w,
    (game_state.goal_position.y + .1) * cell_w, cell_w * .8, cell_w * .9);

  ctx.fillStyle = "#000000";
  game_state.obstacles.forEach(o => {
    ctx.fillRect(o.x * cell_w, o.y * cell_w, cell_w, cell_w, cell_w);
  });

  ctx.fillStyle = "#00AAAA";
  game_state.boxes.forEach(b => {
    ctx.fillRect(b.x * cell_w, b.y * cell_w, cell_w, cell_w, cell_w);
  });

  game_state.key_door_pairs.forEach(o => {
    ctx.drawImage(key_image, o.key.x * cell_w, o.key.y * cell_w, cell_w, cell_w);
    ctx.drawImage(door_image, o.door.x * cell_w, o.door.y * cell_w, cell_w, cell_w);
  });
  game_state.traps.forEach(o => {
    ctx.drawImage(game_state.use_fire1 ? fire1_image : fire2_image, o.x * cell_w, o.y * cell_w, cell_w, cell_w);
  });

  game_state.characters.forEach(c => {
    if (c.is_alive) {
      if (!c.is_player) {
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(c.position.x * cell_w, c.position.y * cell_w, cell_w, cell_w);
      }
      ctx.drawImage(
        figure_image, c.position.x * cell_w, c.position.y * cell_w, cell_w, cell_w);
    }
  });

  // Draw grid
  for (var i = 0; i <= game_state.grid_w; i++) {
    ctx.beginPath();
    ctx.moveTo(i * cell_w, 0);
    ctx.lineTo(i * cell_w, game_state.grid_h * cell_w);
    ctx.stroke();
  }
  for (var j = 0; j <= game_state.grid_h; j++) {
    ctx.beginPath();
    ctx.moveTo(0, j * cell_w);
    ctx.lineTo(game_state.grid_w * cell_w, j * cell_w);
    ctx.stroke();
  }
}

function handle_character_movement(game_state, character_i, movement) {
  var is_player = game_state.characters[character_i].is_player;

  if (!game_state.characters[character_i].is_alive) {
    update_character_and_move(game_state);
    return;
  }

  if (is_player && movement[0] == 0 && movement[1] == 0) {
    return;
  }

  var move_result = perform_character_movement(game_state, character_i, movement[0], movement[1]);
  if (move_result == MOVEMENT_NOT_READY) {
    return;
  }

  if (is_player) {
    recorded_player_moves.push(movement);
  }

  if (move_result == TRAP_COLLISION) {
    death_sound.play();
  } else if (move_result == GOAL_COLLISION) {
    console.log("YOU WIN");
    game_state.game_over = true;
    victory_sound.play();
  }

  update_character_and_move(game_state);

  player_movement_sound.play();
}

function update_character_and_move(game_state) {
  game_state.active_character_i = (game_state.active_character_i + 1) % game_state.characters.length;
  if (game_state.active_character_i == 0) {
    game_state.move_index++;
    document.getElementById("move-text").textContent = game_state.move_index + 1;
  }
}

function update_playing(elapsed_time) {

  if (!game_state.game_over) {
    if (are_all_characters_dead(game_state) || game_state.move_index == MAX_NUM_MOVES) {
      ctx.font = '24px serif';
      ctx.fillStyle = "#000000";
      ctx.fillText("Out of moves...", 50, 320);
      ctx.fillText("press any key to start next loop", 50, 350);
      current_state = STATE_BETWEEN_LOOPS;
      elapsed_time_since_loop_ended = 0;
      return;
    }

    var active_character = game_state.characters[game_state.active_character_i];
    if (active_character.is_player) {
      var movement = player_movement;
    } else {
      if (game_state.move_index < active_character.movement_plan.length) {
        var movement = active_character.movement_plan[game_state.move_index];
      } else {
        var movement = [0, 0];
      }
    }

    handle_character_movement(game_state, game_state.active_character_i, movement);

    if (active_character.is_player) {
      player_movement = [0, 0];
    }
  }
  update_objects(game_state, elapsed_time);
  draw(game_state);
}

function are_all_characters_dead(game_state) {
  for (var i = 0; i < game_state.characters.length; i++) {
    if (game_state.characters[i].is_alive) {
      return false;
    }
  }
  return true;
}

function update_between_loops(elapsed_time) {
  elapsed_time_since_loop_ended += elapsed_time;
}

function loop(timestamp) {
  var elapsed_time = timestamp - lastRender;

  if (current_state == STATE_PLAYING) {
    update_playing(elapsed_time);
  } else if (current_state == STATE_BETWEEN_LOOPS) {
    update_between_loops(elapsed_time);
  } else {
    console.warning("Invalid current state: " + current_state);
  }

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}

function reset_game() {
  recorded_player_moves = [];
  game_state = map_1_game_state([]);
  document.getElementById("mapname-text").textContent = game_state.map_name;
  loop_index = 0;
  document.getElementById("loop-text").textContent = loop_index + 1;
}

lastRender = 0
window.requestAnimationFrame(loop)

document.getElementById("btn-reset").onclick = function (e) {
  reset_game();
}

console.log("End of game.js");