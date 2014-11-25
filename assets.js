"use strict"; // This line chooses a JavaScript dialect, one that helps both jsLint (used in OrionHub) and browsers catch errors.
/*jslint browser: true*/ // This line tells jsLint that the code will run in a browser.

// Tiles in general

var tile_width = 101/2;
var tile_height = 171/2;
var block_width = tile_width;
var block_y_height = 83/2;
var block_z_height = 39/2;

// Characters

var cat_girl = document.getElementById('cat-girl');

// Objects

var key = document.getElementById('key');

// Terrain

var plain = document.getElementById('plain');
var grass = document.getElementById('grass');
var wood = document.getElementById('wood');

// Shadows

var shadows = [
    {
        element: document.getElementById('shadow-east'),
        caster_dx: 1,
        caster_dy: 0,
        caster_dz: 1,
    },
    {
        element: document.getElementById('shadow-northeast'),
        caster_dx: 1,
        caster_dy: -1,
        caster_dz: 1,
        occluder_dx: 1,
        occluder_dy: 0,
        occluder_dz: 1,
        second_occluder_dx: 0,
        second_occluder_dy: -1,
        second_occluder_dz: 1,
    },
    {
        element: document.getElementById('shadow-north'),
        caster_dx: 0,
        caster_dy: -1,
        caster_dz: 1,
    },
    {
        element: document.getElementById('shadow-northwest'),
        caster_dx: -1,
        caster_dy: -1,
        caster_dz: 1,
        occluder_dx: -1,
        occluder_dy: 0,
        occluder_dz: 1,
        second_occluder_dx: 0,
        second_occluder_dy: -1,
        second_occluder_dz: 1,
    },
    {
        element: document.getElementById('shadow-west'),
        caster_dx: -1,
        caster_dy: 0,
        caster_dz: 1,
    },
    {
        element: document.getElementById('shadow-southwest'),
        caster_dx: -1,
        caster_dy: 1,
        caster_dz: 1,
        occluder_dx: -1,
        occluder_dy: 0,
        occluder_dz: 1,
    },
    {
        element: document.getElementById('shadow-south'),
        caster_dx: 0,
        caster_dy: 1,
        caster_dz: 1,
    },
    {
        element: document.getElementById('shadow-southeast'),
        caster_dx: 1,
        caster_dy: 1,
        caster_dz: 1,
        occluder_dx: 1,
        occluder_dy: 0,
        occluder_dz: 1,
    },
    {
        element: document.getElementById('shadow-side'),
        caster_dx: -1,
        caster_dy: 1,
        caster_dz: 0,
        occluder_dx: 0,
        occluder_dy: 1,
        occluder_dz: 0,
    },
    {
        element: document.getElementById('shadow-south'),
        caster_dx: 0,
        caster_dy: 0,
        caster_dz: 0,
        occluder_dx: 0,
        occluder_dy: -1,
        occluder_dz: -1,
        y_offset: block_z_height - block_y_height,
    },
];
