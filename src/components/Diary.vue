<template>
	<div class="row">
		<h1 class="sdv-title">Дневник</h1>
		<div class="btn-month">
			<button @click="changeToDay" class="btn-diary btn btn-primary">день</button>
			<button @click="changeToMonth" class="btn-diary btn btn-primary">месяц</button>
		</div>
		<calendar v-if="diaryDay" class="calendar"></calendar>
		<calendar-month v-if="diaryMonth"></calendar-month>
	</div>
</template>

<script>
import calendar from './calendar/calendar.vue';
import CalendarMonth from './CalendarMonth.vue';


export default {
	data()
	{
		return {
			diaryMonth: false,
			diaryDay: true,
			eventData:
			[{
				date: '2000/00/04',
				time: '9:00',
				type: '',
				title: '',
				description: ''
			}]
		}
	},
	components:
	{
		calendar,
		CalendarMonth
	},
	methods:
	{
		changeToMonth(){
			this.diaryMonth = true;
			this.diaryDay = false;
		},
		changeToDay(){
			this.diaryMonth = false;
			this.diaryDay = true;
		}
	}
}

</script>
<style>
.calendar
{
	margin-top: 30px;
}
.btn-diary
{
	margin-top: 30px;
}
.btn-diary:active,
.btn-diary:focus
{
	background-color: red !important;
	border-color: red !important;
}
.btn-month
{
	margin-left: 30px;
}
.btn-day
{
	max-width: 1400px;
	width: 90%;
	margin: 0 auto;
}
.sdv-title
{
	margin-left: 30px;
	width: 96%;
	font-size: 25px;
	font-weight: 700;
	padding-bottom: 10px;
	border-bottom: 2px solid #4BBCFF;
}
@media screen and (max-width: 400px)
{
	.btn-month
	{
		margin-left: 0px;
	}
}
</style>
