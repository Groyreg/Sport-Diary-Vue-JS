<template>
	<div class="profile-content">
			<div class="user-info col-xs-12 col-sm-8 col-md-2 col-lg-2">
			<div>
				<img src="http://dummyimage.com/100x100/4d494d/686a82.gif&text=placeholder+image" alt="placeholder+image">
				<h5>User</h5>
			</div>
		</div>
		<div class="col-xs-12 col-sm-8 col-md-7 col-lg-7 profile-content-title">
			<h3>Общие сведения</h3>
		</div>
		<div class="col-xs-12 col-sm-8 col-md-7 col-lg-7 profile-content-table_data">Table Data</div>
		<div class="col-xs-12 col-md-9 col-lg-7 profile-content-charts">Charts</div>
	</div>
</template>
<script>

</script>
<style>
.profile-content
{
	margin-top: 42px;
}
.profile-content-title
{
	margin-top: -24px;	

}
@media (max-width: 992px)
{
	.profile-content-title
	{
		margin-top: 0px;	

	}
}
.profile-content-table_data
{
	background-color: lime;
	padding-left: 20px;

}
.profile-content-charts
{
	margin-top: 30px;	
	background-color: pink;
	padding-left: 20px;
}
.basic-data-panel__header 
{
	position: relative;
	letter-spacing: -.31em;
	background-color: grey;
	padding: 0 20px;
	display: table;
	width: 100%;
}
.basic-data-panel__row 
{
	display: table-row;
}
.basic-data-panel__item 
{
	letter-spacing: normal;
	padding: 9px 0;
	display: table-cell;
	float: none;
	vertical-align: middle;
}
.basic-data-panel__item-wrapper
{
	display: inline-block;
	position: relative;
	padding: 0 15px;
	width: 100%;
}
svg.basic-data-panel__icon 
{
	margin-top: -18px;
	width: 36px;
	height: 36px;
}
svg.basic-data-panel__icon ~ 
.basic-data-panel__label, 
svg.basic-data-panel__icon ~ 
.basic-data-panel__label--black, 
svg.basic-data-panel__icon ~ 
.basic-data-panel__value 
{
	padding-left: 38px;
}
</style>