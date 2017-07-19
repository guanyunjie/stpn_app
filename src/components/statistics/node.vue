/**
* Created by Guanyunjie on 2017/7/19.
*/
<template>
	<div class="sta-node">
		<app-title :name="'统计列表：节点'"></app-title>
		<div class="node-wrap">
			<table class="custom-tab">
				<thead>
					<tr>
						<th width="2">序号</th>
						<th width="5">名称</th>
						<th width="5">节点ID</th>
						<th width="3">MASTER</th>
						<th width="2">端口数</th>
						<th width="4">地点</th>
						<th width="5">H/W 版本</th>
						<th width="10">S/W 版本</th>
						<th width="4">保护</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="node in nodes" :class="{odd: node % 2 === 1}" title="点击查看详情">
						<td>{{node}}</td>
						<td><span class="ctn" title="of:123456780abe1740">of:123456780abe1740</span></td>
						<td><span class="ctn" title="of:123456780abe1740">of:123456780abe1740</span></td>
						<td>127.0.0.1</td>
						<td>36</td>
						<td>Fiberhome</td>
						<td>Fiberhome</td>
						<td><span class="ctn" title="sfjfhleifuhslifslfvnjhelfshflihfelsifhsuiefsfjfhleifuhslifslfvnjhelfshflihfelsifhsuiefsfjfhleifuhslifslfvnjhelfshflihfelsifhsuief">sfjfhleifuhslifslfvnjhelfshflihfelsifhsuiefsfjfhleifuhslifslfvnjhelfshflihfelsifhsuiefsfjfhleifuhslifslfvnjhelfshflihfelsifhsuief</span></td>
						<td>OF_13</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import title from '../common/title.vue';

	export default {
	  	data() {
	  	  	return {
	  	  	  	nodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
			}
		},
	  	components: {
	  	  	'app-title': title
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import "../../common/stylus/main.styl";

	.sta-node
		.node-wrap
			margin 30px 60px
</style>
