/**
 * @描述  拖动
 * @用法  
 */

(function (name, factory) {
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(['jquery'], factory);
    } else {
        return factory(window.jQuery);
    }
}('Module', function ($) {
    "use strict";

    if (!$) {
        throw '[jquery.drag.js] needs jquery';
    }

    var $html = $(document.documentElement);
    var $body = $(document.body);
    var Drag = {
    };
    Drag.showOverlay = function () {
        if (!Drag.$overlay) {
            Drag.$overlay = $('<div class="drag-overlay"></div>').css({
                position: 'fixed',
                left: 0, right: 0,
                top: 0, bottom: 0,
                zIndex: '99999998',
                backgroundColor: '#999',
                opacity: 0,
                cursor: 'move'
            });
            $body.append(Drag.$overlay);
            Drag.$overlay.on('mousemove', Drag.onMouseMove);
        }
        Drag.$overlay.show();
    };
    Drag.hideOverlay = function () {
        if (Drag.$overlay) {
            Drag.$overlay.hide();
        }
    };
    Drag.init = function () {
        if (Drag.inited) {
            return true;
        }
        $html.on('mouseup', Drag.onHtmlMouseup);
    };
    Drag.onHtmlMouseup = function (e) {
        Drag.end(e);
    };
    Drag.onBodySelect = function (e) {
        e.preventDefault();
        return false;
    };
    Drag.onMouseMove = function (e) {
        if (!Drag.context) {
            return;
        }
        var context = Drag.context;
        var x = e.pageX || e.clientX;
        var y = e.pageY || e.clientY;
        context.x = x - context.startX;
        context.y = y - context.startY;
        context.onDrag.call(context._, e, context);

    };
    Drag.start = function (e, $elem, options) {
        options = options || {};
        Drag.init();
        Drag.showOverlay();
        $body.on('selectstart', Drag.onBodySelect);
        var x = e.pageX || e.clientX;
        var y = e.pageY || e.clientY;
        var onStart = options.start || $.noop;
        var onDrag = options.drag || $.noop;
        var onEnd = options.end || $.noop;
        Drag.context = {
            startX: x,
            startY: y,
            startEvent: e,
            $elem: $elem,
            onStart: onStart,
            onDrag: onDrag,
            onEnd: onEnd,
            _: options.context || null
        };
        onStart.call(Drag.context._, e, Drag.context);
    };
    Drag.end = function (e) {
        if (!Drag.context) {
            return;
        }
        Drag.hideOverlay();
        $body.off('select', Drag.onBodySelect);
        var context = Drag.context;
        context.onEnd.call(context._, e, context);
        Drag.context = null;
    };
    Drag.bind = function ($elem, options) {
        $elem.on('mousedown', function (e) {
            Drag.start(e, $elem, options);
        });
    };
    $.fn.drag = function (options) {
        this.each(function (index) {
            if ($.isFunction(options)) {
                var onDrag = options;
                options = {
                    onDrag: onDrag
                };
            }
            Drag.bind($(this), options);
        });
    };
}));