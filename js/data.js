// In this file we have some data that the other source files will use.
// Most of this data is stored in constants.
// Constants are just variables that never change. By convention,
// We write constants with upper case letters.

// The GAME_WIDTH and GAME_HEIGHT constants denote the size
// of the game area in pixels and is used in engine-utilities.js.
const GAME_WIDTH = 500;
const GAME_HEIGHT = 750;

// These constants represent the width and height of an enemy in pixels
// as well as the maximum number of enemies on screen at any given time.
const ENEMY_WIDTH = 100;
const ENEMY_HEIGHT = 70;
const MAX_ENEMIES = 4;

// These constants represent the player width and height.
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 54;
let gameScore = 0;
let lives = 3;
const audio = document.getElementById("music");
// audio.play();
// if (location.reload()) {
//   audio.play();
// }
