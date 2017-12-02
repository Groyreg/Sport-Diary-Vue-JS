<template>
	<div class="prof-pref-nav col-xs-12 col-sm-8 col-md-9 col-lg-9">
		<h3 class="prof-pref-nav-title">Настройки</h3>
		<nav>      
			<div class="menu">
				<ul class="clear">
					<li>
						<a href="index.html" title="Home">
							<i class="fa fa-home" aria-hidden="true"></i>
							<span class="link-text">Учетная запись</span>
						</a>
					</li>
					<li>
						<a href="index.html" title="Features">
							<i class="fa fa-user-secret" aria-hidden="true"></i>
							<span class="link-text">Ваш профиль</span>
						</a>
					</li>
					<li>
						<a href="index.html" title="Portfolio">
							<i class="fa fa-lock" aria-hidden="true"></i>
							<span class="link-text">Безопасность</span>
						</a>
					</li>
					<li>
						<a href="index.html" title="Blog">
							<i class="fa fa-cog" aria-hidden="true"></i>
							<span class="link-text">Общие настройки</span>
						</a>
					</li>
					<li>
						<a href="index.html" title="Contact">
							<i class="fa fa-envelope-o" aria-hidden="true"></i>
							<span class="link-text">Настройки уведомелений</span>
						</a>
					</li>
				</ul>
			</div>
		</nav>
	</div>
</template>
<script>

</script>
<style scoped>
.prof-pref-nav-title
{
	float: left;
	margin-bottom: 30px;
	margin-top: 27px;
	border-bottom: 3px solid #4BBCFF;
}
body {
	background: #bfbfbf;
	font-family: 'Oswald', sans-serif;
	font-weight: 300; 
}

a {
	text-decoration: none;
}

.clear:after {
	content: " ";
	display: block;
	clear: both;
}

nav .menu {
	float: right;
	margin-top: -15px;
	text-align: center;
	margin-left: -40px;
}

nav .menu ul {
	list-style-type: none;
	display: inline-block;
}

nav .menu ul li {
	float: left;
	width: 124px;
	height: 140px;
	border-left: 1px solid;
	border-right: 1px solid;
	border-color: #e3e3e3;
	background-color: #fff;
	-moz-transition: background-color 0.2s linear 0s;
	-ms-transition: background-color 0.2s linear 0s;
	-o-transition: background-color 0.2s linear 0s;
	-webkit-transition: background-color 0.2s linear 0s;
	transition: background-color 0.2s linear 0s;
}

nav .menu ul li a {
	display: table;
	width: 100%;
	height: 100%;
	position: relative;
	text-align: center;
}

nav .menu a i {
	display: table-cell;
	vertical-align: middle;
	color: #a3a7ad;
	font-size: 23px;
	-moz-transition: all 0.2s linear 0s;
	-ms-transition: all 0.2s linear 0s;
	-o-transition: all 0.2s linear 0s;
	-webkit-transition: all 0.2s linear 0s;
	transition: all 0.2s linear 0s;
}

nav .menu a i:before {
	border: 2px solid;
	border-color: #a3a7ad;
	border-radius: 500px;
	width: 41px;
	display: inline-block;
	height: 41px;
	line-height: 37px;
	-moz-transition: color 0.2s linear 0s, font-size 0.2s linear 0s, border-color 0.2s linear 0.2s, height 0.2s linear 0s, width 0.2s linear 0s, line-height 0.2s linear 0s;
	-ms-transition: color 0.2s linear 0s, font-size 0.2s linear 0s, border-color 0.2s linear 0.2s, height 0.2s linear 0s, width 0.2s linear 0s, line-height 0.2s linear 0s;
	-o-transition: color 0.2s linear 0s, font-size 0.2s linear 0s, border-color 0.2s linear 0.2s, height 0.2s linear 0s, width 0.2s linear 0s, line-height 0.2s linear 0s;
	-webkit-transition: color 0.2s linear 0s, font-size 0.2s linear 0s, border-color 0.2s linear 0.2s, height 0.2s linear 0s, width 0.2s linear 0s, line-height 0.2s linear 0s;
	transition: color 0.2s linear 0s, font-size 0.2s linear 0s, border-color 0.2s linear 0.2s, height 0.2s linear 0s, width 0.2s linear 0s, line-height 0.2s linear 0s;
}

nav .menu a .link-text {
	position: absolute;
	bottom: 7px;
	right: 5px;
	color: #565a60;
	font-size: 12px;
	text-transform: uppercase;
	-moz-transition: all 0.2s linear 0s;
	-ms-transition: all 0.2s linear 0s;
	-o-transition: all 0.2s linear 0s;
	-webkit-transition: all 0.2s linear 0s;
	transition: all 0.2s linear 0s;
}

nav .menu ul li:hover {
	background-color: #ffea00;
	border-color: #ffea00;
}

nav .menu ul li:hover + li {
	border-color: #ffea00;
}

nav .menu ul li:hover + li:last-child {
	border-right-color: #e3e3e3;
}

nav .menu ul li:hover .link-text {
	opacity: 0;
}

nav .menu ul li:hover i {
	color: #565a60;
	font-size: 43px;
}

nav .menu ul li:hover i:before {
	border-color: transparent;
	border-radius: 500px;
	width: 66px;
	height: 66px;
	line-height: 60px;
	-moz-transition: color 0.2s linear 0s, font-size 0.2s linear 0s, border-color 0s linear 0.2s, height 0.2s linear 0s, width 0.2s linear 0s, line-height 0.2s linear 0s;
	-ms-transition: color 0.2s linear 0s, font-size 0.2s linear 0s, border-color 0s linear 0.2s, height 0.2s linear 0s, width 0.2s linear 0s, line-height 0.2s linear 0s;
	-o-transition: color 0.2s linear 0s, font-size 0.2s linear 0s, border-color 0s linear 0.2s, height 0.2s linear 0s, width 0.2s linear 0s, line-height 0.2s linear 0s;
	-webkit-transition: color 0.2s linear 0s, font-size 0.2s linear 0s, border-color 0s linear 0.2s, height 0.2s linear 0s, width 0.2s linear 0s, line-height 0.2s linear 0s;
	transition: color 0.2s linear 0s, font-size 0.2s linear 0s, border-color 0.2s linear 0s, height 0.2s linear 0s, width 0.2s linear 0s, line-height 0.2s linear 0s;
}
</style>
