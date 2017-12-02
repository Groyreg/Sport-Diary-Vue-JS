<template>
  <div class="genetics-diet">
    <div class="row">
      <h1 class="sdv-title">Генетика / Питание</h1>
      <profile-nav></profile-nav>
      <div class="prof-pref-nav col-xs-12 col-sm-8 col-md-9 col-lg-9">

      </div>
      <div class="prof-genetics-diet-data col-xs-12 col-sm-8 col-md-9 col-lg-9">
        <div id="geninfo" class="modal fade">
          <div class="modal-dialog">
            <div class="modal-content">
              <!-- Заголовок модального окна -->
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">Информация о гене</h4>
              </div>
              <!-- Основное содержимое модального окна -->
              <div class="modal-body row">
                <div class="gen-chart col-xs-12">
                  <figure class="gen-chart">
                    <vue-chart type="doughnut" :data="chartgendata"></vue-chart>
                  </figure>
                  <figcaption class="gen-chart-title">{{currentGen.name}}</figcaption>
                </div>
                <div class="gen-desc col-xs-12">{{currentGen.description_ru}}</div>
              </div>
              <!-- Футер модального окна -->
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
              </div>
            </div>
          </div>
        </div>
        <h4 class="pgd-title-main col-xs-12">Особенности питания</h4>
        <p class="pgd-text col-xs-12">
          В ходе данного исследования в образце ДНК проводится анализ 16
          полиморфизмов (изменчивых участков ДНК), они незначительно меняют
          функции белков. Белки отвечают за всё в нашем организме, изменение их
          функций ведёт к изменению некоторых функций нашего организма.
          Были исследованы следующие гены (приведено название и возможные
          мутации, названия интерактивны, при клике открывается окно с описанием и
          частотой встречаемости гена)3
        </p>
        <div class="prof-genetics-data">
          <div>
            <button v-if="editTable" class=" btn-gt btn btn-primary" @click="save()">Сохранить</button>
            <button v-if="editTable" class=" btn-gt btn btn-primary" @click="resetForm()">Отмена</button>
            <button v-if="!editTable" class=" btn-gt btn btn-primary" @click="editTable=true">Редактировать</button>
          </div>
          <div v-if="!editTable" class="table-content col-xs-12 col-sm-8 col-md-7 col-lg-6">
            <div class="tbl-row row">
              <div class="gen-name gn-title col-xs-4 col-sm-4 col-md-4"><h5>Ген</h5></div>
              <div class="snp-var-data-container col-xs-8 col-sm-8 col-md-8">
                <div class="snp-var-data-content row">
                  <div class="snp-data sd-title col-xs-6 col-sm-6 col-md-6"><h5>RS</h5></div>
                  <div class="var-data vd-title col-xs-6 col-sm-6 col-md-6"><h5>Генотип</h5></div>
                </div>
              </div>
            </div>
            <div v-for="gene in filteredGenes" class="tbl-row row">
              <div class="gen-name col-xs-4 col-sm-4 col-md-4">
                <a @click="chosenGen(gene, chartgendata)" href="#geninfo" data-toggle="modal" class="gen-btn">
                  {{gene.name}}
                </a>
              </div>
              <div class="snp-var-data-container col-xs-8 col-sm-8 col-md-8">
                <div v-for="snp in gene.snps" class="snp-var-data-content row">
                  <div class="snp-data col-xs-6 col-sm-6 col-md-6">{{snp.rs}}</div>
                  <div class="var-data col-xs-6 col-sm-6 col-md-6">
                    <div v-if="snp.chosenOption">{{renderChoosenOption(snp.chosenOption, snp.genotypes)}}
                    </div>
                    <div v-else>
                      <el-tooltip class="item" effect="light"
                                  content="Для проведения анализа необходимо указать Ваш генотип" placement="bottom">
                        <i class="fa fa-minus-circle fa-lg var-data-icon" aria-hidden="true"></i>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tbl-row last row">
              <div class="gen-name last col-xs-3 col-md-3"></div>
              <div class="snp-var-data-container last col-xs-9 col-md-9">
                <div class="snp-var-data-content last row">
                  <div class="snp-data last col-xs-3 col-md-3"></div>
                  <div class="var-data last col-xs-2 col-md-2"></div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="editTable" class="table-content col-xs-12 col-md-10">
            <div class="tbl-row row">
              <div class="gen-name gn-title col-xs-3 col-md-3"><h5>Ген</h5></div>
              <div class="snp-var-data-container col-xs-9 col-md-9">
                <div class="snp-var-data-content row">
                  <div class="snp-data sd-title col-xs-3 col-md-3"><h5>RS</h5></div>
                  <div class="var-data vd-title col-xs-9 col-md-9"><h5>Генотипы</h5></div>
                </div>
              </div>
            </div>
            <div v-for="gene in filteredGenes" class="tbl-row row">
              <div class="gen-name col-xs-3 col-md-3">
                <a @click="chosenGen(gene, chartgendata)" href="#geninfo" data-toggle="modal" class="gen-btn">
                  {{gene.name}}
                </a>
              </div>
              <div class="snp-var-data-container col-xs-9 col-md-9">
                <div v-for="snp in gene.snps" class="snp-var-data-content row">
                  <div class="snp-data col-xs-3 col-md-3">{{snp.rs}}</div>
                  <div v-for="variant in orderGenotypes(snp.genotypes)" class="var-data col-xs-2 col-md-2">
                    <el-radio v-model="snp.chosenOption" :label="variant.id">{{variant.value}}</el-radio>
                  </div>
                  <button @click="resetFormInRow(snp)" class="gtd-var-btn-clear gtm-var-btn-clear close col-md-3" type="button" aria-hidden="true">×
                  </button>
                </div>
              </div>
            </div>
            <div class="tbl-row last row">
              <div class="gen-name last col-xs-3 col-md-3"></div>
              <div class="snp-var-data-container last col-xs-9 col-md-9">
                <div class="snp-var-data-content last row">
                  <div class="snp-data last col-xs-3 col-md-3"></div>
                  <div class="var-data last col-xs-2 col-md-2"></div>
                  <div class="result-data last col-xs-3 col-md-3"></div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!editTable" class="gen-table-mob col-xs-12">
            <div class="tbl-row row">
              <div class="gen-name gn-title col-xs-4 col-sm-4 col-md-4"><h5>Ген</h5></div>
              <div class="snp-var-data-container col-xs-8 col-sm-8 col-md-8">
                <div class="snp-var-data-content row">
                  <div class="snp-data sd-title col-xs-6 col-sm-6 col-md-6"><h5>RS</h5></div>
                  <div class="var-data vd-title col-xs-6 col-sm-6 col-md-6"><h5>Генотип</h5></div>
                </div>
              </div>
            </div>
            <div v-for="gene in filteredGenes" class="tbl-row row">
              <div class="gen-name col-xs-4 col-sm-4 col-md-4">
                <a @click="chosenGen(gene, chartgendata)" href="#geninfo" data-toggle="modal" class="gen-btn">
                  {{gene.name}}
                </a>
              </div>
              <div class="snp-var-data-container col-xs-8 col-sm-8 col-md-8">
                <div v-for="snp in gene.snps" class="snp-var-data-content row">
                  <div class="snp-data col-xs-6 col-sm-6 col-md-6">{{snp.rs}}</div>
                  <div class="var-data col-xs-6 col-sm-6 col-md-6">
                    <div v-if="snp.chosenOption">{{renderChoosenOption(snp.chosenOption, snp.genotypes)}}
                    </div>
                    <div v-else>
                      <el-tooltip class="item" effect="light"
                                  content="Для проведения анализа необходимо указать Ваш генотип" placement="bottom">
                        <i class="fa fa-minus-circle fa-lg var-data-icon" aria-hidden="true"></i>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tbl-row last row">
              <div class="gen-name last col-xs-3 col-md-3"></div>
              <div class="snp-var-data-container last col-xs-9 col-md-9">
                <div class="snp-var-data-content last row">
                  <div class="snp-data last col-xs-3 col-md-3"></div>
                  <div class="var-data last col-xs-2 col-md-2"></div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="editTable" class="gen-table-mob col-xs-12">
            <div v-for="gene in filteredGenes" class="wrapper">
              <div class="gtm-top-part row">
                <div class="gtm-title-wrapper">
                  <div class="gtm-gen-title"><span class="vert-align">Ген</span></div>
                </div>
                <div class="gtm-gen-data">
									<span class="vert-align">
										<a @click="chosenGen(gene, chartgendata)" href="#geninfo" data-toggle="modal"
                       class="gen-btn">{{gene.name}}</a>
									</span>
                </div>
              </div>
              <div v-for="snp in gene.snps" class="gtm-bottom-part row">
                <div class="gtm-title-wrapper">
                  <div class="gtm-snp-title"><span class="vert-align">RS</span></div>
                </div>
                <div class="gtm-snp-data"><span class="vert-align">{{snp.rs}}</span></div>
                <div class="gtm-title-wrapper">
                  <div class="gtm-var-title"><span class="vert-align">Тип</span></div>
                </div>
                <div class="gtm-var-data">
									<span v-for="variant in orderGenotypes(snp.genotypes)" class="gtm-var-in vert-align">
										<el-radio v-model="snp.chosenOption" :label="variant.id">{{variant.value}}</el-radio>
									</span>
                  <button @click="resetFormInRow(snp)" class="gtm-var-btn-clear close" type="button" aria-hidden="true">×</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <profGenLooseWeight></profGenLooseWeight>
        <profGenFeelingFull></profGenFeelingFull>
        <profGenAntiaxidantSystem></profGenAntiaxidantSystem>
        <profGenLevelOfFolicAcid></profGenLevelOfFolicAcid>
        <profGenEffectivenessCalciumAbsorption></profGenEffectivenessCalciumAbsorption>
        <profGenAbilityAbsotrbCaffeine></profGenAbilityAbsotrbCaffeine>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import VueChart from 'vue-chart-js'
  import profileNav from './../profileNav.vue'
  import profGenLooseWeight from './profileGeneticsLooseWeight.vue'
  import profGenFeelingFull from './profileGeneticsFeelingFull.vue'
  import profGenAntiaxidantSystem from './profileGeneticsAntiaxidantSystem.vue'
  import profGenLevelOfFolicAcid from './profileGeneticsLevelOfFolicAcid.vue'
  import profGenEffectivenessCalciumAbsorption from './profileGeneticsEffectivenessCalciumAbsorption.vue'
  import profGenAbilityAbsotrbCaffeine from './profileGeneticsAbilityAbsorbCaffeine.vue'


  export default {
    data() {
      return {
        editTable: false,
			  resultGenes: Object.assign([], this.$store.state.static.genes),
        currentGen: {},
        chartgendata: {
          labels: [],
          datasets: [
            {
              label: 'default',
              backgroundColor: [
                '#f97c7c',
                '#4eb258',
                '#64c3ef'
              ],
              data: []
            }
          ]
        }
      }
    },
    components: {
      profileNav,
      VueChart,
      profGenLooseWeight,
      profGenFeelingFull,
      profGenAntiaxidantSystem,
      profGenLevelOfFolicAcid,
      profGenEffectivenessCalciumAbsorption,
      profGenAbilityAbsotrbCaffeine
    },
    computed: {
      ...mapGetters({
        userGenotypes: 'diary/getUserGenotypes'
      }),
      filteredGenes: function () {
        return this.resultGenes.filter(function (elem) {
          return elem.snps.every(n => n.snpgroup.some(m => m.group_id === 1));
        });
      }

    },
    methods: {
      renderChoosenOption(option, genotypes) {
        return genotypes.find(s => s.id === option).value;
      },
      chosenGen(gene, chartgendata) {
        this.currentGen = gene;
        this.chartgendata.labels = [];
        this.chartgendata.datasets[0].data = [];
        $.each(this.currentGen.snps[0].genotypes, function (key, value) {

          chartgendata.labels.push(value.value);
          chartgendata.datasets[0].data.push(value.frequency);


        });
      },
      orderGenotypes(variants) {
        return this._.orderBy(variants, 'value')
      },
      getUserGenotypeForSnp(snp) {
        for (var i = 0, iLen = Object.keys(this.localUserGenotypes).length; i < iLen; i++) {
          if (this.localUserGenotypes[i].snp_id === snp.id) return this.localUserGenotypes[i].genotype_id;
        }
      },
      setChosen() {
        for (var i = 0, iLen = Object.keys(this.userGenotypes).length; i < iLen; i++) {
          for (var j = 0, jLen = Object.keys(this.resultGenes).length; j < jLen; j++) {
            for (var s = 0, sLen = Object.keys(this.resultGenes[j].snps).length; s < sLen; s++) {
              if (this.userGenotypes[i].snp_id === this.resultGenes[j].snps[s].id) {
                for (var g = 0, gLen = Object.keys(this.resultGenes[j].snps[s].genotypes).length; g < gLen; g++) {
                  this.$set(this.resultGenes[j].snps[s], 'chosenOption', this.userGenotypes[i].genotype_id);
                }
              }
            }
          }
        }
      },
      resetForm() {
        for (var j = 0, jLen = Object.keys(this.resultGenes).length; j < jLen; j++) {
          for (var s = 0, sLen = Object.keys(this.resultGenes[j].snps).length; s < sLen; s++) {
            for (var g = 0, gLen = Object.keys(this.resultGenes[j].snps[s].genotypes).length; g < gLen; g++) {
              this.$set(this.resultGenes[j].snps[s], 'chosenOption', undefined);
            }
          }
        }
        this.setChosen();
        this.editTable = false;
      },
      resetFormInRow(val){
        this.$set(val, 'chosenOption', undefined );
      },
      save() {
        this.chosenGenotypes = [];
        for (var j = 0, jLen = Object.keys(this.resultGenes).length; j < jLen; j++) {
          for (var s = 0, sLen = Object.keys(this.resultGenes[j].snps).length; s < sLen; s++) {
            if (this.resultGenes[j].snps[s].chosenOption) {
              this.chosenGenotypes.push({
                snp_id: this.resultGenes[j].snps[s].id,
                genotype_id: this.resultGenes[j].snps[s].chosenOption
              })
            }
          }
        }
        this.$store.dispatch('diary/UPDATE_GENOTYPES', this.chosenGenotypes);
        this.editTable = false;
      }
    },
    mounted: function () {
      this.setChosen();
      $(document).on('click', '.gen-btn', function () {
        $("#geninfo").modal('show');
      });
    }
  }
</script>
<style>
  .prof-genetics-diet-data
  {
    max-width: 1050px;
  }
  .sdv-title
  {
    width: 96%;
    margin-left: 30px;
    font-size: 25px;
    font-weight: 700;
    padding-bottom: 10px;
    border-bottom: 2px solid #4BBCFF;
  }
  .btn-gt
  {
    padding: 6px 30px;
    margin-bottom: 20px;
  }
  .prof-goalsgenetics-diet-data,
  .pgd-title-main {
    margin-top: 27px;
  }
  .pgd-text
  {
    margin: 0;
    padding: 0;
    text-align: justify;

  }
  .pgd-title-main,
  .pgd-title-table {
    margin-left: 0;
    padding-left: 0;
  }

  .pgd-title,
  .pgd-table,
  .pgd-chart,
  .descr-all {
    margin: 0;
    padding: 0;

    margin-top: 15px;
    text-align: justify;
  }


  .gen-name-title {
    border-top: 2px solid #e8e9ea;
  }

  .gen-name, .snp-var-data-container {
    border-top: 2px solid #e8e9ea;

  }

  .tbl-row > .gen-name:last-of-type {
    border-bottom: 2px solid #e8e9ea;
  }

  .result-data {
    border-left: 2px solid #e8e9ea;

  }

  .snp-title, .var-title, .result-title {
    border-right: 2px solid #e8e9ea;
    min-height: 40px;
  }

  .tbl-row {
    border-left: 2px solid #e8e9ea;
  }

  .snp-var-data-content {
    border-top: 2px solid #e8e9ea;
    border-left: 2px solid #e8e9ea;
  }

  .snp-var-data-content:first-child {
    border-top: none;

  }

  .snp-data {
    border-right: 2px solid #e8e9ea;
  }

  .var-data {
    border-right: 2px solid #e8e9ea;
  }

  .var-data-icon {
    display: block;
    position: relative;
    top: 15px;
    left: 2px;
    color: red;
  }

  .gen-name,
  .snp-data,
  .var-data,
  .result-data {
    min-height: 40px;
    line-height: 2.5;
  }

  .gn-title,
  .sd-title,
  .vd-title,
  .rd-title {
    background-color: #4BBCFF;
    min-height: 40px;
    text-align: center;
    margin: 0;
    padding: 0;
  }

  .gn-title > h5,
  .sd-title > h5,
  .vd-title > h5,
  .rd-title > h5 {
    color: #ffffff;
    font-weight: 600;
    line-height: 2;
  }

  .last {
    border-right: none !important;
    border-left: none !important;
  }

  .el-radio-group {
    line-height: 2.5;
  }

  .gen-table-mob {
    display: none;
  }

  @media (max-width: 560px) {
    .table-content {
      display: none;
    }

    .gen-table-mob {
      display: block;
    }

    .el-radio__label {
      font-size: 14px;
      padding-left: 3px;
      padding-right: 10px;
    }

    .gtm-btn {
      position: relative;
      top: -3px;
    }

    .gtm-top-part,
    .gtm-bottom-part {
      height: 45px;
    }

    .gtm-title-wrapper {
      margin: 0;
      padding: 0;

      width: 19.6px;

      display: inline-block;
    }

    .gtm-gen-title,
    .gtm-edit-title,
    .gtm-snp-title,
    .gtm-var-title {
      margin: 0;
      padding: 0;

      height: 25px;
      width: 45px;

      text-align: center;

      background-color: #4BBCFF;
      color: #ffffff;
      font-weight: 700;
      border: 1px solid #e8e9ea;

      transform: rotate(90deg);

      position: relative;
      left: -11px;
      top: -3px;
    }

    .gtm-edit-title,
    .gtm-var-title {
      left: -14px;
    }

    .gtm-snp-title,
    .gtm-var-title {
      border-left: none;
      border-right: none;

      top: -2px;
    }

    .gtm-snp-title {
      top: -3px;
    }

    .gtm-gen-data,
    .gtm-snp-data {
      margin: 0;
      padding: 0;

      line-height: 45px;
      height: 45px;
      width: 75.6px;

      text-align: center;

      display: inline-block;

      background-color: #ffffff;
      font-size: 12px;
      font-weight: 700;
      border: 1px solid #e8e9ea;
      border-left: none;
    }

    .gtm-edit-data,
    .gtm-var-data {
      margin: 0;
      padding: 0;

      line-height: 45px;
      height: 45px;
      width: 54%;

      text-align: center;

      display: inline-block;

      background-color: #ffffff;
      font-weight: 700;

      position: relative;
      left: -3px;
    }

    .gtm-snp-data {
      border-top: none;

      position: relative;
      top: 0px;
    }

    .gtm-gen-data {
      width: 252px !important;
      border-right: 1px solid #e8e9ea !important;
    }

    .gtm-var-data {
      width: 152px !important;
      border-right: 1px solid #e8e9ea;
    }

    .gtm-var-btn-clear {
      margin: 0;
      padding: 0;

      line-height: 45px;
      height: 45px;
      width: 5px;

      display: inline-block;

      position: relative;
      top: -15px;
      left: -10px;

    }

    .gtm-var-in {
      width: 43px;

      position: relative;
      left: -7px;
    }

    .vert-align {
      display: inline-block;
      vertical-align: middle;
    }
  }

  /* модальное окно*/
  @media (min-width: 768px) {
    .gen-chart-title {
      text-align: center;
    }
  }

  .gen-desc {
    text-align: justify;
  }

  /*  Tooltip */
  .el-tooltip__popper {
    /*margin-left: -120px !important;*/
  }
</style>
