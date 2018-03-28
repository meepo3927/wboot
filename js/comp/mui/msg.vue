<template>
<div class="mui-msg" >
    <div class="mui-msg-height-wrapper">
        <div class="mui-msg-box">
            <div class="mui-msg-content" :class="contentClass">
                <i class="fa" :class="[iconClass]" v-if="iconVisible"></i>
                <p v-text="text"></p>
            </div>
        </div>
    </div>
</div>
</template>

<script>

let methods = {};
methods.close = function () {
    this.$el.parentNode.removeChild(this.$el);
};
let computed = {};
computed.contentClass = function () {
    return [
        'type-' + this.type
    ];
};
computed.iconVisible = function () {
    return this.iconClass ? true : false;
};
computed.iconClass = function () {
    let map = {
        success: 'fa-check-circle',
        warning: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        error: 'fa-times-circle'
    };
    return map[this.type] || '';
};
let watch = {};
const created = function () {};
const mounted = function () {
    if (this.duration) {
        setTimeout(this.close, this.duration);
    }
};
const beforeDestroy = function () {};
const dataFunc = function () {
    let o = {
        text: '',
        duration: 2500,
        type: 'msg'
    };
    return o;
};
export default {
    data: dataFunc,
    created,
    methods,
    computed,
    watch,
    props: [],
    mounted,
    mixins: [],
    beforeDestroy,
    components: {}
};
</script>

<style scoped lang="less">
@z-index:     19900420;
@success-border-color:  #e1f3d8;
@success-back-color:    #f0f9eb;
@success-text-color:    #67c23a;

@warning-border-color:  #faecd8;
@warning-back-color:    #fdf6ec;
@warning-text-color:    #e6a23c;

@info-border-color:  darken(#edf2fc, 5%);
@info-back-color:    #edf2fc;
@info-text-color:    #909399;

@error-border-color:  #fde2e2;
@error-back-color:    #fef0f0;
@error-text-color:    #f56c6c;


@keyframes mui-msg-show-anim {
    0% {
        opacity: 0;
        transform: scale(.5)
    }
    100% {
        opacity: 1;
        transform: scale(1)
    }
}
.mui-msg-anim-bouncein {
    animation-name: mui-msg-show-anim;
}
.inline() {
    display: inline-block;
    *display: inline;
    *zoom: 1;
}
.wordwrap() {
    word-wrap: break-word;
    word-break: break-all;
}
.mui-msg {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: @z-index;
    pointer-events: none;
    animation-duration: 0.3s;
    animation-fill-mode: both;
    .mui-msg-anim-bouncein;
    // fix jquery-ui
    & ~ .ui-front {
        z-index: @z-index + 10;
    }

}

.mui-msg-height-wrapper {
    height: 100%;
    margin: 0;
    &:after {
        .inline();
        vertical-align: middle;
        width: 1px;
        margin-left: -99%;
        height: 100%;
        content: '&nbsp;';
        font-size: 0;
    }
}
.mui-msg-box {
    .inline();
    vertical-align: middle;
    background-color: transparent;
    width: 100%;
    max-height: 100%;
    text-align: center;
}
.mui-msg-content {
    .inline();
    .wordwrap();
    margin: auto;
    pointer-events: auto;
    font-size: 16px;
    position: relative;
    &.type-success,
    &.type-warning,
    &.type-info,
    &.type-error {
        border-width: 1px;
        border-style: solid;
        padding: 15px 15px 15px 40px;
    }
    & > i.fa {
        position: absolute;
        left: 20px;
        top: 50%;
        margin-top: -9px;
        line-height: 1;
        font-size: 18px;
    }
    & > p {
        line-height: 1.4;
        margin-top: 0;
        margin-bottom: 0;
        max-width: 380px;
    }
}
.mui-msg-content.type-msg {
    padding: 12px;
    border-radius: 3px;
    padding: 12px 25px;
    text-align: center;
    color: #fff;
    background-color: #000;
    filter: alpha(opacity=80);
    background-color: rgba(0, 0, 0, 0.6);
    max-width: 75%;
    box-shadow: 0px 0px 15px #666;
}
.mui-msg-content.type-success {
    background-color: @success-back-color;
    border-color:     @success-border-color;
    & > p,
    & > i {
        color: @success-text-color;
    }
}
.mui-msg-content.type-warning {
    background-color: @warning-back-color;
    border-color:     @warning-border-color;
    & > p,
    & > i {
        color: @warning-text-color;
    }
}
.mui-msg-content.type-info {
    background-color: @info-back-color;
    border-color:     @info-border-color;
    & > p,
    & > i {
        color: @info-text-color;
    }
}
.mui-msg-content.type-error {
    background-color: @error-back-color;
    border-color:     @error-border-color;
    & > p,
    & > i {
        color: @error-text-color;
    }
}
</style>
