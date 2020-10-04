const TRAP_COLLISION = "__TRAP_COLLISION__";
const GOAL_COLLISION = "__GOAL_COLLISION__";
const MOVEMENT_NOT_READY = "__MOVEMENT_NOT_READY__";

const MOVEMENT_COOLDOWN = 250;

function perform_character_movement(game_state, character_i, dx, dy) {

  if (game_state.time_since_movement < MOVEMENT_COOLDOWN) {
    return MOVEMENT_NOT_READY;
  }
  game_state.time_since_movement = 0;

  character = game_state.characters[character_i];
  const next_position = new_position(character.position.x + dx, character.position.y + dy);
  if (!valid_next_position(game_state, next_position, dx, dy)) {
    return;
  }

  character.position = next_position;

  for (var i = 0; i < game_state.boxes.length; i++) {
    if (are_positions_equal(character.position, game_state.boxes[i])) {
      game_state.boxes[i] = new_position(next_position.x + dx, next_position.y + dy);
    }
  }

  for (var i = 0; i < game_state.keys_and_doors.length; i++) {
    if (are_positions_equal(character.position, game_state.keys_and_doors[i].key)) {
      game_state.keys_and_doors.splice(i, 1);
    }
  }

  for (var i = 0; i < game_state.traps.length; i++) {
    if (are_positions_equal(character.position, game_state.traps[i])) {
      game_state.traps.splice(i, 1);
      game_state.characters.splice(character_i, 1);
      return TRAP_COLLISION;
    }
  }
  if (are_positions_equal(character.position, game_state.goal_position)) {
    return GOAL_COLLISION;
  }
}

function valid_next_position(game_state, next_position, dx, dy) {
  if (contains_immovable_object(game_state, next_position) ||
    !is_position_in_game_world(game_state, next_position)) {
    return false;
  }
  if (contains_movable_object(game_state, next_position)) {
    const next_position_of_moved_object = new_position(next_position.x + dx, next_position.y + dy);
    if (contains_object(game_state, next_position_of_moved_object) ||
      !is_position_in_game_world(game_state, next_position_of_moved_object)) {
      return false;
    }
  }
  return true;
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

function new_character(position, is_player) {
  return {
    is_player: is_player,
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

function contains_object(game_state, position) {
  return contains_immovable_object(game_state, position) || contains_movable_object(game_state, position);
}

function contains_immovable_object(game_state, position) {
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
  for (var i = 0; i < game_state.characters.length; i++) {
    if (are_positions_equal(position, game_state.characters[i].position)) {
      return true;
    }
  }
  return false;
}

function contains_movable_object(game_state, position) {
  for (var i = 0; i < game_state.boxes.length; i++) {
    if (are_positions_equal(position, game_state.boxes[i])) {
      return true;
    }
  }
  return false;
}

function new_game_state({ grid_w, grid_h, active_character_i, characters, boxes, traps, obstacles,
  keys_and_doors, goal_position } = {}) {
  var game_state = {
    grid_w: grid_w,
    grid_h: grid_h,
    time_since_flip: 0,
    time_since_movement: 0,
    active_character_i: active_character_i,
    characters: characters,
    use_fire1: true,
    boxes: boxes,
    traps: traps,
    obstacles: obstacles,
    keys_and_doors: keys_and_doors,
    goal_position: goal_position,
    game_over: false,
  };
  return game_state;
}