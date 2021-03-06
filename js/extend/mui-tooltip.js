let $ = require('jquery');
const ARROW_PAD = 12;
const Tooltip = function (options) {
    this.onWindowScroll = (e) => {this._onWindowScroll(e)};
    this.onWindowResize = (e) => {this._onWindowResize(e)};
    this.onMouseEnter = (e) => {this._onMouseEnter(e)};
    this.onMouseLeave = (e) => {this._onMouseLeave(e)};

    this.makeElem();
    this.setOptions(options);
    this.bind();
};
const getDocProperty = (name) => {
    let docElem = document.documentElement;
    let docBody = document.body;

    return docElem[name] || docBody[name];
};
// 是否越界
const checkPosition = (p, elemRect) => {
    let docElem = document.documentElement;
    let docBody = document.body;
    let docTop = getDocProperty('scrollTop');
    let docLeft = getDocProperty('scrollLeft');
    let docWidth = getDocProperty('clientWidth');
    let docHeight = getDocProperty('clientHeight');

    // 上边 越界
    if (p.top < docTop) {
        return false;
    }
    // 右侧 越界
    if (p.left + elemRect.width >= docLeft + docWidth) {
        return false;
    }

    // 下边 越界
    if (p.top + elemRect.height >= docTop + docHeight) {
        return false;
    }
    // 左侧 越界
    if (p.left < docLeft) {
        return false;
    }

    return true;
};
let proto = Tooltip.prototype;
proto.getElemRect = function () {
    return this.elem.getBoundingClientRect();
};
proto.renderPosition = function () {
    let p = this.getPosition();
    // LOG('position:', p);
    this.$elem.attr('m-placement', p.placement);
    this.$elem.css({
        top: Math.round(p.top) + 'px',
        left: Math.round(p.left) + 'px'
    });
};
proto.getPosition = function () {
    // Number
    let targetRect = this.target.getBoundingClientRect();
    let elemRect = this.getElemRect();
    let rect = {
        width: targetRect.width,
        height: targetRect.height,
        x: targetRect.left + getDocProperty('scrollLeft'),
        y: targetRect.top + getDocProperty('scrollTop')
    };
    rect.right = rect.x + rect.width;
    rect.bottom = rect.y + rect.height;

    // 上左
    let p1 = this.getPositionTopLeft(rect, elemRect);
    if (checkPosition(p1, elemRect)) {
        return p1;
    }
    // 上中
    let p2 = this.getPositionTopCenter(rect, elemRect);
    if (checkPosition(p2, elemRect)) {
        return p2;
    }
    // 上右
    let p3 = this.getPositionTopRight(rect, elemRect);
    if (checkPosition(p3, elemRect)) {
        return p3;
    }
    // 右中
    let p5 = this.getPositionRightCenter(rect, elemRect);
    if (checkPosition(p5, elemRect)) {
        return p5;
    }
    // 右上
    let p4 = this.getPositionRightTop(rect, elemRect);
    if (checkPosition(p4, elemRect)) {
        return p4;
    }
    // 右下
    let pRightBottom = this.getPositionRightBottom(rect, elemRect);
    if (checkPosition(pRightBottom, elemRect)) {
        return pRightBottom;
    }
    // 下左
    let pBottomLeft = this.getPositionBottomLeft(rect, elemRect);
    if (checkPosition(pBottomLeft, elemRect)) {
        return pBottomLeft;
    }
    // 下中
    let pBottomCenter = this.getPositionBottomCenter(rect, elemRect);
    if (checkPosition(pBottomCenter, elemRect)) {
        return pBottomCenter;
    }
    // 下右
    let pBottomRight = this.getPositionBottomRight(rect, elemRect);
    if (checkPosition(pBottomRight, elemRect)) {
        return pBottomRight;
    }
    // 左上
    let pLeftTop = this.getPositionLeftTop(rect, elemRect);
    if (checkPosition(pLeftTop, elemRect)) {
        return pLeftTop;
    }
    // 左中
    let pLeftCenter = this.getPositionLeftCenter(rect, elemRect);
    if (checkPosition(pLeftCenter, elemRect)) {
        return pLeftCenter;
    }
    // 左下
    let pLeftBottom = this.getPositionLeftBottom(rect, elemRect);
    if (checkPosition(pLeftBottom, elemRect)) {
        return pLeftBottom;
    }

    return {
        top: -99999,
        left: -99999
    };
};

const getTopTop = (rect, elemRect) => {
    return rect.y - elemRect.height - ARROW_PAD;
};
const getHorzCenterTop = (rect, elemRect) => {
    return rect.x - (elemRect.width - rect.width) / 2
};
const getHorzRightLeft = (rect, elemRect) => {
    return rect.right - (elemRect.width);
};
const getSideCenterTop = (rect, elemRect) => {
    return rect.y - (elemRect.height - rect.height) / 2;
};
const getSideBottomTop = (rect, elemRect) => {
    return rect.bottom - elemRect.height;
};
const getRightLeft = (rect, elemRect) => {
    return rect.x + rect.width + ARROW_PAD;
};
const getLeftLeft = (rect, elemRect) => {
    return rect.x - elemRect.width - ARROW_PAD * 2;
};
// 上左
proto.getPositionTopLeft = function (rect, elemRect) {
    let top = getTopTop(rect, elemRect);
    let left = rect.x - 11;
    return {
        placement: 'top-left',
        top, left
    }
};
// 上中
proto.getPositionTopCenter = function (rect, elemRect) {
    let top = getTopTop(rect, elemRect);
    let left = getHorzCenterTop(rect, elemRect);
    return {
        placement: 'top-center',
        top, left
    }
};
// 上右
proto.getPositionTopRight = function (rect, elemRect) {
    let top = getTopTop(rect, elemRect);
    let left = getHorzRightLeft(rect, elemRect);
    return {
        placement: 'top-right',
        top, left
    }
};
// 右上
proto.getPositionRightTop = function (rect, elemRect) {
    let top = rect.y;
    let left = getRightLeft(rect, elemRect);
    return {
        placement: 'right-top',
        top, left
    }
};
// 右中
proto.getPositionRightCenter = function (rect, elemRect) {
    let top = getSideCenterTop(rect, elemRect);
    let left = getRightLeft(rect, elemRect);
    return {
        placement: 'right-center',
        top, left
    }
};
// 右下
proto.getPositionRightBottom = function (rect, elemRect) {
    let top = getSideBottomTop(rect, elemRect);
    let left = getRightLeft(rect, elemRect);
    return {
        placement: 'right-bottom',
        top, left
    }
};
// 下左
proto.getPositionBottomLeft = function (rect, elemRect) {
    let top = rect.bottom;
    let left = rect.x;
    return {
        placement: 'bottom-left',
        top, left
    }
};
// 下中
proto.getPositionBottomCenter = function (rect, elemRect) {
    let top = rect.bottom;
    let left = getHorzCenterTop(rect, elemRect);
    return {
        placement: 'bottom-center',
        top, left
    }
};
// 下右
proto.getPositionBottomRight = function (rect, elemRect) {
    let top = rect.bottom;
    let left = getHorzRightLeft(rect, elemRect);
    return {
        placement: 'bottom-right',
        top, left
    }
};
// 左上
proto.getPositionLeftTop = function (rect, elemRect) {
    let top = rect.y;
    let left = getLeftLeft(rect, elemRect);
    return {
        placement: 'left-top',
        top, left
    }
};
// 左中
proto.getPositionLeftCenter = function (rect, elemRect) {
    let top = getSideCenterTop(rect, elemRect);
    let left = getLeftLeft(rect, elemRect);
    return {
        placement: 'left-center',
        top, left
    }
};
// 左下
proto.getPositionLeftBottom = function (rect, elemRect) {
    let top = getSideBottomTop(rect, elemRect);
    let left = getLeftLeft(rect, elemRect);
    return {
        placement: 'left-bottom',
        top, left
    }
};
proto.setText = function (text) {
    this.text = text;
    if (this.elemVisible) {
        this.renderText();
        this.renderPosition();
    } else {
        this.renderText();
    }
};
proto.setOptions = function (options) {
    this.setText(options.text);
    this.target = options.target;
    this.$target = $(options.target);
};
proto.bind = function () {
    this.$target.on('mouseenter', this.onMouseEnter)
        .on('mouseleave', this.onMouseLeave);
    window.addEventListener('scroll', this.onWindowScroll);
    window.addEventListener('resize', this.onWindowResize);
};
proto.unbind = function () {
    this.$target.off('mouseenter', this.onMouseEnter)
        .off('mouseleave', this.onMouseLeave);
    window.removeEventListener('scroll', this.onWindowScroll);
    window.removeEventListener('resize', this.onWindowResize);
};
proto.update = function (options) {
    if (this.target !== options.target) {
        this.target = options.target;

        this.unbind();
        this.$target = options.$target;
        this.bind();
    }
    this.setText(options.text);
};
proto.destroy = function () {
    this.unbind();
    this.$elem.remove();
};
proto.renderText = function () {
    if (!this.$elem) {
        return;
    }
    this.$elem.css('width', 'auto');
    this.$elem.children('.mui-tooltip-content').html(this.text);
    let rect = this.getElemRect();
    this.$elem.css('width', rect.width + 'px');
};
proto.makeElem = function () {
    let elem = document.createElement('div');
    elem.className = 'mui-tooltip';
    document.body.appendChild(elem);
    elem.innerHTML = [
        '<div class="mui-tooltip-content"></div>',
        '<div class="mui-tooltip-arrow"></div>'
    ].join('');
    this.elem = elem;
    this.$elem = $(elem);
    this.hide();
};
proto.show = function () {
    //this.$elem.css('visibility', 'visible');
    this.$elem.css('opacity', '1');
};
proto.hide = function () {
    this.$elem.attr('m-placement', null);
    this.$elem.css({
        opacity: '0',
        top: '-99999px',
        left: '-99999px'
    });
};
proto._onMouseEnter = function (e) {
    this.renderPosition();
    this.show();
    this.elemVisible = true;
};
proto._onMouseLeave = function (e) {
    this.hide();
    this.elemVisible = false;
};
proto._onWindowScroll = function (e) {
    if (this.elemVisible) {
        this.renderPosition();
    }
};
proto._onWindowResize = function (e) {
    if (this.elemVisible) {
        this.renderPosition();
    }
};
module.exports = Tooltip;