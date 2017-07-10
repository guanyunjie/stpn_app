/**
* Created by Guanyunjie on date.
*/

<template>
	<div class="rout">
		<div id="main" style="width: 800px;height:800px;background: #eaeaea"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	import eCharts from 'echarts';
	// require('echarts/lib/chart/graph');

	/* require('echarts/lib/component/tooltip');
	require('echarts/lib/component/legend');
	require('echarts/lib/component/title'); */

	// 元素节点背景列表
	const nodeBackgrounds = ['image://static/img/3265549600663283.jpg', 'image://static/img/beijing.jpg', 'image://static/img/timg.jpg'];
	const nodeSelectStyle = {borderColor: '#000', borderWidth: 2};
	const nodeNormalStyle = {};
	const linkSelectStyle = {color: 'rgb(91, 153, 210)', width: 4};
	const linkNormalStyle = {color: 'rgb(91, 153, 210)', width: 2};

	export default {
		props: ['nodeChecked', 'linkChecked'],
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
			let eChartsInstance = eCharts.init(document.getElementById('main'));
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
						  	//	节点选中状态
						  	this.nodeSelected(params, eChartsInstance);
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
					text: 'SPTN拓扑图',
					top: 'top',
					left: 'left',
					padding: [10, 30]
				},
				tooltip: {},
				legend: [{
					// selectedMode: 'single',
					data: [
						{
						  	name: 'ETH',
							icon: nodeBackgrounds[0]
						},
						{
						  	name: 'ODU',
							icon: nodeBackgrounds[1]
						},
						{
						  	name: 'OCH',
							icon: nodeBackgrounds[2]
						}],
					top: 'top',
					left: 'right',
					padding: [10, 30]
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
								category: 0,
								name: 'ETH'
							},
							{
								name: 'ODU',
								symbol: 'circle'
							},
							{
								name: 'OCH',
								symbol: 'diamond'
							}
						]
					}
				],
				animationDurationUpdate: 0
			});
			eChartsInstance.showLoading();
			this.$http.get('/api/nodes').then((res) => {
				eChartsInstance.hideLoading();
				let result = res.body.result;
				for (let i = 0; i < result.length; i++) {
					let item = result[i];
					let obj = {
						name: item.id,
						value: item.name,
						x: Math.floor(Math.random() * 100),
						y: Math.floor(Math.random() * 100),
						symbolSize: 40,
						symbol: 'roundRect',
						category: i % 3,
						tooltip: {
							position: 'right',
							backgroundColor: '#ccc',
							borderColor: '#333'
						},
						itemStyle: {}
					}
					this.nodes.push(obj);
				}
				eChartsInstance.setOption({
					series: [{
						data: this.nodes
					}]
				});
			});
			this.$http.get('/api/links').then((res) => {
			  	let result = res.body.result;
			  	for (let i = 0; i < result.length; i++) {
			  	  	let item = result[i];
			  	  	let link = {
			  	  	  	source: item.source,
						target: item.target,
						value: item.value,
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
			getRandomColor() {
				return '#' + ('00000' + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
			},
			nodeSelected(params, eChartsInstance) {
				this.links.forEach((link) => {
					link.lineStyle.normal = linkNormalStyle;
				});
				this.nodes.forEach((node) => {
				  	node.itemStyle.normal = node.name === params.data.name ? nodeSelectStyle : nodeNormalStyle;
				});
				eChartsInstance.setOption({
					series: [{
						data: this.nodes,
						links: this.links
					}]
				});
			},
			linkSelected(params, eChartsInstance) {
				this.links.forEach((link) => {
					link.lineStyle.normal = link.value === params.data.value ? linkSelectStyle : linkNormalStyle;
				});
				this.nodes.forEach((node) => {
					node.itemStyle.normal = nodeNormalStyle;
				});
				eChartsInstance.setOption({
					series: [{
					  	data: this.nodes,
						links: this.links
					}]
				});
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.rout
		min-height 300px
</style>
