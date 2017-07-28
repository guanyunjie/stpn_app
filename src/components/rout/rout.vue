/**
* Created by Guanyunjie on date.
*/

<template>
	<div class="rout">
		<div id="main" style="background: #eaeaea"></div>
	</div>
</template>

<script type="text/ecmascript-6">

	/* require('echarts/lib/component/tooltip');
	 require('echarts/lib/component/legend');
	 require('echarts/lib/component/title'); */
	// require('echarts/lib/chart/graph');

	import eCharts from 'echarts';
	// 元素节点背景列表
	const nodeBackgrounds = ['eth', 'odu', 'och', 'oms'];
	const linkSelectStyle = {color: '#009fdb', width: 3};
	const linkNormalStyle = {color: 'rgb(91, 153, 210)', width: 2};

	export default {
		props: ['nodeChecked', 'linkChecked', 'size', 'nodeSelectType', 'selectedNodes'],
		data() {
			return {
				nodeName: '',
				nodes: [],
				links: [],
				//	区分点击和拖拽事件
				isDrag: false
			}
		},
		created() {},
		mounted() {
			let eChartsInstance = eCharts.init(document.getElementById('main'), {}, {width: this.size.width || 800, height: this.size.height || 800});
			// EVENTS配置
			eChartsInstance.on('mousedown', () => {
			  	this.isDrag = false;
			});
			eChartsInstance.on('mousemove', () => {
			  	this.isDrag = true;
			});
			eChartsInstance.on('mouseup', (params) => {
				if (!this.isDrag && params.componentType === 'series') {
					this.nodeName = params.data.name;
					//	点击节点时
					if (params.dataType === 'node') {
						if (typeof this['nodeChecked'] === 'function') {
						  	// 父组件传入的事件
							this['nodeChecked'](params.data.name);
						}
						// 点击链路时
					} else if (params.dataType === 'edge') {
						if (typeof this['linkChecked'] === 'function') {
						  	// 链路选中状态
						  	this.linkSelected(params, eChartsInstance);
							this['linkChecked'](params.data.value);
						}
					}
				}
			});
			// 数据视图配置
			eChartsInstance.setOption({
				title: {
					top: 'top',
					left: 'left',
					padding: [10, 30]
				},
				backgroundColor: '#eee',
				legend: [{
					// selectedMode: 'single',
					data: [
						{
						  	name: 'ETH',
							icon: this.getSvgPath(nodeBackgrounds[0])
						},
						{
						  	name: 'ODU',
							icon: this.getSvgPath(nodeBackgrounds[1])
						},
						{
						  	name: 'OCH',
							icon: this.getSvgPath(nodeBackgrounds[2])
						},
						{
							name: 'OMS',
							icon: this.getSvgPath(nodeBackgrounds[3])
						}],
					top: 'top',
					left: 'right',
					padding: [10, 30],
					itemWidth: 24,
					itemHeight: 24
				}],
				animation: false,
				series: [
					{
					  	type: 'graph',
						name: 'OTN',
						layout: 'force',
						nodes: [
							{
							  	itemStyle: {
							  	  	normal: {
							  	  	  	borderColor: '#000',
										borderWidth: 2
									}
								}
							}
						],
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
						},
						categories: [
							{
								name: 'ETH',
								symbol: this.getSvgPath(nodeBackgrounds[0])
							},
							{
								name: 'ODU',
								symbol: this.getSvgPath(nodeBackgrounds[1])
							},
							{
								name: 'OCH',
								symbol: this.getSvgPath(nodeBackgrounds[2])
							},
							{
								name: 'OMS',
								symbol: this.getSvgPath(nodeBackgrounds[3])
							}
						]
					}
				],
				animationDelayUpdate: 0,
				animationEasingUpdate: 'elasticOut',
				animationDurationUpdate: (idx) => {
				  	return idx * 5;
				},
				animation: false,
				progressive: 0,
				progressiveThreshold: 0
			});
			eChartsInstance.showLoading();
			this.$http.get('/api/statistics/topoData').then(response => {
				eChartsInstance.hideLoading();
				let nodes = response.body.nodes;
				for (let i = 0; i < 20; i++) {
					let item = nodes[i];
					let obj = {
						name: item.id,
						value: item.name,
						x: Math.floor(Math.random() * 100),
						y: Math.floor(Math.random() * 100),
						symbolSize: 50,
						symbol: this.getSvgPath(nodeBackgrounds[i % 4]),
						category: i % 4,
						itemStyle: {}
					}
					this.nodes.push(obj);
				}
				eChartsInstance.setOption({
					series: [{
						data: this.nodes
					}]
				});

				let links = response.body.links;
				for (let i = 0; i < links.length; i++) {
					let item = links[i];
					let link = {
						source: item.leftNodeId,
						target: item.rightNodeId,
						value: 'aaa',
						lineStyle: {
							normal: {
								color: 'rgb(91, 153, 210)',
								width: 2
							}
						}
					}
					this.links.push(link);
				}
				eChartsInstance.setOption({
					series: [{
						links: this.links
					}]
				});
			});
		},
		methods: {
		  	svgPath() {
		  	  	return 'image://static/svg/';
			},
		  	getSvgPath(layer = 'eth', condition = 'normal') {
		  	  	return this.svgPath() + condition.toLowerCase() + '/' + layer.toLowerCase() + '.svg';
			},
			getRandomColor() {
				return '#' + ('00000' + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
			},
			linkSelected(params, eChartsInstance) {
				this.links.forEach((link) => {
					link.lineStyle.normal = link.value === params.data.value ? linkSelectStyle : linkNormalStyle;
				});
				this.nodes.forEach((node) => {
					node.symbol = this.getSvgPath(nodeBackgrounds[node.category]);
				});
				eChartsInstance.setOption({
					series: [{
					  	data: this.nodes,
						links: this.links
					}]
				});
			}
		},
		watch: {
			selectedNodes(now) {
				this.nodes.forEach((node) => {
					node.symbol = this.getSvgPath(nodeBackgrounds[node.category], now.includes(node.name) ? 'selected' : 'normal');
				});
			  	eCharts.getInstanceByDom(document.getElementById('main')).setOption({
					series: [{
						data: this.nodes,
						links: this.links
					}]
				});
			},
			size(now) {
				eCharts.getInstanceByDom(document.getElementById('main')).resize({width: now.width});
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.rout
		min-height 300px
</style>
