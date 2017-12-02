<template>
  <div class="row">
    <h1 class="sdv-title">Питание</h1>
    <div class="food-calendar-wrapper">
      <el-date-picker
        v-model="range"
        type="daterange"
        range-separator="-"
        start-placeholder="Start date"
        end-placeholder="End date"
        :picker-options="pickerOptions">
      </el-date-picker>
      <button class="foodd-btn-calc btn btn-primary" @click="recalculate()">рассчитать</button>
    </div>
    <div v-if="loaded">
      <h4 class="fd-title col-xs-12">Анализ разнообразия питания</h4>
      <foodanalysischart :data="chartdata" class="fd-chart col-xs-12 hidden-xs"></foodanalysischart>
      <div class="foodd-tbl row visible-xs">
        <div class="foodd-tbl-desc">
          <p>* - Проценты по рекомендации минздрава</p>
          <p>** - Проценты анализ питания</p>
        </div>
        <div class="foodd-tbl-title row">
          <div class="tbl-title-item">Группы продуктов</div>
          <div class="tbl-title-item"><i class="fa fa-percent" aria-hidden="true"></i>*</div>
          <div class="tbl-title-item"><i class="fa fa-percent" aria-hidden="true"></i>**</div>
        </div>
        <div v-for="(label, index) in labels" class="foodd-tbl-data row">
          <div class="tbl-data-item col-xs-8">{{label}}</div>
          <div class="tbl-data-item col-xs-2" >{{minsdravData[index]}}</div>
          <div class="tbl-data-item col-xs-2">{{minsdravUser[index].toFixed(2)}}</div>
        </div>
      </div>
      <div class="foodd-tbl">
        <div class="foodd-tbl-desc">
          <h4 class="desc-title col-xs-12">Легенда:</h4>
          <span class="visible-xs">
            <p class="desc-item col-xs-12"><b>*</b> - Рекомендации на основе дневника питания</p>
            <p class="desc-item col-xs-12"><b>**</b> - Рекомендации на основе анализа на метаблолиты</p>
          </span>
          <p class="desc-item col-xs-12"><i class="up fa fa-arrow-circle-o-up fa-lg" aria-hidden="true"></i> - Увеличить</p>
          <p class="desc-item col-xs-12"><i class="down fa fa-arrow-circle-o-down fa-lg" aria-hidden="true"></i> - Уменьшить</p>
          <p class="desc-item col-xs-12"><i class="norma fa fa-check-circle fa-lg" aria-hidden="true"></i> - Норма</p>
        </div>
        <div class="foodd-tbl-title">
          <div class="tbl-title-item tbl-name">Группы продуктов</div>
          <div class="tbl-title-item"><span class="visible-xs">*</span><span class="hidden-xs">Рекомендации на основе дневника питания</span></div>
          <div class="tbl-title-item"><span class="visible-xs">**</span><span class="hidden-xs">Рекомендации на основе анализа на метаблолиты</span></div>
        </div>
        <div v-for="(label, index) in labels" class="foodd-tbl-data">
          <div class="tbl-data-item tbl-name col-md-8 col-xs-8">{{label}}</div>
          <!-- <div class="tbl-data-item col-md-2 col-xs-2 hidden-xs">{{diaryRecomendation(index)}}</div> -->
          <div v-if="diaryRecomendationMob(index) == 'up'" class="tbl-data-item centered col-md-2 col-xs-2 "><i class="up fa fa-arrow-circle-o-up fa-2x" aria-hidden="true"></i></div>
          <div v-if="diaryRecomendationMob(index) == 'down'" class="tbl-data-item centered col-md-2 col-xs-2 "><i class="down fa fa-arrow-circle-o-down fa-2x" aria-hidden="true"></i></div>
          <div v-if="diaryRecomendationMob(index) == 'norm'" class="tbl-data-item centered col-md-2 col-xs-2 "><i class=" norma fa fa-check-circle fa-2x" aria-hidden="true"></i></div>
          <!-- <div class="tbl-data-item col-md-2 col-xs-2 hidden-xs">{{metabolitRecomendation(index)}}</div> -->
          <div v-if="metabolitRecomendationMob(index) == 'up'" class="tbl-data-item centered col-md-2 col-xs-2 "><i class="up fa fa-arrow-circle-o-up fa-2x" aria-hidden="true"></i></div>
          <div v-if="metabolitRecomendationMob(index) == 'down'" class="tbl-data-item centered col-md-2 col-xs-2 "><i class="down fa fa-arrow-circle-o-down fa-2x" aria-hidden="true"></i></div>
          <div v-if="metabolitRecomendationMob(index) == 'norm'" class="tbl-data-item centered col-md-2 col-xs-2 "><i class="norma fa fa-check-circle fa-2x" aria-hidden="true"></i></div>
        </div>
      </div>
      <h4 class="fd-title col-xs-12">Анализ макронутриентов</h4>
      <h4 class="fd-title col-xs-12">Анализ микронутриентов</h4>
    </div>
    <!--<div v-for="intake in foodIntakes">-->
    <!--{{intake.name}}-->
    <!--</div>-->
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import Vue from 'vue'
  import foodanalysischart from './charts/foodanalysischart.vue'

  export default {
    data() {
      return {
        loaded: false,
        range: '',
        chartdata: {
          labels: [],
          datasets: [
            {
              label: 'Рекомендации Минздрава',
              backgroundColor: '#07f816',
              data: []
            },
            {
              label: 'Анализ питания',
              backgroundColor: '#f87927',
              data: []
            }
          ]
        },
        dateFrom: '',
        dateTo: '',
        labels:[],
        minsdravData : [],
        minsdravUser : [],
        minsdravYear : []
      }
    },
    computed: {
      ...mapGetters({
        diary: 'diary/getDiary',
        foodGroups: 'static/getFoodGroups'
      }),
      activeDates() {
        let dates = [];
        if (this.diary && this.diary.days) {
          this.diary.days.forEach(day => day.activities.forEach(act => {
            if (act.type_id === 3) {
              dates.push(day.date)
            }
          }));
        }
        return dates;
      },
      pickerOptions() {
        let self = this;
        let activeDates = this.activeDates;
        return {
          disabledDate(time) {
            let date = self.$moment(time).format("YYYY/MM/DD");
            return time.getTime() > Date.now() || activeDates.indexOf(date) === -1;
          },
          onPick(range) {
            if (range && range.maxDate && range.minDate) {
              self.dateFrom = self.$moment(range.minDate).format("YYYY/MM/DD");
              self.dateTo = self.$moment(range.maxDate).format("YYYY/MM/DD");
            }
            console.log(range);
          }
        }
      },
      minsdravYear2(){
        let request = {diaryId: this.diary.id, dateFrom: "2016/01/01", dateTo: "2018/01/01"};
        let minsrav = []
        Vue.axios.post("/food/analysis/minsdrav/", request).then((response) => {
          console.log(response.data.minsdrav[8]);
          return response.data.minsdrav;
//          this.misdravYear = [];
//          this.foodGroups.forEach((group) => {
//            if (group.id != 2 && group.id != 3) {
//              this.misdravYear.push(response.data.minsdrav[group.id]);
//            }
//          });
        }), (err) => {
          console.log(err)
        }
      },
      },
    components: {
      foodanalysischart
    },
    methods: {
      recalculate() {
        this.setMinsdravYear();
        console.log(this.dateFrom + " - " + this.dateTo);
        if (this.dateFrom && this.dateTo) {
          let request = {diaryId: this.diary.id, dateFrom: this.dateFrom, dateTo: this.dateTo};
          Vue.axios.post("/food/analysis/", request).then((response) => {
            console.log(response.data);
            this.setMinsdrav(response.data.minsdrav);
            // commit('SET_DIARY', {diary: response.data});
          }), (err) => {
            console.log(err)
          }
        }
      },
      setMinsdrav(data) {
        if (this.foodGroups) {
          this.labels = [];
          this.minsdravData = [];
          this.minsdravUser = [];
          this.foodGroups.forEach((group) => {
            if (group.id != 2 && group.id != 3) {
              this.labels.push(group.name);
              this.minsdravData.push(group.standard_percent);
              this.minsdravUser.push(data[group.id]);
            }
          });
          this.chartdata.labels = this.labels;
          this.chartdata.datasets[0].data = this.minsdravData;
          this.chartdata.datasets[1].data = this.minsdravUser;
          this.loaded = true;
        }
        ;
      },
      setMinsdravYear(){
        let request = {diaryId: this.diary.id, dateFrom: "2016/01/01", dateTo: "2018/01/01"};
        Vue.axios.post("/food/analysis/minsdrav/", request).then((response) => {
          console.log(response.data.minsdrav[6]);

          this.minsdravYear = [];
          this.foodGroups.forEach((group) => {
            if (group.id != 2 && group.id != 3) {
              this.minsdravYear.push(response.data.minsdrav[group.id]);
            }
          });
        }), (err) => {
          console.log(err)
        }
      },
      diaryRecomendation(ind){
        if (this.minsdravData[ind]>this.minsdravUser[ind]){
          return "увеличить"
        }
        else{
          return "уменьшить"
        }
      },
      metabolitRecomendation(ind){
        if (this.minsdravData[ind]>this.minsdravYear[ind]){
          return "увеличить"
        }
        else{
          return "уменьшить"
        }
      },
      diaryRecomendationMob(ind){
        if (Math.abs(this.minsdravData[ind] - this.minsdravUser[ind]) < this.minsdravData[ind]/10){
          return "norm"
        }
        else if (this.minsdravData[ind]>this.minsdravUser[ind]){
          return "up"
        }
        else {
          return "down"
        }
      },
      metabolitRecomendationMob(ind){
        if (this.minsdravData[ind]>this.minsdravYear[ind]){
          return true
        }
        else{
          return false
        }
      },
      metabolitRecomendationMob(ind){
        if (Math.abs(this.minsdravData[ind] - this.minsdravYear[ind]) < this.minsdravData[ind]/10){
          return "norm"
        }
        else if (this.minsdravData[ind]>this.minsdravYear[ind]){
          return "up"
        }
        else {
          return "down"
        }
      },
    },
    mounted: function () {
//      if (this.foodGroups) {
//        this.foodGroups.forEach((group) => {
//          this.chartdata.labels.push(group.name);
//          this.chartdata.datasets[0].label = "Рекомендации Минздрава"
//          this.chartdata.datasets[0].data.push(group.standard_percent);
//        });
//      }
//      ;

//      if (this.foodGroups) {
//        this.foodGroups.forEach((group) => {
//          this.chartdata.labels.push(group.name);
//          this.chartdata.datasets[0].data.push(group.standard_percent);
//        });
//      }
    }
  }
</script>
<style>
  .sdv-title
  {
    width: 96%;
    margin-left: 30px;
    font-size: 25px;
    font-weight: 700;
    padding-bottom: 10px;
    border-bottom: 2px solid #4BBCFF;
  }
  .food-calendar-wrapper
  {
    max-width: 600px;
    margin-left: 30px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .foodd-btn-calc
  {
    margin-top: -2px;
    margin-left: 15px;
    padding: 8.5px 25px;

  }
  .el-date-editor
  {
    width: 350px;
  }
  .available
  {
    font-weight: 800;
    color: #25A25A;
  }
  .fd-title
  {
    margin-left: 15px;
  }
  .fd-chart
  {
    margin-left: 30px;
    max-width: 1380px;
  }
  .foodd-tbl
  {
    width: 100%;
    max-width: 1400px;
    margin-top: 30px;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
  }
  .foodd-tbl-desc > p
  {
    margin-bottom: 0;
  }
  .desc-title
  {
    margin-left: -15px;
  }
  .desc-item
  {
    margin: 0;
    padding: 0;
    min-width: 300px;
    width: 98%;
  }
  .foodd-tbl-title
  {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    /*justify-content: center;*/
  }
  .tbl-name
  {
    min-width: 280px;
  }
  .tbl-title-item,
  .tbl-data-item
  {
    width: 30%;
    background-color: #4BBCFF;
    color: #fff;
    font-weight: 600;
    min-height: 40px;
    border: 2px solid silver;
    border-right: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tbl-title-item:last-child,
  .tbl-data-item:last-child

  {
    border-right: 2px solid silver;
  }
  .tbl-data-item
  {
    border-top: none;
    background-color: #fff;
    color: #4BBCFF;
  }
  .centered
  {
    justify-content: center !important;
  }
  .up,
  .down
  {
    color: red;
  }
  .norma
  {
    color: green;
  }
  @media screen and (max-width: 1400px)
  {
    .foodd-tbl
    {
      max-width: 1000px;
    }
    .tbl-title-item
    {
      min-height: 55px;
    }
  }
  @media screen and (max-width: 768px)
  {
    .el-date-editor
    {
      margin: 0;
      margin-left: -27px;
      width: 300px !important;
    }
    .foodd-btn-calc
    {
      min-width: 300px;
      margin: 0;
      margin-top: 15px;
      margin-left: -27px;
    }
    .el-picker-panel
    {
      position: relative !important;
      top: -30px !important;
      left: 10px !important;
    }
    .el-picker-panel,
    .el-picker-panel__body-wrapper,
    .el-picker-panel__body
    {
      max-width: 300px;
    }
    .el-date-range-picker__content.is-left
    {
      border-right: none;
    }
    .el-picker-panel__body
    {
      display: flex;
      flex-direction: column;
      min-width: 300px !important;
    }
    .el-date-range-picker__content
    {
      width: 100%;
    }
    .foodd-tbl
    {
      margin: 0;
      margin-top: 30px;
      margin-left: 10px;
    }
    .foodd-tbl-title
    {
      margin-top: 30px;
    }
    .foodd-tbl-title,
    .foodd-tbl-data
    {
      max-width: 300px;
      margin-left: -5px;
    }
    .tbl-title-item
    {
      min-height: 55px;
    }
    .tbl-data-item
    {
      min-height: 65px;
      justify-content: flex-start;
    }
    .tbl-title-item,
    .tbl-data-item
    {
      width: 25%;
    }
    .tbl-title-item:first-child,
    .tbl-data-item:first-child
    {
      min-width: 50%;
    }
  }
  @media screen and (min-width: 590px)
  {
    .foodd-btn-calc
    {
      min-width: 120px;
      margin: 0;
      margin-top: -2px;
      margin-left: 15px;
    }
  }
</style>
