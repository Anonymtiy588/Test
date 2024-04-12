<template>
	<div class="bg">
		<div class="from">
			<div>
				<!-- 文字描述区域 -->
				<p class="Formtext" style="font-size: 24px;">设置密码</p>
				<p class="Formtext" style="font-size: 14px; color: #959595;">设置新密码</p>
			</div>
			<div>
				<div>
					<label class="labertext">新密码</label><br />
					<el-input placeholder="输入密码" v-model="password" clearable class="input-with-select input"
						autocomplete="on">
					</el-input>
				</div>
				<div style="margin-top: 8px;">
					<label class="labertext">密码</label>
					<el-input placeholder="密码" prefix-icon="el-icon-edit" v-model="password2" show-password
						clearable class="input" style=""></el-input>
				</div>
			</div>
			<div style="text-align: center; margin-top: 12px;">
				<el-button type="primary" style="width: 80%; height:40px;" @click="submit">提交</el-button>
			</div>
		</div>
		<<button type="button" @click="test">test</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				password:"",
				password2:""

			}
		},
		methods: {
			test() {
				this.$router.push({
					path: '/'
				})
			},
			submit() {
				if (this.password!=this.password2) {
					this.$notify({
						title: 'ERROR',
						message: '两次输入不一致',
						position: 'bottom-right',
						type: 'error',
						duration: 800,
					});
				} else {
					//此处改一个新密码接口
					this.$http.post('http://139.196.45.104:9010/login', this.user).then(res => {
						console.log(res)
						console.log(res.data)
						this.$router.push({
							path: '/'
						})
					})

				}			
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
		flex-direction: column;
		justify-content: center;
		align-items: center;

	}

	.from {
		/* 输入表单 */
		background-color: #ffffff;
		width: 40%;
		height: 74vh;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.4)
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
	.labertext {
		/* 输入框提示文字 */
		margin-left: 24px;
		font-size: 14px;
		color: #c2c2c2;
	}
</style>
