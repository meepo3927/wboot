<template>
<div class="page-test">
	<form class="p15" @submit.prevent>
		<input type="text" class="form-control" v-model="name">
		<p v-text="name"></p>
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
			<button class="btn btn-default" @click="alert" type="button">
				MUI-Alert
			</button>
			<button class="btn btn-default" @click="alert2" type="button">
				MUI-Confirm
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
			<v-switch v-model="ss" />
		</div>
		
	</form>
	<mui-layer v-if="ss" @close="layerClose">
		<div slot="header">哈哈哈</div>
		<div style="min-width: 400px;">
			<div class="m-row-mid">
				<label for="">姓名：</label>
				<div>
					<input type="text" class="form-control">
				</div>
			</div>
			<div class="mt15 text-right">
				<button class="btn btn-primary" @click="layerClose">确定</button>
			</div>
		</div>
	</mui-layer>
</div>
</template>

<script>
import 'root';

const duration = 999999999;
const longMsg = '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十';
let methods = {};
methods.layerClose = function () {
	this.ss = false;
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
methods.alert = function () {
	let text = 'ae' + longMsg;
    this.$alert(text);
};
methods.alert2 = function () {
	let text = '确定删除吗？';
	let title = '提示';
	this.$confirm(text, title, (v) => {
		this.$msg(v);
	});
};
methods.alertWarning = function () {
	let text = '确定删除吗？';
	let title = '提示';
	this.$confirm({
		text, title,
		icon: 'warning',
		callback: (v) => { this.$msg(v) }
	});
};
methods.alertInfo = function () {
	let text = '请输入姓名';
	let title = '提示';
	this.$prompt(null, text, (v) => {
		this.$msg(v);
	});
};
methods.alertError = function () {
	let ld = this.$loading();
	setTimeout(() => {
		ld.remove()
	}, 1500)
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
		name: +new Date(),
		ss: false
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
		'v-switch': require('comp/mui/switch.vue'),
		'mui-layer': require('comp/mui/center-layer.vue')
	}
};
</script>

<style scoped lang="less">
.page-test {
	
}
</style>
