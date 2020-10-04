function intro_map(ghost_movement_plans) {
    return new_game_state({
        map_name: "Learning the loops",
        grid_w: 10,
        grid_h: 1,
        active_character_i: 0,
        start_position: new_position(2, 0),
        boxes: [],
        traps: [],
        obstacles: [],
        ghost_movement_plans: ghost_movement_plans,
        key_door_pairs: [{ "key": new_position(0, 0), "door": new_position(7, 0) }],
        button_door_pairs: [],
        goal_position: new_position(9, 0)
    });
}

function learn_button(ghost_movement_plans) {
    return new_game_state({
        map_name: "Keep it down",
        grid_w: 7,
        grid_h: 3,
        active_character_i: 0,
        start_position: new_position(2, 1),
        boxes: [],
        traps: [],
        obstacles: [new_position(5, 0), new_position(5, 2), new_position(1, 2)],
        ghost_movement_plans: ghost_movement_plans,
        key_door_pairs: [],
        button_door_pairs: [{ "button": new_position(1, 1), "door": new_position(5,1), "is_open": false}],
        goal_position: new_position(6, 1)
    });
}

function learn_fire_map(ghost_movement_plans) {
    return new_game_state({
        map_name: "One for the team",
        grid_w: 9,
        grid_h: 7,
        active_character_i: 0,
        start_position: new_position(3, 3),
        boxes: [],
        traps: [new_position(1, 1),new_position(1, 2), new_position(1, 4),
          new_position(1, 5),new_position(2, 5),new_position(3, 5),new_position(4, 5),
          new_position(5, 5),new_position(5, 4),new_position(5, 3),new_position(5, 2),
          new_position(5, 1),new_position(4, 1),new_position(3, 1),new_position(2, 1),],
        obstacles: [],
        ghost_movement_plans: ghost_movement_plans,
        key_door_pairs: [],
        button_door_pairs: [],
        goal_position: new_position(7, 3)
    });
}

function learn_box_map(ghost_movement_plans) {
    return new_game_state({
        map_name: "Push it",
        grid_w: 6,
        grid_h: 5,
        active_character_i: 0,
        start_position: new_position(0, 2),
        boxes: [new_position(2, 2)],
        traps: [],
        obstacles: [new_position(0, 0), new_position(4, 0), new_position(5, 0),
          new_position(0, 1), new_position(1, 0), new_position(1, 1), new_position(3, 0),
          new_position(3, 1),
          new_position(1, 3), new_position(3, 3), new_position(3, 4), new_position(4, 3),
          new_position(4, 4),
          new_position(5, 1), new_position(5, 3), new_position(5, 4), new_position(5, 2),
          ],
        ghost_movement_plans: ghost_movement_plans,
        key_door_pairs: [],
        button_door_pairs: [],
        goal_position: new_position(4, 1)
    });
}

function intermediate_box_button_map(ghost_movement_plans) {
    return new_game_state({
        map_name: "Congestion control",
        grid_w: 6,
        grid_h: 5,
        active_character_i: 0,
        start_position: new_position(0, 3),
        boxes: [new_position(2, 2)],
        traps: [],
        obstacles: [new_position(0, 0), new_position(4, 0), new_position(5, 0),
          new_position(0, 1), new_position(1, 0), new_position(1, 1), new_position(3, 0),
          new_position(3, 1),
          new_position(1, 3), new_position(3, 3), new_position(3, 4), new_position(4, 1),
          new_position(5, 1), new_position(5, 3), new_position(5, 4), new_position(5, 2)],
        ghost_movement_plans: ghost_movement_plans,
        key_door_pairs: [],
        button_door_pairs: [{ "button": new_position(2, 4), "door": new_position(4,3), "is_open": false}],
        goal_position: new_position(4, 4)
    });
}