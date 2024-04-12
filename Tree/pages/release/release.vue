<template>
	<view>
		<!-- 文字发布区域 -->
		<view class="cu-form-group margin-top">
			<textarea cols="40" rows="40" class="boot" placeholder="要发布的文字"></textarea>
		</view>


		<!-- 添加图片这四个字 -->
		<view class="cu-bar bg-white margin-top">
			<view class="action">添加图片</view>
		</view>


		<!-- 图片显示区域 -->
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view @click="ChooseImage()" class="solids">
					<text class="cuIcon-cameraadd"></text>
				</view>
				<view v-for="(item,index) in imglist" :key="index">
					<image :src="item" style="width: 150rpx; height:150rpx" @click="ViewImage(item)"></image>
					<div class="delect" @click="delect(index)">X</div>
				</view>
			</view>
		</view>



		<form id="image" @change="ViewImage($event)"></form>
		<view class="cu-form-grou p margin-top">
			<view class="title">仅自己可见
				<switch class="jurisdiction" role="checkbox" aria-disabled="flase" aria-checked="flase">
				</switch>
			</view>


		</view>
		<view><button class="cu-btn bg-green shadow" role="button" @click="re()">发布</button>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				imglist: [],
			}
		},
		onLoad() {
			// uni.showToast({
			// 	title: '发布',
			// 	duration: 2000
			// })
		},
		methods: {
			ChooseImage() {
				if (this.imglist.length == 3) {
					uni.showToast({
						title: '最多三张哦~',
						duration: 2000,
						icon: 'error'
					})
				} else {
					let _this = this;
					uni.chooseImage({
						count: 3,
						sizeType: ['original', 'compressed'],
						sourceType: ['album'],
						success: function(res) {
							_this.imglist.push(res.tempFilePaths);
						}
					})
				}
			},


			ViewImage(index) {
				uni.previewImage({
					urls: index
				})
			},


			delect(index) {
				console.log(index);
				this.imglist.splice(index, 1);
			},
			// 这是默认图片的方法，弹出默认图片无法删除
			noDelect() {
				alert('默认图片无法删除。')
			},
			re() {
				console.log("release")
				uni.showTabBar({
					success(res) {
						console.log("显示")
					}
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

	.uploadimg_logo {
		width: 50px;
		height: 50px;
	}

	.delect {
		position: absolute;
		right: 0;
		top: 0;
		width: 20px;
		height: 20px;
		text-align: center;
		line-height: 20px;
		font-size: 15px;
		background-color: rgb(169, 170, 153);
		color: rgb(0, 0, 0);
		opacity: 0.5;
	}

	.delect:hover {

		background-color: rgb(255, 0, 0);
		color: white;
	}

	.view>li:hover .delect {
		opacity: 1;
	}

	.jurisdiction {
		float: right;
	}

	.bar {
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: rgba(255, 255, 255, 0.9);
	}
</style>
