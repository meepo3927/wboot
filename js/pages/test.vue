<template>
<div class="page-test">
	<form class="p15" @submit.prevent>
		<button v-tooltip="tooltipStr" @click="PPP">PPPPPPPPP</button>
		<input type="text" class="form-control" v-model="name"
			v-tooltip="tooltipStr">
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
			<button class="btn btn-default" style="float: right;"
				v-tooltip="tooltipStr"
				@click="onTooltipTestClick">
				测试tooltip
			</button>
		</div>
		
	</form>
	<mui-layer v-if="ss" @close="layerClose">
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
		v-tooltip2="tooltipObj">MUI Tooltip3</button>

	<mui-alertspan type="success">
		Heads up! This alert needs your attention, but it's not super important.
	</mui-alertspan>
	<p></p>
	<mui-alertspan type="info">
		Heads up! This alert needs your attention, but it's not super important.
	</mui-alertspan>
	<p></p>

	<mui-alertspan type="warning">
		Heads up! This alert needs your attention, but it's not super important.
	</mui-alertspan>
	<p></p>
	<mui-alertspan type="error">
		Heads up! This alert needs your attention, but it's not super important.
	</mui-alertspan>
	<br /><br /><br /><br /><br /><br /><br /><br /><br />
	<textarea class="form-control" v-tooltip="tooltipStr" 
		style="float: right;"></textarea>
	<br /><br /><br /><br /><br /><br /><br /><br /><br />
	<textarea class="form-control" v-tooltip="tooltipStr"></textarea>
	<br /><br /><br /><br /><br /><br /><br /><br /><br />
	<button class="btn btn-default"
		v-tooltip="tooltipStr">呃呃呃呃呃呃</button>
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
		ss: false,
		tooltipStr: 'mmmmmmeepo' + longMsg,
		tooltipObj: {
			text: '我还是猪'
		}
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
		'mui-layer': require('comp/mui/center-layer.vue'),
		'mui-alertspan': require('comp/mui/alert-span.vue')
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
</style>
