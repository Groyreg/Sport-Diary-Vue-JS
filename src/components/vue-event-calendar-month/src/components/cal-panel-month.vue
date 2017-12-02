<template>
	<div class="cal-wrapper-m">
		<div class="cal-month-title row">
			<div class="cal-header-m chm-first off-xs">
				<div>
					<i  @click="preMonth" class="fa fa-caret-left fa-lg" aria-hidden="true"></i>
				</div>
				<div>
					{{weekDay[curMonth]}} {{curYear}}&nbsp
				</div>
				<div>
					<i  @click="nextMonth" class="fa fa-caret-right fa-lg" aria-hidden="true"></i>
				</div>
			</div>
			<div class="cal-header-m chm-first on-xs">
				<div>
					<i  @click="preMonth" class="fa fa-caret-left fa-lg" aria-hidden="true"></i>
				</div>
				<div>
					{{curMonth +1}} / {{curYear}}&nbsp
				</div>
				<div>
					<i  @click="nextMonth" class="fa fa-caret-right fa-lg" aria-hidden="true"></i>
				</div>
			</div>
			<div class="day-change-title">
				<div class="day-change-wrapper">
					<button class="btn-change-day hidden-xs" @click="changeDayListDown(7)">
						<i class="fa fa-caret-left fa-lg" aria-hidden="true"></i>
					</button>
					<button class="btn-change-day hidden-xs" @click="changeDayListUp(7)">
						<i class="fa fa-caret-right fa-lg" aria-hidden="true"></i>
					</button>
					<button class="btn-change-day visible-xs" @click="changeDayListDown(3)">
						<i class="fa fa-caret-left fa-lg" aria-hidden="true"></i>
					</button>
					<button class="btn-change-day visible-xs" @click="changeDayListUp(3)">
						<i class="fa fa-caret-right fa-lg" aria-hidden="true"></i>
					</button>
				</div>
			</div>
			<div class="cal-header-m" v-for="types in activityTypes">
				<img v-for="icons in diaryIcons" v-if="activityTypes && diaryIcons && icons.id === types.id" :src="getImgUrl(icons)" v-bind:alt="diaryIcons" class="type-icon" height="25" width="25">
				<p class="type-title">{{types.name}}</p>
			</div>
			<div class="cal-header-m-last">

			</div>
		</div>
		<div class="cal-table-m row visible-lg" v-for='date in dayList'>
			<div class="day-week">
				<span >
		            {{date.dayWeekName}}
		        </span>
			</div>
			<div class="day" :class="{
	            todayM: (today == date.date),
	            eventM: (date.activities && date.activities.length>0),
	            }">
				<transition name="slide-fade">
					<span>{{date.date.split('/')[2]}}</span>
				</transition>
			</div>
			<div class="one-item" v-for="types in activityTypes">
				<div @click='sendEvent(Object.assign({}, date, { activities: date.activities.filter(n => n.type_id == types.id) }))' class="event-data" v-if="date.activities && date.activities.length > 0 && date.activities.some(n => n.type_id == types.id)">
				</div>
				<div class="event-data-empty" v-else=""></div>
			</div>
		</div>
		<div class="cal-table-m row visible-md" v-for='date in dayList.slice(0,21)'>
			<div class="day-week">
				<span >
		            {{date.dayWeekName}}
		        </span>
			</div>
			<div class="day" :class="{
	            todayM: (today == date.date),
	            eventM: (date.activities && date.activities.length>0),
	            }">
				<span>{{date.date.split('/')[2]}}</span>
			</div>
			<div class="one-item" v-for="types in activityTypes">
				<div @click='sendEvent(Object.assign({}, date, { activities: date.activities.filter(n => n.type_id == types.id) }))' class="event-data" v-if="date.activities && date.activities.length > 0 && date.activities.some(n => n.type_id == types.id)">
				</div>
				<div class="event-data-empty" v-else=""></div>
			</div>
		</div>
		<div class="cal-table-m row visible-sm" v-for='date in dayList.slice(0,14)'>
			<div class="day-week">
				<span >
		            {{date.dayWeekName}}
		        </span>
			</div>
			<div class="day" :class="{
	            todayM: (today == date.date),
	            eventM: (date.activities && date.activities.length>0),
	            }">
				<span>{{date.date.split('/')[2]}}</span>
			</div>
			<div class="one-item" v-for="types in activityTypes">
				<div @click='sendEvent(Object.assign({}, date, { activities: date.activities.filter(n => n.type_id == types.id) }))' class="event-data" v-if="date.activities && date.activities.length > 0 && date.activities.some(n => n.type_id == types.id)">
				</div>
				<div class="event-data-empty" v-else=""></div>
			</div>
		</div>
		<div class="cal-table-m row visible-xs" v-for='date in dayList.slice(0,7)'>
			<div class="day-week">
				<span >
		            {{date.dayWeekName}}
		        </span>
			</div>
			<div class="day" :class="{
	            todayM: (today == date.date),
	            eventM: (date.activities && date.activities.length>0),
	            }">
				<span>{{date.date.split('/')[2]}}</span>
			</div>
			<div class="one-item" v-for="types in activityTypes">
				<div @click='sendEvent(Object.assign({}, date, { activities: date.activities.filter(n => n.type_id == types.id) }))' class="event-data" v-if="date.activities && date.activities.length > 0 && date.activities.some(n => n.type_id == types.id)">
				</div>
				<div class="event-data-empty" v-else=""></div>
			</div>
		</div>
	</div>
</template>

<script>
import { dateTimeFormatter, isEqualDateStr} from '../tools.js'

export default {
  data () {
    return {
     	shift: 0,
		curEventsDate:"all",
		curDate: new Date()

    }
  },
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  computed: {
  	curMonth(){
  		return this.curDate.getUTCMonth();
  	},
  	curYear(){
  		return this.curDate.getFullYear();
  	},
  	firstDay(){
  		return new Date(this.curYear, this.curMonth, 1);
  	},
  	weekDay(){
  		return this.firstDay.getDay();
  	},
  	oneHour(){
  		return 1000 * 60 * 60;
  	},
	oneDay(){
		return this.oneHour * 24;
	},				
	dateNextMonth(){
		return new Date(this.curYear, this.curMonth + 1, 1)
	},
	lastDay(){
		return Math.ceil((this.dateNextMonth.getTime() - this.firstDay.getTime() - this.oneHour)/this.oneDay);
	},
	weekName(){
		return ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
	},
	weekDay(){
		return ["Январь","Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
	},
 	activityTypes(){
 		return this.$store.state.diary.activity_types;
 	},
 	diaryActivities(){
 		return this.$store.state.diary.diary;
 	},
 	diaryIcons(){
 		return this.$store.state.diary.diary_icons;
 	},
    dayList () {
        let startDate = new Date(this.firstDay)
        let item, itemDay, status, tempArr = [], tempItem
        for (let i = 0 + this.shift ; i < 28 + this.shift; i++) {
            item = new Date(startDate);
            itemDay = item.getDay();
            item.setDate(startDate.getDate() + i);
            itemDay = item.getDay();

            tempItem = {
              date: `${item.getFullYear()}/${item.getMonth()+1}/${item.getDate()}`,
              dayWeekNumber: itemDay,
              dayWeekName: this.weekName[itemDay] 
            }
            this.events.forEach((eventm) => {
              if (isEqualDateStr(eventm.date, tempItem.date)) {
                tempItem.id = eventm.id
                tempItem.date = eventm.date
                tempItem.activities = eventm.activities
              }
            })
            tempArr.push(tempItem)
        }
        return tempArr 
    },
    today () {
      let dateObj = new Date()
      return `${dateObj.getFullYear()}/${dateObj.getMonth()+1}/${dateObj.getDate()}`
    },
  },
  methods: {
    nextMonth () {
    	this.curDate = new Date(this.curDate.getFullYear(), this.curDate.getUTCMonth() +1,this.curDate.getDate())
    	this.shift = 0
    },
    preMonth () {
     	this.curDate = new Date(this.curDate.getFullYear(), this.curDate.getUTCMonth() -1,this.curDate.getDate())
      	this.shift = 0
    },
    changeDayListUp(val){
    	this.shift += val;
    	if(this.shift >= this.lastDay){
    		this.shift = this.shift - this.lastDay 
      		this.curDate = new Date(this.curDate.getFullYear(), this.curDate.getUTCMonth() +1,this.curDate.getDate())
    	}
    },
    changeDayListDown(val){
    	this.shift -= val;
    	if(this.shift < 0){
    		this.curDate = new Date(this.curDate.getFullYear(), this.curDate.getUTCMonth() -1,this.curDate.getDate())
    		this.shift = this.shift + this.lastDay;
      	}
    },
    sendEvent(date){
      this.$store.dispatch('diary/SET_EVENT_MONTH', date)
    },
    getImgUrl(icon) {
	  var images = require.context('../../../../assets/icons/', false, /\.png$/)
	  return images('./' + icon.name + ".png")
	}
  }
}
</script>
<style>
	i
	{
		position: relative;
		left: 2px;
	}
	.cal-wrapper-m
	{
		padding: 0;
		display: flex;
		flex-direction: row;
	}
	.cal-month-title
	{
		margin: 0;
		padding: 0;
		width: 135px;
		display: flex;
		flex-direction: column;
	}
	.cal-data-m
	{
		margin: 0;
		padding: 0;
	}
	.cal-header-m
	{
		margin: 0;
		padding: 0;
		height: 35px;
		background-color: #25A25A;
		color: #ffffff;
		font-weight: 700;
		border: 1px solid silver;
		border-bottom: none;
		display: flex;
		align-items: center;
		/*justify-content: center;*/
	}
	.cal-header-m-last
	{
		border-top: 1px solid silver;
	}
	.cal-header-m > span
	{
		font-size: 12px;
	}
	.chm-first > div > i
	{
		cursor: pointer;
	}
	.chm-first > div >i:hover,
	.btn-change-day:hover
	{
		transform: scale(1.4);
	}
	.week-title-m
	{
		margin: 0;
		padding: 0;

		display: flex;
		flex-direction: row;

		position: relative;
		left: -2px;

	}
	.cal-title
	{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.type-title,
	.type-icon
	{
		margin-left: 5px;
		font-size: 12px;
	}
	.type-title
	{
		position: relative;
		top: 5px;
	}
	.dates-m
	{
		position: relative;
		left: 2px;
	}
	.week-title-m > 
	.item-m
	{
		background-color: #4BBCFF;
		color: #ffffff;
		font-weight: 700;

		position: relative;
		left: 4px;
	}
	.left-arrow,
	.right-arrow,
	.title-m
	{
		margin: 0;
		padding: 0;
		display: block;
		text-align: center;
		cursor: pointer;
	}
	.left-arrow,
	.right-arrow
	{
		width: 15px;
	}
	.cal-table-m
	{
		margin: 0;
		padding: 0;
		width: 32px;
	}
	.day-week,
	.day,
	.event-data,
	.event-data-empty
	{
		margin: 0;
		padding: 0;

		width: 32px;
		height: 25px;

		background-color: #4BBCFF;
		color: #fff;
		font-weight: 700;
		border: 1px solid silver;
		border-left: none;

		display: flex;
		align-items: center;
		justify-content: center;
	}
	.day
	{
		border-top: none;
		background-color: #fff;
		color: #4BBCFF;
	}
	.event-data
	{
		height: 35px;
		border-top: none;
		background-color: #25A25A;
		color: #4BBCFF;
		cursor: pointer;
	}
	.event-data-empty
	{
		height: 34.9px;
		border-top: none;
		background-color: white;
		color: #4BBCFF;
	}
	.todayM
	{
		background-color: #25A25A !important;
		color: #fff;
	}
	.eventM
	{
		background-color: #fca4a4;
		color: #fff;
	}
	.day-change-title
	{
		margin: 0;
		padding: 0;
		background-color: #25A25A;
		color: #ffffff;
		font-weight: 700;
		border: 1px solid silver;
		border-bottom: none;
		border-top: none;
		height: 24px;
	}
	.day-change-wrapper
	{
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.chm-first 
	{
		height: 25px;
		border-bottom: 1px solid silver;
		justify-content: space-between;

	}
	.on-xs
	{
		display: none;
	}
	.btn-change-day
	{
		display: block;
		background-color: transparent;
		border: none;
	}
	@media screen and (max-width: 400px)
	{
		.cal-wrapper-m
		{
			position: relative;
			left: -15px;
		}
		.type-title
		{
			display: none;
		}
		.type-icon
		{
			margin-left: -3px;
		}
		.cal-header-m
		{
			justify-content: center;
		}
		.cal-month-title
		{
			width: 90px;
			min-width: 90px;
		}

	}
	@media screen and (max-width: 768px)
	{
		.off-xs
		{
			display: none;
		}
		.on-xs
		{
			display: flex;
		}
	}
	@media screen and (min-width: 1440px)
	{
		.cal-wrapper-m
		{
			padding: 0;
			width: 1400px;
			max-width: 100%;
		}
		.cal-month-title
		{
			width: 200px;
		}
		.cal-header-m,
		.chm-first,
		.day-change-title
		{
			height: 48px;
		}
		.day-change-title
		{
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.day-week,
		.day,
		.event-data,
		.event-data-empty
		{
			height: 48.2px;
			width: 45px;
		}
		.cal-table-m
		{
			width: 50px;
		}
	}	

</style>