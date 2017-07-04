/**
* Created by Guanyunjie on 2017/7/4.
*/
<template>
	<div class="s-topology">
		<app-title :name="'拓扑详情'"></app-title>
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
	import title from '../common/title.vue';

	export default {
		components: {
	  	  	'app-title': title
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.s-topology
		height 100%
		display flex
		flex-wrap wrap
		.title
			flex 0 0 100%
			text-align left
			font-size: 18px;
			color: #333;
			background: #e4e4e4;
			font-weight: bold;
			padding: 15px 0 8px 20px;
			border-bottom 1px solid #ccc
		.t-area
			flex 5 1 auto
			height 100%
		.panel
			flex 2 1 auto
			height 100%
			border-left 1px solid #ccc
</style>
