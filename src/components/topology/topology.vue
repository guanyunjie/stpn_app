/**
* Created by Guanyunjie on 2017/7/4.
*/
<template>
	<div class="topology">
		<app-title :name="'拓扑详情'"></app-title>
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
	.topology
		.s-topology
			width 90%
			background #fff
			height 100%
			margin 0 auto
			display flex
			flex-wrap wrap
			.t-area
				flex 5 1 auto
				height 100%
			.panel
				flex 2 1 auto
				height 100%
				border-left 1px solid #ccc
</style>
