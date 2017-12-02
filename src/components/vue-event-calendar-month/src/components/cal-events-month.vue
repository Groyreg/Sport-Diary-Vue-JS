<template>
	<div class="events-wrapper-m col-xs-12">
		<div v-if="eventMonth">
			<div class="events-month col-xs-12 col-sm-6 col-md-5 col-lg-5 ">
				<div class="eventM-title">
					<span v-if="eventMonth" class="dates-title">{{eventMonth.date}}</span>
					<span v-if="eventMonth" class="event-name">
						<img v-for="icons in diaryIcons" v-if="eventMonth && eventMonth.activities && diaryIcons && eventMonth.activities.some(n => n.type_id === icons.id)" :src="getImgUrl(icons)" v-bind:alt="diaryIcons" class="type-icon" height="25" width="25">
						{{eventMonth.activities.map(n => n.activity_type.name)[0]}}
					</span>
				</div>
				<div class="events-container" v-for="event in sortedActivities">
					<span class="event-time col-xs-4 col-lg-3">{{event.time_start}}{{get_time_end(event)}}</span>
					<p  @click="descrShow=!descrShow" class="event-description col-xs-8 col-lg-9">{{event.description}}</p>
					<div v-show="descrShow" class="dop-descr col-xs-12">
				      <div v-if="event.type_id === 3 && event.activityFoodIntakes">
				          <foodintake :products="event.activityFoodIntakes"></foodintake>
				      </div>
				      <div v-else-if="event.type_id === 4 && event.activitySports">
				          <sport :exercises="event.activitySports"></sport>
				      </div>
				      <div v-else-if="event.type_id === 5 && event.activityMeasurements">
				        <measurement :measurements="event.activityMeasurements"></measurement>
				      </div>
				    </div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import foodintake from './../../../calendar/activities/foodIntake.vue';
import sport from './../../../calendar/activities/sport.vue';
import wellbeing from './../../../calendar/activities/wellbeing.vue'
import measurement from './../../../calendar/activities/measurement.vue'


export default {
  data(){
	  return{
	    descrShow : true
	  }
  },
  components:{
      foodintake,
      sport,
      wellbeing,
      measurement
  },
  computed: {
  	dataForDay(){
  		return this.$store.state.diary.eventMonth;
  	},
  	eventMonth(){
  		if(!Object.keys(this.dataForDay).length == 0){
  			return this.dataForDay
  		} 
  	},
  	diaryIcons(){
 		return this.$store.state.diary.diary_icons;
 	},
 	sortedActivities(){
        if (this.eventMonth && this.eventMonth.activities && this.eventMonth.activities.length>0) {
          return this.eventMonth.activities.sort(function (a, b) {
            return a.time_start === null ? 1 : (b.time_start === null ? -1 : a.time_start.localeCompare(b.time_start));
          });
        }
        return null;
    }
  },
  methods: {
  	get_time_end(obj){
  		if(obj.time_start && obj.duration) {
  				let start = this.$moment(obj.time_start, "HH:mm");
  				let dur = this.$moment.duration(obj.duration, "HH:mm");
  				return start.add(dur).format(" - HH:mm");
  		}
  	},
  	getImgUrl(icon) {
  		var images = require.context('../../../../assets/icons/', false, /\.png$/)
  		return images('./' + icon.name + ".png")
  	}
  }
}
</script>
<style>
	.events-wrapper-m
	{
		margin: 0;
		padding: 0;	
	}
	.events-month
	{	
		min-width: 310px;
		margin-top: 30px;
		margin-left: 15px;

		border: 2px solid #4BBCFF;
		border-radius: 10px;

		position: relative;
		left: -15px;
	}
	.eventM-title
	{
		margin-top: 10px;
		margin-bottom: 20px;
		background-color: silver;
		border-radius: 10px;
		text-align: center;
		height: 30px;
		line-height: 30px;
		color: #fff;
		font-weight: 600;
		font-size: 16px;
	}

	.events-container
	{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.event-name 
	{
		margin-right: 10px;
		float: right;
	}
	.dates-title 
	{
		margin-left: 10px;
		float: left;
	}
	.event-time,
	.event-description
	{
		margin: 0;
		padding: 0;
		min-height: 30px;
		line-height: 30px;
	}
	.dop-descr
	{
		margin: 0;
		padding: 0;
	}
	@media screen and (max-width: 400px)
	{
		.events-month
		{
			position: relative;
			left: -30px;
		}
	}
</style>
