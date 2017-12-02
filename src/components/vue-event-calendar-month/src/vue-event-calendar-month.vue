<template>
  <div class="__vev_calendar-wrapper-m col-xs-12">
    <cal-panel-month
      :events="events"
      :selectedDay='selectedDayEvents.date'
      @sendEvent='getEvent'>

    </cal-panel-month>
    <cal-events-month>

    </cal-events-month>
  </div>
</template>
<script>
import { isEqualDateStr} from './tools.js'
//import addEventModal from './../../addEventModal.vue';
import calEventsMonth from './components/cal-events-month.vue'
import calPanelMonth from './components/cal-panel-month.vue'

const inBrowser = typeof window !== 'undefined'
export default {
  name: 'vue-event-calendar',
  components: {
    'cal-events-month': calEventsMonth,
    'cal-panel-month': calPanelMonth,
//    'add-event-modal': addEventModal
  },
  data () {
    return {
      eventsM: {},
      selectedDayEvents: {
        date: 'all',
        events: this.events || []  //default show all event
      }
    }
  },
  props: {
    events: {
      type: Array,
      required: true,
      default: [],
    },
    // eventsM: {
    //   type: Object
    // }
  },
  computed: {
    // calendarOptions () {
    //   let dateObj = new Date()
    //   if (inBrowser) {
    //       return window.VueCalendarBarEventBus.CALENDAR_EVENTS_DATA
    //   } else {
    //     return {
    //       options: {
    //         locale: 'ru', //zh
    //         color: ' #f29543',
    //         weekStartOn: 2
    //       },
    //       params: {
    //           curYear: dateObj.getFullYear(),
    //           curMonth: dateObj.getMonth(),
    //           curDate: dateObj.getDate(),
    //           curEventsDate: 'all'
    //       },
    //     }
    //   }
    // },
    // calendarParams () {
    //   let dateObj = new Date()
    //   if (inBrowser) {
    //       return window.VueCalendarBarEventBus.CALENDAR_EVENTS_DATA.params
    //   } else {
    //     return {
    //       curYear: dateObj.getFullYear(),
    //       curMonth: dateObj.getMonth(),
    //       curDate: dateObj.getDate(),
    //       curEventsDate: 'all'
    //     }
    //   }
    // }
  },
  // created () {
  //   if (this.calendarParams.curEventsDate !== 'all') {
  //     this.handleChangeCurDay(this.calendarParams.curEventsDate)
  //   }
  // },
  // watch: {
  //   calendarParams () {
  //     if (this.calendarParams.curEventsDate !== 'all') {
  //       let events = this.events.filter(event => {
  //         return isEqualDateStr(event.date, this.calendarParams.curEventsDate)
  //       })
  //       this.selectedDayEvents = {
  //         date: this.calendarParams.curEventsDate,
  //         events
  //       }
  //     } else {
  //       this.selectedDayEvents = {
  //         date: 'all',
  //         events: this.events
  //       }
  //     }
  //   },
  //   events () {
  //     this.selectedDayEvents = {
  //       date: 'all',
  //       events: this.events || []
  //     }
  //   }
  // },
  methods: {
    getEvent(date){
      this.eventsM = date
    }
  }
}
</script>
<style>
.__vev_calendar-wrapper-m
{
  margin: 0;
  margin-left: 15px;
  padding: 0;
}
@media screen and (max-width: 400px)
{
  .__vev_calendar-wrapper-m
  {
    margin: 0;
  }
}
</style>
