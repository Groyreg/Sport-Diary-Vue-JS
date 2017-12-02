<template>
	<div class="prof-gen-folic-acid">
		<h4 @click="show = !show" class="pgf-title col-xs-12">Уровень фолиевой кислоты <i class="fa fa-caret-down fa-lg" aria-hidden="true"></i></h4>
		<transition mode="out-in">
		<div class="pgft-wrapper" v-show="show">
			<div class="pgf-descr-common col-xs-12">
				<p class="pgd-text">
					<b>Фолиевая кислота</b> участвует в процессах превращения гомоцистеина в метионин
					и далее в S–аденозилметионин. Последнее вещество участвует в процессах
					метилирования ДНК (метилирование ДНК – один из ключевых процессов,
					регулирующих активность генов в организме человека).
					В первую очередь от нехватки фолиевой кислоты страдает костный мозг, в
					котором происходит активное деление клеток. Особенно фолиевая кислота
					необходима беременным женщинам на ранних сроках беременности и мужчинам
					для нормальной выработки сперматозоидов.
				</p>
				<p class="pgd-text">
					Ген MTHFR кодирует фермент, который играет ключевую роль в метаболизме фолиевой кислоты. Дефицит фермента приводит к нарушению регуляции активности генов, накоплению гомоцистеина в плазме крови и его отложению в стенках сосудов. Это увеличивает риск развития сердечно-сосудистых заболеваний, онкологии.
					У лиц с генотипом TT отмечается снижение активности фермента MTHFR (до 35% от среднего значения), для генотипа CT снижение активности характерно в меньшей степени.
					Известно, что в случае генотипа TT повышенное содержание витамина B2 в рационе питания приводит к снижению гомоцистеина в плазме крови. В случае генотипа CC корреляции не выявлено.
				</p>
				<p class="pgd-text">
					Встречаемость вариантов гена MTHFR (CC, CT, TT) в популяции европейцев различна - отражена на рисунке.
				</p>
				<p class="pgd-text" v-if="data">
					Мы исследовали ген MTHFR (rs1801133, c.677C>T, Ala222Val)
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
	            let genotype = this.userGenotypes.find(g=>g.snp_id === 6)
	            if (genotype){
	              let snp = this.snps.find(s=>s.id === genotype.snp_id);
	              let gt = this.genotypes.find(g=>g.id === genotype.genotype_id);
	              return {name:'MTHFR', rs:snp.rs, variant:snp.name2, value:gt.value, description: gt.description};
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
