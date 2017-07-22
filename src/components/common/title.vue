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
		font-size 16px
		text-align left
		color #eaeaea
		background linear-gradient(#3e3e3e, #565656)
		line-height 46px
		padding-left 26px
		font-weight bold
		border-bottom 1px solid #ccc
		user-select none
</style>
