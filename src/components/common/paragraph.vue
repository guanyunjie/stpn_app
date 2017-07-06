/**
* Created by Guanyunjie on 2017/7/6.
*/
<template>
	<h4 class="paragraph" :style="{background: color.bc, color: color.fc, 'border-bottom': border ? '1px dashed #ccc' : 'none'}">{{name}}</h4>
</template>

<script type="text/ecmascript-6">
	export default {
	  	props: ['name', 'color', 'border']
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.paragraph
		margin 0 auto
		padding-left 26px
		text-align left
		color #4c4c4c
		background #fff
		font-size 20px
		font-weight bold
		border-bottom 1px dashed #ccc
		line-height 50px
</style>
