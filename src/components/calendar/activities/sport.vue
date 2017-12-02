<template>
  <div>
    <div v-for="(row, index) in sortExercises" class="row">
      <div class="col-xs-1 col-md-2">{{index+1}}</div>
      <div v-if="row.exercise" class="col-xs-7 col-md-8">{{row.exercise.description}}</div>
      <div class="col-xs-3 col-md-2" v-if="row.status===1"><i class="fa fa-check" aria-hidden="true"></i></div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
      };
    },
    props: {
      exercises: {
        default: () => [],
        type: Array
      }
    },
    computed: {
      sortExercises: function () {
        if (this.exercises && this.exercises.length > 0) {
          return this.exercises.sort(function (a, b) {
            return a.exercise_order - b.exercise_order;
          })
        }
        else
          return [];
      }
    },
    methods: {}
  }
</script>
<style>
  .el-cascader {
    width: 100% !important;
  }
</style>
