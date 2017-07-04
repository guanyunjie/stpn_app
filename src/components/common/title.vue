/**
* Created by Guanyunjie on date.
*/

<template>
	<h3 class="title">{{name}}</h3>
</template>

<script type="text/ecmascript-6">
  export default {
	  props: ['name']
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.title
		font-size 18px
		text-align left
		color #333
		background #e4e4e4
		font-weight bold
		padding 15px 0 8px 20px
		border-bottom 1px solid #ccc
</style>
