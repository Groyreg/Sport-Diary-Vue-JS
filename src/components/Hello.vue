<template xmlns="">
	<header class="container-fluid">
		<div class="row">
			<section class="navbar navbar-inverse navbar-fixed-top">
				<div class="all-nav-panel row">
					<section class="navbar-header">
						<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#responsive-menu" >
							<span class="sr-only">Открыть навигацию</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<div class="logotip">
							<a href="index.html" class="navbar-brand"><img class="img-logo" src="./../assets/logo.png" height="60" width="60" alt="logotip"></a>
						</div>
						<logout class="profile pull-right visible-sm"></logout>
						<login class="navbar-form visible-sm"></login>
					</section>
					<nav class="collapse navbar-collapse" id="responsive-menu">
						<div class="prof-reg-form row visible-xs">
							<logout class="profile pull-left visible-xs"></logout>
							<login class="navbar-form navbar-form-mob visible-xs"></login>
						</div>
						<ul  class="nav navbar-nav menu">
							<li><router-link to="/diary">Дневник</router-link></li>
							<li><router-link to="/program">Программа</router-link></li>
							<li><router-link to="/menu">Меню</router-link></li>
							<li class="dropdown">
								<a class="dropdown-toggle" data-toggle="dropdown" href="#">Динамика
									<span class="caret"></span>
								</a>
								<ul class="dropdown-menu">
									<li><router-link to="/progress">Прогресс</router-link></li>
									<li><router-link to="/fooddiary">Питание</router-link></li>
									<li><router-link to="/labtests">Исследования</router-link></li>
								</ul>
							</li>
							<li class=" hide alert alert-danger">error</li>
						</ul>
						<!-- <ul v-if="!$auth.check()" class="nav navbar-nav menu">
							<li><router-link to="/">Главная</router-link></li>
							<li><router-link to="/about">О проекте</router-link></li>
							<li class=" hide alert alert-danger">error</li>
						</ul> -->
						<logout class="profile pull-right hidden-xs hidden-sm"></logout>
						<login class="navbar-form navbar-right hidden-xs hidden-sm"></login>
					</nav>
				</div>
			</section>
		</div>
	</header>

</template>
<script>
  import login from './login.vue';
  import logout from './logout.vue';
  export default {
    data() {
      return {counter:0};
    },
    components: {
      login,
      logout
    }
  }
</script>
<style>
	.img-logo
	{
		position: relative;
		top: -7px;
	}
</style>