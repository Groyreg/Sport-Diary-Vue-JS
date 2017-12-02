<template id="logout">
	<div v-if="$auth.check()">
		<ul class="nav navbar-nav">
			<li class="dropdown text-left">
				<a href="" class="dropdown-toggle" data-toggle="dropdown">
					<i class="fa fa-user" aria-hidden="true"></i>
					{{$auth.user().firstName + ' ' +$auth.user().lastName}}
					<b class="caret"></b>
				</a>
				<ul class="dropdown-menu">
					<li>
						<router-link to="/profile/preferences"><i class="fa fa-address-card-o" aria-hidden="true"></i>Профиль</router-link>
					</li>
					<li>
						<a @click="logout()" href="">
							<i class="fa fa-sign-out" aria-hidden="true"></i>
							Выход
						</a>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	data() {
		return {
			context: 'app context',
			loaded: false
		};
	},
	methods: {
		logout() {
			this.$auth.logout();
		}
	}
}
</script>
<style>
	.profile
{
    margin-right: 97px;
}

@media (max-width: 992px)
{
    .profile
    {
        margin-top: 0;
    }
}
@media (max-width: 767px)
{
    .profile
    {
        width: 83%;
        margin-right: 0;
        margin-left: 45px;
    }
}
.dropdown-menu > li > a
{
	color: #fff;
	font-weight: 600;
}
.fa
{
	margin-right: 5px;
}
.fa-sign-out
{
	margin-right: 9px;
}
</style>