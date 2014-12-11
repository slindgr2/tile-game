"use strict"; // This line chooses a JavaScript dialect, one that helps both jsLint (used in OrionHub) and browsers catch errors.
/*jslint browser: true*/ // This line tells jsLint that the code will run in a browser.

// Interaction

var left_arrow_key = 37;
var up_arrow_key = 38;
var right_arrow_key = 39;
var down_arrow_key = 40;
var s = 0;
var l = 3;

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
var bugspeed = window.setInterval(enemy_movement,550);

function enemy_movement(event) {
    var e = 0;
    while(e < antagonists.length){
        var y = antagonists[e].y;
        var x = antagonists[e].x;
        occupants[antagonists[e].y][antagonists[e].x] = undefined;
         if (protagonist.x === antagonists[e].x) {
            antagonists[e].x = antagonists[e].x;
        } else {
            if (protagonist.x > antagonists[e].x) {
                antagonists[e].x = antagonists[e].x + 1;
            } else {
                antagonists[e].x = antagonists[e].x - 1;
            }
        }
        if (protagonist.y === antagonists[e].y) {
            antagonists[e].y = antagonists[e].y;
        } else {
            if (protagonist.y > antagonists[e].y) {
                antagonists[e].y = antagonists[e].y + 1;
            } else {
                antagonists[e].y = antagonists[e].y - 1;
            }
        }
        if (occupants[antagonists[e].y][antagonists[e].x] !== undefined){
            antagonists[e].y = y;
            antagonists[e].x = x;
            
        }
        occupants[antagonists[e].y][antagonists[e].x] = antagonists[e].element;
        respawn_on_collision();
        e = e + 1;
    }
}
function respawn_on_collision(event){
    var e = 0;
    while (e < antagonists.length){
        if (protagonist.y === antagonists[e].y){
            if (protagonist.x === antagonists[e].x){
                occupants[protagonist.y][protagonist.x] = antagonists[e].element;
                protagonist.y = 7;
                protagonist.x = 7;
                occupants[protagonist.y][protagonist.x] = protagonist.element;
                window.clearInterval(bugspeed);
                window.setTimeout(respawn_delay,3500);
                number_of_lives();
            }    
        }
        e = e + 1;
    }
}



function respawn_delay(){
    bugspeed = window.setInterval(enemy_movement,600);
}    
function add_key(event){
    if (protagonist.y === objective.y){
        if (protagonist.x === objective.x){
        occupants[objective.y][objective.x] = protagonist.element;
        objective.y = Math.ceil(Math.random()*15);
        objective.x = Math.ceil(Math.random()*15);
        occupants[objective.y][objective.x] = objective.element;
        score_update();
        antagonists.push({
        element: enemy_bug,
        x: 15,
        y: 15,
});
        occupants[antagonists[antagonists.length - 1].y][antagonists[antagonists.length - 1].x] = antagonists[antagonists.length - 1].element;
    }
    }
}

function score_update(){
    s = s + 1;
    document.getElementById("score").innerHTML = 'Score: '+s;
}

function number_of_lives(){
 l = l - 1;
 document.getElementById("lives").innerHTML = 'Lives: '+l;
 if (l === 0){
     alert('Game Over! You Suck!\nScore: '+s);
 }
 }

