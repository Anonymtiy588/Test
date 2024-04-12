<template>
	<view>
		<view v-for="item in 10">
			
		
			<view class="cu-card dynamic">
				<view class="cu-item shadow">
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg"
								style="background-image:url(http://139.196.45.104/img/test.png);">
							</view>
							<view class="content flex-sub">
								<view>这里是用户名</view>
								<view class="text-gray text-sm flex justify-between">
									这里是日期
								</view>
							</view>
						</view>
					</view>
					<view class="text-content">
						这里是发布的内容
					</view>
					<view class="grid flex-sub padding-lr col-3 grid-square">
						<view class="bg-img" style="background-image: url(http://139.196.45.104/img/test.png);">
							<!-- 发表的图片 -->
						</view>
					</view>
					<view class="text-gray text-sm text-right padding">
						<text class="cuIcon-appreciatefill margin-lr-xs">
						</text>
						点赞数
						<text class="cuIcon-messagefill margin-lr-xs">
						</text>
						评论数
					</view>
					<!-- 评论区 -->
					<view class="cu-list menu-avatar comment solids-top">
						<view class="cu-item">
							<view class="cu-avatar round" style="background-image:url(http://139.196.45.104/img/test.png);">
							</view>
							<view class="content">
								<view class="text-gray">评论者的名字</view>
								<view class="text-gray text-content text-df">
									评论内容
								</view>							
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view  style="padding: 76rpx;"></view> -->
		<tarbar>
		</tarbar>
	</view>
</template>

<script>
	import tarbar from '../../component/tarbar.vue';
	export default {
		data() {
			return {

			}
		},
		components: {
			tarbar
		},
		onLoad() {
			// uni.showToast({
			// 	title: '广场1111',
			// 	duration: 2000
			// })
		},
		methods: {


		}
	}
</script>

<style>
	.bar {
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: rgba(255, 255, 255, 0.9);
	}
</style>
