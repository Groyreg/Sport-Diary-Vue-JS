<template>
	<div class="registration row">
		<div class="modal-dialog registration-window">
			<div class="modal-content">
				<!-- Заголовок модального окна -->
				<div class="modal-header">
					<h4 class="modal-title">Регистрация</h4>
				</div>
				<!-- Основное содержимое модального окна -->
				<div class="modal-body">
					<div class="auth-part-form">
						<el-form :label-position="labelPosition" status-icon ref="ruleForm"  label-width="36px" :model="ruleForm" :rules="rules">
							<el-form-item prop="email" label="Email">
								<el-input v-model="ruleForm.email" type="email" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="Password" prop="pass">
								<el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="Confirm" prop="checkPass">
								<el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item prop="name" label="Имя">
								<el-input v-model="ruleForm.name" type="name" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="Фамилия" prop="surname">
								<el-input type="surname" v-model="ruleForm.surname" auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item label="Дата рождения" prop="bithday">
								<flat-pickr
									v-model="ruleForm.birthday"
									placeholder="Select date"
									:required="true"
									:config="config"
									input-class="form-control"
									name="date">
								</flat-pickr>
							</el-form-item>
							<el-form-item prop="gender" label="Пол">
								<div class="gender">
									<el-radio v-model="ruleForm.gender" label="1" border>Мужчина</el-radio>
									<el-radio v-model="ruleForm.gender" label="2" border>Женщина</el-radio>
								</div>
							</el-form-item>
							<el-form-item label="Рост" prop="height">
								<el-input type="height" v-model="ruleForm.height" ></el-input>
							</el-form-item>
							<el-form-item label="Вес" prop="weight">
								<el-input type="weight" v-model="ruleForm.weight" ></el-input>
							</el-form-item>
							<div class="btn-reg-form">
								<el-form-item>
									<el-button type="primary" @click="submitForm('ruleForm')">Submit</el-button>
   									 <el-button @click="resetForm('ruleForm')">Reset</el-button>
								</el-form-item>
							</div>
						</el-form>
					</div>
				</div>
				<!-- Футер модального окна -->
				<div class="modal-footer">

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

export default {
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('Пожалуйста, введите пароль!'));
			} else {
				if (this.ruleForm.checkPass !== '') {
					this.$refs.ruleForm.validateField('checkPass');
				}
				callback();
			}
		};
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('Пожалуйста, введите пароль снова!'));
			} else if (value !== this.ruleForm.password) {
				callback(new Error('Пароли не совпадают!'));
			} else {
				callback();
			}
		};

		return {
			labelPosition: 'top',
			date: null,
			ruleForm: {
				email: '',
				password: '',
				checkPass: '',
				name: '',
				surname: '',
				birthday: '',
				gender: '',
				height: '',
				weight: ''
			},
			config: {
          		wrap: true, // set wrap to true when using 'input-group'
          		altFormat: 'M	j, Y',
          		altInput: true,
          		dateFormat: "Y/m/d",
          		locale: Russian // locale for this instance only
	        },
			rules: {
				email: [
				{ required: true, message: 'Пожалуйста, введите e-mail адрес!', trigger: 'blur' },
				{ type: 'email', message: 'Пожалуйста, введите корректный e-mail адрес!', trigger: 'blur,change' }
				],
				password: [
				{ required: true},
				{ validator: validatePass, trigger: 'blur' }
				],
				checkPass: [
				{ required: true },
				{ validator: validatePass2, trigger: 'blur' }
				],
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          this.$auth.register({
            data: this.ruleForm,
            success: function () {
              console.log('success register');
              this.$auth.login({
                data: {username: this.ruleForm.email, password: this.ruleForm.password},
                rememberMe: true,
                fetchUser: true,
                success(res) {
                  console.log('success login in' + this.context);
                },
                error(res) {
                  console.log('error login in' + this.context);
                  this.error = res.response.data.error;
                }
              });
                },
            error: function (res) {
              console.log('error ' + this.context + " " + res.response.data.error);
//              this.error = res.response.data.error;
            },
            autoLogin: false,
//            rememberMe: true,
            redirect: {name: 'Hello'}
          });
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style>
	.registration
	{
		margin-top: 30px;
		display: block;
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
	.el-form-item__label {

		height: 35px;
	}
	.el-form-item
	{
		margin: 15px;
		margin-bottom: 0;
	}
	.btn-reg-form
	{
		margin-top: 20px;
	}
	.el-date-editor
	{
		width: 100%;
	}
	.el-radio.is-bordered
	{
		padding:  12px 30px 11px 10px;
	}
	.el-form-item__content
	{
		height: 40px;
	}
	@media (max-width: 318px)
	{
		.el-radio.is-bordered
		{
			padding:  12px 8px 11px 10px;
		}
	}

</style>
