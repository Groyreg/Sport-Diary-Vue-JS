<template>
  <div class="row">
    <h1 class="sdv-title">Программа</h1>
    <div class="training-calendar col-xs-12">
      <div class="training-type">
        <div class="month-title">
          <div>
            <i @click="preMonth" class="fa fa-caret-left fa-2x" aria-hidden="true"></i>
          </div>
          <div>
            {{weekDay[curMonth]}} {{curYear}}
          </div>
          <div>
            <i @click="nextMonth" class="fa fa-caret-right fa-2x" aria-hidden="true"></i>
          </div>
        </div>
        <div class="btn-day-change">
          <div class="visible-3 visible-2 visible-1">
            <i @click="changeDayListDown(1)" class="fa fa-caret-left fa-2x" aria-hidden="true"></i>
            <i @click="changeDayListUp(1)" class="fa fa-caret-right fa-2x" aria-hidden="true"></i>
          </div>
          <div class="visible-4">
            <i @click="changeDayListDown(4)" class="fa fa-caret-left fa-2x" aria-hidden="true"></i>
            <i @click="changeDayListUp(4)" class="fa fa-caret-right fa-2x" aria-hidden="true"></i>
          </div>
          <div class="visible-5">
            <i @click="changeDayListDown(5)" class="fa fa-caret-left fa-2x" aria-hidden="true"></i>
            <i @click="changeDayListUp(5)" class="fa fa-caret-right fa-2x" aria-hidden="true"></i>
          </div>
          <div class="visible-6">
            <i @click="changeDayListDown(6)" class="fa fa-caret-left fa-2x" aria-hidden="true"></i>
            <i @click="changeDayListUp(6)" class="fa fa-caret-right fa-2x" aria-hidden="true"></i>
          </div>
          <div class="visible-7">
            <i @click="changeDayListDown(7)" class="fa fa-caret-left fa-2x" aria-hidden="true"></i>
            <i @click="changeDayListUp(7)" class="fa fa-caret-right fa-2x" aria-hidden="true"></i>
          </div>
        </div>
        <div class="training-title">Тренировочные задания</div>
        <div class="training-title data-exe"></div>
        <div class="training-title">Общее время тренировки</div>
        <div class="training-title">Отдых</div>
        <div class="training-title data-exe">Тренируемые качества</div>
        <div class="training-title">Комментарий</div>
      </div>
      <div class="training-date visible-7" v-for="date in trainingDayList">
        <div class="week-name"><p>{{date.dayWeekName}}</p></div>
        <div class="count-date"><p>{{date.date.split('/')[2]}}</p></div>
        <div class="training-data"><p>{{getName(date)}}</p></div>
        <div class="training-data data-exe">
          <div class="td-item" v-for="ex in getExercises(date)"><p>{{ex.exercise.description}}</p></div>
        </div>
        <div class="training-data"><p>{{getDuration(date)}}</p></div>
        <div class="training-data"><input v-if="showData(date)" type="checkbox" name=""></div>
        <div class="training-data data-exe">
          <!--<zonechart type="bar" :data="getChartData(date)"></zonechart>-->
          <zonechart v-if="showData(date)" :chartData="getChartData2(date)" :options="options" :height="140" :width="150"></zonechart>
        </div>
        <div class="training-data"><p>{{getNote(date)}}</p></div>
      </div>
      <div class="training-date visible-6" v-for="date in trainingDayList.slice(0,6)">
        <div class="week-name">{{date.dayWeekName}}</div>
        <div class="count-date">{{date.date.split('/')[2]}}</div>
        <div class="training-data"><p>{{getName(date)}}</p></div>
        <div class="training-data data-exe">
          <div class="td-item" v-for="ex in getExercises(date)"><p>{{ex.exercise.description}}</p></div>
        </div>
        <div class="training-data"><p>{{getDuration(date)}}</p></div>
        <div class="training-data"><input v-if="showData(date)" type="checkbox" name=""></div>
        <div class="training-data data-exe">
          <!--<zonechart type="bar" :data="getChartData(date)"></zonechart>-->
          <zonechart v-if="showData(date)" :chartData="getChartData2(date)" :options="options" :height="140" :width="150"></zonechart>
        </div>
        <div class="training-data"><p>{{getNote(date)}}</p></div>
      </div>
      <div class="training-date visible-5" v-for="date in trainingDayList.slice(0,5)">
        <div class="week-name">{{date.dayWeekName}}</div>
        <div class="count-date">{{date.date.split('/')[2]}}</div>
        <div class="training-data"><p>{{getName(date)}}</p></div>
        <div class="training-data data-exe">
          <div class="td-item" v-for="ex in getExercises(date)"><p>{{ex.exercise.description}}</p></div>
        </div>
        <div class="training-data"><p>{{getDuration(date)}}</p></div>
        <div class="training-data"><input v-if="showData(date)" type="checkbox" name=""></div>
        <div class="training-data data-exe">
          <!--<zonechart type="bar" :data="getChartData(date)"></zonechart>-->
          <zonechart v-if="showData(date)" :chartData="getChartData2(date)" :options="options" :height="140" :width="150"></zonechart>
        </div>
        <div class="training-data"><p>{{getNote(date)}}</p></div>
      </div>
      <div class="training-date visible-4" v-for="date in trainingDayList.slice(0,4)">
        <div class="week-name">{{date.dayWeekName}}</div>
        <div class="count-date">{{date.date.split('/')[2]}}</div>
        <div class="training-data"><p>{{getName(date)}}</p></div>
        <div class="training-data data-exe">
          <div class="td-item" v-for="ex in getExercises(date)"><p>{{ex.exercise.description}}</p></div>
        </div>
        <div class="training-data"><p>{{getDuration(date)}}</p></div>
        <div class="training-data"><input v-if="showData(date)" type="checkbox" name=""></div>
        <div class="training-data data-exe">
          <!--<zonechart type="bar" :data="getChartData(date)"></zonechart>-->
          <zonechart v-if="showData(date)" :chartData="getChartData2(date)" :options="options" :height="140" :width="150"></zonechart>
        </div>
        <div class="training-data"><p>{{getNote(date)}}</p></div>
      </div>
      <div class="training-date visible-3" v-for="date in trainingDayList.slice(0,3)">
        <div class="week-name">{{date.dayWeekName}}</div>
        <div class="count-date">{{date.date.split('/')[2]}}</div>
        <div class="training-data"><p>{{getName(date)}}</p></div>
        <div class="training-data data-exe">
          <div class="td-item" v-for="ex in getExercises(date)"><p>{{ex.exercise.description}}</p></div>
        </div>
        <div class="training-data"><p>{{getDuration(date)}}</p></div>
        <div class="training-data"><input v-if="showData(date)" type="checkbox" name=""></div>
        <div class="training-data data-exe">
          <!--<zonechart type="bar" :data="getChartData(date)"></zonechart>-->
          <zonechart v-if="showData(date)" :chartData="getChartData2(date)" :options="options" :height="140" :width="150"></zonechart>
        </div>
        <div class="training-data"><p>{{getNote(date)}}</p></div>
      </div>
      <div class="training-date visible-2" v-for="date in trainingDayList.slice(0,2)">
        <div class="week-name">{{date.dayWeekName}}</div>
        <div class="count-date">{{date.date.split('/')[2]}}</div>
        <div class="training-data"><p>{{getName(date)}}</p></div>
        <div class="training-data data-exe">
          <div class="td-item" v-for="ex in getExercises(date)"><p>{{ex.exercise.description}}</p></div>
        </div>
        <div class="training-data"><p>{{getDuration(date)}}</p></div>
        <div class="training-data"><input v-if="showData(date)" type="checkbox" name=""></div>
        <div class="training-data data-exe">
          <!--<zonechart type="bar" :data="getChartData(date)"></zonechart>-->
          <zonechart v-if="showData(date)" :chartData="getChartData2(date)" :options="options" :height="140" :width="150"></zonechart>
        </div>
        <div class="training-data"><p>{{getNote(date)}}</p></div>
      </div>
      <div class="training-date visible-1" v-for="date in trainingDayList.slice(0,1)">
        <div class="week-name">{{date.dayWeekName}}</div>
        <div class="count-date">{{date.date.split('/')[2]}}</div>
        <div class="training-data"><p>{{getName(date)}}</p></div>
        <div class="training-data data-exe">
          <div class="td-item" v-for="ex in getExercises(date)"><p>{{ex.exercise.description}}</p></div>
        </div>
        <div class="training-data"><p>{{getDuration(date)}}</p></div>
        <div class="training-data"><input v-if="showData(date)" type="checkbox" name=""></div>
        <div class="training-data data-exe">
          <!--<zonechart type="bar" :data="getChartData(date)"></zonechart>-->
          <zonechart v-if="showData(date)" :chartData="getChartData2(date)" :options="options" :height="140" :width="150"></zonechart>
        </div>
        <div class="training-data"><p>{{getNote(date)}}</p></div>
      </div>
    </div>
  </div>
</template>
<script>
  import ElRadio from "../../node_modules/element-ui/packages/radio/src/radio.vue";
  import ElRadioButton from "../../node_modules/element-ui/packages/radio/src/radio-button.vue";
  import ElCheckboxButton from "../../node_modules/element-ui/packages/checkbox/src/checkbox-button.vue";
  import {mapGetters} from 'vuex'
  import zonechart from './charts/zonechart.js'

  export default {
    components: {
      ElCheckboxButton,
      ElRadioButton,
      ElRadio,
      zonechart
    },
    data() {
      return {
        shift: 0,
        curDate: new Date(),
        options: {
          legend: {
            display: false
          },
          title: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              display: false

            }],
            xAxes: [{
              barThickness: 16

            }]
          },

        },
        chartdata: {
          labels: ['1', '2', '3', '4', '5'],
          datasets: [
            {
              backgroundColor: ['#e3f8df', '#f8f775', '#f8f639', '#f89f23', '#f887ba'],
              data: [0, 0, 0, 0, 0]
//              data: [date.trains.training.zone1,date.trains.training.zone2, date.trains.training.zone3, date.trains.training.zone4, date.trains.training.zone5]
            }
          ]
        }
      }
    },
    computed: {
      ...mapGetters({
        program: 'program/getProgram'
      }),
      curMonth() {
        return this.curDate.getUTCMonth();
      },
      curYear() {
        return this.curDate.getFullYear();
      },
      firstDay() {
        return new Date(this.curYear, this.curMonth, 1);
      },
      weekDay() {
        return this.firstDay.getDay();
      },
      oneHour() {
        return 1000 * 60 * 60;
      },
      oneDay() {
        return this.oneHour * 24;
      },
      dateNextMonth() {
        return new Date(this.curYear, this.curMonth + 1, 1)
      },
      lastDay() {
        return Math.ceil((this.dateNextMonth.getTime() - this.firstDay.getTime() - this.oneHour) / this.oneDay);
      },
      weekName() {
        return ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
      },
      weekDay() {
        return ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
      },
      trainingDayList() {
        let startDate = new Date(this.firstDay)
        let item, itemDay, status, tempArr = [], tempItem;
        for (let i = 0 + this.shift; i < 7 + this.shift; i++) {
          item = new Date(startDate);
          itemDay = item.getDay();
          item.setDate(startDate.getDate() + i);
          itemDay = item.getDay();

          tempItem = {
            date: `${item.getFullYear()}/${item.getMonth() + 1}/${item.getDate()}`,
            dayWeekNumber: itemDay,
            dayWeekName: this.weekName[itemDay],
            trains: {training: {}, note: ''},
          }

          let dateMoment = this.$moment(tempItem.date, "YYYY/M/D");
          if (this.program && this.program.trains) {
            this.program.trains.forEach((train) => {
              let trainDate = this.$moment(train.date, "YYYY/MM/DD");
              if (trainDate.diff(dateMoment, 'days') === 0) {
                tempItem.trains = train;
              }
            })
          }

          tempArr.push(tempItem)
        }
        return tempArr
      }
    },
    methods: {
      nextMonth() {
        this.curDate = new Date(this.curDate.getFullYear(), this.curDate.getUTCMonth() + 1, this.curDate.getDate())
        this.shift = 0
      },
      preMonth() {
        this.curDate = new Date(this.curDate.getFullYear(), this.curDate.getUTCMonth() - 1, this.curDate.getDate())
        this.shift = 0
      },
      changeDayListUp(val) {
        this.shift += val;
        if (this.shift >= this.lastDay) {
          this.shift = this.shift - this.lastDay
          this.curDate = new Date(this.curDate.getFullYear(), this.curDate.getUTCMonth() + 1, this.curDate.getDate())
        }
      },
      changeDayListDown(val) {
        this.shift -= val;
        if (this.shift < 0) {
          this.curDate = new Date(this.curDate.getFullYear(), this.curDate.getUTCMonth() - 1, this.curDate.getDate())
          this.shift = this.shift + this.lastDay;
        }
      },
      showData(date){
        if (date.trains.training.zone1 || date.trains.training.zone2 || date.trains.training.zone3|| date.trains.training.zone4|| date.trains.training.zone5){
            return true
        }
      },
      getName(date) {
        if (date.trains && date.trains.training) {
          return date.trains.training.name;
        }
        return "";
      },
      getExercises(date) {
        if (date.trains && date.trains.training && date.trains.training.trainExercises) {
          return date.trains.training.trainExercises;
        }
        return [];

      },
      getDuration(date) {
        if (date.trains && date.trains.training && date.trains.training.duration_min && date.trains.training.duration_max) {
          return date.trains.training.duration_min + "-" + date.trains.training.duration_max + " мин";
        }
        return "";
      },
      getNote(date) {
        if (date.trains && date.trains.training) {
          return date.trains.note;
        }
        return "";
      },
      getChartData(date) {
        if (date.trains && date.trains.training) {
          if (date.trains.training.zone1 || date.trains.training.zone2 || date.trains.training.zone3|| date.trains.training.zone4|| date.trains.training.zone5){
            return [date.trains.training.zone1, date.trains.training.zone2, date.trains.training.zone3, date.trains.training.zone4, date.trains.training.zone5]
          }
        }
        return [];
      },
      getChartData2(date) {
        if (date.trains && date.trains.training) {
          if (date.trains.training.zone1 || date.trains.training.zone2 || date.trains.training.zone3|| date.trains.training.zone4|| date.trains.training.zone5){
            return {
              labels: ['1', '2', '3', '4', '5'],
              datasets: [
                {
                  backgroundColor: ['#58595B', '#46c7ee','#6acc2b', '#f9bf1c', '#de0f5b', ],
//                  data: [10, 30, 0, 0, 0]
              data: [date.trains.training.zone1,date.trains.training.zone2, date.trains.training.zone3, date.trains.training.zone4, date.trains.training.zone5]
                }
              ]
            }
          }
        }
        return this.chartData;
      }
    },
    mounted: function () {
      if (this.program) {
        this.curDate = new Date(this.program.startDay.slice(0, 4), this.program.startDay.slice(5, 7) - 1, this.program.startDay.slice(8, 10));
        this.shift = this.program.startDay.slice(8, 10) - 1;
      }
    }
  }

</script>
<style>
  p {
    margin: 0;
    padding: 0;
    width: auto;
  }

  .sdv-title {
    width: 96%;
    margin-left: 30px;
    font-size: 25px;
    font-weight: 700;
    padding-bottom: 10px;
    border-bottom: 2px solid #4BBCFF;
  }

  .training-calendar {
    margin: 0;
    padding: 0;
    width: 98%;
    margin-top: 30px;
    margin-left: 30px;
    display: flex;
    flex-direction: row;
  }

  .training-type {
    width: 10%;
    min-width: 135px;
    display: flex;
    flex-direction: column;
  }

  .training-date {
    width: 12%;
    min-width: 155px;
    display: flex;
    flex-direction: column;
  }

  .month-title,
  .btn-day-change,
  .training-title,
  .week-name,
  .count-date {
    margin: 0;
    padding: 0;

    height: 40px;
    background-color: #4BBCFF;
    color: #fff;
    font-weight: 700;
    border: 1px solid silver;
    border-left: none;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .training-data {
    margin: 0;
    padding: 0;

    height: 40px;
    background-color: #4BBCFF;
    color: #fff;
    font-weight: 700;
    border: 1px solid silver;
    border-left: none;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .data-exe {
    height: 150px;
  }

  .month-title {
    justify-content: space-between;
  }

  .month-title,
  .btn-day-change,
  .training-title {
    background-color: #4CAF50;
  }

  .btn-day-change {
    display: flex;
    justify-content: space-around;
  }

  .month-title > div > i,
  .btn-day-change > div > i {
    cursor: pointer;
  }

  .month-title > div > i:hover,
  .btn-day-change > div > i:hover {
    transform: scale(1.3);
  }

  .count-date,
  .training-data {
    background-color: #fff;
    color: #4BBCFF;
  }

  .btn-day-change,
  .count-date,
  .training-title,
  .training-data {
    border-top: none;
  }

  .td-item {
    width: 100%;
  }
  .td-item > p
  {
    text-align: center;
  }
  .visible-7,
  .visible-6,
  .visible-5,
  .visible-4,
  .visible-3,
  .visible-2,
  .visible-1 {
    display: none;
  }

  .training-title {
    text-align: center;
  }

  @media screen and (min-width: 1262px) {
    .visible-7 {
      display: block;
    }
  }

  @media screen and (min-width: 1108px) and (max-width: 1262px) {
    .visible-6 {
      display: block;
    }
  }

  @media screen and (min-width: 952px) and (max-width: 1107px) {
    .visible-5 {
      display: block;
    }
  }

  @media screen and (min-width: 800px) and (max-width: 951px) {
    .visible-4 {
      display: block;
    }
  }

  @media screen and (min-width: 645px) and (max-width: 799px) {
    .visible-3 {
      display: block;
    }
  }

  @media screen and (min-width: 490px) and (max-width: 644px) {
    .visible-2 {
      display: block;
    }
  }

  @media screen and  (max-width: 489px) {
    .visible-1 
    {
      display: block;
    }
    .training-calendar
    {
      margin-left: 10px;
    }
  }

</style>
