<template>
<div class="page-index" >
    <div >
        left-12345
        <i class="fa fa-cog"></i>
    </div>
    <!-- 页面 - 右 -->
    <form class="p15" @submit.prevent>
        <div>
            <input type="text" class="form-control" v-model="name">
        </div>

        <div class="mt10">
            <textarea class="form-control" id="message" v-model="name"></textarea>
        </div>
        <p v-text="name"></p>
        <button class="btn btn-default" @click="alert" type="button">
            确定
        </button>
    </form>
</div>
</template>

<script>
import {mlayer} from 'root';
let methods = {};
methods.alert = function () {
    mlayer.msg(this.name);
};
let computed = {};
let watch = {};
const created = function () {};
const mounted = function () {};
const beforeDestroy = function () {};
const dataFunc = function () {
    let o = {
        name: 'meep'
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

</style>
