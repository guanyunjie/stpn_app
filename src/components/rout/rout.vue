/**
* Created by Guanyunjie on date.
*/

<template>
	<div class="rout">
		<p>{{nodeName}}</p>
		<div id="main" style="width: 600px;height:400px;"></div>
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
				tooltip: {},
				xAxis: {},
				yAxis: {},
				series: [{
					name: 'Les Miserables',
					type: 'graph',
					layout: 'force',
					roam: true,
					data: [],
					links: [],
					label: {
						normal: {
							position: 'right'
						}
					},
					force: {
						repulsion: 100
					}
				}]
			});
			this.$http.get('/api/topoList').then((res) => {
				this.data.nodes = res.body.result;
				myCharts.setOption({
					series: [{
						data: res.body.result
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
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.rout
		min-height 300px
</style>
