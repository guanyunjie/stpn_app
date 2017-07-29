/**
* Created by Guanyunjie on 2017/7/5.
*/
<template>
	<div class="step1">
		<app-title id="sptnTitle" :name="'配置业务基本属性：选择端点'"></app-title>
		<div class="step1-wrap">
			<div id="routArea" class="s-rout" :style="{width: routWidth}">
				<app-rout :nodeChecked="nodeChecked"
						  :size="{width: routWidth, height: routHeight}"
						  :nodeSelectType="'multiple'"
						  :selectedNodes="selectedNodes">

				</app-rout>
			</div>
			<div class="drag-line">
				<div class="drag-icon" @mousedown.left="isDragDown = true">
					<i class="iconfont icon-drag"></i>
				</div>
			</div>
			<div id="panel" class="panel">
				<div id="selectArea" ref="selectArea" @click="clickBlank"></div>
				<div class="tunnels-panel" :style="{'width': panelWidth + 'px'}">
					<div class="tunnels-panel-wrap">
						<table class="custom-tab lucency" v-show="tunnels.length > 0">
							<thead>
								<tr>
									<th width="1">序号</th>
									<th width="3">源节点</th>
									<th width="3">宿节点</th>
									<th width="1">操作</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, index) in tunnels">
									<td>{{index + 1}}</td>
									<td><span class="ctn">{{item.source}}</span></td>
									<td><span class="ctn">{{item.target}}</span></td>
									<td>
										<em class="opr-item" title="定位" @click="positionTunnel(item.source, item.target, $event)">
											<i class="iconfont icon-position"></i>
										</em>
										<em class="opr-item" title="删除" @click="removeTunnel(item.source, item.target, $event)">
											<i class="iconfont icon-remove"></i>
										</em>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<router-link class="tunnel-prev" activeClass="tunnel-active" to="/business/create">
				<i class="iconfont icon-arrow-left"></i>
			</router-link>
			<router-link class="tunnel-next" activeClass="tunnel-active" to="/business/create/port">
				<i class="iconfont icon-arrow-right"></i>
			</router-link>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import title from '../common/title.vue';
	import paragraph from '../common/paragraph.vue';
	import rout from '../rout/rout.vue';
	import eCharts from 'echarts';
	const STYLE = {
	    nodeNormalStyle: {},
		nodeCheckedStyle: {
			normal: {
				borderColor: '#795548',
				borderWidth: 2,
				borderType: 'solid',
				shadowBlur: 10,
				shadowColor: '#795548'
			}
		},
		tunnelNormalStyle: {
		    normal: {
				color: '#FF5722',
				type: 'dotted',
				width: 3
			}
		},
		tunnelCheckedStyle: {
			normal: {
				color: '#FF5722',
				type: 'dotted',
				width: 3,
				shadowColor: 'red',
				shadowBlur: 5
			}
		}
	};

	let $ = window.jQuery = window.$ = require('jquery');
	export default {
	  	data() {
	  	  	return {
	  	  	  	selectedNodes: [],
				tunnels: [],
				tunnelOperation: [],
				tunnelInfo: [],
				routWidth: 0,
				routHeight: 0,
				selectAreaWidth: 0,
				selectAreaHeight: 0,
				panelWidth: 300,
				isDragDown: false,
				isClickElement: false
			}
		},
		created() {
			let mainAreaWidth = document.getElementById('mainArea').clientWidth;
			let mainAreaHeight = document.getElementById('mainArea').clientHeight;
			this.routWidth = mainAreaWidth * 0.7;
			this.routHeight = mainAreaHeight - 45;
			this.selectAreaWidth = mainAreaWidth * 0.3;
			this.selectAreaHeight = mainAreaHeight - 45;
		},
		mounted() {
			let menuHeight = document.getElementById('menu').clientHeight;
			let titleHeight = document.getElementById('sptnTitle').clientHeight;
			this.routHeight = menuHeight - titleHeight;
			// 为panel div设置高度。铺满屏幕
			document.getElementById('panel').style.height = this.routHeight + 'px';
			// 添加拖拽事件。缩放拓扑图
	  	  	document.addEventListener('mousemove', e => {
	  	  	  	if (this.isDragDown && e.which === 1) {
	  	  	  	  	let menuWidth = document.getElementById('menu').clientWidth;
	  	  	  	  	// 路由宽度
	  	  	  	  	this.routWidth = e.x - menuWidth;
	  	  	  	  	// 已选节点面板宽度
	  	  	  	  	this.selectAreaWidth = document.getElementById('mainArea').clientWidth - this.routWidth;
				}
			});
	  	  	document.addEventListener('mouseup', (e) => {
	  	  	  	this.isDragDown = false;
	  	  	  	// 重绘拓扑图
			});
	  	  	let eChartsInstance = eCharts.init(this.$refs['selectArea'], {}, {width: this.selectAreaWidth, height: this.selectAreaHeight});
			eChartsInstance.on('click', (params) => {
				if (params.componentType === 'series' && params.seriesType === 'graph') {
					this.isClickElement = true;
					if (params.dataType === 'node') {
						let selectItem = this.selectedNodes.filter((item) => {
						    return this.tunnelOperation.includes(item.name);
						});
						let isSameNode = false;
						this.selectedNodes.forEach((item) => {
						    if (selectItem.length === 0) {
								if (item.name === params.data.name) {
									item.itemStyle = {
									    normal: {
									       	borderColor: '#795548',
											borderWidth: 2,
											borderType: 'solid',
											shadowBlur: 10,
											shadowColor: '#795548'
										}
									};
									this.tunnelOperation.push(item.name)
								}
							} else if (selectItem.length === 1) {
						        // 两次点击的为同一点
						        if (params.data.name === selectItem[0].name) {
									isSameNode = true;
									return false;
								}
								if (selectItem[0].name === item.name) {
									// 去除将要建立隧道源节点的样式。
									item.itemStyle = {
										normal: {}
									};
									this.tunnelOperation.length = 0;

									// 避免重复建立已经存在的链路
									let isExit = false;
									this.tunnels.forEach(tunnel => {
									    if (tunnel.source === item.name && tunnel.target === params.data.name) {
											isExit = true;
											return false;
										}
									});
									if (!isExit) {
										this.tunnels.push({
											source: item.name,
											target: params.data.name,
											value: Math.floor(Math.random() * 10),
											symbol: ['none', 'arrow'],
											symbolSize: [0, 15],
											lineStyle: {
												normal: {
													color: '#FF5722',
													width: 3,
													type: 'dotted'
												}
											}
										});
									}

									// 两个节点之间只能有一条隧道 删除源宿节点相反的隧道
									let temp = [];
									this.tunnels.forEach(tunnel => {
										if (tunnel.source === params.data.name && tunnel.target === item.name) {
											// fsefsef
										} else {
											temp.push(tunnel);
										}
									});
									this.tunnels = temp;
								}
							}
						});
						if (!isSameNode) {
							eChartsInstance.setOption({
								series: [{
									nodes: this.selectedNodes,
									links: this.tunnels
								}]
							});
						}
					} else if (params.dataType === 'edge') {
						if (params.event.event.altKey || params.event.event.ctrlKey) {
						    let temp = [];
							this.tunnels.forEach(tunnel => {
							   	if (tunnel.source === params.data.source && tunnel.target === params.data.target) {
									// 删除元素有Bug 先这么写着吧
								} else {
							   	    temp.push(tunnel);
								}
							});
							this.tunnels = temp;
							eChartsInstance.setOption({
								series: [{
									nodes: this.selectedNodes,
									links: this.tunnels
								}]
							});
						}
					}
				}
			});
	  	  	eChartsInstance.setOption({
				title: {
					top: 'top',
					left: 'left',
					text: '已选择节点',
					padding: [10, 30],
					subtext: '按住ctrl/alt点击隧道可移除。'
				},
				backgroundColor: '#fff',
				animation: false,
				symbol: 'roundRect',
				symbolSize: 15,
				series: [
					{
						type: 'graph',
						name: 'OTN',
						layout: 'circular',
						nodes: [],
						links: [],
						roam: true,
						draggable: true,
						label: {
							normal: {
								position: 'right'
							}
						},
						force: {
							repulsion: 100
						}
					}
				]
			});

			this.$http.get('/api/statistics/topoData').then(response => {
			    let temp = [];
				for (let i = 0; i < 7; i++) {
					temp.push(response.body.nodes[i]);
				}
				for (let i = 0; i < temp.length; i++) {
					let item = temp[i];
					let obj = {
						name: item.id,
						value: item.name,
						x: Math.floor(Math.random() * 100),
						y: Math.floor(Math.random() * 100),
						symbolSize: 50,
						symbol: 'roundRect',
						itemStyle: {}
					}
					this.selectedNodes.push(obj);
				}
				eChartsInstance.setOption({
					series: [{
						nodes: this.selectedNodes
					}]
				});
			});
		},
	  	components: {
	  	  	'app-title': title,
			'app-rout': rout,
			'app-paragraph': paragraph
		},
		methods: {
			clickBlank() {
			    if (this.isClickElement) {
			        // nothing to do
				} else {
			        // 点击空白去除节点选中效果
					if (this.tunnelOperation.length === 1) {
						this.selectedNodes.forEach(item => {
							if (item.name === this.tunnelOperation[0]) {
								item.itemStyle = {
									normal: {}
								};
								this.tunnelOperation = [];
								return false;
							}
						});
						eCharts.getInstanceByDom(this.$refs['selectArea']).setOption({
							series: [{
								nodes: this.selectedNodes,
								links: this.tunnels
							}]
						});
					}
				}
				this.isClickElement = false;
			},
			nodeChecked(id) {
				if (!this.selectedNodes.includes(id)) {
					this.selectedNodes.push(id);
				}
			},
			positionTunnel(source, target, e) {
			    if ($(e.target).closest('.opr-item').hasClass('position')) {
					$(e.target).closest('.opr-item').removeClass('position');
					this.tunnels.forEach(item => {
						if (item.source === source && item.target === target) {
						    item.lineStyle = STYLE.tunnelNormalStyle;
						}
					});
					eCharts.getInstanceByDom(this.$refs['selectArea']).setOption({
						series: [{
							links: this.tunnels
						}]
					});
				} else {
			        $(e.target).closest('.opr-item').addClass('position');
			        this.tunnels.forEach(item => {
			           	 if (item.source === source && item.target === target) {
			           	     item.lineStyle = STYLE.tunnelCheckedStyle;
						 }
					});
					eCharts.getInstanceByDom(this.$refs['selectArea']).setOption({
						series: [{
							links: this.tunnels
						}]
					});
				}
			},
			removeTunnel(source, target, e) {
			    let temp = [];
			    this.tunnels.forEach(item => {
			       	if (item.source !== source || item.target !== target) {
			       	    temp.push(item);
					}
				});
			    this.tunnels = temp;
				eCharts.getInstanceByDom(this.$refs['selectArea']).setOption({
					series: [{
						links: this.tunnels
					}]
				});
			}
		},
		watch: {
			'selectAreaWidth'(now) {
			   	if (now > 750) {
					this.panelWidth = now * 0.4;
				}
				eCharts.getInstanceByDom(this.$refs['selectArea']).resize({width: now});
			},
			'selectedNodes'(now) {
			  	/* this.tunnelInfo = [];
				now.forEach((item) => {
				  	let tunnel = {
				  	  	name: item,
						source: 'source' + item,
						target: 'target' + item,
						protoType: '1+1保护',
						isBH: '排斥'
					}
					this.tunnelInfo.push(tunnel);
				}); */
			}
		},
		beforeRouteLeave(to, from, next) {
			if (to.path === '/business/create/port') {
			  	console.log('asfse')
			} else if (to.path === '/business/create') {
			  	console.log('aaaaaaaaa')
			}
			next();
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import "../../common/stylus/main.styl";

	.step1
		width 100%
		height 100%
		.step1-wrap
			background #fff
			display flex
			flex-wrap nowrap
			.s-rout
				top 0px
				bottom 0px
				position inherit
				border-right 1px solid #ccc
			.drag-line
				width 1px
				position relative
				background #ccc
				z-index 999
				.drag-icon
					position: absolute
					top: 50%
					left: 50%
					cursor e-resize
					margin-left: -16px
					background: rgba(47, 46, 46, 0.74)
					color: #FFC107
					line-height: 18px
					width: 32px
					border-radius: 4px
					.iconfont
						font-size 18px
			.panel
				flex auto
				height 100%
				background #f2f2f2
				overflow hidden
				.title
					background #10674c
					margin 20px 30px 0
					line-height 32px
					text-align left
					padding-left 20px
					color #fff
				.tunnels-panel
					position absolute
					top 100px
					right 30px
					min-width 300px
					max-height 490px
					overflow-y scroll
				.set-tunnel
					overflow-y hidden
					overflow-x scroll
				.own-node-wrap
					overflow hidden
				.own-node-wrap, .set-tunnel
					background #dbe5f7
					min-height 80px
					margin 0px 30px 50px
					padding 20px 9px
					text-align left
					.own-node
						min-width 300px
					.tab
						background #fff
						margin 0 auto
						width 85%
						min-width 450px
						border 1px solid #ccc
						tr
							color #4c4c4c
							font-size 14px
							th
								line-height 40px
								height 40px
								padding-left 5px
								font-weight bold
								border-right 1px dashed #ccc
								border-bottom 1px dashed #ccc
							td
								line-height 40px
								padding-left 5px
								border-right 1px dashed #ccc
								border-bottom 1px dashed #ccc
					.node-item
						position relative
						display inline-block
						margin 5px 10px
						padding 0 30px 0 10px
						background #86ce5f
						color #fff
						font-size 14px
						border-top-right-radius 99px
						border-bottom-right-radius 99px
						line-height 24px
						em
							top 6px
							font-size 18px
							right 10px
							line-height 10px
							width 10px
							cursor pointer
							text-align center
							display block
							position absolute
							&:hover
								color #fb9494
			.tunnel-prev, .tunnel-next
				background green
				width 50px
				height 100px
				line-height 100px
				position absolute
				margin-top -50px
			.tunnel-prev
				top 50%
				left 0
			.tunnel-next
				top 50%
				right 0

</style>
