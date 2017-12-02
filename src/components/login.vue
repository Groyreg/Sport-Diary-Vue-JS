<template id="login">
	<div>
		<form v-if="!$auth.check()" v-on:submit.prevent="login()" role="form">
			<div class="reg-form input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
				<input v-model="data.body.username" type="text" class="form-control" placeholder="User">
			</div>
			<div class=" reg-form input-group">
				<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
				<input v-model="data.body.password" type="password" class="form-control" placeholder="Password">
			</div>
			<button type="submit" class="btn-login btn btn-primary">Login</button>
			<div v-if="error" style="color:red; word-wrap:break-word;">{{ error }}</div>
			<div class="reg-links">
				<div class="wrapper"><a href="">Забыли пароль?</a></div>
				<div class="wrapper"><router-link to="/registration">Зарегистрироваться</router-link></div>
			</div>
		</form>
	</div>
</template>
<script>
export default {
	data() {
		return {
			context: 'login context',
			data: {
				body: {
					//  username: 'admin',
					//  password: 'secret'
					username: null,
					password: null
				},
				rememberMe: true,
				fetchUser: true
			},
			error: null
		};
	},
	methods: {
		login() {
			this.$auth.login({
			    data: this.data.body, // Axios
			    rememberMe: this.data.rememberMe,
			    fetchUser: this.data.fetchUser,
			    success(res) {
			        this.data.body.username = null;
			        this.data.body.password = null;
			        console.log('success ' + this.context);
			    },
			    error(res) {
			        console.log('error ' + this.context);
			        this.error = res.response.data.error;
			    }
			});
		}
	}
}

</script>
<style>
.form-control
{
	margin-bottom: 0 !important;
}
.navbar-right
{
	margin-right: 30px;
}
.reg-form
{
	width: 150px;
}
.reg-links
{
	display: flex;
	margin-top: 5px;
}
.reg-links >
.wrapper >
a
{
	color: #CC002A;
	font-size: 13px;
	font-weight: 500;
}
.reg-links >
.wrapper
{
	width: 155px;
}
@media (max-width: 767px)
{
	.reg-links >
	.wrapper
	{
		margin-left: 10px;
		width: 110px;
	}
	.reg-form,
    .btn-login
    {
        width: 83% !important;
        margin-top: 15px;
        margin-left: 10px;
    }
}
/*кнопка логин*/


</style>
