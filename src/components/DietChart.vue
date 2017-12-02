<template>
	<vue-chart type="doughnut" :data="data" :options="options"></vue-chart>
</template>
<script>

import VueChart from 'vue-chart-js'
import 'chart.piecelabel.js'
import 'hex-to-rgb'

var hexToRgb = require('hex-to-rgb');
export default {
	props: ['data'],
	data() {
		return {
			options: {
				pieceLabel: {
					render: 'percentage',
					fontColor: function (data) {
						var rgb = hexToRgb(data.dataset.backgroundColor[data.index]);
						var threshold = 140;
						var luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
						return luminance > threshold ? 'black' : 'white';
					},
					precision: 2
				}

//          pieceLabel: {
//            render: 'percentage',
//            fontColor: ['white', 'white', 'white'],
//            precision: 2
//          }
			}
		}
	},
	components:
	{
		VueChart
	}
}
</script>
