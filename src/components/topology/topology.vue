/**
* Created by Guanyunjie on 2017/7/4.
*/
<template>
	<div class="s-topology">
		<div class="t-area">
			<router-link to="/topology/panel/121312">a1</router-link>
			<router-link to="/topology/panel/324223">a2</router-link>
			<router-link to="/topology/panel/543545">a3</router-link>
			<router-link to="/topology/panel/645453">a4</router-link>
		</div>
		<div class="panel">
			<router-view></router-view>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.s-topology
		height 100%
		display flex
		.t-area
			flex 5 1 auto
			height 100%
		.panel
			flex 2 1 auto
			height 100%
			border-left 1px solid #ccc
</style>
