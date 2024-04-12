<template>
	<div style="background-color: #dedede;height: 100%;">
		<div style="width: 100%; height: 32px;"></div>
		<el-steps :active="step" align-center>
			<el-step title="输入已绑定邮箱" description="验证绑定邮箱"></el-step>
			<el-step title="获取动态验证码" description="获取动态验证码以验证身份"></el-step>
			<el-step title="输入新的绑定邮箱" description="邮箱换绑"></el-step>
		</el-steps>
		<div style="width: 100%; height: 64px;"></div>
		<div class="inputarea">
			<div style="width: 100%;height: 64px;"></div>
			<el-collapse-transition>
				<div v-show="show.mailinput">
					<label style="font-size:18px;margin-right: 8px;">邮箱</label>
					<el-input placeholder="请输入已绑定邮箱" v-model="data.mail" class="mailinput" @blur="checkmail">
					</el-input>
					<div style="width: 100%;height: 96px;"></div>
					<el-button type="primary" @click="requireCode">提交</el-button>
				</div>
			</el-collapse-transition>
			<el-collapse-transition>
				<div v-show="show.codeinput">
					<label style="font-size:18px;margin-right: 8px;">验证码</label>
					<el-input placeholder="请输入验证码" v-model="data.code" class="codeinput">
					</el-input>
					<el-button :class="show.refalsh" type="primary" @click="getcode">{{show.time}}</el-button>
					<div style="width: 100%;height: 96px;"></div>
					<el-button type="primary" @click="testCode">验证</el-button>
				</div>
			</el-collapse-transition>
			<el-collapse-transition>
				<div v-show="show.newMail">
					<label style="font-size:18px;margin-right: 8px;">新邮箱</label>
					<el-input placeholder="请输入新邮箱" v-model="data.newMail" class="mailinput" @blur="checkmail">
					</el-input>
					<div style="width: 100%;height: 96px;"></div>
					<el-button type="primary" @click="submitNew">提交</el-button>
				</div>
			</el-collapse-transition>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data: {
					mail: "", //旧邮箱
					code: "", //输入验证码
					realCode: "11" ,//实际验证码
					newMail:"" //新邮箱
				},
				show: {
					mailinput: true, //邮箱输入框和验证码输入框
					time: "30", //验证码倒计时
					refalsh: "codeflash", //刷新验证码按钮类
					codeinput: false, //验证码输入框显示
					newMail:false //输入新邮箱
				},
				step: 1,
			}
		},
		mounted() {},
		methods: {
			requireCode() {
				//旧邮箱请求验证码				
				if (this.data.mail == "") {
					this.$notify.error({
						title: 'ERROR',
						message: '邮箱不能为空',
						position: 'bottom-right',
						duration: 800
					});
				} else {
					this.step = 2
					this.show.mailinput = false
					this.show.codeinput = true
					this.show.time = 30
					this.$notify({
						title: 'SUCCESS',
						message: '验证码已发送',
						position: 'bottom-right',
						type: 'success',
						duration: 1000,
					});
					var times = setInterval(() => {
						this.show.time--; //递减						
						if (this.show.time <= 0) {
							clearInterval(times);
							this.show.time = ""
							this.show.refalsh = "el-icon-refresh"
						}
					}, 1000); //1000毫秒后执
				}
			},
			testCode() {
				//验证验证码是否正确
				if(this.data.code==""){
					this.$notify.error({
						title: 'ERROR',
						message: '验证码不能为空',
						position: 'bottom-right',
						duration: 800
					});
				}else if(this.data.code!=this.data.realCode){
					this.$message({
						message: "验证码错误",
						type: 'error'
					});
				}else{
					this.step=3
					this.show.codeinput=false
					this.show.newMail=true
				}
			},
			submitNew(){
				//提交新的邮箱
			},
			checkmail() {
				//邮箱格式检查
				let mailcheck = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
				if (this.data.mail == "") {
					this.$notify({
						title: 'WARING',
						message: '邮箱不能为空',
						position: 'bottom-right',
						duration: 800
					});
				} else if (mailcheck.test(this.data.mail) == false) {
					this.$notify.error({
						title: 'error',
						message: '请填写正确的邮箱',
						position: 'bottom-right',
						duration: 800
					});
				}
			},
			getcode() {
				this.show.time = this.show.time * 1
				if (this.show.time > 0) {
					this.$message({
						message: this.show.time + "" + "秒后再试",
						type: 'warning'
					});
				} else {
					this.show.refalsh = "codeflash"
					this.$notify({
						title: 'SUCCESS',
						message: '验证码已发送',
						position: 'bottom-right',
						type: 'success',
						duration: 1000,
					});
					this.show.time = 30
					var times = setInterval(() => {
						this.show.time--; //递减						
						if (this.show.time <= 0) {
							clearInterval(times);
							this.show.time = "获取"
						}
					}, 1000); //1000毫秒后执行		
				}
			},
		}
	}
</script>

<style scoped>
	.inputarea {
		/* 白色输入区域 */
		width: 60%;
		height: 362px;
		margin-left: 20%;
		background-color: #ffffff;
		border-radius: 12px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
	}

	.mailinput {
		/* 旧邮箱输入框 */
		width: 64%;
	}

	.codeflash {
		/* 重新获取验证码按钮 */
		text-align: center;
		font-size: 12px;
	}

	.el-icon-refresh {
		text-align: center;
		font-size: 14px;
	}

	.codeinput {
		/* 验证码输入框 */
		width: 48%;
		margin-right: 16px;
	}
</style>
