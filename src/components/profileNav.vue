<template>
	<div class="profile-nav col-xs-12 col-sm-4 col-md-3 col-lg-3">
		<nav>
			<UL>
				<li class="var_nav">
					<div class="link_bg"></div>
					<div class="link_title">
						<div class='icon'> 
							<i class="fa fa-cog fa-2x" aria-hidden="true"></i>
						</div>
						<router-link class='profile-nav-link' to="/profile/preferences"><span>Настройки</span></router-link>
					</div>
				</li>
				<li class="var_nav">
					<div class="link_bg"></div>
					<div class="link_title">
						<div class='icon'> 
							<i class="fa fa-venus-mars fa-2x" aria-hidden="true"></i>
						</div>
						<a class="genetics-link profile-nav-link" href="#"><span>Генетика<span class="caret"></span></span></a>
						
					</div>
				</li>
				<ul class="genetics-dd">
					<li class="var_nav-dd">
						<div class="link_bg-dd"></div>
						<div class="link_title-dd">
							<div class='icon-dd'> 
								<i class="fa fa-futbol-o fa-2x" aria-hidden="true"></i>
							</div>
							<router-link class='profile-nav-link' to="/profile/genetics/sport"><span>Спорт</span></router-link>
						</div>
					</li>
					<li class="var_nav-dd">
						<div class="link_bg-dd"></div>
						<div class="link_title-dd">
							<div class='icon-dd'> 
								<i class="fa fa-cutlery fa-2x" aria-hidden="true"></i>
							</div>
							<router-link class='profile-nav-link' to="/profile/genetics/diet"><span>Питание</span></router-link>
						</div>
					</li>
				</ul>
				<li class="var_nav your-info-block">
					<div class="link_bg"></div>
					<div class="link_title">
						<div class='icon'> 
							<i class="fa fa-info fa-2x" aria-hidden="true"></i>
						</div>
						<a class="your-info-link profile-nav-link" href="#"><span class="your-info-text">Информация <br> о себе<span class="caret"></span></span></a>
						
					</div>
				</li>
				<ul class="your-info-dd">
					<li class="var_nav-dd">
						<div class="link_bg-dd"></div>
						<div class="link_title-dd">
							<div class='icon-dd'> 
								<i class="fa fa-bullseye fa-2x" aria-hidden="true"></i>
							</div>
							<router-link class='profile-nav-link' to="/profile/goals"><span>Цели</span></router-link>
						</div>
					</li>
					<li class="var_nav-dd">
						<div class="link_bg-dd"></div>
						<div class="link_title-dd">
							<div class='icon-dd'> 
								<i class="fa fa-graduation-cap fa-2x" aria-hidden="true"></i>
							</div>
							<router-link class='profile-nav-link' to="/profile/experience"><span>Опыт</span></router-link>
						</div>
					</li>
					<li class="var_nav-dd">
						<div class="link_bg-dd"></div>
						<div class="link_title-dd">
							<div class='icon-dd'> 
								<i class="fa fa-cutlery fa-2x" aria-hidden="true"></i>
							</div>
							<router-link class='profile-nav-link' to="/profile/diet"><span>Питание</span></router-link>
						</div>
					</li>
				</ul>
			</UL>
		</nav>
	</div>
</template>
<script>
	$(document).on('click', '.genetics-link', function () {
		$('.your-info-block').toggleClass('your-info-block-bottom');
		$('.genetics-dd').toggleClass('show');
	});
	$(document).on('click', '.your-info-link', function () {
		$('.your-info-dd').toggleClass('show');
	});
</script>
<style scoped>
.profile-nav 
{
	margin-top: 30px;

	position: relative;
	left: 15px;
}
ul
{
	margin:0px;
	padding:0px;
	list-style-type:none;
	text-align: center;
	-webkit-backface-visibility: hidden; backface-visibility: hidden;  
}
.var_nav
{
	position:relative;
	background:#ccc; 
	width:230px;
	height:70px;
	margin-bottom:5px;
	text-align: center;
}
@media (min-width: 1200px)
{
	.var_nav
	{
		width:280px;	

	}
}
.var_nav-dd
{
	position:relative;
	background:#ccc; 
	width:230px;
	height:70px;
	margin-bottom:0px;
	text-align: center;
	border: 2.5px solid white;
}
@media (min-width: 1200px)
{
	.var_nav-dd
	{
		width:280px;	

	}
}
.your-info-block
{
	/*transition: margin-top 1s;*/
}
.your-info-block-bottom
{
	margin-top: 5px;
}
.your-info-dd 
{
	margin-top: 5px;
	border: none;
	margin-left: -1.5px;
	display: none;
}
.genetics-dd 
{
	margin-top: 5px;
	border: none;
	margin-left: -1.5px;
	display: none;
}
.your-info-text 
{
	position: relative;
	top: -10px;
}
.show
{
	display: block;
}
@media (max-width: 1200px)
{
	.your-info-text 
	{
		position: relative;
		top: -10px;
		left: 7px;
	}
}
.link_bg
{
	width:70px;
	height:70px;
	position:absolute;
	background:#4BBCFF;
	color:#fff;
	z-index:2;
}
.link_bg i
{
	position:relative;
}
.link_title
{
	position:absolute;
	width:100%;
	z-index:3;
	color:#fff;
}
.link_title:hover .icon
{
	-webkit-transform:rotate(360deg);
	-moz-transform:rotate(360deg);
	-o-transform:rotate(360deg);
	-ms-transform:rotate(360deg);
	transform:rotate(360deg);  
}
.var_nav:hover .link_bg
{
	width:100%;
	background:#4BBCFF;
	-webkit-transition: all 0.3s ease-in-out;
	-moz-transition: all 0.3s ease-in-out;
	-o-transition: all 0.3s ease-in-out;
	-ms-transition: all 0.3s ease-in-out;
	transition: all 0.3s ease-in-out;  
}
.var_nav:hover a
{
	font-weight:bold;
	-webkit-transition:all .5s ease-in-out;
	-moz-transition:all .5s ease-in-out; 
	-o-transition:all .5s ease-in-out; 
	-ms-transition:all .5s ease-in-out;
	transition:all .5s ease-in-out;  
}
.icon
{
	position:relative;
	width:70px;
	height:70px;
	text-align:center;
	color:#fff;
	-webkit-transition:all .5s ease-in-out;
	-moz-transition:all .5s ease-in-out; 
	-o-transition:all .5s ease-in-out; 
	-ms-transition:all .5s ease-in-out;   
	float:left;
	transition:all .5s ease-in-out;   
	float:left;  
}
.icon i{top:22px;position:relative;}
.link_bg-dd
{
	width:70px;
	height:65px;
	position:absolute;
	background:#4BBCFF;
	color:#fff;
	z-index:2;
}
.link_bg-dd i
{
	position:relative;
}
.link_title-dd
{
	position:absolute;
	width:100%;
	z-index:3;
	color:#fff;
}
.link_title-dd:hover .icon-dd
{
	-webkit-transform:rotate(360deg);
	-moz-transform:rotate(360deg);
	-o-transform:rotate(360deg);
	-ms-transform:rotate(360deg);
	transform:rotate(360deg);  
}
.var_nav-dd:hover .link_bg-dd
{
	width:100%;
	background:#4BBCFF;
	-webkit-transition: all 0.3s ease-in-out;
	-moz-transition: all 0.3s ease-in-out;
	-o-transition: all 0.3s ease-in-out;
	-ms-transition: all 0.3s ease-in-out;
	transition: all 0.3s ease-in-out;  
}
.var_nav-dd:hover a
{
	font-weight:bold;
	-webkit-transition:all .5s ease-in-out;
	-moz-transition:all .5s ease-in-out; 
	-o-transition:all .5s ease-in-out; 
	-ms-transition:all .5s ease-in-out;
	transition:all .5s ease-in-out;  
}
.icon-dd
{
	position:relative;
	top: -2.5px;
	border: 2.5px solid white;
	border-right: none;
	width:70px;
	height:70px;
	text-align:center;
	color:#fff;
	-webkit-transition:all .5s ease-in-out;
	-moz-transition:all .5s ease-in-out; 
	-o-transition:all .5s ease-in-out; 
	-ms-transition:all .5s ease-in-out;   
	float:left;
	transition:all .5s ease-in-out;   
	float:left;  
}
.icon-dd i{top:22px;position:relative;}

.profile-nav-link {
	display:block;
	position:absolute;
	float:left;
	font-family:arial;
	color:#fff !important;
	text-decoration:none;
	width:100%;
	height:70px;
	text-align:center;
}
span
{
	margin-top:25px;
	display:inline-block;
}
.caret {
	display: inline-block;
	width: 0;
	height: 0;
	margin-left: 2px;
	vertical-align: middle;
	border-top: 4px dashed;
	border-top: 4px solid\9;
	border-right: 4px solid transparent;
	border-left: 4px solid transparent;
	position: relative;
	top: -12px;
	left: 3px;
}
</style>