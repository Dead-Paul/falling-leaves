# Add falling leaves to your website
This code [FallingLeaves.js](https://github.com/Dead-Paul/falling-leaves/blob/main/FallingLeaves.js) works with your script as module (Exports FallingLeaves class by default).

## Important notes
- You need to import the FallingLeaves class from plugin to your main JS script;
- You need to add your main script with `type="module"` on your HTML page;
- **Don't forget to use the virtual server or similar environment while testing the workability _(CORS blocked when you trying to start from just file, but you need the CORS)_**

## Easy start
- You can use the [demo.html](https://github.com/Dead-Paul/falling-leaves/blob/main/demo.html) file from this repo to see demonstration of abilities of the plugin;
- You can see usage of the FallingLeaves class in the [main.js](https://github.com/Dead-Paul/falling-leaves/blob/main/demo/js/main.js) script from demo of this repository;
- **Don't forget to use the virtual server or similar environment while testing the workability _(CORS blocked when you trying to start from just file, but you need the CORS because you'll use [main.js](https://github.com/Dead-Paul/falling-leaves/blob/main/demo/js/main.js) as script with `type="module"`)_**

## Getting started with class FallingLeaves
First things first you need to import FallingLeaves class from the [FallingLeaves.js](https://github.com/Dead-Paul/falling-leaves/blob/main/FallingLeaves.js) to the script of yours.

Second things second you need to create instance of the FallingLeaves class such as `const fallingLeaves = new FallingLeaves();`, and now about parameters for the constructor of the class:

* _String_ **`containerId`** - Id of the container with the leaves;

  > Note: Style of the container position must be `relative` for better leaves positioning.

  > Note: There will be created other one container in full size of the container with the leaves, so you can place other objects in container whose id you wrote.

  > Note: When the leaves spawns at first time they can be frozen in the top left corner of the container for a while, so better to hide this corner by lifting the container on the height of one leaf (so leaf will be covered with another object or out of the boundaries of the webpage).

* _Number_ **`windSpeed`** - Speed of the wind (more than 1 - from left to right, less than 0 - from right to left, between 0 and 1 - falling down with spin);

  > Note: You can change speed of the wind later with changing the `wind` field in the FallingLeaves instance.

* _Number_ **`fallSpeed`** - Speed of leaves falling (more than 1 - from top to the bottom, less than 0 - from bottom to top (without respawn at the down), between 0 and 1 - frozen on the place);

  > Note: You can also change speed of the falling with changing the `fall` field in the FallingLeaves instance.

  > Note: If `fallSpeed` is smaller than zero and all leaves flew away - they won't respawn, cause they spawns on top, right and left sides only. So you need to let leaves fall.

* _Number_ **`leavesAmount`** - Amount of the leaves in the container;

* _Object_ **`leafStyle`** - Style for each leaf;

 > Note: Position of the leaf is bounded to absolute, and you can set any start style parameters you want, for example `width` or `height` of the leaf.

* _Number_ **`timeToSpawnAllLeaves`** - Time (in seconds) to spawn all leaves at first time;

 > Note: After first spawn every leaf will respawn immediately after touching the border of the container.

* _Array<String>_ **`imageSources`** - Array of paths to the images of leaves;

## Fields of the class instance
- _Number_ **`wind`** - Speed of the wind;
- _Number_ **`fall`** - Speed of the fall; 