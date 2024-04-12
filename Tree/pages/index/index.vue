<template>
	<view>
		<view>
			<view class="flex padding justify-between">
				<view class="bg-grey margin-xs padding-sm radius round ">
					<text>{{mouth_show}}月</text><br />
					<text>{{data_show}}日</text>
				</view>
				<view class="bg-grey margin-xs padding-sm radius round">
					<text>早上好</text></br>
					<text>{{Username}}</text>
				</view>
				<view class="basis-sm bg-cyan margin-xs padding-sm radius">
					<text>星期{{week_show}}</text>
				</view>
			</view>

			<view class="padding-xl  margin-top bg-img sen_out" :style="{backgroundImage: `url(${sen_img})`}">
				<view class="bg-blue sen">
					<text class="text-right padding align-end ">{{sen_show}}</text>
				</view>
			</view>


			<!-- 动态 -->

			<view class="cu-card article">
				<view class="cu-item shadow">
					<view class="title">
						<view class="text-cut">热门文章</view>
					</view>
					<view class="content">
						<image src="http://139.196.45.104/img/test.png" mode="aspectFill"></image>
						<view class="desc">
							<view class="text-content">{{hot1}}</view>
						</view>
					</view>
				</view>
			</view>

			<view class=" cu-card article">
				<view class="cu-item shadow">
					<view class="title">
						<view class="text-cut">热门话题</view>
					</view>
					<view class="content">
						<image src="http://139.196.45.104/img/test.png" mode="aspectFill"></image>
						<view class="desc">
							<view class="text-content">{{hot2}}</view>
						</view>
					</view>
				</view>
			</view>

<!-- 			<view>
				<button @click="test()">test</button>
				
			</view> -->
		</view>

		<tarbar>
		</tarbar>

	</view>
</template>

<script>
	import tarbar from '../../component/tarbar.vue';
	export default {
		components: {
			tarbar
		},
		data() {
			return {
				Username: '用户名',
				sen_show: "服务器错误",
				mouth_show: "",
				data_show: "",
				week_show: "",
				hot1: "此处为热门文章内容",
				hot2: "此处为热门话题内容",
				sen_img: "null"
			}
		},

		onLoad() {
			//获取当前时间
			//公历
			//background-image: url("http://139.196.45.104/img/rand/rand2.jpg");
			var num = Math.round(Math.random() * 5);
			this.sen_img = "http://139.196.45.104/img/rand/rand" + num + ".jpg";
			let myDate = new Date();
			var data = new Array("日", "一", "二", "三", "四", "五", "六");
			var that = this;
			var sen_json="null"
			//后端交互
			uni.request({
					url: 'http://139.196.45.104:8081/pages/index',
					data: {},
					header: {
						'content-type': 'application/json' // 默认值
					},
					method: 'GET',
					dataType: 'text',
					success(res) {
						console.log("服务器success");
						//随机鸡汤
						sen_json = JSON.parse(res.data);
						that.sen_show = sen_json.sen;

					},
					fail(res) {
						console.log(" 服务器fail")
					}
				}),
				//赋值区
				this.mouth_show = myDate.getMonth() + 1;
			this.data_show = myDate.getDate();
			this.week_show = data[myDate.getDay()];
			this.sen_show = sen_json.sem;
		},
		methods: {
			test() {
				uni.switchTab({
						url: '../release/release'
					}),
					uni.hideTabBar({
						success(res) {
							console.log("跳转")
						}
					}),
					uni.showToast({
						title: '标题',
						duration: 2000
					})
			},
			
			square() {
				uni.redirectTo({
					url: "../square/square"
				})
			},
			release() {
				uni.redirectTo({
					url: "../release/release"
				})
			},
			tool() {
				uni.redirectTo({
					url: "../tool/tool"
				})
			},
			person() {
				uni.redirectTo({
					url: "../person/person"
				})
			}



		},
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.cu-card.dynamic>.cu-item>.text-content {
		margin-bottom: 1px;
		margin-top: 6px;
	}

	.sen {
		text-align: right;
		background-color: inherit;
		margin-top: 300rpx;
		background-size: cover;
		margin-left: 200rpx;
		color: #333333;

	}

	.sen_out {
		background-size: cover;
		background-position: center;

	}
</style>
