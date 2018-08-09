<template>
<input type="text" :value="value" @input="onInput" />
</template>

<script>
let methods = {};
methods.getFixedValue = function () {
    let oValue = this.$el.value.trim();
    if (oValue === '') {
        return oValue;
    }
    if (oValue === '-') {
        if (this.min !== undefined && this.min >= 0) {
            return '';
        } else {
            return '-';
        }
    }
    let n = parseFloat(oValue);
    if (isNaN(n)) {
        return 0;
    }
    let subfix = '';
    if (this.numType === 'integer') { // 仅整数
        oValue = parseInt(oValue, 10) || 0;
    } else if (oValue[oValue.length - 1] === '.') {
        subfix = '.';
        oValue = parseInt(oValue, 10) || 0;
    } else {
        oValue = n;
    }

    if (this.min !== undefined && oValue < this.min) {
        oValue = this.min;
    }
    if (this.max !== undefined && oValue > this.max) {
        oValue = this.max;
    }
    return oValue + subfix;
};
methods.onInput = function () {
    let val = this.getFixedValue();
    this.$el.value = val;
    this.$emit('input', val);
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
    props: ['value', 'numType', 'min', 'max'],
    mounted,
    mixins: [],
    beforeDestroy,
    components: {}
};
</script>

<style scoped lang="less">
.vue-comp {
    
}
</style>
