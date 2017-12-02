<template>
	<div class="prof-gen-feeling-full">
		<h4 @click="show = !show" class="pgf-title col-xs-12">Аэробный / анаэробный способ обеспечения мышечной работы, скоростно-силовые показатели
			<i class="fa fa-caret-down fa-lg" aria-hidden="true"></i>
		</h4>
		<transition mode="out-in">
		<div class="pgft-wrapper" v-show="show">
			<div class="pgf-descr-common col-xs-12">
				<p class="pgd-text">
					Способность эффективно утилизировать глюкозу значительно влияет на
					спортивные качества индивидуума. Повышенные способности к анаэробному
					гликолизу являются благоприятными для развития и проявления скоростно-
					силовых качеств, характеризующихся взрывной, короткой по времени и очень
					интенсивной физической деятельностью. Напротив, способность окислять жирные
					кислоты благоприятна для выносливости.
				</p>
				<p class="pgd-text" v-if="data">
					<b>Были исследованы следующие гены</b> (приведено название и возможные
					мутации, названия интерактивны, при клике открывается окно с описанием и
					частотой встречаемости гена)
				</p>
			</div>
			<div class="pgf-table col-xs-12" v-if="data">
				<div class="pgft-title-main row"><p>Исследованные гены</p></div>
				<div class="pgft-title row">
					<div class="pgft-title-dop"><p>Ген</p></div>
					<div class="pgft-title-dop"><p>Мутация</p></div>
					<div class="pgft-title-dop"><p>Варианты</p></div>
					<div class="pgft-title-dop"><p>Ваш генотип</p></div>
				</div>
        <div class="pgft-data row" v-for="row in data">
          <div class="pgft-data-item"><p>{{row.name}}</p></div>
          <div class="pgft-data-item"><p>{{row.rs}}</p></div>
          <div class="pgft-data-item"><p>{{row.variant}}</p></div>
          <div class="pgft-data-item"><p>{{row.value}}</p></div>
        </div>
			</div>
			<div class="pgf-descr-variable col-xs-12 row" v-if="text">
				<p>{{text}}</p>
			</div>
		</div>
		</transition>
	</div>
</template>
<script>
  import {mapGetters} from 'vuex'
	export default {
		data(){
			return{
				show: false
			}
		},
    computed: {
      ...mapGetters({
        userGenotypes: 'diary/getUserGenotypes',
        genotypes: 'static/getGenotypes',
        snps: 'static/getSnps',
        points: 'diary/getSportPoints'

      }),
      data : function () {
        let genotype1 = this.userGenotypes.find(g=>g.snp_id === 2);
        let genotype2 = this.userGenotypes.find(g=>g.snp_id === 12);
        if (genotype1&&genotype2){
          let snp1 = this.snps.find(s=>s.id === genotype1.snp_id);
          let gt1 = this.genotypes.find(g=>g.id === genotype1.genotype_id);
          let snp2 = this.snps.find(s=>s.id === genotype2.snp_id);
          let gt2 = this.genotypes.find(g=>g.id === genotype2.genotype_id);
          return [{name:'ADRB2', rs:snp1.rs, variant:snp1.name2, value:gt1.value, description: gt1.description},
            {name:'PPARA', rs:snp2.rs, variant:snp2.name2, value:gt2.value, description: gt2.description}];
        }
        else return undefined;
      },
      text : function () {
        if (this.points){
          if (this.points.glucose>2){
            return "При таком генотипе гликолитический (анаэробный) способ получения энергии за счет расщепления глюкозы является более эффективным, чем окислительный (аэробный), основанный на окислении жирных кислот. Наличие таких генетических особенностей способствует развитию скоростно-силовых качеств.";
          }
          else if (this.points.glucose===2){
            return "При таком генотипе гликолитический (анаэробный) способ получения энергии за счет расщепления глюкозы и окислительный (аэробный), основанный на окислении жирных кислот, протекают в равной степени эффективно. Вы в равной степени можете развивать скоростно-силовые качетсва и выносливость."
           }
          else {
            return "При таком генотипе окислительный (аэробный) способ получения энергии, основанный на окислении жирных кислот, преобладает над гликолитическим (анаэробный) способ получения энергии за счет расщепления глюкозы. Данная особенность может способствовать развитию выносливости."
          }
        }
        return undefined;
      }
    }
	}
</script>
<style>
/*	.pgf-descr-common
	{
		margin: 0;
		padding: 0;
	}
	.pgf-title
	{
		padding-bottom: 10px;
		border-bottom: 2px solid #4BBCFF;
		cursor: pointer;
	}
	.pgft-title-main,
	.pgft-title-dop,
	.pgft-data-item
	{
		background-color: #4BBCFF;
		color: #fff;
		font-weight: 600;
		min-height: 40px;
		border: 2px solid silver;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.pgft-title-main > p,
	.pgft-title-dop > p,
	.pgft-data-item > p
	{
		margin: 0;
		padding: 0;
	}
	.pgft-title,
	.pgft-data
	{
		display: flex;
		flex-direction: row;
	}
	.pgft-title-dop,
	.pgft-data-item
	{
		width: 25%;
		border-top: none;
		border-right: none;
	}
	.pgft-title-dop:last-child,
	.pgft-data-item:last-child

	{
		border-right: 2px solid silver;
	}
	.pgft-data-item
	{
		background-color: #fff;
		color: #000;
	}
	.pgf-descr-variable
	{
		margin-top: 30px;
	}
	.v-enter-active, .v-leave-active
	{
	  transition: opacity 1s
	}
	.v-enter, .v-leave-to {
	  opacity: 0
	}*/
</style>
