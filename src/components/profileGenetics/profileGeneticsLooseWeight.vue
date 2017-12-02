<template id="looseWeight">
	<div class="prof-gen-loose-weight">
		<span class="pgd-descr-0 descr-all col-xs-12" v-if="looseWeight">
			Основой всех диет является баланс трёх основных веществ: углеводов, белков и жиров. Какой бы не была выбранная вами диета, все три компонента необходимы вашему организму.
    </span>
    <figure class="pgd-chart col-xs-12 col-md-8 col-lg-6">
			<diet-chart :data="chartdata" ></diet-chart>
		</figure>
		<span class="pgd-descr-1 descr-all col-xs-12 col-md-4 col-lg-6">
			{{looseWeight.dietDescr1}}
		</span>
		<span class="pgd-descr-2 descr-all col-xs-12">
			{{looseWeight.dietDescr2}}
		</span>
		<h4 class="pgd-title col-xs-12">
			<span class="pgd-descr-3 descr-all">
				{{looseWeight.dietDescr3}}
			</span>
		</h4>
		<span class="pgd-descr-4 descr-all col-xs-12">
			{{looseWeight.dietDescr4}}
		</span>
		<span class="pgd-descr-5 descr-all col-xs-12">
			{{looseWeight.dietDescr5}}
		</span>
	</div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import DietChart from './../DietChart.vue'
  export default {
    data () {
      return {
        chartdata: {
          labels: [],
          datasets: [
            {
              label: 'default',
              backgroundColor:  [
                '#177ef8',
                '#07f816',
                '#f80b1f'
              ],
              data: []
            }
          ]
        }
      }
    },
    computed: {
      ...mapGetters({
        looseWeight: 'diary/getUserLooseWeight'
      })
    },
    components:
      {
        DietChart
      },

    methods: {

    },
    watch:{
      looseWeight:function(){
        this.chartdata.labels = ["углеводы", "белки", "жиры"];
        this.chartdata.datasets[0].data = [this.looseWeight.carb, this.looseWeight.protein, this.looseWeight.fat];
      }
    },
    mounted: function () {
     if (this.looseWeight){
       this.chartdata.labels = ["углеводы", "белки", "жиры"];
       this.chartdata.datasets[0].data = [this.looseWeight.carb, this.looseWeight.protein, this.looseWeight.fat];
     }
    }
  }
</script>
<style>

</style>
