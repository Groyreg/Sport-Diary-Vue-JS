<template>
  <div>
    <div v-for="(row, index) in sortProduct" class="row">
      <div class="col-xs-1 col-md-2">{{index+1}}</div>
      <div v-if="row.product" class="col-xs-7 col-md-8">{{row.product.name}}</div>
      <div v-if="row.recipe" class="col-xs-7 col col-md-8">{{row.recipe.name}}</div>
      <div class="col-xs-3 col-md-2">{{row.weight}}</div>
    </div>
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
    props: {
      products: {
        default: () => [{product_id: undefined, product: undefined, product_order: 0, weight: 0}],
        type: Array
      }
    },
    computed: {
      sortProduct: function () {
        if (this.products && this.products.length > 0) {
          return this.products.sort(function (a, b) {
            return a.product_order - b.product_order;
          })
        }
        else
          return [];
      },
      ...mapGetters({
        foodgroups: 'static/getFoodGroups'
      })
    },
    methods: {}
  }
</script>
<style>
  .el-cascader {
    width: 100% !important;
  }
</style>
