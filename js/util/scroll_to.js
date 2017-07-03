
let $ = require('jquery');

let $body = $(document.body);

module.exports = (elem, options = {}) => {
    if (elem && elem.jquery) {
        var $elem = elem;
    } else {
        $elem = $(elem);
    }

    if (!$elem.length) {
        return;
    }

    let top = $elem.offset().top;

    $body.animate({
        scrollTop: top
    });
};