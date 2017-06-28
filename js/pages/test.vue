<template>
<div >
	<input type="text" v-model="msg">
	---- <br />
	{{msg}}            .haha

	<button class="btn btn-default" @click="e1">ClickMe</button>
</div>
</template>

<script>
import 'root';
let methods = {};
methods.e1 = function () {
	require.ensure([], (require) => {
		var h = require('lib/html2canvas.js');
		LOG(h);
	});
};
let computed = {};
let watch = {};
const created = function () {};
const mounted = function () {};
const beforeDestroy = function () {};
const dataFunc = function () {
	let o = {
		msg: +new Date()
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
.vue-comp {
	
}
</style>
