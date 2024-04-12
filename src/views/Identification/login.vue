<template>
	<div class="bg">
		<div class="displayleft">
			<p class="introducetext" style="font-size: 36px; margin-bottom: 12px;">学历存证系统</p>
			<p class="introducetext" style="font-size: 26px;">Welcome To DDSS</p>
			<p class="introducetext" style="font-size: 16px;">{{introduce}}</p>
		</div>
		<div class="from">
			<div>
				<!-- 文字描述区域 -->
				<p class="Formtext" style="font-size: 24px;">登录</p>
				<p class="Formtext" style="font-size: 14px; color: #959595;">登录以使用系统</p>
			</div>
			<div>
				<div>
					<label class="labertext">账号</label><br />
					<el-input placeholder="账户/邮箱" v-model="user.username" clearable class="input-with-select input" autocomplete="on">
						<el-select placeholder="身份" slot="prepend" @change="identify" v-model="user.identify">
							<el-option v-for="item in options" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-input>
				</div>
				<div style="margin-top: 8px;">
					<label class="labertext">密码</label>
					<el-input placeholder="密码" prefix-icon="el-icon-edit" v-model="user.password" show-password clearable
						class="input" style=""></el-input>
				</div>
			</div>
			<div class="forget">
				<el-link type="primary" style="font-size: 8px;" @click="forget">忘记密码？</el-link>
			</div>
			<div style="text-align: center; margin-top: 12px;">
				<el-button type="primary" style="width: 80%; height:40px;" @click="login">登录</el-button>
			</div>
			<div class="register">
				<label style="font-size: 10px; color:#959595">尚未注册？</label>
				<el-link type="primary" style="font-size: 10px;" @click="register">点击此处注册</el-link>
			</div>
		</div>
		<el-button type="primary" @click="test"></el-button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				introduce: "本系统是一种基于区块链的电子数据存证系统.系统编写智能合约,将数据关键信息锚定在主链上" +
					"保证电子数据的不可篡改,同时约束不同用户对电子数据的访问权限.并引入分布式存储技术和用户积分机制" +
					"用以增加系统的可靠性",
				user:{
					username:"",
					password:"",
					identify:""
				},
				select: "",
				iden: "",
				options: [{
					value: 'student',
					label: '学生'
				}, {
					value: 'teacher',
					label: '教师'
				}, {
					value: 'enterprise',
					label: '企业'
				}]
			}
		},
		mounted() {
			//相当于onLoad
		},
		methods: {
			test() {
				this.$router.replace('/Enterprise')
				// console.log(this.user)
			},
			identify(e) {
				// console.log(e)
				this.user.identify=e;
			},
			login() {
				if (this.user.username == "" || this.user.password == "") {
					this.$notify({
						title: 'ERROR',
						message: '用户名或密码不能为空！',
					 position: 'bottom-right',
						type: 'error',
						duration: 800,
					});
				} 
				else if (this.user.identify == "") {
					this.$notify({
						title: 'ERROR',
						message: '身份为必选项！',
						position: 'bottom-right',
						type: 'error',
					 duration: 800,
					});
				}
				 else {
					 this.$http.post('http://139.196.45.104:9010/login',this.user).then(res=>{
								console.log(res)
								console.log(res.data)
								
								sessionStorage.setItem("userid",this.user);
					       })					 
				}
				//console.log("sid=" + this.user.username + " " + "password=" + this.user.password)
			},
			forget() {
				this.$router.replace('/Reset')
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
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-image: url('../../assets/1.png');
		display: flex;
		flex-direction: row;
		justify-content: right;

	}

	.from {
		/* 输入表单 */
		background-color: #ffffff;
		width: 40%;
		height: 74vh;
		margin-right: 8vh;
		margin-top: 12vh;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.4)
	}

	.displayleft {
		/* 左侧展示介绍区域 */
		color: #9a9a9a;
		/* background: rgb(255, 255, 255,0.8); */
		width: 36%;
		height: 22vh;
		margin-right: 36vh;
		margin-top: 36vh;
		border-radius: 8px;

	}

	.introducetext {
		/* 左侧介绍文字 */
		position: inherit;
		text-align: left;
		margin-bottom: 6px;
	}

	.Formtext {
		/* 上部分文字 */
		position: inherit;
		text-align: center;
	}

	.input {
		/* 输入框样式 */
		width: 90%;
		height: 36px;
		margin-left: 24px;
		margin-top: 8px;

	}

	.el-select {
		width: 96px;
	}

	.uidinput {
		width: 50%;
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

	.forget {
		/* 忘记密码 */
		margin-top: 6px;
		margin-right: 6vh;
		text-align: right;
	}

	.register {
		margin-top: 48px;
		text-align: right;
		margin-right: 6vh;
	}
</style>
