<template>
	<view>
		<view class="cu-list grid col-3 no-border">
			<view class="cu-item" v-for="(item,index) in list" :key="index">
				<view class="text-red" v-bind:class="item.icon">
					<text @click="test(item,index)">{{item.text}}</text>
				</view>
			</view>
		</view>
		<tarbar>
		</tarbar>
	</view>
</template>

<script>
	import tarbar from '../../component/tarbar.vue';
	export default {
		data() {
			return {
				list: [{
					web: "https://draft.art/drawing",
					text: "AI绘画",
					icon: "cuIcon-cardboardfill",
					describe: ""
				},{
					web: "https://draft.art/drawing",
					text: "AI绘画",
					icon: "cuIcon-cardboardfill",
					describe: ""
				},{
					web: "https://draft.art/drawing",
					text: "AI绘画",
					icon: "cuIcon-cardboardfill",
					describe: ""
				},{
					web: "https://draft.art/drawing",
					text: "AI绘画",
					icon: "cuIcon-cardboardfill",
					describe: ""
				},{
					web: "https://draft.art/drawing",
					text: "AI绘画",
					icon: "cuIcon-cardboardfill",
					describe: ""
				},{
					web: "https://draft.art/drawing",
					text: "AI绘画",
					icon: "cuIcon-cardboardfill",
					describe: ""
				},{
					web: "https://draft.art/drawing",
					text: "AI绘画",
					icon: "cuIcon-cardboardfill",
					describe: ""
				},{
					web: "https://draft.art/drawing",
					text: "AI绘画",
					icon: "cuIcon-cardboardfill",
					describe: ""
				},{
					web: "https://draft.art/drawing",
					text: "AI绘画",
					icon: "cuIcon-cardboardfill",
					describe: ""
				}]
			}
		},
		components: {
			tarbar
		},
		methods: {
			test(item, index) {
				console.log(item)

				uni.showModal({
					title: item.text,
					confirmText: "直接打开",
					cancelText: "复制链接",
					content: item.describe,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							uni.setClipboardData({
								data: item.web,
								success: function() {
									uni.showToast({
										title: '已复制到剪切板',
										duration: 1500
									})
								}
							});
						}
					}
				});
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
