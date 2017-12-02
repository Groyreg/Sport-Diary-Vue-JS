<template>
  <div class="events-wrapper" :style="bgColor">
    <h2 class="date">
      {{dayEventsTitle}}
    </h2>
    <div v-if="sortedActivities" class="cal-events">
        <div v-for="(activity, index) in sortedActivities" class="event-item">
          <cal-event-item :event="activity" :index="index" :locale="locale" :date="day.date"></cal-event-item>
        </div>
    </div>
    <div v-else class="no-activities">
      
      <p>У Вас еще нет ни одной записи в этот день.</p>
    </div>
  </div>
</template>

<script>
  import i18n from './i18n.js'
  import { dateTimeFormatter } from './tools.js'
  import calEventItem from './cal-event-item.vue'
  export default {
    name: 'cal-events',
    data () {
      return {
        i18n,
        locale:'ru',
        color:' #f29543'
      }
    },
    components: {
      'cal-event-item': calEventItem
    },
    props: {
      day: {
        type:Object,
        required: true
      }
    },
    computed: {
      sortedActivities(){
        if (this.day && this.day.activities&& this.day.activities.length>0) {
          return this.day.activities.sort(function (a, b) {
            return a.time_start === null ? 1 : (b.time_start === null ? -1 : a.time_start.localeCompare(b.time_start));
          });
        }
        return null;
      },
      dayEventsTitle () {
        if (this.day) {
          let tempDate;
          if (this.day.date !== 0) {
            tempDate = Date.parse(new Date(this.day.date))
            return dateTimeFormatter(tempDate, i18n[this.locale].fullFormat)
          } else {
            tempDate = dateTimeFormatter(Date.parse(new Date(this.day.date)), i18n[this.locale].fullFormat)
            return `${tempDate} ${i18n[this.locale].notHaveEvents}`
          }
        }
      },
      bgColor () {
        return {backgroundColor: this.color}
      }
    },
    methods: {
      dateTimeFormatter
    }
  }
</script>
<style>
 .no-activities{
   color: #9b9b9b;
   font-size: 14px;
   padding: 7px 0;
   text-align: center;
 }
</style>
