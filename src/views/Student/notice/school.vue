<template>
	<div>
		<el-empty description="暂无相关数据" v-if="showempty" id="empty"></el-empty>
		<div class="bararea" v-if="showemptyteble">
			<!-- 操作区 -->
			<!-- 标为已读、全部标记为已读、删除已读通知 -->
			<div class="barbox">
				<div style="width: 100;height: 3vh;"></div>
				<el-button type="primary" class="bt_readed" @click="readed">标记为已读</el-button>
			</div>
			<div class="barbox">
				<div style="width: 100;height: 3vh;"></div>
				<el-button type="primary" class="bt_allReaded" @click="allreaded">一键已读</el-button>
			</div>
			<div class="barbox">
				<div style="width: 100;height: 3vh;"></div>
				<el-button type="primary" class="bt_delete" @click="deletereaded">删除已读</el-button>
			</div>
		</div>
		<div class="displayarea" v-if="showemptyteble">
			<!-- 表格展示区 -->
			<el-table ref="multipleTable" :data="noticedata" tooltip-effect="dark" class="tableclass"
				@selection-change="handleSelectionChange" height="446" @select="selectitem" @cell-click="showdeatil"
				@select-all="selectAllitem" >
				<el-table-column type="selection" width="80">
				</el-table-column>
				<el-table-column label="日期" width="220">
					<template slot-scope="scope">{{ scope.row.time }}</template>
				</el-table-column>
				<el-table-column prop="sponsor" label="通知发起人" width="140">
				</el-table-column>
				<el-table-column prop="record" label="变更证书" width="140">
				</el-table-column>
				<el-table-column label="通知内容" show-overflow-tooltip width="440">
					<template slot-scope="scope">
						{{ scope.row.content}}
					</template>
				</el-table-column>
				<el-table-column prop="state" label="通知状态" width="140"
					:filters="[{ text: '已读', value: '已读' }, { text: '未读', value: '未读' }]" :filter-method="filterTag"
					filter-placement="bottom-end">
					<template slot-scope="scope">
						<el-tag :type="scope.row.state === '已读' ? 'primary' : 'danger'" disable-transitions>
							{{scope.row.state}}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="120">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-tickets" 
						@click="handleEdit(scope.$index, scope.row)" circle></el-button>
						
						<el-button type="danger" icon="el-icon-delete" circle 
						@click="handleDelete(scope.$index, scope.row)"></el-button>
					</template>
				</el-table-column>
			</el-table><!-- items in deatilarr -->
		</div>
		<el-dialog title="详细更改信息" :visible.sync="deatil" draggable="true">
			<el-descriptions class="margin-top" :column="4" size="medium" border>
				<el-descriptions-item :label="item" span="2" v-for="(item,index) in daetillabelarr">
					{{daetilcontantarr[index]}}
				</el-descriptions-item>
			</el-descriptions>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				noticedata: [{
					id: "", //通知id 例123456&1653308863190(发起者id+时间戳)
					time: "2022年06月23日14点28分", //通知时间
					sponsor: "聂振文教师", //通知发起人（名字+身份）组合
					record: "本科毕业证书", //变更的证书的名字-如本科毕业证书
					content: { //与学历数据中的education同
						gradation: "sdfds",
						certificateType: "",
						schoolMaster: "wefwef",
						school: "dsfd",
						college: "qewrqwer",
						major: "werwe",
						class: "werwer",
						number: "319XXXXXXX",
						classification: "",
						learningForm: "",
						duration: "",
						startTime: "",
						endTime: ""
					}, //通知内容
					state: "已读" //通知状态
				}, {
					id: "", //通知id 例123456&1653308863190(发起者id+时间戳)
					time: "2022年06月23日14点28分", //通知时间
					sponsor: "聂振文教师", //通知发起人（名字+身份）组合
					record: "本科结业证书", //变更的证书的名字-如本科毕业证书
					content: { //与学历数据中的education同
						gradation: "",
						certificateType: "毕业",
						schoolMaster: "",
						school: "",
						college: "",
						major: "",
						class: "",
						number: "",
						classification: "",
						learningForm: "",
						duration: "",
						startTime: "",
						endTime: "2034年XX月XX日"
					}, //通知内容
					state: "未读" //通知状态
				}],
				all: [],
				changed: [{}], //从noticedata.content中处理过后的内容
				deatil: false,
				daetillabelarr: [],
				daetilcontantarr: [],
				getSelectionData: [{}],
				showempty:false,
				showemptyteble:true

			}
		},
		mounted() {
			//从noticedata.content中取出数据并放到changed中
			for (let i = 0; i < this.noticedata.length; i++) {
				this.changed[i] = this.noticedata[i].content
			}
			//删除changed中的空键值对
			for (let i = 0; i < this.changed.length; i++) {

				for (var a in this.changed[i]) { //逐个取出changed元素中的json数组
					if ((this.changed[i][a] == "") == true) { //对changed元素中的json数组的属性值进行判空
						delete this.changed.a;
						delete this.changed[i][a]
					}
				}
			}
			//此时changed中已经去除非空元素
			var keyChinese;
			for (let i = 0; i < this.changed.length; i++) {
				let str = ""
				for (var b in this.changed[i]) {
					keyChinese = this.$options.methods.toChinese(b)
					str = str + keyChinese + ";" + this.changed[i][b] + ";"
				}
				this.all[i] = str
			}
			for (let i = 0; i < this.changed.length; i++) {
				this.noticedata[i].content = this.all[i]
			}
		},
		methods: {
			showdeatil(row, column, cell, event) {
				if(column.label=="通知内容"){
					//初始化
					this.daetilcontantarr = []
					this.daetillabelarr = []
					this.arr = row.content.split(';')
					for (let i = 0; i < this.arr.length; i++) {
						//去除空内容
						if (this.arr[i] == "") {
							this.arr.splice(i, 1)
						}
					}
					for (let i = 0; i < this.arr.length; i = i + 2) {
						this.daetillabelarr[i] = this.arr[i]
						this.daetilcontantarr[i] = this.arr[i + 1]
					}
					for (let i = 0; i < this.daetillabelarr.length; i++) {
						//去除undefine
						if (typeof(this.daetillabelarr[i]) == "undefined") {
							this.daetillabelarr.splice(i, 1)
							this.daetilcontantarr.splice(i, 1)
						}
					}
					//显示弹窗
					this.deatil = true
					//更改状态
					row.state = "已读"					
				}				
			},
			readed(row, selected) {
				console.log(this.getSelectionData)
				for (let i = 0; i < this.getSelectionData.length; i++) {
					this.getSelectionData[i].state = "已读"
				}
				console.log(this.noticedata)
			},
			selectitem(selection, row) {
				// 勾选某行
				this.getSelectionData = selection
			},
			selectAllitem(selection) {
				// 勾选全选
				this.getSelectionData = selection
			},
			allreaded() {
				// 一键已读
				for (let i = 0; i < this.noticedata.length; i++) {
					this.noticedata[i].state = "已读"
				}
				console.log(this.noticedata)
			},
			deletereaded() {
				console.log(this.noticedata)
				let count=0
				for (let i = 0; i < this.noticedata.length; i++) {
					if (this.noticedata[i].state == "已读") {
						count++;
					}
				}
				if(count>= this.noticedata.length){
					this.noticedata=[{}]
					this.showempty=true
					this.showemptyteble=false
				}else{
					for (let i = 0; i < this.noticedata.length; i++) {
						if (this.noticedata[i].state == "已读") {
							this.noticedata.splice(i, 1)
							i--;
						}
					}
				}
			},
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleDelete(index, row) {
				//侧边删除栏
			    console.log(index, row);
				this.noticedata.splice(index, 1)
			},
			handleEdit(index, row) {
				 // 侧边详情栏
				console.log(index, row);				
				this.daetilcontantarr = []
				this.daetillabelarr = []
				this.arr = row.content.split(';')
				for (let i = 0; i < this.arr.length; i++) {
					//去除空内容
					if (this.arr[i] == "") {
						this.arr.splice(i, 1)
					}
				}
				for (let i = 0; i < this.arr.length; i = i + 2) {
					this.daetillabelarr[i] = this.arr[i]
					this.daetilcontantarr[i] = this.arr[i + 1]
				}
				for (let i = 0; i < this.daetillabelarr.length; i++) {
					//去除undefine
					if (typeof(this.daetillabelarr[i]) == "undefined") {
						this.daetillabelarr.splice(i, 1)
						this.daetilcontantarr.splice(i, 1)
					}
			}
			//显示弹窗
			this.deatil = true
			//更改状态
			row.state = "已读"			
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			formatter(row, column) {
				return row.address;
			},
			filterTag(value, row) {
				return row.state === value;
			},
			filterHandler(value, row, column) {
				const property = column['property'];
				return row[property] === value;
			},
			//键值对英文转中文
			toChinese(key) {
				switch (key) {
					case "gradation":
						return "学历";
						break;
					case "certificateType":
						return "证书类型";
						break;
					case "schoolMaster":
						return "校(院)长";
						break;
					case "school":
						return "学校";
						break;
					case "college":
						return "学院";
						break;
					case "major":
						return "专业";
						break;
					case "class":
						return "班级";
						break;
					case "number":
						return "学号";
						break;
					case "classification":
						return "学习类别";
						break;
					case "learningForm":
						return "学习类型";
						break;
					case "duration":
						return "学制";
						break;
					case "startTime":
						return "入学时间";
						break;
					case "endTime":
						return "(预计)毕业时间";
						break;

				}
			}
		}
	}
</script>

<style scoped>
	.barbox {
		flex: 1;
		height: 12vh;
	}

	.bararea {
		height: 12vh;
		width: 100%;
		/* background-color: blue; */
		display: flex;
		flex-direction: row;
	}

	.displayarea {
		/* 表格整体展示区 */
		height: 68vh;
		width: 100%;
		padding-top: 3vh;
		text-align: center;
	}

	.tableclass {
		/* margin-top: 3vh; */
		width: 100%;
		height: 66vh;
		text-align: center;
	}

	.bt_delete {
		/*删除已读按钮*/

	}

	.bt_readed {
		/* 已读按钮 */

	}

	.bt_allReaded {
		/* 一键已读 */
	}
	#empty {
		/* text-align: center; */
		margin-top: 140px;
	}
</style>
