/**
* Created by Guanyunjie on 2017/7/5.
*/
<template>
	<div class="step1">
		<app-title :name="'配置业务基本属性：选择端点'"></app-title>
		<div class="s-rout">
			<app-rout></app-rout>
		</div>
		<div class="panel">
			this is panel area
			<router-link to="/business/create/step2">
				确定
			</router-link>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import title from '../common/title.vue';
	import rout from '../rout/rout.vue';

	export default {
	  	components: {
	  	  	'app-title': title,
			'app-rout': rout
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.step1
		width 100%
		height 100%
		.s-rout
			display inline-block
			height 100%
			border-right 1px solid #ccc
			width 70%
		.panel
			display inline-block
			background #ccc
			height 100%
			width 29%
</style>
