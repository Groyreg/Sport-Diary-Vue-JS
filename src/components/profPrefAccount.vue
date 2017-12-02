<template>
	<div class="prof-pref-account col-xs-12 col-sm-8 col-md-9 col-lg-9">
		<div class="account-info row">
			<div class="account-info-title col-xs-12 col-sm-12 col-md-3 col-lg-3">
				<h4>Учетная запись</h4>
			</div>
			<div class="account-info-data col-xs-12 col-sm-12 col-md-9 col-lg-9">
				<form class="prof-account-form">
					<div class="form-item">
						<label class="form-item-title" for='name'>Имя</label>
						<input v-model="localUserInfo.firstName" class="form-control ppa-input" type="text" id="name" ></input>
					</div>
					<div class="form-item">
						<label class="form-item-title">Фамилия</label>
						<input v-model="localUserInfo.lastName" class="form-control ppa-input" type="text" id="surname"></input>
					</div>
					<div class="form-item">
						<label class="form-item-title-birth">Дата рождения</label>
						<flat-pickr
							v-model="localUserInfo.dofb"
							placeholder="Выберите дату рождения"
							:required="true"
							:config="config"
							input-class="form-control ppa-input"
							name="date">
						</flat-pickr>
					</div>
					<div class="form-item">
						<label class="form-item-title-gender">Пол</label>
						<label class="form-item-title-inner"><input v-model="localUserInfo.sex" value="2" type="radio" name="gender"/> Мужчина</label>
						<label class="form-item-title-inner"><input v-model="localUserInfo.sex"  value="1" type="radio"  name="gender"/> Женщина</label>
					</div>
					<div class="form-item">
						<label class="form-item-title" for="height">Рост</label>
						<input v-model="localUserInfo.height" class="form-control ppa-input" type="text" id="height"></input>

					</div>
					<div class="form-item">
						<label class="form-item-title" for="weight">Вес</label>
						<input v-model="localUserInfo.weight" class="form-control ppa-input" type="text" id="weight"></input>
					</div>
					
				</form>
				<div class="form-item">
						<button @click="updateUserInfo" class="form-btn btn btn-success">Сохранить</button>
						<button @click="resetForm" class="form-btn btn btn-primary">Сбросить</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/material_blue.css';
import { Russian } from 'flatpickr/dist/l10n/ru.js';
import {mapGetters} from 'vuex'

export default {
	computed: {
		...mapGetters({
			userInfo: 'diary/getUser'
		}),
	},
	data() {
		return {
			labelPosition: 'left',
			localUserInfo: Object.assign({}, this.$store.state.diary.user_info),
			config: {
				wrap: true, // set wrap to true when using 'input-group'
				altFormat: 'M	j, Y',
				altInput: true,
				dateFormat: "Y/m/d",
				locale: Russian // locale for this instance only
			},
			rules: {
				height: [
					{
						required: true,
			            pattern: "^[0-9]+([.,]\\d{0,2})?$",
			            message: 'Пожалуйста, введите свой рост', trigger: 'blur'
			        }
				],
				weight: [
					{
						required: true,
			            pattern: "^[0-9]+([.,]\\d{0,2})?$",
			            message: 'Пожалуйста, введите свой вес', trigger: 'blur'
			        },
				]

			}
		};
	},
	components: { flatPickr },
	methods: {
		resetForm() {
     		this.localUserInfo = Object.assign({}, this.$store.state.diary.user_info);
		},
    	updateUserInfo(){
    		this.$store.dispatch('diary/UPDATE_USER_INFO', this.localUserInfo);
    	}
	}
}
</script>
<style>
.account-info-title
{
	margin-top: 30px;
}
.flatpickr-input
{
	height: 40px !important;
	background-color: #fff !important;
}
.modal-body
{
	padding: 0;
}
.prof-account-form
{
	margin-top: 30px;
	max-width: 500px;
}
.ppa-input {
	margin-bottom: 10px !important;
}
.form-item
{

	display: flex;
}
.form-item-title
{
	width: 100px;
	min-width: 100px;
	height: 40px;
	position: relative;
	top: 10px;
}
.form-item-title-birth
{
	width: 100px;
	min-width: 100px;
	height: 40px;
}
.form-item-title-gender
{
	width: 100px;
	min-width: 100px;
	height: 40px;
	position: relative;
	top: 16px
}
.form-item-title-inner
{
	border: 1px solid silver;
	border-radius: 5px;
	padding: 8px 8px;
	margin-top: 6px;
	margin-bottom: 11px;
}
.form-item-title-inner:last-child
{
	margin-left: 30px;
}
.form-btn:last-child
{
	margin-left: 15px;
}
.form-btn:hover
{
	transform: scale(1.1);
}
@media screen and (max-width: 370px)
{
	.form-item-title-inner
	{
		border: 1px solid silver;
		border-radius: 5px;
		padding: 8px 6.5px;
		margin-top: 6px;
		margin-bottom: 11px;
		font-size: 12px;
	}
	.form-item-title-inner > input
	{
		position: relative;
		top: 2px;
	}
	.form-item-title-inner:last-child
	{
		margin-left: 10px;
	}
}
</style>
