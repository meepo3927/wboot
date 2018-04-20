<template>
<div class="v-backtop" title="回到顶部" @click="onClick">
    <span></span>
    <i class="fa fa-arrow-up"></i>
</div>
</template>

<script>
let $ = require('jquery');

let methods = {};
methods.onClick = function () {
    let $html = $(document.documentElement);
    let $body = $(document.body);
    $html.animate({
        scrollTop: 0
    });
    $body.animate({
        scrollTop: 0
    });
};
let computed = {};
let watch = {};
const created = function () {};
const mounted = function () {};
const beforeDestroy = function () {};
const dataFunc = function () {
    let o = {};
    return o;
};
module.exports = {
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
@color:        #666;
@hover-color:  #999;
.v-backtop {
    position: fixed;
    bottom: 40px;
    right: 39px;

    cursor: pointer;
    z-index: 300;
    border-radius: 4px;
    padding: 8px 10px 6px;
    background-color: #ddd;
    &:hover > span {
        background-color: @hover-color;
    }
    &:hover > i {
        color: @hover-color;
    }
    & > span {
        display: block;
        height: 6px;
        background-color: @color;
        border-radius: 4px;
        margin-bottom: -3px;
    }
    & > i {
        font-size: 30px;
        color: @color;
    }
}
</style>
