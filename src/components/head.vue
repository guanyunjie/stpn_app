/**
* Created by Guanyunjie on 2017/7/4.
*/
<template>
	<div class="s-head">
		<div class="wrap">
			<div class="logo">
				<i class="iconfont icon-logo-fb"></i>
			</div>
		</div>
		<div class="red-line"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.s-head
		position fixed
		left 0px
		right 0px
		top 0px
		height 68px
		width 100%
		border-top 1px solid #000
		border-bottom 1px solid #000
		box-shadow inset 0 0 1px 0px #dcd4d4
		background linear-gradient(#484848, #1b1a1a)
		.wrap
			position relative
			.logo
				height 68px
				width 150px
				.iconfont
					font-size 150px
					color #fff
					position absolute
					top -40px
					left 55px
		.red-line
			position relative
			height 4px
			width 100%
			box-shadow 0 1px 0 0 #b8b8b8
			border-bottom 1px solid #5a5a5a
			background linear-gradient(#ea1717, #c70c0c)
</style>
