<template>
	<div class="comment-event-form" >
		<label class="exercises-title">Составьте тренироку из списка упражнений</label>
			<!-- <div class="tti-wrapper">
				<h6 class="training-title-inner">Упражнение</h6>
			</div>
			<select class="form-control type-input modal-input" v-model="exercise_id" placeholder="тип события" >
				<option
					v-for="a in exerciseList"
					:key="a.id"
					:value="a.id">
					{{a.description}}
				</option>
			</select>
			<div class="tti-wrapper">
				<h6 class="training-title-inner">Статус</h6>
			</div>
			<div class="training-status-wrapper">
				<el-checkbox  v-model="status" true-label=1 false-label=0>Выполнена</el-checkbox>
			</div> -->

      



















      <el-table size="mini"
                :data="exercises"
                style="width: 100%"
                max-height="250">
        <el-table-column
          label="Упражнение">
          <select slot-scope="scope" v-model="scope.row.exercise_id" placeholder="тип события" >
            <option
              v-for="a in exerciseList"
              :key="a.id"
              :value="a.id">
              {{a.description}}
            </option>
          </select>
        </el-table-column>
        <el-table-column
          label="Статус"
          width="100">
          
          <el-checkbox slot-scope="scope" v-model="scope.row.status" true-label=1 false-label=0>Выполнена</el-checkbox>
         
        </el-table-column>
        <el-table-column
          fixed="right"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="moveRow(scope.$index, scope.$index - 1,exercises)"
              type="text"
              size="small"
              icon="el-icon-arrow-up"
              :disabled="scope.$index===0">
            </el-button>
            <el-button
              @click.native.prevent="moveRow(scope.$index, scope.$index + 1,exercises)"
              type="text"
              size="small"
              icon="el-icon-arrow-down"
              :disabled="scope.$index+1===exercises.length">
            </el-button>
            <el-button
              @click.native.prevent="addRow(scope.$index,exercises)"
              type="text"
              size="small"
              icon="el-icon-plus">
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, exercises)"
              type="text"
              size="small"
              icon="el-icon-delete"
              :disabled="exercises.length<=1">
            </el-button>
          </template>
        </el-table-column>
      </el-table>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    props:{
      exercises:{
        default: () => [{exercise_id:undefined, status:''}],
        type: Array}
    },
    computed: {
      ...mapGetters({
        exerciseList: 'static/getExercises'
      })
    },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      moveRow(indexFrom, indexTo, rows) {
        let row = rows[indexFrom];
        rows.splice(indexFrom, 1);
        rows.splice(indexTo, 0, row)
      },
      addRow(index, rows) {
        let row = {exercise_id:undefined, status:''};
        if (rows.length===index+1){
          rows.push(row);
        }
        else {
          rows.splice(index + 1, 0, row);
        }
      }
    }
  }
</script>
<style>
  .el-cascader
  {
    width: 100% !important;
  }
  .tti-wrapper
  {
  	width: 90%;
  }
  
</style>
