<template>
	<div class="prof-gen-caffeine">
		<h4 @click="show = !show" class="pgf-title col-xs-12">Способность усваивать кофеин <i class="fa fa-caret-down fa-lg" aria-hidden="true"></i></h4>
		<transition mode="out-in">
		<div class="pgft-wrapper" v-show="show">
			<div class="pgf-descr-common col-xs-12">
				<p class="pgd-text">
					<b>Кофеин</b> – один из самых распространенных стимуляторов в мир, он ускоряет
					пульс, усиливает мочеотделение, сужает кровеносные сосуды. В организме
					кофеин действует на специальные рецепторы, заставляя клетки вырабатывать
					энергию, необходимую для жизнедеятельности.
					Кофеин содержится в листьях и зернах многих растений, и синтезируется ими для
					защиты от насекомых. Его также получают искусственно. Кофеин содержится в
					чае, кофе, шоколаде, многих безалкогольных энергетических и спортивных
					напитках. Также он содержится во многих обезболивающих и других
					безрецептурных препаратах.
					Его используют в повседневной жизни, медицине и спорте.
					Максимальная суточная доза кофеина составляет 1 грамм (1000 мг), разовая 0,4
					грамм (400 мг). При дозировке больше 200 мг кофеин оказывает токсическое
					воздействие на сердечную мышцу. Поэтому следует с осторожностью относится к
					продуктам, содержащим кофеин, и обязательно контролировать количество его
					потребления.
					Максимальное содержание кофеина в крови приходится на 45-60 минут после
					приёма, период полувыведения 5-10 часов.
				</p>
				<p class="pgd-text">
					Как только кофеин попадает в организм, сразу же начитается процесс его метаболизма (превращения с помощью ферментов) в печени. Наиболее активное участие в этом принимает специальный фермент цитохром P450 1A2, который записан в гене CYP1A2. От мутаций в этом гене зависит активность фермента и скорость метаболизма кофеина.
				</p>
				<p class="pgd-text">
					Встречаемость вариантов гена CYP1A2 (AA, AC или CC) в популяции европейцев различна – указана на рисунке.
				</p>
				<p class="pgd-text" v-if="data">
					Мы исследовали ген CYP1A2 (rs762551, 734 A>C)
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
	            let genotype = this.userGenotypes.find(g=>g.snp_id === 8)
	            if (genotype){
	              let snp = this.snps.find(s=>s.id === genotype.snp_id);
	              let gt = this.genotypes.find(g=>g.id === genotype.genotype_id);
	              return {name:'CYP1A2', rs:snp.rs, variant:snp.name2, value:gt.value, description: gt.description};
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
