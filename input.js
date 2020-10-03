
function setup_input_handler(on_right, on_up, on_left, on_down) {

  // WASD
  var KEY_RIGHT = 68;
  var KEY_UP = 87;
  var KEY_LEFT = 65;
  var KEY_DOWN = 83;

  key_state = {
    right_held: false,
    up_held: false,
    left_held: false,
    down_held: false,
    onkeydown: function (e) {
      var e = e || window.event;
      var code = e.keyCode;

      if (code == KEY_RIGHT && !key_state.right_held) {
        key_state.right_held = true;
        on_right();
      } else if (code == KEY_UP && !key_state.up_held) {
        key_state.up_held = true;
        on_up();
      } else if (code == KEY_LEFT && !key_state.left_held) {
        key_state.left_held = true;
        on_left();
      } else if (code == KEY_DOWN && !key_state.down_held) {
        key_state.down_held = true;
        on_down();
      }
    },
    onkeyup: function (e) {
      var e = e || window.event;
      var code = e.keyCode;

      if (code == KEY_RIGHT) {
        key_state.right_held = false;
      } else if (code == KEY_UP) {
        key_state.up_held = false;
      } else if (code == KEY_LEFT) {
        key_state.left_held = false;
      } else if (code == KEY_DOWN) {
        key_state.down_held = false;
      }
    }
  }

  document.onkeydown = key_state.onkeydown;
  document.onkeyup = key_state.onkeyup;
}


