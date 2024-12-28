//@ts-check
/**@author Dead Paul <https://github.com/Dead-Paul/> */

let
    /**
     * Wind intensity, when bigger then 0 from left to the right side, smaller than 0 from the right to the left side, equals 0 no wind at all. Can be float or int.
     * @type {Number}
     */
     wind = 1,
    /**
     * Fall speed of leaves, when bigger then 0 falling down, smaller then 0 flowing up (without respawn). Can be int only.
     * @type {Number}
     */
     fallSpeed = 1;

document.addEventListener('DOMContentLoaded', () => {
    const  
        /**
         * Amount of leaves in the space where the animation was placed.
         * @type {Number}
         */
        leavesAmount = 20, 
        /**
         * Place (space) where the animation places itself. By default element with id = 'animation-div'.
         * @type {HTMLElement}
         */ 
        space = document.getElementById('animation-div') || document.documentElement,
        /**
         * Parameters of space where animation placed.
         * @type {Object}
        */ 
        spaceParams = {
            height : () => space.getBoundingClientRect().height,
            width : () => space.getBoundingClientRect().width
        };

    //Function that changes wind sometimes on random direction.
    setInterval(function() {
        wind = Math.floor(Math.random() * 2) * 2 - 1;
    }, (40 * 1000));

    for (let leaf = 0; leaf < leavesAmount; leaf++) {
        // Function that spawns all leaves into space in random time.
        setTimeout(() => {
            const img = document.createElement('img');
            // Path to the pictures of leaves and Max number of them (numbered from 0 to 5 by default)
            img.src = `./img/leaves/leaf-${Math.floor(Math.random() * 5)}.png`;
            img.className = 'leaf';
            img.setAttribute('restart', 'true');

            // Next line causing error if left, therefore after editing comment next string: 
            // /**@param {HTMLElement} img */
            function mouseOverLeaf(img) {
                img.setAttribute('isBusy', 'true');
                let
                    /**@type {Number} */ top = parseInt(img.style.top),
                    /**@type {Number} */ left = parseInt(img.style.left),
                    /**@type {Number} */ i = 1,
                    /**@type {Number} */
                    intervalId = setInterval(function () {
                        if (i > 10) {
                            clearInterval(intervalId);
                            img.setAttribute('isBusy', 'false');
                        }
                        else {
                            img.style.left = Math.floor(left + i * wind * 2) + 'px';
                            img.style.top = Math.floor(top + -fallSpeed * 2) + 'px';
                            i++;
                        }
                    }, 30);
                };
            img.addEventListener('mouseover', (ev) => mouseOverLeaf(ev.currentTarget));

            document.getElementById('animation-div')?.appendChild(img);
            setInterval(fallAnimation, 15, img);
            setInterval(leafAnimation, 10, img);
        }, Math.floor(Math.random() * (20 * 1000)));
    };
    /**
     * Making fall animation for the image from parameter img in the bounds of the space where animation was placed.
     * @param {HTMLElement} img 
     */
    function fallAnimation (img) {
        if (img.getAttribute('isBusy') === 'true')
            return;
        let 
            /**@type {Number} */ top = img.style.top && img.getAttribute('restart') !== 'true'
                ? parseInt(img.style.top, 10) 
                : Math.floor(Math.random() * 2) === 1
                    ? Math.floor(Math.random() * spaceParams.height()) - img.getBoundingClientRect().height
                    : 0,
            /**@type {Number} */ left = img.style.left && img.getAttribute('restart') !== 'true'
                ? parseInt(img.style.left, 10) 
                : (img.setAttribute('restart', 'false'), top > 0
                    ? wind > 0
                        ? 0
                        : spaceParams.width() - img.getBoundingClientRect().width
                    : Math.floor(Math.random() * (spaceParams.width() - img.getBoundingClientRect().width))
                    );
        top += fallSpeed;
        left += wind;

        if ((top <= spaceParams.height() - img.getBoundingClientRect().height)
            && 
            (left <= spaceParams.width() - img.getBoundingClientRect().width
                &&
                left >= 0)) {
            img.style.top = Math.floor(top) + 'px';
            img.style.left = Math.floor(left) + 'px';
        }
        else
            img.setAttribute('restart', 'true');
    };

    /**
     * Adding rotation to the element (image) that was given in parameter.
     * @param {HTMLElement} img
     */
    function leafAnimation (img) {
        let /**@type {Number} */
            rotate = img.style.rotate? parseFloat(img.style.rotate) : Math.floor(Math.random() * 90);
        img.style.rotate = (rotate + wind) + 'deg';
    };
});