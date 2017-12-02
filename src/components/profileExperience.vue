<template>
	<div class="experience">
		<div class="row">
			<profile-nav></profile-nav>
			<div class="prof-experience-data col-xs-12 col-sm-8 col-md-9 col-lg-9">
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
.prof-experience-data 
{
	margin-top: 30px;
}
</style>