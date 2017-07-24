/**
* Created by Guanyunjie on 2017/7/24.
*/
<template>
	<div class="noresult" v-show="length === 0">
		<i class="iconfont icon-noresult"></i>
		<span>Oops…There is nothing here.</span>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
	    props: ['length']
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.noresult
		line-height 300px
		background #fff
		.iconfont
			font-size 46px
			color #666
		span
			color #666
			margin-left 15px
			font-size 24px
</style>
