function map_1_game_state(ghost_movement_plans) {
    document.getElementById("move-text").textContent = 1;
    return new_game_state({
        map_name: "Map 1: Learning the loops",
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

function map_2_game_state(ghost_movement_plans) {
    document.getElementById("move-text").textContent = 1;
    return new_game_state({
        map_name: "Map 2: Button",
        grid_w: 7,
        grid_h: 1,
        active_character_i: 0,
        start_position: new_position(2, 0),
        boxes: [],
        traps: [],
        obstacles: [],
        ghost_movement_plans: ghost_movement_plans,
        key_door_pairs: [],
        button_door_pairs: [{ "button": new_position(0, 0), "door": new_position(5,0), "is_open": false}],
        goal_position: new_position(6, 0)
    });
}