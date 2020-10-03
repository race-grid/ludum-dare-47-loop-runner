function update_character(game_state, dx, dy) {
  position = game_state.player_position;
  const next_position = new_position(position.x + dx, position.y + dy);
  if (contains_obstacle(game_state, next_position)) {
    return;
  }

  position.x = next_position.x;
  position.y = next_position.y;

  for (var i = 0; i < game_state.keys_and_doors.length; i++) {
    if (character_occupies(position, game_state.keys_and_doors[i].key)) {
      game_state.keys_and_doors.splice(i, 1);
    }
  }

  for (var i = 0; i < game_state.traps.length; i++) {
    if (character_occupies(position, game_state.traps[i])) {
      console.log("YOU LOSE!");
      game_state.traps.splice(i, 1);
      game_state.game_over = true;
      game_state.player_position.x = -1
      game_state.player_position.y = -1
    }
  }
  if (character_occupies(position, game_state.goal_position)) {
    console.log("YOU WIN!");
    game_state.game_over = true;
  }
}

function update_objects(game_state, elapsed_time) {
  game_state.time_since_flip += elapsed_time;
  if (game_state.time_since_flip >= 500) {
    game_state.time_since_flip = 0;
    game_state.use_fire1 = !game_state.use_fire1;
  }
}

function character_occupies(character, pos) {
  return character.x == pos.x && character.y == pos.y;
}

function new_position(x, y) {
  return { "x": x, "y": y };
}

function contains_obstacle(game_state, position) {
  for (var i = 0; i < game_state.obstacles.length; i++) {
    if (character_occupies(position, game_state.obstacles[i])) {
      return true;
    }
  }
  for (var i = 0; i < game_state.keys_and_doors.length; i++) {
    if (character_occupies(position, game_state.keys_and_doors[i].door)) {
      return true;
    }
  }
  return false;
}

function new_game_state() {
  var game_state = {
    time_since_flip: 0,
    player_position: new_position(2, 0),
    use_fire1: true,
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
    goal_position: new_position(5, 0),
    game_over: false,
  };
  return game_state;
}