<template>
	<view>
		<!-- 头像+背景 -->
		<view class="log">
			<view class="cu-avatar xl round head" @click="choose()" :style="{backgroundImage: `url(${img})`}">
			</view>

		</view>
		<!-- 登录 -->
		<view @click="sign()" class="text-xl singin">
			<text>{{log}}</text>
		</view>
		<!-- 点赞 发布 -->

		<!-- 		<view class="flex ">
			<view class="cu-capsule round bg-blue zan">
				<view class="zan_index">
					<text>我的评论</text>
				</view>
			</view>
			<view class="cu-capsule round bg-cyan shou">
				<view class="shou_index">
					<text>我的收藏</text>
				</view>
			</view>
		</view> -->


		<view class="cu-list menu">

			<view class="cu-item menuArrow:'arrow'" @click="path(1)">
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">我的评论
						<!-- 图标 + 标题 -->
					</text>
				</view>
			</view>

			<view class="cu-item menuArrow:'arrow'" @click="path(2)">
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">我的收藏
						<!-- 图标 + 标题 -->
					</text>
				</view>
			</view>
			
			<view class="cu-item menuArrow:'arrow'" @click="path(4)">
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">我的帖子
						<!-- 图标 + 标题 -->
					</text>
				</view>
			</view>
			
			<view class="cu-item menuArrow:'arrow'" @click="path(3)">
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">个人信息
						<!-- 图标 + 标题 -->
					</text>
				</view>
			</view>



			<view class="cu-item menuArrow:'arrow'" @click="path(5)">
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">反馈</text>
				</view>
			</view>

			<!-- 		   <view class="cu-item">
		     <button class="cu-btn content" open-type="contact">
		       <text class="cuIcon-btn text-olive"></text>
		       <text class="text-grey">Open-type 按钮</text>
		     </button>
		   </view>
		   <view class="cu-item">
		     <navigator class="content" hover-class="none" url="../list/list" open-type="redirect">
		       <text class="cuIcon-discoverfill text-orange"></text>
		       <text class="text-grey">Navigator 跳转</text>
		     </navigator>
		   </view>
		   <view class="cu-item ">
		     <view class="content">
		       <text class="cuIcon-emojiflashfill text-pink"></text>
		       <text class="text-grey">头像组</text>
		     </view>
		     <view class="action">
		       <view class="cu-avatar-group">
		         <view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10004.jpg);"></view>
		         <view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10003.jpg);"></view>
		         <view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10002.jpg);"></view>
		         <view class="cu-avatar round sm" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
		       </view>
		       <text class="text-grey text-sm">4 人</text>
		     </view>
		   </view>
		   <view class="cu-item ">
		     <view class="content">
		       <text class="cuIcon-btn text-green"></text>
		       <text class="text-grey">按钮</text>
		     </view>
		     <view class="action">
		       <button class="cu-btn round bg-green shadow">
		         <text class="cuIcon-upload"></text> 上传</button>
		     </view>
		   </view>
		   <view class="cu-item ">
		     <view class="content">
		       <text class="cuIcon-tagfill text-red"></text>
		       <text class="text-grey">标签</text>
		     </view>
		     <view class="action">
		       <view class="cu-tag round bg-orange light">音乐</view>
		       <view class="cu-tag round bg-olive light">电影</view>
		       <view class="cu-tag round bg-blue light">旅行</view>
		     </view>
		   </view>
		   <view class="cu-item ">
		     <view class="content">
		       <text class="cuIcon-warn text-green"></text>
		       <text class="text-grey">文本</text>
		     </view>
		     <view class="action">
		       <text class="text-grey text-sm">小目标还没有实现！</text>
		     </view>
		   </view>
		   <view class="cu-item">
		     <view class="content padding-tb-sm">
		       <view>
		         <text class="cuIcon-clothesfill text-blue margin-right-xs"></text> 多行Item</view>
		       <view class="text-gray text-sm">
		         <text class="cuIcon-infofill margin-right-xs"></text> 小目标还没有实现！</view>
		     </view>
		     <view class="action">
		       <switch class="switch-sex sm" bindchange="switchSex"></switch>
		     </view>
		   </view> -->
			<view v-show="showimg" class="fankui">
				<!-- style="background-image: url(../../img/test.jpg);" -->
				
				<image src="http://139.196.45.104/img/rand/rand2.jpg" class="img" show-menu-by-longpress="true"></image>
				<label style="text-align: center; font-size: 24rpx; ">长按添加客服微信反馈</label>
				<button @click="shutdown">关闭</button>
			</view>
			
		</view>




		<!-- 导航栏 -->
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
				log: "注册/登录",
				img: "http://139.196.45.104/img/rand/rand2.jpg",
				showimg: false,
				gender:"0"
			}
		},

		methods: {
			choose() {
				var that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['camera', 'album'], //打开相机
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
						console.log(res.tempFilePaths);
						that.img = res.tempFilePaths[0];

						// 问题:再次打开界面后img会被刷新
						//解决：将图片上传至服务器，在onload中请求数据
					}
				});
			},
			sign() {
				uni.getUserProfile({
					desc: '用户登录',
					lang: 'zh_CN',
					success: (res) => {
						this.log = res.userInfo.nickName;
						this.gender=res.userInfo.gender;
						const user=this.log
						const sex=this.gender
						//const img=this.img
						uni.request({
						    url: 'http://121.5.50.163:9001/user/u', 
						    data: {
						        username: user
						    },
						    header: {
						        'custom-header': 'hello' //自定义请求头信息
						    },
						    success: (res) => {
						        console.log(res.data);
						        
						    }
						});
					// 	uni.uploadFile({
					// 	            url: 'http://139.196.45.104:8085/user/', 
					// 	            filePath: img,
					// 	            name: 'userhead',
									
					// 	            formData: {
					// 	               users: user,
					// 	               sex:sex
					// 	            },
					// 	            success: (uploadFileRes) => {
										
					// 	                console.log("上传成功  "+uploadFileRes.data+"   "+uploadFileRes.statusCode);
										
					// 	            },
					// 				fail: (uploadFileRes) => {
					// 					console.log("上传失败 ");
					// 				},
					// 				complete:()=>{
					// 					console.log("complete  "+this.log)
					// 				}
					// 	        });
					
						
						
						
						
					},
					fail() {
						console.log("用户信息调取失败")
					},
					complete() {
						// console.log("已经调用登录函数")
					}
				})
			},
			shutdown(){
				this.showimg=false
			},
			path(e) {
				// console.log(typeof(e))
				if (e == 1) {
					uni.navigateTo({
						url: './inside/comment',
						animationType: 'pop-in',
						animationDuration: 200
					});
				} else if (e == 2) {
					uni.navigateTo({
						url: 'inside/collection',
						animationType: 'pop-in',
						animationDuration: 200
					});
				} else if (e == 3) {
					var un=this.log
					uni.navigateTo({
						url: './inside/information?uname='+un,
						animationType: 'pop-in',
						animationDuration: 200
					});
					console.log(un)
				} else if (e == 4) {
					uni.navigateTo({
						url: './inside/release',
						animationType: 'pop-in',
						animationDuration: 200
					});
				} else if (e == 5) {
					this.showimg = true
					console.log(this.showimg)
				}

			}
		}
	}
</script>

<style>
	.log {
		/* 最外层 */
		height: 400rpx;
		margin: 0 auto;
		text-align: center;
		background-size: cover;
		background-position: center;
		background-image: url("http://139.196.45.104/img/rand/rand5.jpg");
	}

	.head {
		margin-top: 150rpx;
		position: inherit;
		text-align: center;
		bottom: 50rpx;
	}

	.singin {

		/* background-color: #e0584b; */
		text-align: center;
	}

	.zan {
		position: relative;
		width: 40%;
		height: 150rpx;
		position: relative;
		left: 5%;
		text-align: center;

	}

	.shou {
		width: 40%;
		height: 150rpx;
		position: relative;
		left: 14%;
		text-align: center;

	}

	.zan_index {
		text-align: center;
		position: inherit;
		margin: 0 auto;
		margin-top: 55rpx;
	}

	.shou_index {
		text-align: center;
		position: inherit;
		margin: 0 auto;
		margin-top: 55rpx;
	}

	.fankui {
		position:fixed;
		zIndex: 9999;
		background-color: rgb(255,255,255,0.5);
		text-align: center;
		height: 400rpx;
		width: 400rpx;
		right: 24%;
		top: 30%;
		
	}
	.img{
		width: 400rpx;
		height: 400rpx;
	}
</style>
