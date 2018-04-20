const Cover = require('util/cover.js');

const loading = function (options = {}) {
    let elem = document.createElement('div');
    elem.className = 'mui-loading';

    if (options.className) {
        elem.className += ' ' + options.className;
    }

    if (options.zIndex !== undefined) {
        elem.style.zIndex = options.zIndex;
    }
    let mCover = new Cover({
        opacity: 0.5
    });
    document.body.appendChild(elem);
    const remove = () => {
        document.body.removeChild(elem);
        mCover.remove();
    };
    return {
        elem, remove
    };
};


module.exports = loading;