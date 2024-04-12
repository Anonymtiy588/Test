<template>
	<div class="bg">
		<div class="from">
			<el-tooltip class="item" effect="dark" content="返回上一步" placement="left">
				<button class="returnbt el-icon-back" @click="place"></button> >
			</el-tooltip>
			<div>
				<p class="toptext" style="font-size: 24px;">Forget Password</p>
				<p class="toptext2" style="font-size: 18px;">For recover your password</p>
			</div>
			<div style="margin-top: 108px;" v-if="show.before">
				<label class="labertext">绑定邮箱</label>
				<el-input placeholder="请输入邮箱" prefix-icon="el-icon-edit" v-model="mail" clearable class="input"
					@blur="checkemail"></el-input>
			</div>
			<div v-if="show.after">
				<p class="toptext" style="font-size: 20px;">验证码已发送到{{inputemail}}</p>
				<p style="font-size: 12px; text-align: center; margin-top: 32px; color: #c2c2c2;">请输入验证码</p>
			</div>
			<div v-if="show.after" style="margin-top: 4px;">
				<el-input placeholder="请输入验证码" prefix-icon="el-icon-edit" v-model="code" clearable class="codeinput"
					@blur="checkemail"  ></el-input>
				<el-button type="primary" class="codeflash" @click="getcode">{{time}}</el-button>
			</div>
			<div class="bt">
				<el-button type="primary" style="width: 80%;" @click="submit" v-if="show.before">提交</el-button>
				<el-button type="primary" style="width: 80%;" @click="submit2" v-if="show.after">提交</el-button>
			</div>
			<div class="register">
				<label style="font-size: 10px; color:#959595">尚未注册？</label>
				<el-link type="primary" style="font-size: 10px;" @click="register">点击此处注册</el-link>
			</div>
		</div>
		<!-- <el-button type="primary" @click="test">test</el-button> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: {
					before: true,
					after: false
				},
				mail: "", //绑定邮箱
				inputemail: "", //用户输入的邮箱
				code: "", //输入验证码
				time: 30,
				returncode: "", //返回的验证码
				placement: "1"
			}
		},
		mounted() {
			//相当于onLoad
		},
		methods: {
			test(){
				this.$router.push("/newpassword")
			},
			place() {
				console.log("place函数this.placement" + this.placement)
				if (this.placement == "1") {
					this.$router.replace('/')
				} else if (this.placement == "2") {
					this.show.before = true
					this.show.after = false
					this.placement = "1"
				}
			},
			checkemail() {
				let mailcheck = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
				if (this.mail == "") {
					this.$message({
						message: '邮箱为必填项！',
						type: 'warning'
					});
				} else if (mailcheck.test(this.mail) == false) {
					let that = this
					this.$notify({
						title: 'ERROR',
						message: '请输入正确的邮箱！',
						position: 'bottom-right',
						type: 'error',
						duration: 800,
						onClose() {
							console.log("close")
							that.mail = ""
						}
					});
				}
			},
			submit() {
				this.inputemail = this.mail

				if (this.mail == "") {
					this.$message({
						message: '邮箱为必填项！',
						type: 'warning'
					});
				} else {
					//改变组件显示
					this.show.before = false
					this.show.after = true
					this.placement = "2"
					//脱敏
					this.inputemail = this.$options.methods.hideCode(this.inputemail, 2, 6)
					//开始倒计时30
					var times = setInterval(() => {
						this.time--; //递减						
						if (this.time <= 0) {
							clearInterval(times);
							this.time = "获取"
						}
					}, 1000); //1000毫秒后执行		
					//开始请求http://121.5.50.163:9010/student/sendVCode?email=746662113@qq.com
					this.$http.get('http://121.5.50.163:9010/student/sendVCode?email=' + this.mail).then(res => {
						this.returncode = res.data.data

						this.$notify({
							title: 'SUCCESS',
							message: '验证码已发送',
							position: 'bottom-right',
							type: 'success',
							duration: 1000,
						});
						sessionStorage.setItem("userid", this.inputemail);
					})
				}

			},
			submit2() {
				//验证
				// this.returncode
				this.placement = "2"
				if (this.code == "") {
					this.$message({
						message: '验证码不可为空！',
						type: 'warning'
					});
				} else {
					//匹配验证码正确则跳转登录
					//sessionStorage.setItem("UN", this.user.username); //存储用户名到session中
					if (this.code == this.returncode) {
						this.$router.push("/newpassword")
						sessionStorage.setItem("UN", this.user.username);
					}
				}
			},
			getcode() {
				if (this.time > 0) {
					this.$message({
						message: this.time + "" + "秒后再试",
						type: 'warning'
					});
				} else {
					this.$notify({
						title: 'SUCCESS',
						message: '验证码已发送',
						position: 'bottom-right',
						type: 'success',
						duration: 1000,
					});
					this.time = 30
					var times = setInterval(() => {
						this.time--; //递减						
						if (this.time <= 0) {
							clearInterval(times);
							this.time = "获取"
						}
					}, 1000); //1000毫秒后执行		
				}
			},
			hideCode(str, frontLen, endLen) {
				var len = str.length - frontLen - endLen;
				var xing = '';
				for (var i = 0; i < len; i++) {
					xing += '*';
				}
				return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
			},
			register() {
				this.$router.replace('/register')
			}
		}
	}
</script>
<style scoped>
	.bg {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: row;
		justify-content: center;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-image: url('../../assets/1.png');
	}

	.from {
		/* 输入表单 */
		background-color: #ffffff;
		width: 40%;
		height: 80vh;
		margin-right: 8vh;
		margin-top: 8vh;
		border-radius: 8px;
		box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.4)
	}

	.toptext {
		/* 介绍文字 */
		position: inherit;
		text-align: left;
		text-align: center;
		margin-top: 42px;
	}

	.toptext2 {
		position: inherit;
		text-align: left;
		text-align: center;
	}

	.input {
		/* 输入框样式 */
		width: 90%;
		height: 36px;
		margin-left: 24px;
		margin-top: 8px;

	}

	.codeinput {
		width: 70%;
		height: 36px;
		margin-left: 24px;
		margin-top: 8px;
	}

	.labertext {
		/* 输入框提示文字 */
		margin-left: 24px;
		font-size: 14px;
		color: #c2c2c2;
	}

	.bt {
		/* 提交按钮 */
		display: flex;
		justify-content: center;
		flex-direction: row;
		position: absolute;
		bottom: 148px;
		width: 40%;
	}

	.codeflash {
		text-align: center;
		font-size: 12px;
		margin-left: 16px;
	}

	.register {
		position: absolute;
		bottom: 110px;
		right: 510px;
	}

	.returnbt {
		margin-top: 4px;
		background-color: #ffffff;
		width: 20px;
		border: 0px;
		border-radius: 8px;
		font-size: 18px;
	}
</style>
