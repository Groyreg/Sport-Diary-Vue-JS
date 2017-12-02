<template>
	<div class="diary-month container col-xs-12">
		<vue-event-calendar-month :events="diaryActivities.days"></vue-event-calendar-month>
	</div>
</template>
<script>
import VueEventCalendarMonth from './vue-event-calendar-month/src/vue-event-calendar-month.vue'
import {mapGetters} from 'vuex'

export default {
	computed: {
		...mapGetters({
			diaryActivities: 'diary/getDiary'
		})
	},
	components:
	{
		VueEventCalendarMonth
	},

	methods: {
		addActivity(eventDefault){
			var cloneEventDefault = eventDefault.clone(true);
			this.currentEvents.push(cloneEventDefault);
		}
	},
	mounted: function () {
		this.$store.dispatch('diary/LOAD_DIARY');
		this.$store.dispatch('diary/LOAD_ACTIVITY_TYPES');
	}

}
</script>
<style>
	table 
	{
		margin-top: 30px;
		border-collapse: collapse; 
		border: 1px solid silver;
	}
	 th,
	 td
	 {
	 	margin: 0 !important;
	 	padding: 0 !important;

	 	text-align: center;
	 	border: 1px solid silver;
	 }
	 th
	 {
	 	background-color: #4BBCFF;
	 	color: #ffffff;
	 }
	.diary-month
	{
		margin-top: 30px;
	}
</style>