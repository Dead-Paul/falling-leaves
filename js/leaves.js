//@ts-check
/**@author Dead Paul <https://github.com/Dead-Paul/> */

let
    /**@type {Number}*/ wind = 1,
    /**@type {Number}*/ fallSpeed = 1;

document.addEventListener('DOMContentLoaded', () => {
    const  
        /**@type {HTMLElement} */ 
        space = document.getElementById('animation-div') || document.documentElement,
        /**@type {Object} */ 
        spaceParams = {
            height : () => space.getBoundingClientRect().height,
            width : () => space.getBoundingClientRect().width
        };

    setInterval(function() {
        wind = Math.floor(Math.random() * 2) * 2 - 1;
    }, (40 * 1000));

    for (let leaf = 0; leaf < 20; leaf++) {
        setTimeout(() => {
            const img = document.createElement('img');
            img.src = `./img/leaves/leaf-${Math.floor(Math.random() * 5)}.png`;
            img.className = 'leaf';
            img.setAttribute('restart', 'true');

            // Next line for editor. causing error if left, therefore after editing comment next string: 
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
    /**@param {HTMLElement} img */
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

    /**@param {HTMLElement} img */
    function leafAnimation (img) {
        let /**@type {Number} */
            rotate = img.style.rotate? parseFloat(img.style.rotate) : Math.floor(Math.random() * 90);
        img.style.rotate = (rotate + wind) + 'deg';
    };
});