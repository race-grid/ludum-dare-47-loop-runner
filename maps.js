function intro_map(ghost_movement_plans) {
    return new_game_state({
        map_name: "Race to the finish",
        grid_w: 6,
        grid_h: 1,
        active_character_i: 0,
        start_position: new_position(2, 0),
        boxes: [],
        traps: [],
        obstacles: [],
        ghost_movement_plans: ghost_movement_plans,
        key_door_pairs: [{ "key": new_position(0, 0), "door": new_position(4, 0) }],
        button_door_pairs: [],
        goal_position: new_position(5, 0)
    });
}

function loop_intro_map(ghost_movement_plans) {
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

function learn_button_map(ghost_movement_plans) {
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
        button_door_pairs: [{ "button": new_position(1, 1), "door": new_position(5, 1), "is_open": false }],
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
        traps: [new_position(1, 1), new_position(1, 2), new_position(1, 4),
        new_position(1, 5), new_position(2, 5), new_position(3, 5), new_position(4, 5),
        new_position(5, 5), new_position(5, 4), new_position(5, 3), new_position(5, 2),
        new_position(5, 1), new_position(4, 1), new_position(3, 1), new_position(2, 1),],
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
        button_door_pairs: [{ "button": new_position(2, 4), "door": new_position(4, 3), "is_open": false }],
        goal_position: new_position(4, 4)
    });
}

function box_button_combination_map(ghost_movement_plans) {
    return new_game_state({
        map_name: "Hold position",
        grid_w: 8,
        grid_h: 5,
        active_character_i: 0,
        start_position: new_position(0, 2),
        boxes: [new_position(2, 4)],
        traps: [new_position(1,1), new_position(3,2), new_position(4,3)],
        obstacles: [
            new_position(6, 0), new_position(7, 0),
            new_position(6, 1), new_position(7, 1),
            new_position(6, 3), new_position(7, 3),
            new_position(6, 4), new_position(7, 4),
        ],
        ghost_movement_plans: ghost_movement_plans,
        key_door_pairs: [],
        button_door_pairs: [{ "button": new_position(3, 3), "door": new_position(6, 2), "is_open": false }],
        goal_position: new_position(7, 2)
    });
}

function intermediate_ghost_interaction_map(ghost_movement_plans) {
    return new_game_state({
        map_name: "Put your heads together",
        grid_w: 8,
        grid_h: 7,
        active_character_i: 0,
        start_position: new_position(0, 2),
        boxes: [],
        traps: [new_position(1, 1), new_position(3, 2), new_position(4, 3), new_position(2, 5), new_position(5, 5)],
        obstacles: [
            new_position(6, 0), new_position(7, 0),
            new_position(6, 1), new_position(7, 1),
            new_position(6, 2), new_position(7, 2),
            new_position(6, 4), new_position(7, 4),
            new_position(6, 5), new_position(7, 5),
            new_position(6, 6), new_position(7, 6),
        ],
        ghost_movement_plans: ghost_movement_plans,
        key_door_pairs: [],
        button_door_pairs: [
            { "button": new_position(3, 3), "door": new_position(6, 3), "is_open": false },
            { "button": new_position(2, 3), "door": new_position(6, 3), "is_open": false }
        ],
        goal_position: new_position(7, 3)
    });
}

function intermediate_timing_map(ghost_movement_plans) {
    return new_game_state({
        map_name: "Future proof",
        grid_w: 5,
        grid_h: 5,
        active_character_i: 0,
        start_position: new_position(4, 4),
        boxes: [new_position(3, 2)],
        traps: [],
        obstacles: [new_position(1, 0), new_position(2, 0), new_position(4, 0),
        new_position(1, 1), new_position(2, 1), new_position(4, 1),
        new_position(0, 3), new_position(1, 3), new_position(3, 3),
        new_position(0, 4), new_position(1, 4)
        ],
        ghost_movement_plans: ghost_movement_plans,
        key_door_pairs: [{ "key": new_position(3, 0), "door": new_position(0, 1) }],
        button_door_pairs: [{ "button": new_position(4, 2), "door": new_position(1, 2), "is_open": false }],
        goal_position: new_position(0, 0)
    });
}

function learn_order_map(ghost_movement_plans) {
    return new_game_state({
        map_name: "To order!",
        grid_w: 6,
        grid_h: 4,
        active_character_i: 0,
        start_position: new_position(0, 1),
        boxes: [],
        traps: [],
        obstacles: [
            new_position(0, 0), new_position(2, 0), new_position(3, 0), new_position(4, 0),
            new_position(0, 2), new_position(1, 2), new_position(2, 2), new_position(3, 2), new_position(4, 2),
            new_position(0, 3), new_position(1, 3),
        ],
        ghost_movement_plans: ghost_movement_plans,
        key_door_pairs: [
            { "key": new_position(1, 0), "door": new_position(5, 1) },
            { "key": new_position(5, 0), "door": new_position(4, 3) }
        ],
        button_door_pairs: [],
        goal_position: new_position(2, 3)
    });
}

function advanced_order_map(ghost_movement_plans) {
    return new_game_state({
        map_name: "The loop is on fire",
        grid_w: 5,
        grid_h: 7,
        active_character_i: 0,
        start_position: new_position(4, 1),
        boxes: [],
        traps: [new_position(2, 2), new_position(2, 3), new_position(2, 4), new_position(2, 5)],
        obstacles: [
            new_position(0, 0), new_position(1, 0), new_position(2, 0), new_position(4, 0),
            new_position(0, 1),
            new_position(0, 2), new_position(1, 2), new_position(4, 2),
            new_position(0, 3), new_position(1, 3), new_position(4, 3),
            new_position(0, 4), new_position(1, 4), new_position(4, 4),
            new_position(0, 5), new_position(1, 5), new_position(4, 5),
            new_position(4, 6),
        ],
        ghost_movement_plans: ghost_movement_plans,
        key_door_pairs: [],
        button_door_pairs: [
            { "button": new_position(3, 0), "door": new_position(3, 5), "is_open": false },
            { "button": new_position(1, 1), "door": new_position(3, 5), "is_open": false }
        ],
        goal_position: new_position(0, 6)
    });
}