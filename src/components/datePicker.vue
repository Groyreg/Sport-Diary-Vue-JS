<template>
	<section>
        <flat-pickr
                v-model="eventDefault"
                placeholder="Select date"
                v-on:input="setDateToEventDefault"
                :required="true"                
                input-class="form-control"                
                name="date">
        </flat-pickr>
  </section>
</template>
<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { Russian } from "flatpickr/dist/l10n/ru.js"

flatpickr(myElem, {
    "locale": Russian // locale for this instance only
});

export default {    
	data () {
		return {
			date: null, 
			config: {
          		wrap: true, // set wrap to true when using 'input-group'
          		altFormat: 'M	j, Y',
          		altInput: true,
          		dateFormat: "Y-m-d",
          		locale: Russian // locale for this instance only          
	        }       
		}
	},
	components: {
		flatPickr
	},
	computed: {
		eventDefault: {
		    // геттер:
		    get: function () {
		    	return this.$store.getters.eventDefault.date
		    },
		    // сеттер:
		    set: function (eventDefault) {
		    	this.$store.dispatch('addDate', eventDefault)
		    }
		}
	},
	methods: {
		setDateToEventDefault(){
			this.$emit('setDateToEventDefault')
		}
	}
}	
</script>
<style>
.form-control
{
	margin-bottom: 30px;
	border: 1px solid #bfcbd9;
	background-color: #ffffff !important;
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
</style>
