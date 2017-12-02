<template>
    <div class="wrapper">
      <h3 class="title">{{index+1}}.{{typeName(event)}}</h3>
      <button v-on:click='deleteItem' type="button" class="close btn-del-event">×</button>
      <p class="time-clock">{{event.time_start}}</p>
      <p class="desc">{{event.duration}}
        {{event.description}}
      </p>
    </div>
</template>
<script>

//  { id:'',
//    day_id:'',
//    type_id:'',
//    time_start:'',
//    duration:'',
//    description:''}

import i18n from '../i18n.js'
import { dateTimeFormatter } from '../tools.js';
import index from "../../../../router/index";

export default {
  data () {
    return {
      i18n,
    };
  },
  props: {
    event: {
      type: Object,
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
    deleteItem : function () {
//      this.$emit('deleteItem');
    },
    typeName(event){
      if (event.activity_type) {
        return event.activity_type.name
      }
      else {
        return '';
      }
    }
  }
}
</script>
<style>
  .time-clock
  {
    width: 50px !important;
    position: absolute;
    right: 105px;
    top: 17px;
    color: #9b9b9b;
    font-size: 14px;
  }
   .btn-del-event
  {
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 16px;
  }
</style>
