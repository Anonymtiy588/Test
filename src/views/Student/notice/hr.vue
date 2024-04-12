<template>
	<div>
		<el-empty description="暂无相关数据" v-if="showempty" id="empty"></el-empty>
		<div class="bararea" v-if="showemptyteble">
			<!-- 操作区 -->
			<!-- 标为已读、全部标记为已读、删除已读通知 -->
			<div class="barbox">
				<div style="width: 100;height: 3vh;"></div>
				<el-button type="primary" @click="process(1)">通过</el-button>
			</div>
			<div class="barbox">
				<div style="width: 100;height: 3vh;"></div>
				<el-button type="primary"  @click="process(2)">拒绝</el-button>
			</div>
			<div class="barbox">
				<div style="width: 100;height: 3vh;"></div>
				<el-button type="primary"  @click="process(3)">一键通过</el-button>
			</div>
			<div class="barbox">
				<div style="width: 100;height: 3vh;"></div>
				<el-button type="primary"  @click="process(4)">一键拒绝</el-button>
			</div>
			<div class="barbox">
				<div style="width: 100;height: 3vh;"></div>
				<el-button type="primary"  @click="process(5)">删除已处理通知</el-button>
			</div>
		</div>
		<div class="displayarea" v-if="showemptyteble">
			<!-- 表格展示区 -->
			<el-table ref="multipleTable" :data="noticedata" tooltip-effect="dark" class="tableclass"
				@selection-change="handleSelectionChange" height="446" @select="selectitem"
				@select-all="selectAllitem">
				<el-table-column type="selection" width="80">
				</el-table-column>
				<el-table-column label="日期" width="220">
					<template slot-scope="scope">{{ scope.row.time }}</template>
				</el-table-column>
				<el-table-column prop="sponsor" label="企业" width="320">
				</el-table-column>
				<el-table-column label="通知内容" show-overflow-tooltip width="360">
					<template slot-scope="scope">
						请求查看：{{ scope.row.record}}
					</template>
				</el-table-column>
				<el-table-column prop="state" label="通知状态" width="140"
					:filters="[{ text: '未处理', value: '未处理' }, { text: '已拒绝', value: '已拒绝' },{ text: '未处理', value: '已通过' }]"
					:filter-method="filterTag" filter-placement="bottom-end">
					<template slot-scope="scope">
						<el-tag
							:type="scope.row.state === '未处理' ? 'primary' : scope.row.state === '已拒绝' ? 'danger' :'success'"
							disable-transitions>
							{{scope.row.state}}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="160">
					<template slot-scope="scope">
						<el-tooltip content="同意申请" placement="top" effect="light">
						  <el-button @click="pass(scope.$index, scope.row)" circle class="passbt">
						  </el-button>
						</el-tooltip>
						<el-tooltip content="拒绝申请" placement="top" effect="light">
							<el-button @click="refuse(scope.$index, scope.row)" circle class="refusebt">
							</el-button>
						</el-tooltip>
						<el-tooltip content="删除" placement="top" effect="light">
							<el-button @click="deletebt(scope.$index, scope.row)" circle class="deletebt">
							</el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				noticedata: [{
						id: "1653308863190", //通知id 例123456&1653308863190(发起者id+时间戳)
						time: "2022年06月23日14点28分", //通知时间
						sponsor: "深圳市腾讯计算机系统有限公司", //通知企业全称呼
						record: "本科结业证书", //请求的证书的名字-如本科毕业证书
						state: "未处理" //通知状态
					}, {
						id: "16533088690", //通知id 例123456&1653308863190(发起者id+时间戳)
						time: "2022年06月23日14点28分", //通知时间
						sponsor: "深圳市腾讯计算机系统有限公司", //通知企业全称呼
						record: "本科结业证书", //请求的证书的名字-如本科毕业证书
						state: "已拒绝" //通知状态
					},
					{
						id: "16508863190", //通知id 例123456&1653308863190(发起者id+时间戳)
						time: "2022年06月23日14点28分", //通知时间
						sponsor: "深圳市腾讯计算机系统有限公司", //通知企业全称呼
						record: "本科结业证书", //请求的证书的名字-如本科毕业证书
						state: "已通过" //通知状态
					}, {
						id: "1653werwe88690", //通知id 例123456&1653308863190(发起者id+时间戳)
						time: "2022年06月23日14点28分", //通知时间
						sponsor: "深圳市腾讯计算机系统有限公司", //通知企业全称呼
						record: "本科结业证书", //请求的证书的名字-如本科毕业证书
						state: "已拒绝" //通知状态
					}
				],
				getSelectionData: [{}],
				showempty: false,
				showemptyteble: true
			}
		},
		mounted() {},
		methods: {
			process(pass) {
				// 
				if(pass==1){
					//1、通过；
					for(let i=0;i<this.getSelectionData.length;i++){
						if(this.getSelectionData[i].state=="未处理"){
							this.getSelectionData[i].state="已通过"
						}					
					}			
				}else if(pass==2){
					//2拒绝、
					for(let i=0;i<this.getSelectionData.length;i++){
						if(this.getSelectionData[i].state=="未处理"){
							this.getSelectionData[i].state="已拒绝"
						}						
					}
				}else if(pass==3){
					//3、一键通过；
					for(let i=0;i<this.noticedata.length;i++){
						if(this.noticedata[i].state=="未处理"){
							this.noticedata[i].state="已通过"
						}						
					}
				}else if(pass==4){
					//4、一键拒绝；
					for(let i=0;i<this.noticedata.length;i++){
						if(this.noticedata[i].state=="未处理"){
							this.noticedata[i].state="已拒绝"
						}						
					}
				}else if(pass==5){
					//5、删除已处理通知
					for(let i=0;i<this.noticedata.length;i++){
						if(this.noticedata[i].state!="未处理"){
							this.noticedata.splice(i, 1)
							i--;
						}						
					}
				}
				
				
			},
			selectitem(selection, row) {
				// 勾选某行
				this.getSelectionData = selection
			},
			selectAllitem(selection) {
				// 勾选全选
				this.getSelectionData = selection
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
			// 侧边
			deletebt(index, row) {
				//侧边删除栏				
				if (this.noticedata[index].state == "未处理") {
					this.$notify({
						title: 'WARRING',
						message: '请先处理请求！',
						type: 'warning',
						position: 'bottom-right'
					});
				} else {
					this.noticedata.splice(index, 1)
					//此处接口向后端表明状态
				}
			},
			refuse(index, row) {
				//拒绝
				if (this.noticedata[index].state == "已拒绝") {
					this.$notify({
						title: 'WARRING',
						message: '已经拒绝企业申请！',
						type: 'warning',
						position: 'bottom-right'
					});
				} else if (this.noticedata[index].state == "已通过") {
					this.$notify({
						title: 'ERROR',
						message: '已经通过不可撤回！',
						type: 'error',
						position: 'bottom-right'
					});
				} else {
					this.noticedata[index].state = "已拒绝"
					//此处接口向后端表明状态
				}
			},
			pass(index, row) {
				//通过
				if (this.noticedata[index].state == "已通过") {
					this.$notify({
						title: 'WARRING',
						message: '已经通过企业申请！',
						type: 'warning',
						position: 'bottom-right'
					});
				} else if (this.noticedata[index].state == "已拒绝") {
					this.$notify({
						title: 'ERROR',
						message: '已经拒绝不可撤回！',
						type: 'error',
						position: 'bottom-right'
					});
				} else {
					this.noticedata[index].state = "已通过"
					//此处接口向后端表明状态
				}
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

	.refusebt {
		/* 拒绝请求按钮 */
		background: url("../../../assets/refuse.png") center center;
		background-color: #e6a23c;
		background-repeat: no-repeat;
		background-size: 60% 60%;
		width: 38px;
		height: 38.8px;

	}

	.deletebt {
		/* 删除按钮 */
		background: url("../../../assets/delete.png") center center;
		background-color: #f56c6c;
		background-repeat: no-repeat;
		background-size: 60% 60%;
		width: 38px;
		height: 38.8px;
		border: wheat 1px solid;

	}

	.passbt {
		/* 通过按钮 */
		background: url("../../../assets/pass.png") center center;
		background-color: #67c23a;
		background-repeat: no-repeat;
		background-size: 60% 60%;
		width: 38px;
		height: 38.8px;
	}

	#empty {
		/* text-align: center; */
		margin-top: 140px;
	}
</style>
