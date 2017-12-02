<template>
  <div>
    <div v-for="(row, index) in sortMeasurements" class="row">
      <div class="col-xs-1 col-md-2">{{index+1}}</div>
      <div v-if="row.measurement" class="col-xs-7 col-md-8">{{row.measurement.name}}</div>
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
      measurements: {
        default: () => [],
        type: Array
      }
    },
    computed: {
      sortMeasurements: function () {
        if (this.measurements && this.measurements.length > 0) {
          return this.measurements.sort(function (a, b) {
            return a.measurement_id - b.measurement_id;
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
</style>
