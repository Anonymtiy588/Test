<template>
	<div>
		<el-empty description="暂无相关数据" v-if="show.nodata" id="empty"></el-empty>
		<div class="vforarea" v-for="(item,index) in data">
			<div class="f1">
				{{item.education.gradation}}{{item.education.certificateType}}证书
			</div>
			<div class="f2">
				<div class="f21" :style="{backgroundImage: 'url('+item.personal.photo+')'}">
				</div>
				<div class="f22">
					<div class="f221">
						<div class="f2211">
							姓名
						</div>
						<div class="f2212">
							{{item.personal.name}}
						</div>
					</div>
					<div class="f221">
						<div class="f2211">
							性别
						</div>
						<div class="f2212">
							{{item.personal.sex}}
						</div>
					</div>
					<div class="f221">
						<div class="f2211">
							民族
						</div>
						<div class="f2212">
							{{item.personal.nation}}
						</div>
					</div>
					<div class="f221">
						<div class="f2211">
							证件号码
						</div>
						<div class="f2212">
							{{item.personal.ID}}
						</div>
					</div>
				</div>
			</div>
			<div id="f3">
				<div id="f31">
					<div class="f311">
						学校
					</div>
					<div class="f312">
						{{item.education.school}}
					</div>
				</div>
				<div class="f32">
					<div class="f311">
						(预计)毕业日期
					</div>
					<div class="f31211">
						{{item.education.endTime}}
					</div>
				</div>
			</div>
			<div class="f4">
				<div class="f41">
					<div class="f311">
						专业
					</div>
					<div class="f312">
						{{item.education.major}}
					</div>
				</div>
				<div class="f32">
					<div class="f311">
						学制
					</div>
					<div class="f31211">
						{{item.education.duration}}
					</div>
				</div>
			</div>
			<div class="f5">
				<div class="f51">
					学生签名
				</div>
				<div class="f52">
					{{item.signature}}
				</div>
			</div>
			<div class="f6">
				<div class="f61" @click="showdeatil(index)">
					<el-button slot="reference" @click="showdeatil(index)" class="morebt">Learn More</el-button>
				</div><!-- @click="dialogTableVisible = true" -->
				<!--  -->
				<div class="f62" >
					<el-dropdown trigger="click"  @command="handleCommand">
						<el-button class="downloadbt" @click="download(index)">
							<i class="el-icon-download el-icon--right"></i>						
						</el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="downloadPicture">保存为图片</el-dropdown-item>
							<el-dropdown-item command="downloadPdf">保存为pdf</el-dropdown-item>
						  </el-dropdown-menu>
					</el-dropdown>
				</div>
			</div>
		</div>
		<el-dialog title="详细信息" :visible.sync="deatil" draggable="true">
			<el-descriptions class="margin-top" :column="4" size="medium" border>
				<el-descriptions-item label="姓名" span="2">{{data[number].personal.name}}</el-descriptions-item>
				<el-descriptions-item label="学历等级" span="2">{{data[number].education.gradation}}</el-descriptions-item>
				<el-descriptions-item label="性别" span="2">{{data[number].personal.sex}}</el-descriptions-item>
				<el-descriptions-item label="证书类型" span="2">{{data[number].education.certificateType}}证书
				</el-descriptions-item>
				<el-descriptions-item label="民族" span="2">{{data[number].personal.nation}}</el-descriptions-item>
				<el-descriptions-item label="证书编号" span="2">{{data[number].certificateNum}}</el-descriptions-item>
				<el-descriptions-item label="出生日期" span="2">{{data[number].personal.birth}}</el-descriptions-item>
				<el-descriptions-item label="证件号码" span="2">{{data[number].personal.ID}}</el-descriptions-item>
				<el-descriptions-item label="学校" span="2">{{data[number].education.school}}</el-descriptions-item>
				<el-descriptions-item label="学院" span="2">{{data[number].education.college}}</el-descriptions-item>
				<el-descriptions-item label="专业班级" span="2">
					{{data[number].education.major}}{{data[number].education.class}}</el-descriptions-item>
				<el-descriptions-item label="学号" span="2">{{data[number].education.number}}</el-descriptions-item>
				<el-descriptions-item label="学历类型" span="2">
					{{data[number].education.classification}}
				</el-descriptions-item>
				<el-descriptions-item label="学历方式" span="2">{{data[number].education.learningForm}}
				</el-descriptions-item>
				<el-descriptions-item label="学制" span="2">{{data[number].education.duration}}</el-descriptions-item>
				<el-descriptions-item label="入学时间" span="2">{{data[number].education.startTime}}</el-descriptions-item>
				<el-descriptions-item label="毕业时间" span="2">{{data[number].education.endTime}}</el-descriptions-item>
				<el-descriptions-item label="院(校)长姓名" span="2">{{data[number].education.schoolMaster}}
				</el-descriptions-item>
				<el-descriptions-item label="学生签名" span="4">{{data[number].signature}}</el-descriptions-item>
				<el-descriptions-item label="数据DID" span="4">{{data[number].dataDID}}</el-descriptions-item>
			</el-descriptions>
		</el-dialog>
	</div>
</template>

<script>
	import './datacss.css'
	export default {
		data() {
			return {
				username: "",
				show: {
					nodata: false
				},
				downloadindex:0, //下载按钮保存的index
				deatil: false, //查看详情弹窗是否显示
				number: 0, //查看详情保存的index
				data: [{
						certificateNum: "2222",
						dataDID: "XXXX",
						signature: "XXXXXX",
						education: {
							gradation: "小学",
							certificateType: "毕业",
							schoolMaster: "严晓红",
							school: "江苏大学",
							college: "计算机科学与通信工程学院",
							major: "软件工程",
							class: "1901",
							number: "0000000000",
							classification: "普通高等教育",
							learningForm: "普通全日制",
							duration: "2年",
							startTime: "2019年00月00日",
							endTime: "2023年10月10日"
						},
						personal: {
							photo: "http://139.196.45.104/img/test.png",
							name: "34234",
							sex: "男",
							nation: "汉",
							ID: "XXXXXXXXXXXXXXXXX",
							birth: "XXXX年XX月XX日"
						}
					}, {
						certificateNum: "2222",
						dataDID: "XXXX",
						signature: "XXXXXX",
						education: {
							gradation: "初中",
							certificateType: "毕业",
							schoolMaster: "严晓红",
							school: "江苏大学",
							college: "计算机科学与通信工程学院",
							major: "物联网工程",
							class: "1901",
							number: "0000000000",
							classification: "普通高等教育",
							learningForm: "普通全日制",
							duration: "3年",
							startTime: "2019年00月00日",
							endTime: "2023年03月10日"
						},
						personal: {
							photo: "http://139.196.45.104/img/header2.jpeg",
							name: "XXX",
							sex: "女",
							nation: "汉",
							ID: "XXXXXXXXXXXXXXXXX",
							birth: "XXXX年XX月XX日"
						}
					}, {
						certificateNum: "3333",
						dataDID: "XXXX",
						signature: "XXXXXX",
						education: {
							gradation: "高中",
							certificateType: "毕业",
							schoolMaster: "严晓红",
							school: "北京大学",
							college: "计算机学院",
							major: "计算机科学与技术",
							class: "1901",
							number: "0000000000",
							classification: "普通高等教育",
							learningForm: "普通全日制",
							duration: "4年",
							startTime: "2019年00月00日",
							endTime: "2023年09月23日"
						},
						personal: {
							photo: "http://139.196.45.104/img/header.jpeg",
							name: "XXX",
							sex: "女",
							nation: "汉",
							ID: "XXXXXXXXXXXXXXXXX",
							birth: "XXXX年XX月XX日"
						}
					},{
						certificateNum: "44444",
						dataDID: "XXXX",
						signature: "XXXXXX",
						education: {
							gradation: "本科",
							certificateType: "毕业",
							schoolMaster: "严晓红",
							school: "北京大学",
							college: "计算机学院",
							major: "计算机科学与技术",
							class: "1901",
							number: "0000000000",
							classification: "普通高等教育",
							learningForm: "普通全日制",
							duration: "5年",
							startTime: "2019年00月00日",
							endTime: "2023年09月23日"
						},
						personal: {
							photo: "http://139.196.45.104/img/header.jpeg",
							name: "X324XX",
							sex: "女",
							nation: "汉",
							ID: "XXXXXXXXXXXXXXXXX",
							birth: "XXXX年XX月XX日"
						}
					}]

					,
				dialogFormVisible: false
			}
		},
		mounted() {
			this.username = sessionStorage.getItem("UN"); //获取用户名
			//向后端请求相关学历数据
			// this.$api.get('http://139.196.45.104:9000/StuUser/login', {
			// 	"username":this.username
			// }, response => {
			// 	if (response.status >= 200 && response.status < 300) {
			// 		console.log(response.data); //请求成功，response为成功信息参数

			// 	} else {
			// 		console.log(response.message); //请求失败，response为失败信息
			// 	}
			// });
		},
		methods: {
			showdeatil(index) {
				this.deatil = true
				this.number = index
			},
			download(index){
				this.downloadindex=index
			},
			handleCommand(command) {
					if(command=="downloadPicture"){
						//下载图片
					}else{
						//下载Pdf
					}
			}
		}
	}
</script>
<style scoped>
	#empty {
		text-align: center;
		margin-top: 8%;
	}

	.morebt {
		width: 100%;
		height: 32px;
		border-radius: 0;
	}
	.downloadbt{
		width: 100%;
		height: 32px;
		border-radius: 0;
	}
	.el-dropdown {
	    vertical-align: top;
	  }
	  .el-dropdown + .el-dropdown {
	    margin-left: 15px;
	  }
	  .el-icon-arrow-down {
	    font-size: 12px;
	  }
</style>
