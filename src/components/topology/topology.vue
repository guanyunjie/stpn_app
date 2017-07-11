/**
* Created by Guanyunjie on 2017/7/4.
*/
<template>
	<div class="topology">
		<app-title :name="'拓扑详情'"></app-title>
		<div class="s-topology">
			<app-rout :nodeChecked="nodeChecked"
					  :linkChecked="linkChecked"
					  :size="{width: 1100, height: 800}"
					  :selectedNodes="[selectedNode.id]"></app-rout>
			<div class="panel" v-show="selectedNode.name || selectedNode.value">
				<h2><img :src="selectedNode.name ? './static/svg/normal/eth.svg' : './static/svg/normal/odu.svg'" alt="">属性面板</h2>
				<table class="tab">
					<tbody>
						<tr v-show="selectedNode.name || selectedNode.value">
							<th>名称：</th>
							<td>{{selectedNode.name || selectedNode.value}}</td>
						</tr>
						<tr v-show="selectedNode.company">
							<th>厂商：</th>
							<td>{{selectedNode.company}}</td>
						</tr>
						<tr v-show="selectedNode.type">
							<th>类型：</th>
							<td>{{selectedNode.type}}</td>
						</tr>
						<tr v-show="selectedNode.port">
							<th>端口：</th>
							<td>{{selectedNode.port}}</td>
						</tr>
						<tr v-show="selectedNode.source">
							<th>源节点：</th>
							<td>{{selectedNode.source}}</td>
						</tr>
						<tr v-show="selectedNode.target">
							<th>宿节点：</th>
							<td>{{selectedNode.target}}</td>
						</tr>
					</tbody>
				</table>
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
				selectedNode: {},
				nodeChecked(id) {
				  	_this.$http.get('/api/node/' + id).then((res) => {
						_this.selectedNode = res.body.result;
					});
				},
				data: {},
				linkChecked(id) {
					_this.$http.get('/api/link/' + id).then((res) => {
						_this.selectedNode = res.body.result;
					});
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
			width 88%
			margin 20px auto
			background #fff
			position relative
			height 100%
			flex-wrap wrap
			border 1px solid #000
			overflow hidden
			.t-area
				height 100%
			.panel
				position absolute
				right 30px
				top 60px
				background #fff
				opacity 0.86
				border 1px solid #ccc
				h2
					text-align left
					padding-left 30px
					line-height 30px
				.tab
					width 240px
					margin 0px 30px 20px 30px
					border 1px solid #ccc
					tr
						color #4c4c4c
						font-size 16px
						th
							line-height 30px
							text-align right
						td
							line-height 30px
							text-align left
							padding-left 10px
</style>
