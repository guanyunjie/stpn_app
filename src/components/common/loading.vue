/**
* Created by Guanyunjie on 2017/7/24.
*/
<template>
	<div id="loading" class="loading" ref="loading">
		<div class="loading-wrap" v-show="!timeout">
			<i class="iconfont icon-wait"></i>
			<span>loading...</span>
		</div>
		<div class="timeout" v-show="timeout">
			<i class="iconfont icon-busy"></i>
			<span>当前系统繁忙，请稍后再试！</span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">

	export default {
	    props: ['timeout'],
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
		.loading-wrap, .timeout
			.iconfont
				color #666
				font-size 45px
				display inline-block
			span
				font-size 24px
				color #666
				margin-left 15px
				user-select none
		.loading-wrap
			.iconfont
				animation: icon linear 1.5s infinite;
	@keyframes icon
		from
			transform rotate(0deg)
		to
			transform rotate(360deg)
</style>
