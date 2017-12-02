<template>
  <div class="comment-event-form">
    <label class="comment-title">Введите данные</label>
    <div v-for="(row, index) in measurementsListFilled" class="comment-event-form-inner row">
      <div class="number-wrapper col-xs-2 col-md-1">{{index + 1}}</div>
      <div class="col-xs-5 col-md-5">{{row.name}}</div>
      <div class="measure-input-wrapper col-xs-5 col-md-6">
        <el-input class="measure-input" :placeholder="row.unit" v-model="row.value" @change="setMeasurement(row)"></el-input>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    props: {
      measurements: {
        default: () => [],
        type: Array
      }
    },
    components: {},
    computed: {
      ...mapGetters({
        measurementList: 'static/getMeasurements'
      }),

      measurementsListFilled: function () {
        let filled = [];
        this.measurementList.forEach(w => {
          let activ = this.measurements.find(a => a.measurement_id === w.id);
          if (activ) {
            filled.push({
              id: w.id,
              name: w.name,
              unit: w.unit,
              value: activ.value
            })
          }
          else {
            filled.push({id: w.id, name: w.name, value: undefined, unit: w.unit})
          }
        })
        return filled;
      }
    },
    methods: {
      setMeasurement(row) {
        console.log("setWellBeing" + row);
        let activity = this.measurements.find(a => a.measurement_id === row.id);
        if (activity) {
          this.$set(activity, 'value', row.value);
        }
        else {
          this.measurements.push({measurement_id: row.id, value: row.value});
        }
      },
    }
  }
</script>
<style>
.comment-event-form-inner
{
  width: 92%;
  max-width: 570px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.number-wrapper
{
  padding-left: 5px;
}
.measure-input-wrapper
{
  padding-right: 0;
}
.measure-input > input
{
  width: 100% !important; 
}
</style>
