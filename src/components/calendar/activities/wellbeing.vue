<template>
  <div>
    <div v-for="(row, index) in sortWellbeings" class="row">
      <div class="col-xs-1 col-md-2">{{index+1}}</div>
      <div v-if="row.wellBeing" class="col-xs-7 col-md-8">{{row.wellBeing.name}}</div>
      <div class="col-xs-3 col-md-2">{{row.value}}</div>
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
      wellbeings: {
        default: () => [],
        type: Array
      }
    },
    computed: {
      sortWellbeings: function () {
        if (this.wellbeings && this.wellbeings.length > 0) {
          return this.wellbeings.sort(function (a, b) {
            return a.wellbeing_id - b.wellbeing_id;
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
