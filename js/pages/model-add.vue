<template>
<div class="page-model-add m-container">
    <h3>录入模型信息</h3>
    <div class="m-row-auto-mid mt20">
        <div>模型名称：</div>
        <div class="pl10">
            <input type="text" class="form-control" v-model="modelName" />
        </div>
    </div>

    <div class="m-row-auto-mid mt20">
        <div>模型输入：</div>
        <div class="pl10">
            <input type="text" class="form-control" v-model="modelInput" />
        </div>
    </div>

    <div class="m-row-auto-mid mt20">
        <div>模型输出：</div>
        <div class="pl10">
            <input type="text" class="form-control" v-model="modelOutput" />
        </div>
    </div>

    <div class="m-row-auto mt20">
        <div>模型描述：</div>
        <div class="pl10">
            <textarea class="textarea form-control" ref="ta"></textarea>
        </div>
    </div>
    <div class="btn-box mt20">
        <button class="btn btn-primary" @click="submit">提交</button>
    </div>
</div>
</template>

<script>
require('lib/kindeditor-all-min.js');
let methods = {};
methods.submit = function () {
    let p = {
        modelName: this.modelName,
        modelInput: this.modelInput,
        modelOutput: this.modelOutput,
        modelContent: this.editor.html()
    };

    LOG(p);
};
methods.initEditor = function () {
    let options = {
        basePath: this.vConfig.staticPath + '/kindeditor/',
        // 自动加载CSS，设置路径
        themesPath: this.vConfig.staticPath + '/kindeditor/',
        // 皮肤
        // themeType: 'simple',
        items: [
            'fontsize', 'forecolor', 'hilitecolor', '|',
            'bold', 'italic', 'underline', 'strikethrough', 'removeformat', '|',
            'indent', 'outdent', 'justifyleft', 'justifycenter', 'justifyright', 
            'justifyfull', 'insertorderedlist', 'insertunorderedlist',
            'lineheight', '|',
            'image', 'table', 'hr', '|',
            'undo', 'redo',  'quickformat'
        ],

        allowImageUpload: false,
        syncType: '',
        // 纯文本粘贴
        pasteType: 1
    };
    window.KindEditor.ready((K) => {
        this.editor = K.create(this.$refs.ta, options);
    });
};
let computed = {};
let watch = {};
const created = function () {};
const mounted = function () {
    this.initEditor();
};
const beforeDestroy = function () {
    window.KindEditor.remove(this.$refs.ta);
};
const dataFunc = function () {
    let o = {
        modelName: '',
        modelInput: '',
        modelOutput: ''
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
.page-model-add {
    background-color: #fff;
    & > h3 {
        margin-top: 1px;
    }
}
.btn-box {
    margin-left: 80px;
}
.textarea {
    width: 700px;
    height: 240px;
}
</style>
