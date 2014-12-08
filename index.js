"use strict"; // This line chooses a JavaScript dialect, one that helps both jsLint (used in OrionHub) and browsers catch errors.
/*jslint browser: true*/ // This line tells jsLint that the code will run in a browser.

// Interaction

var left_arrow_key = 37;
var up_arrow_key = 38;
var right_arrow_key = 39;
var down_arrow_key = 40;
var s = 0;

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

  
    occupants[protagonist.y][protagonist.x] = protagonist.element;
    add_key();
    render();
    
    
    
}

document.addEventListener('keydown', key_pressed_down);
var bugspeed = window.setInterval(enemy_movement,450);
function enemy_movement(event) {
    occupants[antagonist.y][antagonist.x] = undefined;
    if (protagonist.x === antagonist.x) {
        antagonist.x = antagonist.x;
    } else {
        if (protagonist.x > antagonist.x) {
            antagonist.x = antagonist.x + 1;
        } else {
            antagonist.x = antagonist.x - 1;
        }
    }
    if (protagonist.y === antagonist.y) {
        antagonist.y = antagonist.y;
    } else {
        if (protagonist.y > antagonist.y) {
            antagonist.y = antagonist.y + 1;
        } else {
            antagonist.y = antagonist.y - 1;
        }
    }
    occupants[antagonist.y][antagonist.x] = antagonist.element;
    respawn_on_collision();
}
function respawn_on_collision(event){
    if (protagonist.y === antagonist.y){
        if (protagonist.x === antagonist.x){
            occupants[protagonist.y][protagonist.x] = antagonist.element;
            protagonist.y = 7;
            protagonist.x = 7;
            occupants[protagonist.y][protagonist.x] = protagonist.element;
            window.clearInterval(bugspeed);
            window.setTimeout(respawn_delay,3500);
            
        }
    }
}



function respawn_delay(){
    bugspeed = window.setInterval(enemy_movement,450);
}    
function add_key(event){
    if (protagonist.y === objective.y){
        if (protagonist.x === objective.x){
        occupants[objective.y][objective.x] = protagonist.element;
        objective.y = Math.ceil(Math.random()*15);
        objective.x = Math.ceil(Math.random()*15);
        occupants[objective.y][objective.x] = objective.element;
        score_update();
    }
    }
}

function score_update(){
    var s = 0;
    s = s + 1;
    document.getElementById("score").innerHTML = Score: s;
}

