<template>
	<div class="whole">
		<div class="show">
			<div class="img" :style="{backgroundImage: 'url('+personaldata.img+')'}"></div>
		</div>
		<div class="message show">
			<div style="margin: 64px;text-align: center;">
				<el-descriptions title="个人信息" :column="4" border>
					<el-descriptions-item label="姓名" :span="4">
						{{personaldata.name}}
					</el-descriptions-item>
					<el-descriptions-item label="性别" :span="4">
						{{personaldata.sex}}
					</el-descriptions-item>
					<el-descriptions-item label="民族" :span="4">
						{{personaldata.nation}}
					</el-descriptions-item>
					<el-descriptions-item label="身份证号码" :span="4">
						{{personaldata.identifyID}}
					</el-descriptions-item>
					<el-descriptions-item label="出生日期" :span="4">
						{{personaldata.birth}}
					</el-descriptions-item>
					<el-descriptions-item label="(目前)住址" :span="4">
						<div @click="showaddress">
							{{personaldata.address}}
						</div>						
					</el-descriptions-item>
					<el-descriptions-item label="(最高)学府" :span="4">
						{{personaldata.school}}
					</el-descriptions-item>
					<el-descriptions-item label="(最高)学历" :span="4">
						{{personaldata.gradation}}
					</el-descriptions-item>
				</el-descriptions>
			</div>
		</div>
		<el-dialog title="修改家庭住址" :visible.sync="address">
			<el-input placeholder="请输入内容" clearable>
			</el-input>
			<div slot="footer" class="dialog-footer">
				<el-button @click="address = false">取 消</el-button>
				<el-button type="primary" @click="sureAddress">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				personaldata: {
					id: "123123123", //用户id
					img: "http://139.196.45.104/img/test.png", //照片
					name: "34234", //姓名
					sex: "男", //性别
					nation: "汉", //民族
					identifyID: "XXXXXXXXXXXXXXXXX", //身份证号码
					birth: "XXXX年XX月XX日", //出生日期			
					school: "江苏大学", //（当前就读）学府
					gradation: "本科", //当前最高学历					
					mail: "XXXXXX@XX.com", //绑定邮箱
					address: "江苏省镇江市京口区XX小区X号楼XXX", //家庭住址				
				},
				address: false
			}
		},
		mounted() {
			//相当于onLoad
		},
		methods: {
			showaddress() {
				this.address=true
			},
			sureAddress(){
				//此处写上传接口
				this.address=false
			}
			
		}
	}
</script>

<style scoped>
	.whole {
		/* 整体布局 */
		display: flex;
		flex-direction: row;
	}

	.img {
		/* 照片 */
		width: 327px;
		height: 480px;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		/* 测试 */

	}

	.show {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.message {
		/* 右侧整体信息 */
		width: 74.09%;
		height: 606px;
		padding: auto;
		/* 测试 */
		/* background-color: #55aa7f; */
	}
</style>
