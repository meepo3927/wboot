<template>
<div class="happy-scroll" ref="root" @mousewheel="onWheel">
    <!-- 出现滚动条的元素 -->
    <div class="happy-scroll-container" ref="container" :style="{left, top}" >
        <!-- 内容元素 -->
        <div class="happy-scroll-content" ref="content">
            <slot></slot>
        </div>
    </div>
    <!-- 竖向垂直滚动条, 如果 percentageY 比例等于1不显示该滚动条 -->
    <happy-scroll-strip
        v-show="!hideVertical && percentageY < 1"
        v-model="slideY"
        v-bind="$attrs"
        :color="color"
        :percentage="percentageY"
        :move="moveY" />
    <!-- 横向水平滚动条 -->
    <happy-scroll-strip
        v-show="!hideHorizontal && percentageX < 1"
        horizontal
        v-model="slideX"
        v-bind="$attrs"
        :color="color"
        :percentage="percentageX"
        :move="moveX" />
</div>
</template>
<script>
import Vue from 'vue';
import { generateThrottle, debounce } from './util';
import HappyScrollStrip from './strip.vue';
import ElementResizeDetectorMaker from './element-resize-detector.min.js';
const MIN_WHEEL_STEP = 35;
export default {
    name: 'happy-scroll',
    inheritAttrs: false,
    components: {
        HappyScrollStrip
    },
    props: {
        color: {
            type: String,
            default: 'rgba(51, 51, 51, 0.3)'
        },
        // 设置竖向滚动条的位置
        scrollTop: {
            type: [Number, String],
            default: 0
        },
        // 设置横向滚动条的位置
        scrollLeft: {
            type: [Number, String],
            default: 0
        },
        // 是否隐藏竖向滚动条
        hideVertical: Boolean,
        // 是否隐藏横向滚动条
        hideHorizontal: Boolean,
        smallerMoveH: {
            type: String,
            default: ''
        },
        smallerMoveV: {
            type: String,
            default: ''
        },
        biggerMoveH: {
            type: String,
            default: ''
        },
        biggerMoveV: {
            type: String,
            default: ''
        }
    },
    data: function () {
        return {
            percentageX: 0, // 横向滚动条百分比
            moveX: +this.scrollLeft, // slot dom元素滚动的位置
            slideX: 0, // 鼠标拖动滚动条的位置

            percentageY: 0, // 竖向滚动条百分比
            moveY: +this.scrollTop,
            slideY: 0,
            // 监听scroll事件的节流函数
            scrollThrottle: generateThrottle()
        }
    },
    watch: {
        // 鼠标拖动滚动条时，移动slot元素到对应位置
        slideX: function (newVal) {
            this.moveX = newVal / this.percentageX
        },
        slideY: function (newVal) {
            this.moveY = newVal / this.percentageY
        },
        // 监听（鼠标滑轮或者触摸板滑动） 滑动到指定位置
        scrollTop: function (newVal) {
            this.moveY = this.getFixedY(+newVal);
        },
        scrollLeft (newVal) {
            this.moveX = +newVal;
        }
    },
    computed: {
        left: function () {
            return -this.moveX + 'px';
        },
        top: function () {
            return -this.moveY + 'px';
        }
    },
    methods: {
        getYOffset: function () {
            const clientEle = this.$refs.root;
            const slotEle = this.$refs.content;

            return slotEle.scrollHeight - clientEle.clientHeight;
        },
        getFixedY: function (y) {
            y = Math.min(this.getYOffset(), y);
            return Math.max(0, y);
        },
        onWheel: function (e) {
            e = e || window.event;
            let delta = 0;
            if (e.wheelDelta) {
                delta = -e.wheelDelta / 120;
            } else if (e.detail) {
                delta = e.detail / 3;
            }
            let yOffset = Math.max(this.getYOffset(), 0);
            let v = Math.round(delta * yOffset * 0.08);
            if (Math.abs(v) < MIN_WHEEL_STEP) {
                v = (v > 0) ? MIN_WHEEL_STEP : -MIN_WHEEL_STEP;
            }
            let newY = this.moveY + v;
            this.moveY = this.getFixedY(newY);
        },

        // 获取滚动条百分比
        getPercentage () {
            const clientEle = this.$refs.root;
            const slotEle = this.$refs.content;
            // 竖向滚动条高度与元素高度百分比
            this.percentageY = clientEle.clientHeight / slotEle.scrollHeight
            // 横向滚动条高度与元素宽度百分比
            this.percentageX = clientEle.clientWidth / slotEle.scrollWidth
        },
        // slot视图大小变化时的监听
        resizeListener () {
            // 监听slot视图元素resize
            let elementResizeDetector = ElementResizeDetectorMaker({
                strategy: 'scroll',
                callOnAdd: false
            })

            elementResizeDetector.listenTo(this.$refs.content, () => {
                // 计算滚动条百分比
                this.getPercentage();
                // 修正y
                let yOffset = this.getYOffset();
                // LOG(this.moveY + ':' + yOffset);
                if (yOffset > 0 && this.moveY > Math.abs(yOffset)) {
                    this.moveY = yOffset;
                } else if (yOffset < 0 && this.moveY > 0) {
                    this.moveY = 0;
                }
            });
        }
    },
    beforeCreate () {
    },
    mounted () {
        window.HScroller = this;
        // 计算最外层宽高，设置滚动条元素的宽高
        this.$nextTick(() => {
            this.getPercentage();
        })

        // 监听slot视图变化, 方法内部会判断是否设置了开启监听resize
        this.resizeListener()
    }
};
</script>
<style lang="less">
.happy-scroll {
    width: 100%;
    height: auto;
    overflow: hidden;
    position: relative;
}

.happy-scroll-strip--vertical {
    position: absolute;
    top: 0;
    right: 1px;
    height: 100%;
}
.happy-scroll-strip--vertical .happy-scroll-bar {
    background-color: rgba(51,51,51,0.2);
    border-radius: 7px;
    width: 6px;
    height: 0;
    -webkit-transition: width 0.4s ease, height 0.6s ease;
    transition: width 0.4s ease, height 0.6s ease;
}
.happy-scroll-strip--horizontal {
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
}
.happy-scroll-strip--horizontal .happy-scroll-bar {
    background-color: rgba(51,51,51,0.2);
    border-radius: 7px;
    height: 6px;
    width: 0;
    -webkit-transition: height 0.4s ease, width 0.6s ease;
    transition: height 0.4s ease, width 0.6s ease;
}

.happy-scroll-container {
    overflow: visible;
    height: 100%;
    width: 100%;
    position: absolute;
}
.happy-scroll-content {
    border-right: 8px solid transparent;
    border-bottom: 8px solid transparent;
}
</style>
