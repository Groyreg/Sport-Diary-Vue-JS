<template>
	<el-time-select
		v-model="choosenTime"
		v-on:input="choosenTimeChange"
		:picker-options=
		"{
			start: '00:00',
			step: '00:15',
			end: '23:59'
		}"
		:default-value='{13:30}'
		placeholder="Select time">
	</el-time-select>
</template>
<script>
export default {
	data() {
		return {
			choosenTime: ''

		};
	},
	methods: {
		choosenTimeChange() {
			this.$emit('choosenTimeChange', this.choosenTime);
		}
	}
}
</script>
<style>
.el-date-editor
{
	/*width: 100%;*/
	margin-bottom: 30px;
}
.el-input__inner
{
	padding: 6px 12px;
}
</style>
