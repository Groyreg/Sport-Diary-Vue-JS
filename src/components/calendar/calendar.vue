<template>
  <div>
    <activity-modal></activity-modal>
    <div class="__vev_calendar-wrapper">
      <cal-panel
        :events="days"
        :selectedDay="selectedDate"
        @cur-day-changed="handleChangeCurDay"
      >
      </cal-panel>
      <cal-events
        :day="currentDay">
      </cal-events>
    </div>
  </div>
</template>
<script>
  import activityModal from './activityModal.vue';

  import calEvents from './cal-events.vue'
  import calPanel from './cal-panel.vue'
  import {mapGetters, mapState} from 'vuex'
  import {dateTimeFormatter, isEqualDateStr} from './tools.js'

  export default {
    data() {
      return {
        show: false,
        current_day: {
          date: '',
          activities: []
        },
        selectedDate: ''
      }
    },

    computed: {
        ...mapState({
//          diaryActivities: state=> state.diary.diary,
          days : state=> state.diary.diary.days,
      }),

//      ...mapGetters({
//        diaryActivities: 'diary/getDiary'
//      }),
      calendarParams() {
        let dateObj = new Date()
        return {
          curYear: dateObj.getFullYear(),
          curMonth: dateObj.getMonth(),
          curDate: dateObj.getDate(),
          curEventsDate: dateObj.getFullYear() + "/" + (1 + dateObj.getMonth()) + "/" + dateObj.getDate()
        }
      },
      today() {
        let dateObj = new Date();
        return dateObj.getFullYear() + "/" + (1 + dateObj.getMonth()) + "/" + dateObj.getDate();
      },
      currentDay(){
          if (this.days && this.selectedDate.length>0) {
            let day = this.days.find(d => isEqualDateStr(d.date, this.selectedDate));
            if (day){
              return day;
            }
            else{
              return { date: this.selectedDate, activities: []};
            }
          }
          return { date: '', activities: []};
      }
    },
    methods: {
      handleChangeCurDay(date) {
        console.log("handleChangeCurDay " + date);
        this.selectedDate = date;
      }
    },
    components:
      {
        'activity-modal': activityModal,
        'cal-events': calEvents,
        'cal-panel': calPanel
      }
//      ,
//    created:function (){
//      let dateObj = new Date();
//      this.selectedDate = dateObj.getFullYear() + "/" + (1 + dateObj.getMonth()) + "/" + dateObj.getDate();
//    }
  }
</script>
<style lang="less">
  @base-orange: #f29543;
  @white: #ffffff;
  @gray: #e0e0e0;
  @gray-dark: #b1b1b1;
  @large-padding: 15px;
  @small-padding: 10px;

  @icon-border-size: 1px;
  @media screen and (min-width: 768px) {
    .__vev_calendar-wrapper{
      max-width: 1200px;
      margin-left: 30px;
      .cal-wrapper{
        width: 50%;
        padding: 100px 50px;
        .date-num{
          line-height: 50px;
        }
      }
      .events-wrapper{
        width: 50%;
        background-color: @base-orange;
        color: @white;
        padding: 40px 45px;
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .__vev_calendar-wrapper{
      .cal-wrapper{
        width: 100%;
        padding: 10px 5px;
        .date-num{
          line-height: 42px;
        }
      }
      .events-wrapper{
        width: 100%;
        margin-top: 10px;
        padding: 10px;
      }
    }
  }
  .__vev_calendar-wrapper{
    position: relative;
    overflow: hidden;
    width: 100%;
    *{
      box-sizing: border-box;
    }
    ::-webkit-scrollbar{
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 2px rgba(0,0,0,.2);
      border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: rgba(0,0,0,.2);
    }
    .cal-wrapper{
      .cal-header{
        position: relative;
        width: 100%;
        background-color: @white;
        // box-shadow: 0 6px 5px rgba(0,0,0,.1);
        font-weight: 500;
        overflow: hidden;
        padding-bottom: 10px;
        &>div{
          float: left;
          line-height: 20px;
          padding: @large-padding;
        }
        .title{
          width: 60%;
          text-align: center;
        }
        .l{
          text-align: left;
          width: 20%;
          cursor: pointer;
          user-select: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
        .r{
          text-align: right;
          width: 20%;
          cursor: pointer;
          user-select: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
      }
      .cal-body{
        width: 100%;
        .weeks{
          width: 100%;
          overflow: hidden;
          text-align: center;
          font-size: 1rem;
          .item{
            line-height: 50px;
            float: left;
            width: 14.285%;
          }
        }
        .dates{
          width: 100%;
          overflow: hidden;
          text-align: center;
          font-size: 1rem;
          .item{
            position: relative;
            float: left;
            display: block;
            width: 14.285%;
            cursor: default;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            .date-num{
              font-size: 1rem;
              position: relative;
              z-index: 3;
            }
            &.event{
              cursor: pointer;
            }
            &.selected-day{
              .is-event{
                background-color: @base-orange;
              }
            }
            .is-event{
              content: '';
              border: 1px solid @base-orange;
              background-color: #fff;
              border-radius: 50%;
              width: 36px;
              height: 36px;
              position: absolute;
              left: 50%;
              top: 50%;
              z-index: 1;
              margin-left: -18px;
              margin-top: -19px;
            }
            .is-today{
              content: '';
              background-color: @base-orange;
              border-radius: 50%;
              opacity: .8;
              width: 12px;
              height: 4px;
              position: absolute;
              left: 50%;
              top: 50%;
              z-index: 2;
              margin-left: -6px;
              margin-top: 8px;
            }
          }
        }
      }
    }
    .events-wrapper{
      border-radius: 10px;
      .cal-events{
        height: 95%;
        overflow-y: auto;
        padding: 0 5px;
        margin: 15px 0;
      }
      .date{
        max-width: 60%;
        min-width: 200px;
        text-align: center;
        color: @white;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 20px;
        margin: 0 auto;
        font-size: 22px;
      }
      .event-item{
        padding: 5px 20px;
        margin-top: 15px;
        box-shadow: 0 3px 11px 2px rgba(0,0,0,.1);
        background-color: #fff;
        border-radius: 5px;
        color: #323232;
        position: relative;
        &:first-child{
          margin-top: 0;
        }
        .title{
          height: 40px;
          line-height: 40px;
          color: #323232;
          font-size: 16px;
          border-bottom: 1px solid #f2f2f2;
        }
        .time{
          position: absolute;
          right: 30px;
          top: 17px;
          color: #9b9b9b;
          font-size: 14px;
        }
        .desc{
          color: #9b9b9b;
          font-size: 14px;
          padding: 7px 0;
        }
      }
    }
    .arrow-left.icon {
      color: #000;
      position: absolute;
      left: 6%;
      margin-top: 10px;
    }
    .arrow-left.icon:before {
      content: '';
      position: absolute;
      left: 1px;
      top: -5px;
      width: 10px;
      height: 10px;
      border-top: solid @icon-border-size currentColor;
      border-right: solid @icon-border-size currentColor;
      -webkit-transform: rotate(-135deg);
      transform: rotate(-135deg);
    }
    .arrow-right.icon {
      color: #000;
      position: absolute;
      right: 6%;
      margin-top: 10px;
    }
    .arrow-right.icon:before {
      content: '';
      position: absolute;
      right: 1px;
      top: -5px;
      width: 10px;
      height: 10px;
      border-top: solid @icon-border-size currentColor;
      border-right: solid @icon-border-size currentColor;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    h3, p{
      margin: 0;
      padding: 0;
    }
  }
  .__vev_calendar-wrapper
  {
    max-width: 1380px;
    min-width: 310px;
    width: 90%;
  }
  .cal-wrapper
  {
    font-size: 16px !important;
    border: 3px solid #4BBCFF;
    padding: 10px !important;
    border-radius: 10px;
    padding-left: 10px;
  }
  .cal-body
  {
    font-size: 16px !important;
  }
  .events-wrapper
  {
    border: 3px solid #4BBCFF;
    background-color: #fff !important;
    padding-left: 10px;
    padding: 20px !important;
  }
  .is-today
  {
    margin-left: -15px !important;
    margin-top: 3px !important;
    height: 10px !important;
    width: 30px !important;
    background-color: red !important;
  }
  .is-event
  {
    display: none !important;
  }
  .event > p
  {
    border: 4px solid #4BBCFF;
    border-radius: 5px;
    color: black !important;
    transition: box-shadow 1s ease, color 1s ease;
    z-index: 1;
  }
  .event> p:hover
  {
    background-color: #4BBCFF;
    z-index: 1;

  }
  .dates >
  .item
  {
    display:inline-block;
    border: 0;
    float: left;
    width: 50px;
    height:70px;
    position: relative;
    -webkit-transition: all 200ms ease-in;
    -webkit-transform: scale(0.6);
    -ms-transition: all 200ms ease-in;
    -ms-transform: scale(0.6);
    -moz-transition: all 200ms ease-in;
    -moz-transform: scale(0.6);
    transition: all 200ms ease-in;
    transform: scale(0.6);
    cursor: pointer;
  }
  .dates >
  .item:hover
  {
    z-index: 4;
    -webkit-transition: all 200ms ease-in;
    -webkit-transform: scale(0.8);
    -ms-transition: all 200ms ease-in;
    -ms-transform: scale(0.8);
    -moz-transition: all 200ms ease-in;
    -moz-transform: scale(0.8);
    transition: all 200ms ease-in;
    transform: scale(0.8);
  }
  .date-num
  {
    font-size: 2.5rem !important;
  }
  .item
  {
    font-size: 1.8rem;
  }
  .dates-btn
  {
    display: none ;
    color: #ffffff;
    font-size: 2rem;
    width: 100%;
    height: 40px;
    outline: none;
    border-right: 5px solid white;
    border-left: 5px solid white;
    border-bottom: 5px solid red;
    border-top: 5px solid red;
    background-color: transparent;
    position: relative;
    top: 0px;
    left: 0px;
    z-index: 2;

  }
  .dates-btn:hover
  {
    border-right: 5px solid red;
    border-left: 5px solid red;
    border-bottom: 5px solid white;
    border-top: 5px solid white;
    color: white !important;
    font-weight: 600;
    z-index: 2;

  }
  .dates >.item:hover > .dates-btn {
    display: block;
  }
  .event-add
  {
    width: 300px;
    font-size: 13px;
    padding: 6px 0 4px 10px;
    border: 1px solid #cecece;
    background: #F6F6f6;
    border-radius: 8px;
  }
  .fa-plus
  {
    color: red;
    position: relative;
    top: 2px;
    left: 3px;
  }
</style>
