<template>
  <div class="comment-event-form">
    <div v-for="(row, index) in wellbeingListFilled" class="comment-event-form row">
      <div class="col-xs-1 col-md-1"></div>
      <div class="col-xs-10 col-md-11">
      <div class="block">
        <span class="demonstration">{{index+1}} {{row.name}}</span>
        <el-slider v-model="row.value" @change="setWellBeing(row)" :max="row.hight_value" :min="row.min_value"></el-slider>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
//  import vueSlider from 'vue-slider-component'

  export default {
    props: {
      wellbeings: {
        default: () => [],
        type: Array
      }
    },
    components :{
    },
    computed: {
      ...mapGetters({
        wellbeingList: 'static/getWellbeings'
      }),

      wellbeingListFilled: function(){
        let filled = [];
        this.wellbeingList.forEach(w=>
        {
          let activ = this.wellbeings.find(a=>a.wellbeing_id === w.id);
          if (activ)
          {
            filled.push({id:w.id, name:w.name, value:activ.value, hight_value: w.hight_value, min_value: w.min_value})
          }
          else{
            filled.push({id:w.id, name:w.name, value:undefined, hight_value: w.hight_value, min_value: w.min_value})
          }
         })
        return filled;
      }
    },
    methods: {
      setWellBeing( row){
        console.log("setWellBeing" +row);
        let activity = this.wellbeings.find(a=>a.wellbeing_id === row.id);
        if (activity){
          this.$set(activity, 'value', row.value);
        }
        else{
          this.wellbeings.push({wellbeing_id:row.id, value:row.value});
        }
      },

//      watch : {
//        wellbeings : {
//
//        }
//      }

//      getWellBeingValue(id){
//        console.log("getWellBeingValue"+id);
//        let activity = this.wellbeings.find(a=>a.wellbeing_id === id);
//        if (activity){
//          return activity.value;
//        }
//        return 1;
//      }
    },
    mounted: function () {
//      if (this.wellbeingList && this.wellbeings) {
//        this.wellbeingList.forEach(w => w.value = this.wellbeings.find(a => a.wellbeing_id === w.id));
//      }
    }
  }
</script>
<style>
  .el-slider {
    width: 100% !important;
  }
</style>
