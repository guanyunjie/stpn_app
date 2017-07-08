/**
* Created by Guanyunjie on 2017/7/4.
*/
<template>
	<div class="topology">
		<app-title :name="'拓扑详情'"></app-title>
		<div class="s-topology">
			<app-rout :nodeChecked="nodeChecked" :linkChecked="linkChecked"></app-rout>
			<div class="panel">
				<h2>属性面板</h2>
				<p>名称：{{selectedNodeInfo.name}}</p>
				<p>厂商：{{selectedNodeInfo.company}}</p>
				<p>类型：{{selectedNodeInfo.type}}</p>
				<p>端口：{{selectedNodeInfo.port}}</p>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import title from '../common/title.vue';
	import rout from '../rout/rout.vue';

	export default {
	  	data() {
	  	  	let _this = this;
	  	  	return {
				selectedNodeInfo: {
				  	name: 'weizhi',
					type: 'weizhi'
				},
				nodeChecked(id) {
				  	_this.$http.get('/api/node/' + id).then((res) => {
						_this.selectedNodeInfo = res.body.result;
					});
				},
				data: {},
				linkChecked(id) {
				  	console.log(id);
				}
			}
		},
		mounted() {},
		components: {
	  	  	'app-title': title,
			'app-rout': rout
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
