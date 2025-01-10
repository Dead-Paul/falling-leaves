//@ts-check
import FallingLeaves from '../../FallingLeaves.js';
const fallingLeaves = new FallingLeaves('leaves-container', 1, 1, 30, {width: '2vw'}, 5, Array(5).fill('').map((_, index) => `./demo/img/leaf-${index}.png`));

// Interval for changing wind direction
setInterval(() => {
    fallingLeaves.wind = Math.floor(Math.random() * 2) * 2 - 1; 
    console.log('Wind =', fallingLeaves.wind, ';');
}, (10 * 1000))