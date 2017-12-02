<template>
  <div class="comment-event-form">
    <div>Укажите продукты строго в последовательности употребления</div>

      <el-table size="mini"
        :data="products"
        style="width: 100%"
        max-height="250">
        <el-table-column
          label="Продукты">
          <el-cascader
            slot-scope="scope"
            v-model="scope.row.path"
            :options="foodgroups"
            :props="properties"
            :show-all-levels="false">
          </el-cascader>
        </el-table-column>
        <el-table-column
          label="Вес(г/мл)"
          width="100">
          <el-input slot-scope="scope" placeholder="Вес" v-model="scope.row.weight"></el-input>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="moveRow(scope.$index, scope.$index - 1,products)"
              type="text"
              size="small"
              icon="el-icon-arrow-up"
              :disabled="scope.$index===0">
            </el-button>
            <el-button
              @click.native.prevent="moveRow(scope.$index, scope.$index + 1,products)"
              type="text"
              size="small"
              icon="el-icon-arrow-down"
              :disabled="scope.$index+1===products.length">
            </el-button>
            <el-button
              @click.native.prevent="addRow(scope.$index,products)"
              type="text"
              size="small"
              icon="el-icon-plus">
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, products)"
              type="text"
              size="small"
              icon="el-icon-delete"
              :disabled="products.length<=1">
            </el-button>
          </template>
        </el-table-column>
      </el-table>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        properties: {label: "name", value: "id", children: "products"}
      };
    },
    props:{
      products:{
        default: () => [{id:undefined, path:[], weight:''}],
        type: Array}
    },
    computed: {
      ...mapGetters({
        foodgroups: 'static/getFoodGroups'
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
        let row = {id:undefined, path:[], weight:''};
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
</style>
