/**
* Created by Guanyunjie on 2017/7/19.
*/
<template>
	<div class="sta-node">
		<app-title :name="'统计列表：节点'"></app-title>
		<div class="node-wrap">
			<div class="rotate-box" :style="{transform: rotate, height: rotateHeight + 'px'}">
				<div class="rotate-tab">
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
						<tr v-for="node in nodes" :class="{odd: node % 2 === 1}" title="点击查看详情" @click="selectTr(node)">
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
				<div class="rotate-panel">
					<app-paragraph :name="'节点详情：'+selectNodeId"
								   :color="{bc: 'linear-gradient(#d49665, #9a6943)', fc: '#fff'}"
								   :border="true">
					</app-paragraph>
					<table class="view-tab">
						<tbody>
						<tr>
							<th width="15%">URI</th>
							<td width="35%">of:123456780abe1740</td>
							<th width="15%" class="border-sy">TYPE</th>
							<td width="35%">Roadm_otn</td>
						</tr>
						<tr>
							<th>Master ID</th>
							<td>127.0.0.1</td>
							<th class="border-sy">Chassis ID</th>
							<td>123456780abe1740</td>
						</tr>
						<tr>
							<th>Vendor </th>
							<td>Fiberhome Wuhan</td>
							<th class="border-sy">H/W Version</th>
							<td>Openflow Switch -> SDON</td>
						</tr>
						<tr>
							<th>S/W VERSION</th>
							<td colspan="3">sfesfsfgiufgsiuefygiuvjhbseuygfsifyugsfiusygfsiufeygsef</td>
						</tr>
						<tr>
							<th>Protocol </th>
							<td>OF_13</td>
							<th class="border-sy">Serial #</th>
							<td>123456</td>
						</tr>
						</tbody>
					</table>
					<table class="custom-tab tab-small" style="width: 90%;margin-bottom: 50px">
						<thead>
						<tr>
							<th width="50">序号</th>
							<th width="150">ID</th>
							<th width="130">Speed</th>
							<th width="130">Type</th>
							<th>Egress Links</th>
							<th width="170">Name</th>
							<th width="120">Enabled</th>
						</tr>
						</thead>
						<tbody>
						<tr v-for="(port, index) in ports">
							<td>{{index + 1}}</td>
							<td>{{port}}</td>
							<td>10000</td>
							<td>Packet</td>
							<td><span class="ctn" title="of:123456780abe173f/17104898">of:123456780abe173f/17104898</span></td>
							<td>0x01010009</td>
							<td>true</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<transition name="common">
			<div id="node-back" class="back" v-show="isBackShow" @click="backToTable">
				<i class="iconfont icon-arrow-left"></i>
			</div>
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
	import title from '../common/title.vue';
	import paragraph from '../common/paragraph.vue';

	export default {
	  	data() {
	  	  	let arr = [];
	  	  	for (let i = 0; i < 30; i++) {
	  	  	  	arr.push(Math.floor(Math.random() * 100));
			}
	  	  	return {
	  	  	  	nodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
				rotate: 'rotateY(0deg)',
				selectNodeId: '',
				ports: arr,
				rotateHeight: 0,
				isBackShow: false
			}
		},
	  	components: {
	  	  	'app-title': title,
			'app-paragraph': paragraph
		},
		methods: {
	  	  	selectTr(id) {
	  	  	  	this.rotate = 'rotateY(-89.99deg)';
	  	  	  	this.selectNodeId = id;
	  	  	  	let panelHeight = document.getElementsByClassName('rotate-panel')[0].clientHeight;
	  	  	  	this.rotateHeight = panelHeight + 50;
	  	  	  	this.isBackShow = true;
			},
			backToTable() {
				this.rotate = 'rotateY(0deg)';
				let nodeHeight = document.getElementsByClassName('rotate-tab')[0].clientHeight;
				this.rotateHeight = nodeHeight + 50;
				this.isBackShow = false;
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import "../../common/stylus/main.styl";

	.sta-node
		.node-wrap
			margin 30px 60px
			.rotate-box
				position relative
				display block
				transform-style preserve-3d
				transition 0.5s
				.rotate-tab, .rotate-panel
					position absolute
					left: 0;
					top: 0;
				.rotate-tab
					transform: translateZ(545px);
					margin-bottom 50px
				.rotate-panel
					transform rotateY(90deg) translateZ(545px);
					background #fff
		.back
			position fixed
			top 50%
			width 60px
			height 80%
			margin-top -20%
			cursor pointer
			text-align center
			&:hover
				box-shadow 0 0 0 #666
			.iconfont
				position absolute
				font-size 32px
				color #666
				margin-left -16px
				transition 0.6s
				top 50%
				animation: move linear 3s infinite;

	@keyframes move
		0%
			left 55%
			text-shadow: 6px 1px 5px #8e8585
		25%
			left 50%
			text-shadow: 8px 1px 5px #8e8585
		50%
			left 45%
			text-shadow: 10px 1px 5px #8e8585
		75%
			left 50%
			text-shadow: 8px 1px 5px #8e8585
		100%
			left 55%
			text-shadow: 6px 1px 5px #8e8585

</style>
