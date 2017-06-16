import 'polyfill';

// 基础库
import Vue from 'vue';
import $ from 'jquery';
import mlayer from 'mlayer';

// require('../less/oe.less');

// 布局
Vue.component('left-right-layout', require('comp/left-right-layout.vue'));

export {
    Vue,
    $,
    mlayer
};