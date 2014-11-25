"use strict"; // This line chooses a JavaScript dialect, one that helps both jsLint (used in OrionHub) and browsers catch errors.
/*jslint browser: true*/ // This line tells jsLint that the code will run in a browser.

// Utilities

function compute_corner_x(x, y, z) {
    return block_width * x;
}
function compute_corner_y(x, y, z) {
    return block_y_height * y - block_z_height * z;
}

// Rendering various parts

function render_terrain(context, x, y, z) {
    var corner_x = compute_corner_x(x, y, z);
    var corner_y = compute_corner_y(x, y, z);
    context.drawImage(terrain[y][x][z], corner_x, corner_y, tile_width, tile_height);
}

function render_terrain_shadows(context, x, y, z) {
    z = z - 1; // shadows are rendered on the tile below
    var corner_x = compute_corner_x(x, y, z);
    var corner_y = compute_corner_y(x, y, z);
    var shadow_index = 0;
    while (shadow_index < shadows.length) {
        var shadow = shadows[shadow_index];
        if (is_terrain(x + shadow.caster_dx, y + shadow.caster_dy, z + shadow.caster_dz)) {
            if (!is_terrain(x + shadow.occluder_dx, y + shadow.occluder_dy, z + shadow.occluder_dz)) {
                if (!is_terrain(x + shadow.second_occluder_dx, y + shadow.second_occluder_dy, z + shadow.second_occluder_dz)) {
                    var shadow_corner_y = corner_y;
                    if (shadow.y_offset !== undefined) {
                        shadow_corner_y = shadow_corner_y + shadow.y_offset;
                    }
                    context.drawImage(shadow.element, corner_x, shadow_corner_y, tile_width, tile_height);
                }
            }
        }
        ++shadow_index;
    }
}

function render_occupant(context, x, y, z) {
    var occupant = occupants[y][x];
    if (occupant !== undefined) {
        var corner_x = compute_corner_x(x, y, z);
        var corner_y = compute_corner_y(x, y, z);
        context.drawImage(occupant, corner_x, corner_y, tile_width, tile_height);
    }
}

// Rendering the whole

var center_x = column_count / 2;
var center_y = row_count / 2;

function render() {
    var body = document.getElementById('body')
    var canvas = document.getElementById('canvas')
    canvas.width = body.scrollWidth;
    canvas.height = body.scrollHeight - 12; // Subtract a small amount for safety
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate((canvas.width - block_width * (2 * center_x + 1)) / 2, (canvas.height - block_y_height * (2 * center_y + 1)) / 2 - block_y_height);
    var y = 0;
    while (y < row_count) {
        var x = 0;
        while (x < column_count) {
            var z = 0;
            while (z < get_terrain_height(x, y)) {
                render_terrain(context, x, y, z);
                z = z + 1;
            }
            render_terrain_shadows(context, x, y, z);
            render_occupant(context, x, y, z);
            x = x + 1;
        }
        y = y + 1;
    }
    context.restore();
}

// When to render

window.addEventListener('resize', render);
render();

// Panning the camera

var maximum_pan_rate = 0.13;
function pan() {
    var dx = protagonist.x - center_x;
    var dy = protagonist.y - center_y;
    var linear_pan_rate = Math.sqrt(dx * dx + dy * dy);
    if (linear_pan_rate > maximum_pan_rate) {
        var pan_rate = maximum_pan_rate * (1 - Math.exp(-linear_pan_rate));
        dx = dx * pan_rate / linear_pan_rate;
        dy = dy * pan_rate / linear_pan_rate;
    }
    center_x = center_x + dx;
    center_y = center_y + dy;
    render();
}
window.setInterval(pan, 35);
