<template>
	<div class="prof-gen-feeling-full">
		<h4 @click="show = !show" class="pgf-title col-xs-12">Состав мышечных волокон <i class="fa fa-caret-down fa-lg" aria-hidden="true"></i></h4>
		<transition mode="out-in">
		<div class="pgft-wrapper" v-show="show">
			<div class="pgf-descr-common col-xs-12">
				<p class="pgd-text">
					Скелетная мускулатура взрослых людей состоит из трёх (основных) типов
					мышечных волокон:
				</p>
				<ul>
					<li @click="showLi1 = !showLi1">
						<b>Медленные неутомляемые</b> (окислительные мышечные волокна, I тип);
						<transition mode="out-in">
							<p v-show="showLi1" class="pgd-text">
								Медленные мышечные волокна I типа, или медленные окислительные
								волокна – это выносливые (неутомляемые) и легковозбудимые волокна. Они
								характеризуются богатым кровоснабжением, большим количеством митохондрий
								и запасов миоглобина. В среднем у человека до 50% мышечных волокон I типа
								(содержание в различных мышцах отличается). Они легко включаются в работу
								при малейших напряжениях мышц, очень выносливы, но не обладают
								достаточной силой. Чаще всего они используются при поддержании статической
								работы, например, при сохранении позы.
							</p>
						</transition>
					</li>
					<li @click="showLi2 = !showLi2">
						<b>Быстрые неутомляемые</b> (окислительные мышечные волокна, II-а тип);
						<transition mode="out-in">
							<p v-show="showLi2" class="pgd-text">
								Быстрые утомляемые волокна II-б типа (или быстрые гликолитические),
								используют анаэробные процессы энергообразования (гликолиз). Они менее
								возбудимы, включаются при больших нагрузках и обеспечивают быстрые и
								мощные сокращения мышц. Зато эти волокна быстро утомляются. Такие волокна
								составляют порядка 30% мышечной массы тела.
							</p>
						</transition>
					</li>
					<li @click="showLi3 = !showLi3">
						<b>Быстрые утомляемые</b> (гликолитические мышечные волокна, II-б тип).
						<transition mode="out-in">
							<p v-show="showLi3" class="pgd-text">
								Быстрые неутомляемые (окислительные) волокна – это волокна II-а типа, таких волокон порядка 20%.
							</p>
						</transition>
					</li>
				</ul>
				<p class="pgd-text">
					В зависимости от вида спорта для успешных спортсменов характерно
					различное содержание быстрых и медленных мышечных волокон. У бегунов
					(основное качество – выносливость) содержание мышечных волокон I и IIa типов
					выше, чем в группах контроля и тяжелоатлетов. Различное соотношение
					медленных (I типа) и быстрых (II-а и II-б) мышечных волокон характерно для
					разных мышц.
				</p>
				<p class="pgd-text">
					При этом состав мышечных волокон в одной и той же мышце имеет
					огромные индивидуальные различия, зависящие от врождённых (генетических)
					особенностей человека. Количество быстрых волокон варьируется:
				</p>
				<ul>
					<li>латеральная головка четырёхглавой мышцы бедра – 24-85%;</li>
					<li>камбаловидная мышца – 44-95%;</li>
					<li>икроножная мышца – 16-85%.</li>
				</ul>
				<p class="pgd-text">
					Отмечены половые различия: в латеральной головке четырёхглавой
					мышцы бедра количество медленных волокон у мужчин колеблется от 20 до 80%,
					а у женщин – от 30 до 75%2.
				</p>
				<p class="pgd-text">
					В процессе спортивной тренировки характерный для каждого организма
					состав мышечных волокон изменяется незначительно. Возможно нарастание
					толщины (гипертрофия) отдельных волокон, а также изменение свойств
					промежуточных волокон. Однако доля таких волокон минимальна (по разным
					данным 5-15%).
				</p>
				<p class="pgd-text">
					В связи с характерной для человека относительной стабильностью состава
					мышечных волокон и связи этого показателя со многими генетическими
					признаками он может служить надёжным признаком предрасположенности к
					занятиям «силовыми» или «выносливыми» видами спорта.
				</p>
				<p class="pgd-text"  v-if="data">
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
				<div class="pgft-data row" v-for="row in data">
					<div class="pgft-data-item"><p>{{row.name}}</p></div>
					<div class="pgft-data-item"><p>{{row.rs}}</p></div>
					<div class="pgft-data-item"><p>{{row.variant}}</p></div>
					<div class="pgft-data-item"><p>{{row.value}}</p></div>
				</div>
			</div>
			<div class="pgf-descr-common col-xs-12">
				<p class="pgd-text">
					Указанные гены экспрессируются в мышечных клетках и на разных этапах
					участвуют в мышечной дифференцировке (влияют на соотношение быстрых и
					медленных мышечных волокон), а также мышечном метаболизме.
				</p>
			</div>
			<div class="pgf-descr-variable col-xs-12 row" v-if="text">
				<p>{{text}}</p>
			</div>
			<div class="pgf-descr-common col-xs-12">
				<p class="pgd-text">
					Здесь следует понимать, что речь идёт о составе мышечной массы в
					среднем по всему организму. В некоторых мышцах будут преобладать медленные
					или быстрые волокна, как описано выше, но при наличии различных
					предрасположенностей их соотношение будет меняться в ту или другую сторону.
				</p>
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
				showLi1: false,
				showLi2: false,
				showLi3: false
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
        let genotype1 = this.userGenotypes.find(g=>g.snp_id === 10);
        let genotype2 = this.userGenotypes.find(g=>g.snp_id === 12);
        let genotype3 = this.userGenotypes.find(g=>g.snp_id === 13);
        let genotype4 = this.userGenotypes.find(g=>g.snp_id === 16);
        if (genotype1&&genotype2&&genotype3&&genotype4){
          let snp1 = this.snps.find(s=>s.id === genotype1.snp_id);
          let gt1 = this.genotypes.find(g=>g.id === genotype1.genotype_id);
          let snp2 = this.snps.find(s=>s.id === genotype2.snp_id);
          let gt2 = this.genotypes.find(g=>g.id === genotype2.genotype_id);
          let snp3 = this.snps.find(s=>s.id === genotype3.snp_id);
          let gt3 = this.genotypes.find(g=>g.id === genotype3.genotype_id);
          let snp4 = this.snps.find(s=>s.id === genotype4.snp_id);
          let gt4 = this.genotypes.find(g=>g.id === genotype4.genotype_id);
          return [{name:'ACTN3', rs:snp1.rs, variant:snp1.name2, value:gt1.value, description: gt1.description},
            {name:'PPARA', rs:snp2.rs, variant:snp2.name2, value:gt2.value, description: gt2.description},
            {name:'HIF1A', rs:snp3.rs, variant:snp3.name2, value:gt3.value, description: gt3.description},
            {name:'PPARGC1A', rs:snp4.rs, variant:snp4.name2, value:gt4.value, description: gt4.description}];
        }
        else return undefined;
      },
      text : function () {
        if (this.points){
          if (this.points.fiber>4){
            return "Для Вас характерна предрасположенность к повышенному содержанию медленных мышечных волокон в скелетных мышцах. Это означает, что вам больше подходят виды спорта на выносливость.";
          }
          else if (this.points.fiber===4){
            return "Для Вас характерна предрасположенность к равному соотношение мышечных волокон в скелетных мышцах. Вы одинаково хорошо себя будете чувствовать в видах спорта на выносливость и силу.";
          }
          else {
            return "Для Вас характерна предрасположенность к повышенному содержанию быстрых мышечных волокон в скелетных мышцах. Вам больше подходят силовые виды спорта."
          }
        }
        return undefined;
      }
    }
	}
</script>
<style>
	.pgf-descr-common
	{
		margin: 0;
		padding: 0;
	}
	.pgf-table
	{
		margin-top: 15px;
		margin-bottom: 15px;
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
	}
</style>
