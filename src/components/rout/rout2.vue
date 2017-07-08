/**
* Created by Guanyunjie on date.
*/

<template>
	<div class="rout">
		<div id="main" style="width: 800px;height:800px;background: #eaeaea"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	import eCharts from 'echarts/lib/echarts';
	require('echarts/lib/chart/graph');

	export default {
		props: ['nodeChecked', 'linkChecked'],
		data() {
			return {
				nodeName: '',
				data: []
			}
		},
		created() {},
		mounted() {
			let myCharts = eCharts.init(document.getElementById('main'));
			let _this = this;
			myCharts.on('click', (params) => {
				if (params.componentType === 'series') {
					_this.nodeName = params.data.name;
					if (params.dataType === 'node') {
						if (typeof _this['nodeChecked'] === 'function') {
							_this['nodeChecked'](params.data.name);
						}
					}
					if (params.dataType === 'edge') {
						if (typeof _this['linkChecked'] === 'function') {
							_this['linkChecked'](params.data.name);
						}
					}
				}
			});
			myCharts.setOption({
				title: { text: 'SPTN拓扑图' },
				legend: {
					borderColor: '#333',
					left: 'left',
					selected: {
						'ETH': true,
						'ODU': true,
						'OCH': true
					},
					data: ['ETH', 'ODU', 'OCH']
				},
				backgroundColor: '#f2f2f2',
				series: [{
					name: 'Les Miserables',
					type: 'graph',
					layout: 'force',
					data: [],
					links: [],
					label: {
						normal: {
							position: 'right'
						}
					},
					force: {
						repulsion: 50,
						gravity: 0.9,
						edgeLength: [10, 50],
						layoutAnimation: true
					},
					cursor: 'pointer',
					lineStyle: {
						normal: {
							color: 'red',
							width: 1,
							type: 'dashed',
							curveness: 0.5
						},
						emphasis: {
							color: 'blue',
							width: 2,
							shadowBlur: 5,
							shadowColor: 'blue'
						}
					},
					categories: [
						{
							name: 'ETH',
							symbol: 'arrow'
						},
						{
							name: 'ODU',
							symbol: 'roundRect'
						},
						{
							name: 'OCH',
							symbol: 'arrow'
						}
					]
				}]
			});
			this.$http.get('/api/nodes').then((res) => {
				let result = res.body.result;
				this.data.nodes = [];
				for (let i = 0; i < result.length; i++) {
					let item = result[i];
					let obj = {
						name: item.id,
						value: item.name,
						x: Math.floor(Math.random() * 100),
						y: Math.floor(Math.random() * 100),
						symbolSize: 30,
						category: i % 3,
						tooltip: {
							position: 'right',
							backgroundColor: '#ccc',
							borderColor: '#333'
						}
					}
					this.data.nodes.push(obj);
				}
				myCharts.setOption({
					series: [{
						data: this.data.nodes
					}]
				});
			});
			this.$http.get('/api/links').then((res) => {
				myCharts.setOption({
					series: [{
						links: res.body.result
					}]
				});
			});
		},
		methods: {
			getRandomColor() {
				return '#' + ('00000' + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.rout
		min-height 300px
</style>
