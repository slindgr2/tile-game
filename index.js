"use strict"; // This line chooses a JavaScript dialect, one that helps both jsLint (used in OrionHub) and browsers catch errors.
/*jslint browser: true*/ // This line tells jsLint that the code will run in a browser.

// Interaction

var left_arrow_key = 37;
var up_arrow_key = 38;
var right_arrow_key = 39;
var down_arrow_key = 40;

function key_pressed_down(event) {
    occupants[protagonist.y][protagonist.x] = undefined;
    if (event.keyCode === left_arrow_key) {
        if (is_in_bounds(protagonist.x - 1, protagonist.y)) {
            protagonist.x = protagonist.x - 1;
        }
    }
    if (event.keyCode === right_arrow_key) {
        if (is_in_bounds(protagonist.x + 1, protagonist.y)) {
            protagonist.x = protagonist.x + 1;
        }
    }
    if (event.keyCode === up_arrow_key) {
        if (is_in_bounds(protagonist.x, protagonist.y - 1)) {
            protagonist.y = protagonist.y - 1;
        }
    }
    if (event.keyCode === down_arrow_key) {
        if (is_in_bounds(protagonist.x, protagonist.y + 1)) {
            protagonist.y = protagonist.y + 1;
        }
    }
    
    enemy_movement();
    occupants[protagonist.y][protagonist.x] = protagonist.element;
    render();
}

document.addEventListener('keydown', key_pressed_down);

 function enemy_movement(event){
    occupants[antagonist.y][antagonist.x] = undefined;
    if (protagonist.x = antagonist.x) {  
        antagonist.x = antagonist.x;
    }else{
        if (protagonist.x > antagonist.x) {
            antagonist.x = antagonist.x + 1;
        }else{
            antagonist.x = antagonist.x - 1;
    }}
    if (protagonist.y = antagonist.y) {
        antagonist.y = antagonist.y;
    }else{
        if (protagonist.y > antagonist.y) {
            antagonist.y = antagonist.y + 1;
        }else{
            antagonist.y = antagonist.y - 1;
    }}
 occupants[antagonist.y][antagonist.x] = antagonist.element;
}

