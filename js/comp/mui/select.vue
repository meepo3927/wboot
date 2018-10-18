<template>
<div class="mui-select">
    <div class="v-holder" @click="onHolderClick">
        <!-- 没有选中 -->
        <span v-text="placeholder" v-if="vlen === 0" class="v-placeholder"></span>

        <!-- 第一项 -->
        <div class="selected-0" v-if="vlen" :class="{vshort: (vlen > 1)}">
            <span v-text="t0" :title="t0"></span>
            <a href="javascript:;" @click.stop="remove0">
                <i class="fa fa-times-circle"></i>
            </a>
        </div>
        <!-- 其他项 -->
        <div class="selected-else" v-if="vlen > 1" :title="telse">
            +<span v-text="vlen - 1"></span>
        </div>
        <i class="fa fa-caret-down"></i>
    </div>
    <!-- 选项 -->
    <ul class="o-list" v-show="optionsVisible">
        <li class="empty-tip" v-if="optionEmpty">没有可选项</li>
        <li v-if="!optionEmpty" v-for="v in options" 
            class="o-item"
            :class="getItemClass(v)"
            @click="onItemClick(v, $event)">
            {{getItemText(v)}}
            <i class="fa fa-check-circle"></i>
        </li>
    </ul>
</div>
</template>

<script>
let methods = {};
methods.getItemText = function (item) {
    if (!item) {
        return '';
    }
    if (item.text !== undefined) {
        return item.text;
    } else if (item.label !== undefined) {
        return item.label;
    } else if (item.name !== undefined) {
        return item.name;
    } else {
        return '';
    }
};
methods.getItemClass = function (item) {
    let arr = [];
    if (this.v.indexOf(item) >= 0) {
        arr.push('active');
    }
    return arr;
};
methods.onHolderClick = function () {
    this.optionsVisible = !this.optionsVisible;
};
methods.onItemClick = function (item, e) {
    if (e.ctrlKey) {
    } else {
        this.hideOptions();
    }
    let pos = this.v.indexOf(item);
    if (pos >= 0) {
        var arr = this.v.slice();
        arr.splice(pos, 1);
    } else {
        arr = this.v.concat(item);
    }
    this.$emit('input', arr);
    this.$msg(this.getItemText(item));
};
methods.remove0 = function () {
    var arr = this.v.slice();
    if (arr.length > 0) {
        arr.splice(0, 1);
    }
    this.$emit('input', arr);
};
methods.hideOptions = function () {
    this.optionsVisible = false;
};
methods.documentHandler = function (e) {
    if (this.$el.contains(e.target)) {
        return false;
    }
    this.hideOptions();
    return true;
}
let computed = {};
computed.placeholder = function () {
    return '请选择';
};
computed.v = function () {
    return this.value || [];
};
computed.vlen = function () {
    return this.v.length;
};
computed.t0 = function () {
    return this.getItemText(this.v[0]);
};
computed.telse = function () {
    if (this.vlen <= 1) {
        return undefined;
    }
    let arr = [];
    for (let i = 1; i < this.vlen; i++) {
        arr.push(this.getItemText(this.v[i]));
    }
    return arr.join('\n');
};
computed.optionEmpty = function () {
    let o = this.options;
    if (!o || !Array.isArray(o)) {
        return true;
    }
    return (o.length === 0);
};
let watch = {};
const created = function () {};
const mounted = function () {
    document.addEventListener('click', this.documentHandler);
};
const beforeDestroy = function () {
    document.removeEventListener('click', this.documentHandler);
};
const dataFunc = function () {
    let o = {
        optionsVisible: false
    };
    return o;
};
module.exports = {
    data: dataFunc,
    created,
    methods,
    computed,
    watch,
    props: ['options', 'value', 'max'],
    mounted,
    mixins: [],
    beforeDestroy,
    components: {}
};
</script>

<style scoped lang="less">
@my-height:  36px;
@v0-margin:  5px;
@v0-height:  @my-height - (@v0-margin * 2);
.mui-select {
    display: inline-block;
    position: relative;
    width: 100%;
    height: @my-height;
}
.mui-select > .v-holder {
    height: @my-height;
    border: 1px solid #dcdfe6;
    line-height: @my-height;
    padding: 0 5px;
    cursor: pointer;
    border-radius: 4px;
    &:hover {
        border-color: #c0c4cc;
    }
    & > .selected-0,
    & > .selected-else {
        white-space: nowrap;
        background-color: #F0F2F5;
        border-radius: 4px;
        height: @v0-height;
        line-height: @v0-height;
        font-size: 13px;
        color: #909399;
        padding: 0 15px 0 10px;
    }
    & > .selected-0 {
        display: inline-block;
        margin-top: @v0-margin;
        max-width: calc(~'100% - 30px');
        &.vshort {
            max-width: calc(~'100% - 80px');
        }
        & > span {
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            vertical-align: 0;
            max-width: 100%;
        }
        & > a {
            color: #999;
            vertical-align: 7px;
            font-size: 15px;
        }
    }
    & > .selected-else {
        display: inline-block;
        margin-top: @v0-margin;
        vertical-align: top;
        margin-left: 8px;
    }
    & > span {
        color: #999;
        margin-left: 8px;
    }
    & > i.fa {
        position: absolute;
        color: #aaa;
        top: (@my-height - 16px) / 2;
        right: 12px;
        font-size: 18px;
    }
}
.mui-select > .o-list {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    box-shadow: 0 2px 4px #ccc;
    background-color: #fff;
    max-height: 282px;
    overflow-x: hidden;
    overflow-y: auto;
    position: absolute;
    & > li {
        padding: 8px 12px;
        color: #666;
        border-bottom: 1px dashed #ddd;
        position: relative;
        word-wrap: break-word;
        word-break: break-all;
        &:nth-last-child(1) {
            border-bottom: none;
        }
        &.o-item {
            cursor: pointer;
        }
        &.o-item > .fa-check-circle {
            display: none;
        }
        &.o-item.active {
            color: #0080FF;
        }
        &.o-item.active > .fa-check-circle {
            display: inline-block;
        }
        &.o-item:hover {
            background-color: #F5F7FA;
        }
        &.empty-tip {
            color: #999;
        }
    }
}
</style>
