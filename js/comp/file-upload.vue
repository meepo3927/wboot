<template>
<span class="v-file-upload">
	<!-- for click -->
	<label class="v-file-name" :for="elemId" >
		<div v-text="fileName" :title="fileName"></div>
	</label>
	<!-- for click -->
	<label class="v-file-label ml10" title="选择要上传的文件"
		:for="elemId" 
		v-text="myText"></label>
	<!-- Error Msg -->
	<span class="error-msg ml10" v-show="errmsg" v-text="errmsg"></span>
	<form :action="formAction" style="display: none;" ref="form">
		<slot name="form"></slot>
		<!-- input elem -->
		<input type="file" class="v-file" 
			ref="file"
			:id="elemId" 
			:name="myElemName" 
			@change="change($event)" />
	</form>
</span>
</template>

<script>
import formAsync from 'util/form_async';
import {config} from 'common';
let uuid = 1;
let typeExtMap = {
	image: 'jpg,png,jpeg,gif'
};
let typeTextMap = {
	image: '图片'
};
const isFilePreviewSupported = (typeof window.FileReader !== 'undefined');
const getTypeText = (type) => {
	type = type ? type.toLowerCase() : '';
	return typeTextMap[type] || type;
};
const getErrmsg = (type) => {
	return '请选择[' + getTypeText(type) + ']类型的文件';
};
const valiFileObjectType = (allowType, type) => {
	if (!type) {
		return {ok: false, errmsg: getErrmsg(allowType)};
	}
	var arr = type ? type.split('/') : [];
	if (arr.length === 0) {
		return {
			ok: false,
			errmsg: getErrmsg(allowType)
		};
	}

	if (arr[0] === allowType) {
		return {ok: true};
	}
	return {
		ok: false,
		errmsg: getErrmsg(allowType)
	};
};
const valiFileExtension = (allowType, fileName) => {
	var ok = {ok: true};
	var err = {ok: false, errmsg: getErrmsg(allowType)};
	if (fileName.indexOf('.') === -1) {
		return err;
	}
	var ext = fileName.split('.').pop();
	if (!ext) {
		return err;
	}
	var allowExtentions = (typeExtMap[allowType] || '').toLowerCase().split(',');
	if (allowExtentions.indexOf(ext) >= 0) {
		return ok;
	}
	return err;
};
const valiType = (el, filetype, fileName) => {
	let r = {ok: true};
	if (!filetype) {  // 没有type限制
		return r;
	}
	if (el.files && el.files.length === 0) { // 没有选中文件
		return r;
	}
	var file = el.files && el.files[0];
	if (file) {
		return valiFileObjectType(filetype, file.type);
	}
	return valiFileExtension(filetype, fileName);
};

var methods = {};
methods.reset = function () {
	this.fileValue = '';
	this.filePath = '';
	this.errmsg = '';
};
methods.checkType = function (el) {
	var r = valiType(el, this.filetype, this.fileName);
	if (r.ok) {
		return true;
	} else {
		return r.errmsg;
	}
};
methods.change = function (e) {
	var elem = e.target || e.currentTarget;
	var value = elem.value;
	this.filePath = value;

	let result = this.checkType(elem);
	if (result !== true) {
		this.fileValue = '';
		this.errmsg = result;
		return false;
	}

	this.preview(elem.files);
	this.fileValue = value;
	if (this.checkNull()) {
		this.errmsg = '';
		// Send request to server
		this.send();
	} else {
	}
};
methods.preview = function (files) {
	if (!files) {
		return false;
	}
	var file = files[0];
	if (!file) {
		return false;
	}
	if (!isFilePreviewSupported) {
		return false;
	}
	var reader = new window.FileReader();
	reader.onload = () => {
		this.$emit('preview', reader.result);
	}
	reader.readAsDataURL(file);
};
methods.checkNull = function () {
	if (!this.fileValue) {
		return '请上传文件';
	}
	return true;
};
methods.check = function () {
	if (this.silent) {
		return true;
	}
	let r = this.checkType(this.$refs.file);
	if (r !== true) {
		this.errmsg = r;
		return false;
	}
	r = this.checkNull();
	if (r !== true) {
		this.errmsg = r;
		return false;
	}
	this.errmsg = '';
	return true;
};
methods.send = function () {
	var fa = formAsync(this.$refs.form, {
		success: (json) => {
			if (json.success) {
				this.$emit('input', json.data);
			}
		},
		error: () => {
			this.fileValue = '';
			this.errmsg = '上传失败';
			// LOG('upload error');
		}
	});
	fa.send();
};
var computed = {};
computed.elemId = function () {
	return 'v_file_upload_' + this.id;
};
computed.myText = function () {
	return this.labelText || '选择文件';
};
computed.myElemName = function () {
	return this.elemName || 'file';
};
computed.fileName = function () {
	if (!this.filePath) {
		return '';
	}
	var list = this.filePath.split('\\').pop();

	return list.split('/').pop();
};
computed.formAction = function () {
	return this.action || config.uploadUrl;
};
var mounted = function () {};
export default {
	data: function () {
		const id = (uuid++);
		return {
			id,
			fileValue: '',
			filePath: '',
			errmsg: ''
		};
	},
	methods,
	computed,
	props: ['labelText', 'elemName', 'filetype', 'silent', 'action'],
	mounted
};
</script>

<style scoped lang="less">
@height:                32px;
@border-radius:         3px;
@border-color:          #eee;
@color:                 #333;
@background-color:      #eee;
.v-file-upload {
	display: table;
	table-layout: fixed;
	
	& > label {
		display: table-cell;
		vertical-align: middle;
		height: @height;
		line-height: @height;
	}
	& > em {
		display: table-cell;
		width: 8px;
	}
	.error-msg {
		color: #ee0000;
		line-height: @height;
	}
}
.v-file-name {
	min-width: 200px;
	padding-right: 10px;
	& > div {
		height: 100%;
		padding-left: 8px;
		padding-right: 8px;
		overflow: hidden;
		text-overflow: ellipsis;
		
		display: block;
	}
}
.v-file-name > div,
.v-file-label {
	border: 1px solid @border-color;
	background-color: @background-color;
	color: @color;
	
	cursor: pointer;
	white-space: nowrap;
	border-radius: @border-radius;
}
.v-file-label {
	border: 1px solid @border-color;
	width: 90px;
	text-align: center;
	background-color: #aaa;
	color: #fff;
}
.v-file {
	display: none;
}
</style>