<template>
<center-layer v-if="visible" :anim="myAnim" :width="w" :height="h">
	<div class="full-layer">
		<close-btn @click="close" />
		<slot></slot>
	</div>
</center-layer>
</template>

<script>
import Cover from 'util/cover.js';
let methods = {};
methods.show = function () {
	this.visible = true;
	if (!this.cover) {
		this.cover = new Cover();
	} else {
		this.cover.show();
	}
};
methods.close = function () {
	this.cover.hide();
	this.visible = false;
	this.$emit('close');
};
let computed = {};
computed.w = function () {
	return this.width || '96%';
};
computed.h = function () {
	return this.height || '94%';
};
computed.myAnim = function () {
	let a = this.anim;
	let defaultAnim = true;
	if (a === undefined) {
		return defaultAnim;
	}
	if (a === false || a === 'false') {
		return false;
	}
	if (a === true || a === 'true') {
		return true;
	}
	return defaultAnim;
};
let watch = {};
const mounted = function () {};
const beforeDestroy = function () {};
const dataFunc = function () {
	let o = {
		visible: false
	};
	return o;
};
export default {
	data: dataFunc,
	methods,
	computed,
	watch,
	props: ['width', 'height', 'anim'],
	mounted,
	beforeDestroy,
	components: {
		'close-btn': require('comp/common/layer-close-btn.vue')
	}
};
</script>

<style scoped lang="less">
.full-layer {
	background-color: #fff;
	padding: 8px 12px;
}
</style>
