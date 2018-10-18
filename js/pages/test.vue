<template>
<div class="page-test">
    <form class="p15" @submit.prevent>
        <button v-tooltip="tooltipStr" @click="PPP"
            class="btn btn-primary">改变tooltip内容</button>

        <div class="mt15">
            <input type="text" class="form-control" v-model="name" />
            <p v-text="name"></p>
        </div>
        <div>
            <button class="btn btn-default" @click="msg0" type="button">
                msg 0
            </button>
            <button class="btn btn-default" @click="msg1" type="button">
                msg 1
            </button>
            <button class="btn btn-default" @click="msg2" type="button">
                msg 2
            </button>
            <button class="btn btn-default" @click="msg3" type="button">
                msg 3
            </button>
        </button>
        </div>
        <div class="mt20">
            <button class="btn btn-default" @click="muiAlert" type="button">
                MUI-Alert
            </button>
            <button class="btn btn-default" @click="muiConfirm" type="button">
                MUI-Confirm
            </button>
            <button class="btn btn-default" @click="muiAlertWarning" type="button">
                MUI-Warning
            </button>
            <button class="btn btn-default" @click="muiPrompt" type="button">
                MUI-Prompt
            </button>
            <button class="btn btn-default" @click="muiloading" type="button">
                MUI-loading
            </button>
            <v-switch v-model="switchValue" />
            <button class="btn btn-default" style="float: right;"
                v-tooltip="tooltipStr"
                @click="onTooltipTestClick">
                测试tooltip
            </button>
        </div>
        
    </form>
    <mui-layer v-if="switchValue" @close="layerClose">
        <div slot="header">哈哈哈</div>
        <div style="min-width: 400px;">
            <div class="m-row-mid">
                <label for="">姓名：</label>
                <div>
                    <input type="text" class="form-control"
                        v-tooltip="tooltipObj">
                </div>
            </div>
            <div class="mt15 text-right">
                <button class="btn btn-primary" @click="layerClose">确定</button>
            </div>
        </div>
    </mui-layer>

    <button class="btn btn-success"
        v-tooltip="我是猪">MUI Tooltip1</button>

    <button class="btn btn-success"
        v-tooltip="tooltipStr">MUI Tooltip2</button>


    <button class="btn btn-success"
        v-tooltip="tooltipObj">MUI Tooltip3</button>

    <mui-alertspan type="success">
        Heads up! This alert needs your attention, but it's not super important.
    </mui-alertspan>
    <br />
    <div class="alert alert-warning mt15">
        Heads up! This alert needs your attention, but it's not super important.
    </div>
    
    <mui-slider v-model="sliderValue" min="1000" max="10000" />
    <input type="text" v-model="sliderValue" />
    
    <div class="mt30">
        <mui-select :options="o2" class="m-sel-1" ref="muiS" 
            v-model="s2" />
        <p v-text="s2"></p>
    </div>
</div>
</template>

<script>
require('root');

const duration = 999999999;
const longMsg = '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十';
let methods = {};
methods.layerClose = function () {
    this.switchValue = false;
};
methods.onTooltipTestClick = function () {
    this.tooltipStr = Math.random();
};
methods.PPP = function () {
    this.tooltipStr = Math.random() + longMsg + longMsg + longMsg;
};
methods.msg0 = function () {
    this.$msg(longMsg);
};
methods.msg1 = function () {
    this.$msg.success(longMsg);
};
methods.msg2 = function () {
    this.$msg.warning(longMsg);
};
methods.msg3 = function () {
    this.$msg.error(longMsg);
};
methods.muiAlert = function () {
    let text = 'ae' + longMsg;
    this.$alert(text);
};
methods.muiConfirm = function () {
    let text = '确定删除吗？';
    let title = '提示';
    this.$confirm(text, title, (v) => {
        this.$msg(v);
    });
};
methods.muiAlertWarning = function () {
    let text = '确定删除吗？';
    let title = '提示';
    this.$confirm({
        text, title,
        icon: 'warning',
        callback: (v) => { this.$msg(v) }
    });
};
methods.muiPrompt = function () {
    let text = '请输入姓名';
    let title = '提示';
    this.$prompt(null, text, (v) => {
        this.$msg(v);
    });
};
methods.muiloading = function () {
    let ld = this.$loading();
    setTimeout(() => {
        ld.remove()
    }, 1500)
};
let computed = {};
computed.o2 = function () {
    let arr = [
        {
            text: '全区', value: '400'
        },
        {
            text: '呼和浩特', value: '471'
        },
        {
            text: '包头', value: '472'
        },
        {
            text: '非常长的选项一二三四4567890aaaaaaaaaaaaaa',
            value: 'abedd3'
        }
    ];
    for (let i = 0; i < 2; i++) {
        //arr.push({name: 'oe-' + Math.random()});
    }
    return arr;
};
let watch = {};
const created = function () {};
const mounted = function () {
    window.Test = this;
};
const beforeDestroy = function () {};
const dataFunc = function () {
    let o = {
        name: +new Date(),
        switchValue: false,
        tooltipStr: 'mmmmmmeepo' + longMsg,
        tooltipObj: {
            text: 'Yep'
        },

        sliderValue: 6000,

        s2: ['472', '400', 'aaa']
    };
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
    components: {
        'v-switch': require('comp/mui/switch.vue'),
        'mui-layer': require('comp/mui/center-layer.vue'),
        'mui-alertspan': require('comp/mui/alert-span.vue'),
        'mui-slider': require('comp/mui/slider.vue'),
        'mui-select': require('comp/mui/select.vue')
    }
};
</script>

<style scoped lang="less">
.page-test {
    
}
textarea {
    width: 600px;
    height: 400px;
}
.mui-select.m-sel-1 {
    width: 25%;
    //width: 60%;
}
</style>