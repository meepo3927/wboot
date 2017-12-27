<template>
	<input type="text" class="vue-input-date" />
</template>

<script>
import MDate from 'lib/mdate.js';
var methods = {};
methods.setValue = function (v) {
	if (v !== undefined) {
		this.$el.value = v;
		this.date.setValue(v);
	}
};
var computed = {};
var mounted = function () {
	let vm = this;
	this.date = new MDate(this.$el, {
		format: this.format,
		onChoose: function (v) {
			vm.$emit('input', v);
		}
	});
	if (this.value) {
		this.setValue(this.value);
	}
};
let watch = {};
watch.value = function (v) {
	this.setValue(v);
};
export default {
	data: function () {
		return {};
	},
	watch,
	methods,
	computed,
	props: ['value', 'format'],
	mounted
};
</script>

<style scoped lang="less">
.vue-input-date {
	
}
</style>