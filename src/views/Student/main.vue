<template>
	<div>
		<el-container>
			<el-header>欢迎，{{username}}Anonymity@163.com</el-header>
			<el-container>

				<div :style="{':width=':sidewide}" :class="sideclass">
					<el-menu :router=true default-active="2" class="el-menu-vertical-demo" :unique-opened=true
						background-color="#545c64" text-color="#fff" :collapse="isCollapse" active-text-color="#ffd04b"
						:collapse-transition=true>						
						<el-submenu index="2">
							<template slot="title">
								<i class="el-icon-message-solid"></i>
								<span>学历数据</span>
							</template>							
							<el-menu-item-group>
								<el-menu-item index="/Student/dataconfig">学籍认证</el-menu-item>
							</el-menu-item-group>
							<el-menu-item-group>
								<el-menu-item index="/Student/studata">学历认证</el-menu-item>
							</el-menu-item-group>
						</el-submenu>												
						<el-submenu index="2">
							<template slot="title">
								<i class="el-icon-message-solid"></i>
								<span>通知信息</span>
							</template>
							<el-menu-item-group>
								<template slot="title">数据变更通知</template>
								<el-menu-item index="/Student/notice/school">学校通知</el-menu-item>
							</el-menu-item-group>
							<el-menu-item-group>
								<template slot="title">申请通知</template>
								<el-menu-item index="/Student/notice/hr">企业通知</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-submenu index="3">
							<template slot="title">
								<i class="el-icon-s-tools"></i>
								<span>账号管理</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="/Student/account/personal">个人信息</el-menu-item>
							</el-menu-item-group>
							<el-menu-item-group>
								<template slot="title">账号安全</template>
								<el-menu-item index="/Student/account/mail">绑定邮箱</el-menu-item>
								<el-menu-item index="/Student/account/password">账号密码</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
					</el-menu>
					<el-button @click="change" :style="{'width':sidewide}" :class="changebt">{{direction}}</el-button>
				</div>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				username: "",
				iden: "",
				isCollapse: false,
				sidewide: "200px",
				test:"",
				sideclass:"",
				direction:"<",
				changebt:"changebtclass"
			}
		},
		mounted() {
			//相当于onLoad
			this.username = sessionStorage.getItem("UN");
			this.iden = sessionStorage.getItem("IDEN")
			// console.log(this.username)

		},
		methods: {
			change() {
				this.isCollapse = !this.isCollapse
				if (this.sidewide == "200px") {
					this.sidewide = "64px"
					this.sideclass="side1"
					this.direction=">"
					this.changebt="changebtclass2"
					
				} else {
					this.sidewide = "200px"
					this.sideclass="side2"	
					this.changebt="changebtclass3"				
					setTimeout(()=>{
					    this.direction="<"
					},2200)  //一秒钟打印出111
				}							
			}
		}
	}
</script>
<style scoped>
	/* 整体布局样式 */
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 13vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.side {
		background-color: #D3DCE6;
		height:  89.6vh;
		color: #333;
		text-align: center;
		/* animation:; */
		height: 89.6vh;
		overflow: hidden;
		
	}
	.side1{
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		/* animation:; */
		height: 89.6vh;
		animation: start 0s;
		overflow: hidden;
	}
	.side2{
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		/* animation:; */
		height: 89.6vh;
		animation: end 2.2s;
	}

	.el-main {
		background-color: #ffffff;
		color: #333;
		text-align: center;
		/* line-height: 82.6vh; */
		height: 89.6vh;
	}

	.menu-wrapper {
		/* 去除滚动条 */
		overflow: hidden;
	}

	.el-menu {
		/* 导航栏右侧突出去除 */
		border-right: none;
	}

	@keyframes start {
		0% {
			width: 200px;
		}

		100% {
			width: 64px;
		}
	}
	@keyframes end {
		0% {
			width: 64px;
		}
		
		100% {
			width: 200px;
		}
	}

	.el-menu-vertical-demo{
		background-color: chocolate;
	}
	.changebtclass{
		position: relative;
		bottom: 0px;
	}
	.changebtclass2{
		position: relative;
		bottom: 0px;
		animation: start 0s;
	}
	.changebtclass3{
		position: relative;
		bottom: 0px;
		animation: end 2.2s;
	} 
</style>
