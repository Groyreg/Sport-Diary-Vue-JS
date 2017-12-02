<template>
	<div class="user-profile">
		<div class="row">
			<h1 class="sdv-title">Профиль</h1>
			<profile-nav></profile-nav>
			<profile-content></profile-content>
		</div>
	</div>
</template>
<script>
import profileNav from './profileNav.vue'
import profileContent from './profileContent.vue'


export default {
	data() {
		return {

		}
	},
	components: {profileNav, profileContent}
}
</script>
<style>
	.sdv-title
	{
		width: 96%;
		margin-left: 30px;
		font-size: 25px;
		font-weight: 700;
		padding-bottom: 10px;
		border-bottom: 2px solid #4BBCFF;
	}
</style>