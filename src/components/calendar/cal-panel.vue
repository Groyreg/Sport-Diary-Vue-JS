<template>
  <div class="cal-wrapper">
    <div class="cal-header">
      <div class="l" @click="preMonth">
        <div class="arrow-left icon">&nbsp</div>
      </div>
      <div class="title">{{curYearMonth}}</div>
      <div class="r" @click="nextMonth">
        <div class="arrow-right icon">&nbsp</div>
      </div>
    </div>
    <div class="cal-body">
      <div class="weeks">
        <span
          v-for="(dayName, dayIndex) in i18n[calendar.options.locale].dayNames"
          class="item">
          {{i18n[calendar.options.locale].dayNames[(dayIndex + calendar.options.weekStartOn) % 7]}}
        </span>
      </div>
      <div class="dates">
        <div v-for="date in dayList" class="item"
             :class="{
            today: date.status ? (today == date.date) : false,
            event: date.status ? (date.activities&&date.activities.length>0) : false,
            [calendar.options.className] : (date.date == selectedDay)
          }">
          <p class="date-num"
             @click="handleChangeCurday(date)"
             :style="{color: date.activities&&date.activities.length>0 ? ((date.date == selectedDay) ? '#fff' : customColor) : 'inherit'}">
            {{date.status ? date.date.split('/')[2] : '&nbsp'}}
          </p>
          <a href="#event-form" @click='addDateToStore(date)' v-if="date.status" class="dates-btn" type="submit"
             data-toggle="modal"><i class="fa fa-plus" aria-hidden="true"></i></a>
          <span v-if="date.status ? (today == date.date) : false" class="is-today"
                :style="{backgroundColor: customColor }"></span>
          <span v-if="date.status ? (date.activities&&date.activities.length>0) : false" class="is-event"
                :style="{borderColor: customColor, backgroundColor: (date.date == selectedDay) ? customColor : 'inherit'}"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import i18n from './i18n.js'
  import {dateTimeFormatter, isEqualDateStr} from './tools.js'

  const inBrowser = typeof window !== 'undefined'
  export default {
    name: 'cal-panel',
    data() {
      return {
        i18n,
        selectedDay: '',
        curYear: '',
        curMonth: '',
        curDate: '',
        curEventsDate: '',
        calendar:
          {
            options: {
              locale: 'ru', //zh
              color: ' #f29543',
              weekStartOn: 1
            }
          }
      }
    },
    props: {
      events: {
        type: Array,
        required:
          true
      }

    },
    computed: {
      dayList() {
        let firstDay = new Date(this.curYear, this.curMonth, 1)
        let dayOfWeek = firstDay.getDay()
        // 根据当前日期计算偏移量
        if (this.calendar.options.weekStartOn > dayOfWeek) {
          dayOfWeek = dayOfWeek - this.calendar.options.weekStartOn + 7
        } else if (this.calendar.options.weekStartOn < dayOfWeek) {
          dayOfWeek = dayOfWeek - this.calendar.options.weekStartOn
        }

        let startDate = new Date(firstDay)
        startDate.setDate(firstDay.getDate() - dayOfWeek)

        let item, status, tempArr = [], tempItem
        for (let i = 0; i < 42; i++) {
          item = new Date(startDate);
          item.setDate(startDate.getDate() + i);

          if (this.curMonth === item.getMonth()) {
            status = 1
          } else {
            status = 0
          }
          tempItem = {
            date: `${item.getFullYear()}/${item.getMonth() + 1}/${item.getDate()}`,
            status: status
          }
          this.events.forEach((event) => {
            if (isEqualDateStr(event.date, tempItem.date)) {
//                tempItem.title = event.title
//                tempItem.desc = event.desc || ''
              tempItem.id = event.id
              tempItem.date = event.date
              tempItem.activities = event.activities
            }
          })
          tempArr.push(tempItem)
        }
        return tempArr
      },
      dayList() {
        let firstDay = new Date(this.curYear, this.curMonth, 1)
        let dayOfWeek = firstDay.getDay()
        // 根据当前日期计算偏移量
        if (this.calendar.options.weekStartOn > dayOfWeek) {
          dayOfWeek = dayOfWeek - this.calendar.options.weekStartOn + 7
        } else if (this.calendar.options.weekStartOn < dayOfWeek) {
          dayOfWeek = dayOfWeek - this.calendar.options.weekStartOn
        }

        let startDate = new Date(firstDay)
        startDate.setDate(firstDay.getDate() - dayOfWeek)

        let item, status, tempArr = [], tempItem
        for (let i = 0; i < 42; i++) {
          item = new Date(startDate);
          item.setDate(startDate.getDate() + i);

          if (this.curMonth === item.getMonth()) {
            status = 1
          } else {
            status = 0
          }
          tempItem = {
            date: `${item.getFullYear()}/${item.getMonth() + 1}/${item.getDate()}`,
            status: status
          }
          this.events.forEach((event) => {
            if (isEqualDateStr(event.date, tempItem.date)) {
//                tempItem.title = event.title
//                tempItem.desc = event.desc || ''
              tempItem.id = event.id
              tempItem.date = event.date
              tempItem.activities = event.activities
            }
          })
          tempArr.push(tempItem)
        }
        return tempArr
      }
      ,
      today() {
        let dateObj = new Date()
        return `${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDate()}`
      }
      ,
      curYearMonth() {
        return this.curYear + "/" + (this.curMonth + 1);
//        let tempDate = Date.parse(new Date(`${this.calendar.params.curYear}/${this.calendar.params.curMonth + 1}/01`))
//        return dateTimeFormatter(tempDate, this.i18n[this.calendar.options.locale].format)
      }
      ,
      customColor() {
        return this.calendar.options.color
      }
    }
    ,
    methods: {
      nextMonth() {
        if (this.curMonth < 11) {
          this.curMonth++
        } else {
          this.curYear++
          this.curMonth = 0
        }
      }
      ,
      preMonth() {
       if (this.curMonth > 0) {
          this.curMonth--
        } else {
          this.curYear--
          this.curMonth = 11
        }
      }
      ,
      handleChangeCurday(date) {
        if (date.status) {
          this.$emit('cur-day-changed', date.date)
        }
      }
      ,
      addDateToStore(date) {
        this.$store.dispatch('diary/SET_CURRENT_ACTIVITY', {day_id: date.id, date: date.date, activitySports:[{}], activityFoodIntakes:[{}], activityWellBeings:[], activityMeasurements:[]});
      }
    }
    ,
    created: function () {
      let dateObj = new Date()
      this.curDate = dateObj.getDate();
      this.curMonth = dateObj.getMonth();
      this.curYear = dateObj.getFullYear();
      this.selectedDay = this.today;
//      console.log("cal-panle " + this.today);
//      console.log("cal-panle " + JSON.stringify(this.events.find(d=>isEqualDateStr(d.date, this.selectedDay))));
      let current_day = this.events.find(d => isEqualDateStr(d.date, this.selectedDay));
      if (current_day) {
        current_day.status = 1;
        this.handleChangeCurday(current_day);
      }
    }
  }
</script>
