const TRAP_COLLISION = "__TRAP_COLLISION__";
const GOAL_COLLISION = "__GOAL_COLLISION__";
const NO_MOVEMENT = "__NO_MOVEMENT__";

const MOVEMENT_COOLDOWN = 200;

function perform_player_movement(game_state, character, dx, dy) {
  const next_position = new_position(character.position.x + dx, character.position.y + dy);
  if (contains_obstacle(game_state, next_position) ||
    !is_position_in_game_world(game_state, next_position)) {
    return NO_MOVEMENT;
  }

  if (game_state.time_since_movement < MOVEMENT_COOLDOWN) {
    return NO_MOVEMENT;
  }

  game_state.time_since_movement = 0;
  character.position.x = next_position.x;
  character.position.y = next_position.y;

  for (var i = 0; i < game_state.keys_and_doors.length; i++) {
    if (are_positions_equal(character.position, game_state.keys_and_doors[i].key)) {
      game_state.keys_and_doors.splice(i, 1);
    }
  }

  for (var i = 0; i < game_state.traps.length; i++) {
    if (are_positions_equal(character.position, game_state.traps[i])) {
      game_state.traps.splice(i, 1);
      character.position.x = -1
      character.position.y = -1
      return TRAP_COLLISION;
    }
  }
  if (are_positions_equal(character.position, game_state.goal_position)) {
    return GOAL_COLLISION;
  }
}

function update_objects(game_state, elapsed_time) {
  game_state.time_since_movement += elapsed_time;
  game_state.time_since_flip += elapsed_time;
  if (game_state.time_since_flip >= 500) {
    game_state.time_since_flip = 0;
    game_state.use_fire1 = !game_state.use_fire1;
  }
}

function are_positions_equal(p1, p2) {
  return p1.x == p2.x && p1.y == p2.y;
}

function new_character(position, is_active) {
  return {
    is_active: is_active,
    position: position
  }
}

function new_position(x, y) {
  return { "x": x, "y": y };
}

function is_position_in_game_world(game_state, position) {
  return position.y >= 0
    && position.x >= 0
    && position.x < game_state.grid_w
    && position.y < game_state.grid_h;
}

function contains_obstacle(game_state, position) {
  for (var i = 0; i < game_state.obstacles.length; i++) {
    if (are_positions_equal(position, game_state.obstacles[i])) {
      return true;
    }
  }
  for (var i = 0; i < game_state.keys_and_doors.length; i++) {
    if (are_positions_equal(position, game_state.keys_and_doors[i].door)) {
      return true;
    }
  }
  return false;
}

function new_game_state({grid_w, grid_h, characters, traps, obstacles, keys_and_doors,
    goal_position}={}) {
  var game_state = {
    grid_w: grid_w,
    grid_h: grid_h,
    time_since_flip: 0,
    time_since_movement: 0,
    characters: characters,
    use_fire1: true,
    traps: traps,
    obstacles: obstacles,
    keys_and_doors: keys_and_doors,
    goal_position: goal_position,
    game_over: false,
  };
  return game_state;
}