<template>
<div class="page-test">
	<form class="p15" @submit.prevent>
		<input type="text" class="form-control" v-model="name">
		<p v-text="name"></p>
		<button class="btn btn-default" @click="alert" type="button">
			确定
		</button>
	</form>
</div>
</template>

<script>
import 'root';
let methods = {};
methods.alert = function () {
    mlayer.msg(this.name);
};
let computed = {};
let watch = {};
const created = function () {};
const mounted = function () {};
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
	components: {}
};
</script>

<style scoped lang="less">
.page-test {
	
}
</style>
