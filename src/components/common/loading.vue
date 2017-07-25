/**
* Created by Guanyunjie on 2017/7/24.
*/
<template>
	<div id="loading" class="loading" ref="loading">
		<i class="iconfont icon-wait"></i>
		<span>loading...</span>
	</div>
</template>

<script type="text/ecmascript-6">

	export default {
	    created() {},
	    mounted() {
			let ch = document.getElementById('mainArea').clientHeight;
			document.getElementById('loading').style.lineHeight = ch - 150 + 'px';
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.loading
		line-height 300px
		background #fff
		.iconfont
			color #666
			font-size 45px
			display inline-block
			animation: icon linear 1.5s infinite;
		span
			font-size 24px
			color #666
			margin-left 15px
			user-select none

	@keyframes icon
		from
			transform rotate(0deg)
		to
			transform rotate(360deg)
</style>
