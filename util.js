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
  if (!is_valid_movement(game_state, character, dx, dy)) {
    return;
  }
  const previous_position = character.position;
  const next_position = new_position(character.position.x + dx, character.position.y + dy);
  character.position = next_position;

  for (var i = 0; i < game_state.boxes.length; i++) {
    if (are_positions_equal(character.position, game_state.boxes[i])) {
      game_state.boxes[i] = new_position(next_position.x + dx, next_position.y + dy);
    }
  }

  for (var i = 0; i < game_state.key_door_pairs.length; i++) {
    if (are_positions_equal(character.position, game_state.key_door_pairs[i].key)) {
      game_state.key_door_pairs.splice(i, 1);
    }
  }

  for (var i = 0; i < game_state.button_door_pairs.length; i++) {
    const pair = game_state.button_door_pairs[i];
    if (are_positions_equal(character.position, pair.button)) {
      pair.is_open = true;
    } else if (are_positions_equal(previous_position, pair.button)) {
      pair.is_open = false;
      for (var j = 0; j < game_state.characters.length; j++) {
        if (are_positions_equal(game_state.characters[j].position, pair.door)) {
          game_state.characters[j].is_alive = false;
          return TRAP_COLLISION;
        }
      }
    }
  }

  for (var i = 0; i < game_state.traps.length; i++) {
    if (are_positions_equal(character.position, game_state.traps[i])) {
      game_state.traps.splice(i, 1);
      character.is_alive = false;
      return TRAP_COLLISION;
    }
  }
  if (are_positions_equal(character.position, game_state.goal_position)) {
    return GOAL_COLLISION;
  }
}

function is_valid_movement(game_state, character, dx, dy) {
  const next_position = new_position(character.position.x + dx, character.position.y + dy);
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
    position: position,
    is_alive: true,
  }
}

function new_ghost(position, movement_plan) {
  return {
    is_player: false,
    position: position,
    is_alive: true,
    movement_plan: movement_plan,
  };
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
  for (var i = 0; i < game_state.key_door_pairs.length; i++) {
    if (are_positions_equal(position, game_state.key_door_pairs[i].door)) {
      return true;
    }
  }
  for (var i = 0; i < game_state.button_door_pairs.length; i++) {
    const pair = game_state.button_door_pairs[i];
    if (!pair.is_open && are_positions_equal(position, pair.door)) {
      return true;
    }
  }
  for (var i = 0; i < game_state.characters.length; i++) {
    const character = game_state.characters[i];
    if (character.is_alive && are_positions_equal(position, character.position)) {
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

function new_game_state({ map_name, grid_w, grid_h, active_character_i, start_position, ghost_movement_plans, boxes, traps, obstacles,
  key_door_pairs, button_door_pairs, goal_position } = {}) {
  var ghosts = [];
  ghost_movement_plans.forEach( plan => {
    ghosts.push(new_ghost(new_position(start_position.x, start_position.y), plan));
  });
  var game_state = {
    map_name: map_name,
    grid_w: grid_w,
    grid_h: grid_h,
    time_since_flip: 0,
    time_since_movement: 0,
    active_character_i: active_character_i,
    characters: ghosts.concat([new_character(new_position(start_position.x, start_position.y), true)]),
    ghost_movement_plans: ghost_movement_plans,
    start_position: start_position,
    use_fire1: true,
    boxes: boxes,
    traps: traps,
    obstacles: obstacles,
    key_door_pairs: key_door_pairs,
    button_door_pairs: button_door_pairs,
    goal_position: goal_position,
    game_over: false,
    move_index: 0,
  };
  return game_state;
}