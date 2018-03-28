<template>
<div class="page-test">
	<form class="p15" @submit.prevent>
		<input type="text" class="form-control" v-model="name">
		<p v-text="name"></p>
		<button class="btn btn-default" @click="alert" type="button">
			MUI-Msg
		</button>
		<button class="btn btn-default" @click="alertSuccess" type="button">
			MUI-Success
		</button>
		<button class="btn btn-default" @click="alertWarning" type="button">
			MUI-Warning
		</button>
		<button class="btn btn-default" @click="alertInfo" type="button">
			MUI-Info
		</button>
		<button class="btn btn-default" @click="alertError" type="button">
			MUI-Error
		</button>
	</form>
</div>
</template>

<script>
import 'root';
const duration = 999999999;
const longMsg = '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十';
let methods = {};
methods.alert = function () {
    this.$msg(this.name);
};
methods.alertSuccess = function () {
	this.$msg.success({
		text: this.name ,
		duration
	});
};
methods.alertWarning = function () {
	this.$msg.warning({
		text: this.name,
		duration
	});
};
methods.alertInfo = function () {
	this.$msg.info({
		text: this.name + longMsg,
		duration
	});
};
methods.alertError = function () {
	this.$msg.error({
		text: this.name + longMsg + longMsg + longMsg + longMsg,
		duration
	});
};
let computed = {};
let watch = {};
const created = function () {};
const mounted = function () {
	window.Test = this;
};
const beforeDestroy = function () {};
const dataFunc = function () {
	let o = {
		name: +new Date()
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
	components: {
	}
};
</script>

<style scoped lang="less">
.page-test {
	
}
</style>
