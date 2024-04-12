<template>
	<div class="bg">
		<div class="display">
			<p class="introducetext" style="font-size: 24px; margin-bottom: 12px;">学历存证系统</p>
			<p class="introducetext" style="font-size: 14px;">Welcome To DDSS</p>
			<p class="introducetext" style="font-size: 13px;">{{introduce}}</p>
		</div>

		<div class="from">
			<el-tooltip class="item" effect="dark" content="返回上一步" placement="left">
				<button class="returnbt el-icon-back" @click="place"></button> >
			</el-tooltip>	
			<div style="margin-top: 18px;"><!-- 文字描述区域 -->
				<p class="Formtext" style="font-size: 24px; margin-bottom: 8px;">注册</p>
				<p class="Formtext" style="font-size: 14px; color: #959595;">注册以获取账户</p>			
			</div>
			<div style="margin-top: 12px;">
				<div>
					<label class="labertext">账号</label>
					<el-input placeholder="注册账户" v-model="user.username"  clearable 
					class="input-with-select input " @blur="checkusername">
						<el-select placeholder="身份" slot="prepend" @change="identify" v-model="iden">
							<el-option v-for="item in options" :key="item.value" :label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-input>
				</div>
				<div style="margin-top: 8px;">
					<label class="labertext">密码</label>
					<el-input placeholder="密码" prefix-icon="el-icon-edit" v-model="user.password"  clearable show-password
					class="input"></el-input>
				</div>
				<div style="margin-top: 8px;">
					<label class="labertext">邮箱绑定</label><br/>
					<el-input placeholder="邮箱" prefix-icon="el-icon-edit" v-model="user.mail"  clearable
					class="mailinput" @blur="checkmail"></el-input>
					<el-button type="primary" class="codeflash" @click="getcode">{{time}}</el-button>
				</div>
				<div style="margin-top: 8px;">
					<label class="codelabel">验证码</label>
					<el-input placeholder="验证码" prefix-icon="el-icon-edit" v-model="code"  clearable
					class="codeinput" @blur="checkcode"></el-input>
				</div>
			</div>
			<div style="margin-top: 32px; text-align: center;">
				<el-button type="primary" style="width: 80%;" @click="submit">注册</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				introduce:"本系统是一种基于区块链的电子数据存证系统.系统编写智能合约,将数据关键信息锚定在主链上"+
						"保证电子数据的不可篡改,同时约束不同用户对电子数据的访问权限.并引入分布式存储技术和用户积分机制"+
						"用以增加系统的可靠性",
				user:{
					username:"", //用户输入账户
					password:"", //用户输入密码
					mail:"", //邮箱
					identify:""
				},
				time:"获取验证码", //倒计时
				code:"", //验证码
				returncode:"",
				state:{
					uid:false,
					email:false,
					codesure:false,					
				},
				iden: "",
				options: [{
					value: 'Student',
					label: '学生'
				}, {
					value: 'Teacher',
					label: '教师'
				}, {
					value: 'Enterprise',
					label: '企业'
				}]
			}
		},
		mounted(){
			//相当于onLoad			
		},	
		methods: {
			identify(e) {
				console.log(e)
				this.user.identify=this.iden=e;				
			},
			submit(){
				if(this.state.uid==true&&this.state.email==true&&this.state.codesure==true){					
					sessionStorage.setItem("UN", this.user.username); //存储用户名到session中
					sessionStorage.setItem("IDEN", this.user.identify); //存储身份到用户名中
					//发送注册请求并且2秒后跳转至相应模块
				}else{
					this.$notify({
					  title: 'ERROR',
					  message: '请正确填写信息！',
					  position: 'bottom-right',
					  type:'error',
					  duration:800,					  
					});
				}
			},				
			place(){
				this.$router.replace('/')
			},
			checkmail(){
				let mailcheck = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
				if(this.user.mail==""){
					this.$message({
					  message: '邮箱为必填项！',
					  type: 'warning'
					});
				}else if(mailcheck.test(this.user.mail)==false){
					let that=this
					this.$notify({
					  title: 'ERROR',
					  message: '请输入正确的邮箱！',
					  position: 'bottom-right',
					  type:'error',
					  duration:800,					  
					  onClose(){
						  console.log("close")
						  that.mail=""
					  }
					});
				}else{
					this.state.email=true
				}
			},
			checkcode(){
				if(this.code==""){
					this.$message({
					  message: '验证码不可为空！',
					  type: 'warning'
					});
				}else if(this.returncode!=this.code){
					this.$notify({
					  title: 'ERROR',
					  message: '验证码错误！',
					  position: 'bottom-right',
					  type:'error',
					  duration:800,					  
					  onClose(){
						  this.code=""
					  }
					});
				}else{
					this.state.codesure=true
				}
			},
			checkusername(){
				//检查用户名是否已经注册
				this.$http.get('http://139.196.45.104:9010/student/judgment?username='+this.user.username).then(res=>{
						console.log(res)
						console.log(res.data)
				})
				
				
			},
			getcode(){
				//获取验证码按钮
				if(this.time=="获取验证码"){
					this.time=30
					this.$notify({
					  title: 'SUCCESS',
					  message: '验证码已发送',
					  position: 'bottom-right',
					  type:'success',
					  duration:1000,					  
					});
					var times = setInterval(() => {
						this.time--; //递减						
						if (this.time <= 0) {
							  clearInterval(times);
							  this.time="获取验证码"
						}
					}, 1000); //1000毫秒后执行											
				}else{
					this.$message({
					  message: this.time+""+"秒后再试",
					  type: 'warning'
					});					
				}				
			}
		}
	}
</script>
<style scoped>
	.el-select {
		width: 96px;
	}
	.bg{
		width: 100%;
		height: 100vh;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-image: url('../../assets/1.png');
		display: flex;
		flex-direction: row;
		justify-content: right;
	}
	.from{
		/* 输入表单 */
		background-color: #ffffff;
		width: 40%;
		height: 84vh;
		margin-right: 8vh;
		margin-top: 6vh;
		border-radius:8px;
		box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.4)
	}
	.display{
		/* 左侧展示介绍区域 */		
		color: #9a9a9a;
		width: 36%;
		height: 22vh;
		margin-right: 36vh;
		margin-top: 36vh;
		border-radius:8px;	
		
	}
	.introducetext{
		/* 左侧介绍文字 */
		position: inherit;
		text-align: left;
		margin-bottom: 6px;
	}
	.Formtext{
		/* 上部分文字 */
		position: inherit;
		text-align: center;
	}
	.input{
		/* 输入框样式 */
		width: 90%;
		height: 36px;
		margin-left: 24px;
		margin-top: 6px;
	}
	.labertext{
		/* 输入框提示文字 */
		margin-left: 24px;
		font-size: 14px;
		color: #c2c2c2;
	}
	.mailinput{
		/* 邮箱输入框 */
		width: 67%;
		height: 36px;
		margin-left: 24px;
		margin-top: 8px;
	}
	.codeflash{
		/* 验证码刷新按钮 */
		text-align: center;
		font-size: 12px;
		margin-left: 12px;
	}
	.codeinput{
		/* 验证码输入框样式 */
		width: 80%;
		height: 36px;
		margin-top: 6px;
		margin-left: 8px;
	}
	.codelabel{
		/* 验证码提示文字 */
		font-size: 14px;
		color: #c2c2c2;
		margin-left: 24px;
	}
	.returnbt{
		/* 返回按钮 */
		margin-top: 4px;
		background-color:#ffffff;
		width: 20px;
		border: 0px;
		border-radius:8px;
		font-size: 18px;
	}
</style>
