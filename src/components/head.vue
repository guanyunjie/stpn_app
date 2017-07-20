/**
* Created by Guanyunjie on 2017/7/4.
*/
<template>
	<div class="s-head">
		<div class="wrap">
			<div class="logo">
				<i class="iconfont icon-logo-fb"></i>
			</div>
			<div class="login">
				<div class="l-wrap" @mouseenter="isLoginShow = true" @mouseleave="isLoginShow = false">
					<img src="/static/img/3265549600663283.jpg" width="32" height="32" alt="">
					<span>管理员</span>
					<ul v-show="isLoginShow">
						<li class="l-item" @click="logout">注销</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="red-line"></div>
	</div>

</template>

<script type="text/ecmascript-6">
	export default {
	  	props: ['emit'],
	  	data() {
	  	  	return {
			  	isLoginShow: false
		  	}
		},
		methods: {
			logout() {
			  	this.emit.$emit('sign', false);
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	head-height = 48px

	.s-head
		position fixed
		left 0px
		right 0px
		top 0px
		height head-height
		width 100%
		border-top 1px solid #000
		border-bottom 1px solid #000
		box-shadow inset 0 0 1px 0px #dcd4d4
		background linear-gradient(#484848, #1b1a1a)
		z-index 999
		.wrap
			position relative
			overflow hidden
			.logo
				height head-height
				width 150px
				.iconfont
					font-size 130px
					color #fff
					position absolute
					top -40px
					left 55px
			.login
				position absolute
				top 0px
				right 0px
				margin 0 30px
				color #fff
				line-height head-height
				.l-wrap
					cursor pointer
					img
						border 1px solid #000
						border-radius 3px
						margin 7px 5px
					span
						float right
					ul
						background #333
						position absolute
						bottom 0px
						left -30px
						z-index 99
						border 1px solid #000
						border-radius 3px
						.l-item
							width 80px
							padding 8px 20px
							line-height 20px
							color #ccc
		.red-line
			position relative
			height 4px
			width 100%
			box-shadow 0 1px 0 0 #444
			border-bottom 1px solid #5a5a5a
			background linear-gradient(#ea1717, #c70c0c)
</style>
