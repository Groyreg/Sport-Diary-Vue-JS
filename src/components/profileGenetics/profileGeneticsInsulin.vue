<template>
	<div class="prof-gen-feeling-full">
		<h4 @click="show = !show" class="pgf-title col-xs-12">Чувствительность тканей к инсулину
			<i class="fa fa-caret-down fa-lg" aria-hidden="true"></i>
		</h4>
		<transition mode="out-in">
		<div class="pgft-wrapper" v-show="show">
			<div class="pgf-descr-common col-xs-12">
				<p class="pgd-text">
					Несмотря на то, что основное действие инсулина заключается в снижении
					концентрации глюкозы в крови, он является одновременно и сильным
					анаболиком, то есть веществом, ускоряющим образование структурных частей
					клеток, тканей, мышечных волокон. В печени и скелетных мышцах анаболическое
					действие инсулина реализуется за счет повышения проницаемости клеточных
					мембран для аминокислот, глюкозы. Инсулин усиливает транскрипционную и
					трансляционную активность многих генов, осуществляет подавление деградации
					мышечных белков. Под влиянием инсулина эффективнее идут процессы
					окисления жирных кислот. Но для достижения такого анаболического эффекта
					необходима адекватная чувствительность тканей на воздействие инсулина. При
					нарушении такой чувствительности развивается инсулинорезистентность,
					приводящая в свою очередь к сахарному диабету 2 типа.
				</p>
				<p class="pgd-text" v-if="data">
					<b>Были исследованы следующие гены</b> (приведено название и возможные
					мутации, названия интерактивны, при клике открывается окно с описанием и
					частотой встречаемости гена)
				</p>
			</div>
			<div class="pgf-table col-xs-12"  v-if="data">
				<div class="pgft-title-main row"><p>Исследованные гены</p></div>
				<div class="pgft-title row">
					<div class="pgft-title-dop"><p>Ген</p></div>
					<div class="pgft-title-dop"><p>Мутация</p></div>
					<div class="pgft-title-dop"><p>Варианты</p></div>
					<div class="pgft-title-dop"><p>Ваш генотип</p></div>
				</div>
				<div class="pgft-data row">
					<div class="pgft-data-item"><p>{{data.name}}</p></div>
					<div class="pgft-data-item"><p>{{data.rs}}</p></div>
					<div class="pgft-data-item"><p>{{data.variant}}</p></div>
					<div class="pgft-data-item"><p>{{data.value}}</p></div>
				</div>
			</div>
			<div class="pgf-descr-variable col-xs-12" v-if="data">
				<p class="pgd-text" v-html="data.description"></p>
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
				show: false,

			}
		},
		computed: {
		    ...mapGetters({
		      userGenotypes: 'diary/getUserGenotypes',
	          genotypes: 'static/getGenotypes',
	          snps: 'static/getSnps'

			}),
		    data : function () {
	            let genotype = this.userGenotypes.find(g=>g.snp_id === 1)
	            if (genotype){
	              let snp = this.snps.find(s=>s.id === genotype.snp_id);
	              let gt = this.genotypes.find(g=>g.id === genotype.genotype_id);
	              return {name:'PPARG', rs:snp.rs, variant:snp.name2, value:gt.value, description: gt.description};
	            }
	            else return undefined;
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
