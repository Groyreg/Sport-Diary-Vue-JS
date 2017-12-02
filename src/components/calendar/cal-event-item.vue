<template>
  <div class="wrapper">
    <p class="time-clock">{{event.time_start}}</p>
    <h3 class="title ev-title" @click="descrShow=!descrShow">
      <img v-for="icons in diaryIcons" v-if="event && diaryIcons && icons.id === event.type_id" :src="getImgUrl(icons)" v-bind:alt="diaryIcons" class="type-icon" height="25" width="25">
      {{typeName(event)}}
    </h3>
    <a @click='deleteActivity(event.id)' type="button" class="close btn-del-event"><i class="fa fa-times fa-fw" aria-hidden="true"></i></a>
    <a @click='addDataToStore(date,event)' href="#event-form" data-toggle="modal" type="button" class="close btn-edit-event"><i class="fa fa-pencil fa-fw" aria-hidden="true"></i></a>

    <p class="desc">
      {{time_end}}
      {{event.description}}
    </p>
    <div v-show="descrShow" class="dop-descr">
      <div v-if="event.type_id === 3 && event.activityFoodIntakes">
          <foodintake :products="event.activityFoodIntakes"></foodintake>
      </div>
      <div v-else-if="event.type_id === 4 && event.activitySports">
          <sport :exercises="event.activitySports"></sport>
      </div>
      <div v-else-if="event.type_id === 2 && event.activityWellBeings">
        <wellbeing :wellbeings="event.activityWellBeings"></wellbeing>
      </div>
      <div v-else-if="event.type_id === 5 && event.activityMeasurements">
        <measurement :measurements="event.activityMeasurements"></measurement>
      </div>
    </div>
  </div>
</template>
<script>

  //  { id:'',
  //    day_id:'',
  //    type_id:'',
  //    time_start:'',
  //    duration:'',
  //    description:''}

  import i18n from './i18n.js';
  import { dateTimeFormatter } from './tools.js';
//  import index from "../../../../router/index";
  import {mapGetters} from 'vuex';
  import foodintake from './activities/foodIntake.vue';
  import sport from './activities/sport.vue';
  import wellbeing from './activities/wellbeing.vue'
  import measurement from './activities/measurement.vue'


  export default {
    data () {
      return {
        i18n,
        descrShow : false
      }
    },
    computed: {
      time_end : function () {
        if (this.event.time_start && this.event.duration) {
          let start = this.$moment(this.event.time_start, "HH:mm");
          let dur = this.$moment.duration(this.event.duration, "HH:mm");
          return start.add(dur).format("HH:mm");
        }
      },
      diaryIcons(){
        return this.$store.state.diary.diary_icons;
      }
    },
    props: {
      event: {
        type: Object,
        required: true
      },
      date : {
        type: String,
        required: true
      },
      index: {
        type: Number,
        required: true
      },
      locale: {
        type: String,
        required: true
      }
    },
    methods: {
      dateTimeFormatter,
      deleteActivity : function (id) {
        this.$confirm('Запись будет удалена. Продолжить', 'Внимание', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Нет',
          type: 'warning'
        }).then(() => {
          console.log("cal-event-item deleteActivity " + id);
          this.$store.dispatch('diary/DELETE_ACTIVITY', id);
          this.$message({
            type: 'success',
            message: 'Запись удалена'
          });
        }).catch((message) => {
          console.log("deleteActivity " + JSON.stringify(message));
          this.$message({
            type: 'info',
            message: 'Удаление отменено' + message
          });
        });
//      this.$emit('deleteItem');
      },
      typeName(event){
        if (event.activity_type) {
          return event.activity_type.name
        }
        else {
          return '';
        }
      },
      addDataToStore(date, event) {
        event.date = date;
        this.$store.dispatch('diary/SET_CURRENT_ACTIVITY', event);
      },
      getImgUrl(icon) {
        var images = require.context('../../assets/icons/', false, /\.png$/)
        return images('./' + icon.name + ".png")
      }
    },
    mounted: function(){
      this.$nextTick(function () {
//        if(this.timeStart & this.timeDuration) {
//          this.finish.setHours(this.timeStart.getHours() + this.timeDuration.getHours());
//          this.finish.setMinutes(this.timeStart.getMinutes() + this.timeDuration.getMinutes());
//          this.time_end = this.finish.toTimeString().slice(0, 5);
//        }
//        $(document).on('click', '.ev-title', function () {
//          $(this).closest('.wrapper').find('.dop-descr').toggleClass('visible');
//
//        })
      })

    },
    components:{
      foodintake,
      sport,
      wellbeing,
      measurement
    }
  }
</script>
<style lang="less">
  .time-clock
  {
    width: 50px !important;
    position: absolute;
    left: 20px;
    top: 17px;
    color: #9b9b9b;
    font-size: 14px;
  }
  .btn-del-event
  {
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 14px;
  }
  .btn-edit-event
  {
    position: absolute;
    right: 20px;
    top: 5px;
    font-size: 14px;
  }
  .ev-title
  {
    margin-left: 60px !important;
    cursor: pointer;
  }
  .dop-descr
  {
    color: #9b9b9b;
    font-size: 14px;
    padding: 7px 0;
  }
  .dop-descr > ul > li
  {
    list-style: none;
  }
  /*.visible*/
  /*{*/
    /*display: block !important;*/
  /*}*/
</style>
