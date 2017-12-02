<template>
  <vue-chart type="horizontalBar" :data="data" :options="options"></vue-chart>
</template>
<script>

  import VueChart from 'vue-chart-js'

  export default {
    props: ['data'],
    data() {
      return {
        options: {

        }
      }
    },
    components:
      {
        VueChart
      }
  }
</script>
