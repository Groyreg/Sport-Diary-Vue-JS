<template>
	<div class="diet">
		<div class="row">
			<profile-nav></profile-nav>
			<div class="prof-diet-data col-xs-12 col-sm-8 col-md-9 col-lg-9">
				<!-- Your content is here -->
			</div>
		</div>
	</div>
</template>
<script>
import profileNav from './profileNav.vue'



export default {
	data() {
		return {

		}
	},
	components: {
		profileNav, 
	}
}
</script>
<style>
.prof-diet-data 
{
	margin-top: 30px;
}
</style>