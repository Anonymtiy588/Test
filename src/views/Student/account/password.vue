<template>
	<div style="background-color: #dedede;height: 100%;">
		<div style="width: 100%; height: 32px;"></div>
		<el-steps :active="step" align-center>
		  <el-step title="输入绑定邮箱" description="验证绑定邮箱"></el-step>
		  <el-step title="获取动态验证码" description="获取动态验证码以验证身份"></el-step>
		  <el-step title="确认密码" description="密码重置"></el-step>
		</el-steps>
		<div style="width: 100%; height: 64px;"></div>
		<div class="inputarea">
			<div style="width: 100%; height: 64px;"></div>
			<label class="labertext" v-if="show.inputmail">邮箱</label>			
			<el-input placeholder="请输入绑定邮箱" v-model="data.mail" class="input" @blur="checkmail" autocomplete v-if="show.inputmail">
			</el-input><br/>
			<label class="labertext " v-show="show.perCode">验证码</label>
			<el-input placeholder="请输入验证码" v-model="data.code" class="codeinput" v-show="show.perCode">
			</el-input>
			
			<label class="labertext" v-if="show.end">重置密码</label>
			<el-input placeholder="请输入新密码" v-model="data.password" class="input" autocomplete v-if="show.end">
			</el-input>
			<el-button type="primary" class="codeflash" @click="getcode"  v-show="show.perCode">{{show.time}}</el-button>
			<el-button type="primary" style="width: 60%;margin-top: 84px;" @click="submit" v-if="show.perbt">提交</el-button>	
			<el-button type="primary" style="width: 60%;margin-top: 84px;" @click="submit1"  v-if="show.endbt">提交</el-button>
			<el-button type="primary" style="width: 60%;margin-top: 84px;" @click="submit3"  v-if="show.submitpasswordbt">提交</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data:{
					mail:"",
					code:"",
					realcode:"111",
					password:""
				},
				show:{
					inputmail:true, //邮箱输入框
					reflashicon:"codeflash",
					time:30,
					perCode:false,	 //倒计时按钮
					end:false, //输入新密码
					endbt:false, //验证码验证按钮
					perbt:true ,//验证码提交按钮
					submitpasswordbt:false //新密码提交按钮
				},
				step:1,
			}
		},
		mounted() {
		},
		methods: {
			submit3(){
				//提交新密码					
				if(this.data.password==""){
					this.$notify.error({
					  title: 'ERROR',
					  message: '新密码不能为空',
					  position: 'bottom-right',
					  duration:800
					});
				}else{
					this.step=3
				}
				
			},
			submit1(){
				//验证验证码
				if(this.data.code==""){
					this.$notify({
					  title: 'WARING',
					  message: '验证码不能为空',
					  position: 'bottom-right',
					  duration:800
					});
				}else if(this.data.code!=this.data.realcode){
					this.$notify.error({
					  title: 'ERROR',
					  message: '验证码错误',
					  position: 'bottom-right',
					  duration:800
					});
				}else{
					this.show.endbt=this.show.inputmail=this.show.perCode=false
					this.show.submitpasswordbt=this.show.end=true
					this.step++
				}
			},
			submit(){
				//获取验证码
				if(this.data.mail==""){
					this.$notify({
					  title: 'WARING',
					  message: '邮箱不能为空',
					  position: 'bottom-right',
					  duration:800
					});
				}else{
					this.show.perCode=true
					var times = setInterval(() => {
						this.show.time--; //递减						
						if (this.show.time <= 0) {
							  clearInterval(times);
							  this.show.time="获取"
						}
					}, 1000); //1000毫秒后执行
					//获取验证码
					this.show.perbt=false
					this.show.endbt=true
					this.step++
				}			
			},
			checkmail(){
				let  mailcheck = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
				if(this.data.mail==""){
					this.$notify({
					  title: 'WARING',
					  message: '邮箱不能为空',
					  position: 'bottom-right',
					  duration:800
					});
				}else if(mailcheck.test(this.data.mail)==false){
					this.$notify.error({
					  title: 'error',
					  message: '请填写正确的邮箱',
					  position: 'bottom-right',
					  duration:800
					});
				}
			},
			getcode(){
				if(this.show.time>0){
					this.$message({
					  message: this.show.time+""+"秒后再试",
					  type: 'warning'
					});
				}else{
					this.$notify({
					  title: 'SUCCESS',
					  message: '验证码已发送',
					  position: 'bottom-right',
					  type:'success',
					  duration:1000,					  
					});
					this.show.time=30
					var times = setInterval(() => {
						this.show.time--; //递减						
						if (this.show.time <= 0) {
							clearInterval(times);
							this.show.time="获取"
						}
					}, 1000); //1000毫秒后执行		
				}
			},
		}
	}
</script>

<style scoped>
	.inputarea{
		width: 60%;
		height: 362px;
		margin-left: 20%;
		background-color: #ffffff;
		border-radius: 12px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
	}
	.input{
		width: 60%;
	}
	.labertext{
		margin-right: 8px;
		font-size:18px;
	}
	.codeinput{
		margin-top: 32px;
		width: 46%;
	}
	.codeflash{
		text-align: center;
		font-size: 12px;
		margin-left: 16px;
	}
</style>