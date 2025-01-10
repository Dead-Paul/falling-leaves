//@ts-check

/**
 * Class that contains all info about leaves
 * @class
 */
class FallingLeaves {
    /**
     * Creates leaves and animates them
     * @constructor
     * 
     * @param {String} containerId - Id of the container of the leaves 
     * @param {Number} windSpeed - Speed of the wind (more than 1 - from left to right, less than 0 - from right to left, between 0 and 1 - falling down with spin)
     * @param {Number} fallSpeed - Speed of leaves falling (more than 1 - from top to the bottom, less than 0 - from bottom to top (without respawn at the down), between 0 and 1 - frozen on the place)
     * @param {Number} leavesAmount - Amount of the leaves in the container 
     * @param {Object} leafStyle - Style of the leaves (position is bounded to absolute)
     * @param {Number} timeToSpawnAllLeaves - Time (in seconds) to spawn all leaves
     * @param {Array<String>} imageSources - path to the images of leaves
     */
    constructor(containerId, windSpeed, fallSpeed, leavesAmount, leafStyle, timeToSpawnAllLeaves, imageSources) {
        /**Container where stored leaves container @type {HTMLElement} */
        const container = document.getElementById(containerId) || document.documentElement,
        /**Container where stored leaves @type {HTMLElement} */
        leavesContainer = document.createElement('div');
        Object.assign(leavesContainer.style, {position : 'relative', width: '100%', height : '100%'})
        /** Speed of the wind @type {Number}*/
        this.wind = windSpeed;
        /** Speed of the falling @type {Number} */
        this.fall = fallSpeed;

        for (let i = 0; i < leavesAmount; i++) {
            setTimeout(() => {
                const leaf = new Image();
                leaf.src = imageSources[Math.floor(Math.random() * imageSources.length)];
                Object.assign(leaf.style, leafStyle, {position : 'absolute'});
                leaf.setAttribute('restart', 'true');

                leavesContainer.appendChild(leaf);
                setInterval(() => {
                    let top = leaf.style.top && leaf.getAttribute('restart') !== 'true'
                        ? parseInt(leaf.style.top, 10) 
                        : Math.floor(Math.random() * 2) === 1
                            ? Math.floor(Math.random() * leavesContainer.getBoundingClientRect().height) - leaf.getBoundingClientRect().height
                            : 0
                    ;
                    let left = leaf.style.left && leaf.getAttribute('restart') !== 'true'
                        ? parseInt(leaf.style.left, 10) 
                        :  (leaf.setAttribute('restart', 'false'), 
                            top > 0
                                ? (this.wind > 0) ? 0 : leavesContainer.getBoundingClientRect().width - leaf.getBoundingClientRect().width
                                : Math.floor(Math.random() * (leavesContainer.getBoundingClientRect().width - leaf.getBoundingClientRect().width))
                            )
                    ;
                    top += this.fall;
                    left += this.wind;
            
                    if ((top <= leavesContainer.getBoundingClientRect().height - leaf.getBoundingClientRect().height)
                        && 
                        (left <= leavesContainer.getBoundingClientRect().width - leaf.getBoundingClientRect().width
                            &&
                            left >= 0)) {
                        leaf.style.left = Math.floor(left) + 'px';
                        leaf.style.top = Math.floor(top) + 'px';
                    }
                    else
                        leaf.setAttribute('restart', 'true');
                }, 15);

                setInterval(() => {
                    leaf.style.rotate = `${((leaf.style.rotate? parseFloat(leaf.style.rotate) : Math.floor(Math.random() * 90)) + this.wind)}deg`;
                }, 10);
            }, Math.floor(Math.random() * (timeToSpawnAllLeaves * 1000)));
        };
        container.appendChild(leavesContainer);
    };
};

export default FallingLeaves;