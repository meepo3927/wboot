<template>
<div >
	<input type="text" v-model="msg">
	---- <br />
	{{msg}}            .haha
</div>
</template>

<script>

let methods = {};
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
