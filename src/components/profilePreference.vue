<template>
	<div class="user-profile">
		<div class="row">
			<h1 class="sdv-title">Настройки</h1>
			<profile-nav></profile-nav>
			<div class="prof-pref-nav col-xs-12 col-sm-8 col-md-9 col-lg-9">

			</div>
			<prof-pref-account></prof-pref-account>
		</div>
	</div>
</template>
<script>
import profileNav from './profileNav.vue'
import profPrefAccount from './profPrefAccount.vue'

export default {
	data() {
		return {

		}
	},
	components: {
		profileNav, 
		profPrefAccount
	}
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
