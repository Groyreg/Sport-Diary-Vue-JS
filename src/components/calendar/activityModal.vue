<template>
  <div id="event-form" class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title">Добавить событие</h4>
        </div>
        <div class="modal-body">
          <div class="date-wrapper">
            <label class="date-title">Выберите дату события<span class="red-star"> *</span></label>
            <flat-pickr
                v-model="currentActivity.date"
                placeholder="Select date"
                :required="true"
                :config="config"
                input-class="form-control date-input modal-input"
                name="date"
                type="date">
              </flat-pickr>
          </div>
          <div class="time-start-wrapper">
            <label class="time-start-title">Выберите время события</label>
            <el-time-select
                v-model="currentActivity.time_start"
                :picker-options=
                  "{
                  start: '00:00',
                  step: '00:15',
                  end: '23:59'
                }"
                placeholder="Select time"
                type="time_start"
                class="modal-wrapper">>
              </el-time-select>
          </div>
          <div class="time-duration-wrapper">
            <label class="time-duration-title">Выберите продолжительность события</label>
            <el-time-select
                v-model="currentActivity.duration"
                :picker-options=
                  "{
                  start: '00:00',
                  step: '00:15',
                  end: '23:59'
                }"
                placeholder="Select time"
                type="duration"
                class="modal-wrapper">>
              </el-time-select>
          </div>
          <div class="activity-type-wrapper">
            <label class="activity-type-title">Выберите тип события<span class="red-star"> *</span></label>
            <select class="form-control type-input modal-input" v-model="currentActivity.type_id" placeholder="тип события" >
              <option
                v-for="a in activityTypes"
                :key="a.id"
                :value="a.id">
                {{a.name}}
              </option>
            </select>
          </div>
          <div class="comment-event-form">
              <label class="comment-title">Введите название события</label>
              <textarea v-model="currentActivity.description" id="comment-event" class="comment-area form-control modal-input" type="description"></textarea>
          </div>
          <food v-if="currentActivity.type_id===3" :products="products"></food>
          <training v-else-if="currentActivity.type_id===4" :exercises="currentActivity.activitySports"></training>
          <wellbeing v-else-if="currentActivity.type_id===2" :wellbeings="currentActivity.activityWellBeings"></wellbeing>
          <measurement v-else-if="currentActivity.type_id===5" :measurements="currentActivity.activityMeasurements"></measurement>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
          <button v-if="currentActivity.date && currentActivity.type_id" @click='saveActivity()' type="button" id="checkrequired" class="btn-modal btn btn-primary" data-dismiss="modal">Сохранить изменения</button>
          <button v-if="!currentActivity.date || !currentActivity.type_id" disabled type="button" id="checkrequired" class=" btn-modal btn btn-primary disabled" data-dismiss="modal">Сохранить изменения</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  import 'flatpickr/dist/themes/material_blue.css';
  import { Russian } from 'flatpickr/dist/l10n/ru.js';
  import {mapGetters} from 'vuex';
  import food from './activitiesEdit/food.vue';
  import training from './activitiesEdit/training.vue'
  import wellbeing from './activitiesEdit/wellbeing.vue'
  import measurement from './activitiesEdit/measurement.vue'

  export default {
    data () {
      return {
        products: [{id:undefined, path:[], weight:''}],
        config: {
          wrap: true, // set wrap to true when using 'input-group'
          altFormat: 'M	j, Y',
          altInput: true,
          dateFormat: "Y/m/d",
          locale: Russian // locale for this instance only
        },
        position: 'top',
        validateRules: {
          date: [
            {
              required: true,
              message: 'Пожалуйста, заполните данное поле', trigger: 'blur'
            }
          ],
          type_id:[
            {
              required: true,
              pattern: "^[0-9]+$",
              message: 'Пожалуйста, заполните данное поле', trigger: 'blur'
            }
          ]
        }
      }
    },
    components: {
      flatPickr,
      food,
      training,
      wellbeing,
      measurement
    },
    computed: {
      ...mapGetters({
        activityTypes: 'diary/activityTypes',
        currentActivity: 'diary/currentActivity'
      })
    },
    methods: {
      saveActivity() {
        console.log('addActivity');
        this.currentActivity.activityFoodIntakes = [];
        if (this.currentActivity.type_id === 3){
          for (let i = 0 ; i < this.products.length ; i++) {
            let product = this.products[i];
            if (product.path.length === 2 && product.weight){
              this.currentActivity.activityFoodIntakes.push({id:product.id, activity_id:this.currentActivity.id, product_id:product.path[1], weight:product.weight, product_order: i})
            }
          }
        }
        else if (this.currentActivity.type_id === 4){
          for (let i = 0 ; i < this.currentActivity.activitySports.length ; i++) {
            this.currentActivity.activitySports[i].activity_id = this.currentActivity.id;
            this.currentActivity.activitySports[i].exercise_order = i;
          }
        }
        else if (this.currentActivity.type_id === 2){
          for (let i = 0 ; i < this.currentActivity.activityWellBeings.length ; i++) {
            this.currentActivity.activityWellBeings[i].activity_id = this.currentActivity.id;
          }
        }
        else if (this.currentActivity.type_id === 5){
          for (let i = 0 ; i < this.currentActivity.activityMeasurements.length ; i++) {
            this.currentActivity.activityMeasurements[i].activity_id = this.currentActivity.id;
          }
        }
        if (this.currentActivity.id) {
          this.$store.dispatch('diary/UPDATE_ACTIVITY', this.currentActivity)
        }
        else {
          this.$store.dispatch('diary/CREATE_ACTIVITY', this.currentActivity)
        }
      },
      checkParams() {
        if(this.currentActivity.date.length != 0 && this.currentActivity.type_id.length != 0) {
          $('#checkrequired').removeClass('disabled');
        } else {
          $('#checkrequired').addClass('disabled');
        }
      }
    }
  }
</script>
<style>
  .modal-body
  {
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .modal-input,
  .modal-wrapper > .el-input__inner
  {
    width: 92% !important;
    max-width: 570px;
  }
  .modal-wrapper
  {
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .date-input,
  .type-input
  {
    height: 40px !important;
  }
  .date-wrapper,
  .time-start-wrapper,
  .time-duration-wrapper,
  .activity-type-wrapper
  {
    height: 80px;
    width: 100%;
    max-width: 570px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .comment-event-form
  {
    width: 100%;
    max-width: 570px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .el-date-editor--time-select
  {
    width: 100% !important;
    /*margin-bottom: 30px;*/
    max-width: 570px;
  }
  .el-select
  {
    width: 100% !important;
    margin-bottom: 30px;
  }
  .el-input__inner
  {
    padding: 6px 12px;
  }
  .el-form-item
  {
    margin-bottom: 0;
  }
  .el-icon-time
  {
    position: relative;
    left: 16px;
  }
  .date-title,
  .time-start-title,
  .time-duration-title,
  .activity-type-title,
  .comment-title,
  .food-title,
  .exercises-title
  {
    width: 90%;
    margin-bottom: 0;
  }
  .el-form--label-top,
  .el-form-item__label
  {
    padding: 0;
  }
  .form-control
  {
    margin-bottom: 30px;
    border: 1px solid #bfcbd9;
    background-color: #ffffff !important;
    height: 34px;
  }
  input::-webkit-input-placeholder
  {
    color: #bfcbd9 !important;
  }
  input::-moz-placeholder
  {
    color: #bfcbd9 !important;
  }
  .el-picker-panel__sidebar
  {
    width: 125px;
  }
  th
  {
    text-align: center;
  }
  .comment-area
  {
    max-width: 567px;
    width: 92%;
    margin-bottom: 15px !important;
  }
  .red-star
  {
    color: #ff0000;
  }
  @media screen and (max-width: 350px)
  {
    .btn-modal
    {
      padding: 6px 6px;
    }
  }
</style>
