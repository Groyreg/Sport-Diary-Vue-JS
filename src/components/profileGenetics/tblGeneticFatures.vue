<template>
	<div class="tbl-genetic-features col-xs-12">
		<div class="tgf-title-left">
			<div class="tgf-title-item">Физическое качество</div>
			<div class="tgf-title-item"></div>
			<div class="tgf-title-item">Выносливость</div>
			<div class="tgf-title-item">Быстрота</div>
			<div class="tgf-title-item">Сила</div>
		</div>
		<div class="tgf-title-right">
			<div class="tgf-title-item-right">Ваши геннетические особенности (в баллах)</div>
			<div class="tgf-data-wrapper">
				<div class="tgf-data-wrapper-left">
					<div class="part-one">
            <div class="tgf-data-item">Ваши баллы</div>
						<div class="tgf-data-item">{{sportpoints.endurance}}</div>
						<div class="tgf-data-item">{{sportpoints.speed}}</div>
						<div class="tgf-data-item">{{sportpoints.strength}}</div>
					</div>
					<div class="part-two">
						<div class="tgf-data-item">В среднем по популяции</div>
						<div class="tgf-data-item">50,0-56,3</div>
						<div class="tgf-data-item">42,9-49,9</div>
						<div class="tgf-data-item">40,0-49,9</div>
					</div>
					<div class="part-three">
						<div class="tgf-data-item">В среднем среди спортсменов</div>
						<div class="tgf-data-item">75-100 (стайеры)</div>
						<div class="tgf-data-item">71,4-100 (спринтеры)</div>
						<div class="tgf-data-item">65-100 (тяжелоатлеты)</div>
					</div>
					<!--<div class="part-four">-->
						<!--<div class="tgf-data-item"></div>-->
						<!--<div class="tgf-data-item"></div>-->
						<!--<div class="tgf-data-item"></div>-->
						<!--<div class="tgf-data-item"></div>-->
					<!--</div>-->

				</div>
				<div class="tgf-data-wrapper-right">
					<!-- <div class="tgf-data-item"></div>
					<div class="tgf-data-item"></div>
					<div class="tgf-data-item"></div>
					<div class="tgf-data-item"></div> -->
				</div>
			</div>
		</div>
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
        sportpoints: 'diary/getSportPoints'
      })
    }
  }
</script>
<style>
	.tbl-genetic-features
	{
		display: flex;
		flex-direction: row;
	}
	.tgf-title-left
	{
		display: flex;
		flex-direction: column;
	}
	.tgf-title-right
	{
		width: 100%;
	}
	.tgf-data-wrapper
	{
		display: flex;
		flex-direction: row;
	}
	.tgf-data-wrapper-left,
	.tgf-data-wrapper-right
	{
		width: 50%;
		display: flex;
		flex-direction: row;
	}
	.tgf-title-item,
	.tgf-title-item-right,
	.tgf-data-item
	{
		font-weight: 600;
		min-height: 40px;
		width: 200px;
		max-width: 200px;
		border: 2px solid silver;
		border-top: none;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tgf-title-item-right
	{
		max-width: 100%;
		width: 100%;
		border-left: none;
	}
	.tgf-title-item:first-child,
	.tgf-title-item-right
	{
		background-color: #4BBCFF;
		color: #fff;
		border-top: 2px solid silver;
	}
	.tgf-data-item
	{
		width: 100px;
	}
</style>
