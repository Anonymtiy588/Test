<template>
	<view class="tarbar">
		<view class="cu-bar tabbar bar">
			<view class="action text-green" @click="index()">
				<view class="cuIcon-homefill"></view>
				<text>首页</text>
			</view>
			<view class="action text-gray" @click="square()">
				<view class="cuIcon-similar"></view>
				<text>广场</text>
			</view>
			<view class="action text-gray add-action">
				<button class="cu-btn cuIcon-add bg-green shadow" @click="release()"></button>
				<text>发布</text>
			</view>
			<view class="action text-gray" @click="tool()">
				<view class="cuIcon-cart">
				</view>
				<text>工具</text>
			</view>
			<view>
				<view class="action text-gray" @click="person()">
					<view class="cuIcon-my">
					</view>
					<text>个人</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			square() {
				uni.reLaunch({
					url: "../square/square"
				})
			},
			release() {
				uni.navigateTo({
				    url: '../release/release',
				    animationType: 'slide-in-bottom',
				    animationDuration: 200
				});
			},
			tool() {
				uni.redirectTo({
					url: "../tool/tool"
				})
			},
			index() {
				uni.redirectTo({
					url: "../index/index"
				})
			},
			person() {
				uni.redirectTo({
					url: "../person/person"
				})
			}
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
