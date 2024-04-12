<template>
	<view>
		<view class="cu-list menu">

			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">昵称</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{uname}}</text>
				</view>
			</view>

			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">账户状态</text>
				</view>
				<view class="action">
					<text class="text-green text-sm">{{statement}}</text>
				</view>
			</view>
		</view>
		
		
		<view class="cu-list menu">
		
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">用户等级</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{grade}}</text>
				</view>
			</view>
		
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">用户ID</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{uid}}</text>
				</view>
			</view>			
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				uname: "null",
				statement: "正常",
				grade:"1",
				uid:"11123"
			}
		},
		onLoad(e) {
			console.log(e.uname)
			this.uname = e.uname
		},
		methods: {

		}
	}
</script>

<style>

</style>
