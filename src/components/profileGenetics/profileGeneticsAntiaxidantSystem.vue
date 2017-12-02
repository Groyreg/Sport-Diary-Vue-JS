<template>
	<div class="prof-gen-antiaxidant">
		<h4 @click="show = !show" class="pgf-title col-xs-12">Антиоксидантная система <i class="fa fa-caret-down fa-lg" aria-hidden="true"></i></h4>
		<transition mode="out-in">
		<div class="pgft-wrapper" v-show="show">
			<div class="pgf-descr-common col-xs-12">
				<p class="pgd-text">
					<b>Активные формы кислорода</b> (супероксид-анион, перекись водорода,
					гидроксильный радикал) участвуют в окислении липопротеинов низкой плотности
					(важная стадия в процессе усвоения жиров), поэтому всегда присутствуют в
					организме. Этот процесс протекает в митохондриях – энергетических станциях
					клеток.
					Избыток таких соединений наносит вред организму. Специальный фермент
					(супероксиддисмутаза-2) способствует превращению супероксид-аниона в
					кислород и перекись водорода и оказывает антиоксидантное действие. При
					нарушении баланса системы и повышении уровня оксидантов, возникает
					окислительный стресс (в первую очередь они негативно действуют на сосуды).
					Физические нагрузки, потребление избыточного количества жирной пищи
					приводит к увеличению уровня свободных радикалов.
				</p>
				<p class="pgd-text">
					Ген SOD2 кодирует фермент супероксиддистутазу-2. У носителей генотипа SOD2 (TT) может накапливаться супероксид и приводить к гибели митохондрий, разрушению мышечных волокон. Носителям такого полиморфизма рекомендуется обязательно потреблять пищу, богатую антиоксидантами, а также принимать антиоксиданты в качестве БАД (только по рекомендации врача). Особенно важно потребление антиоксидантов для уменьшения степени повреждения мышц и печени во время физических нагрузок.
				</p>
				<p class="pgd-text">
					Встречаемость вариантов гена SOD2 (AA, AG или GG) в популяции европейцев различна – указана на рисунке.
				</p>
				<p class="pgd-text" v-if="data">
					Мы исследовали ген SOD2 (rs4880, 47A>G, Val16Ala)
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
				<p v-if="data" class="pgd-text" v-html="data.description"></p>
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
	            let genotype = this.userGenotypes.find(g=>g.snp_id === 9)
	            if (genotype){
	              let snp = this.snps.find(s=>s.id === genotype.snp_id);
	              let gt = this.genotypes.find(g=>g.id === genotype.genotype_id);
	              return {name:'SOD2', rs:snp.rs, variant:snp.name2, value:gt.value, description: gt.description};
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
