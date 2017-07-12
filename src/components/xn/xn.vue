/**
* Created by Guanyunjie on date.
*/

<template>
	<div class="xn">
		<div class="xn-wrap">
			<h4>业务：2342342</h4>
			<div id="real_time" class="real-time"></div>
			<div id="history" class="history"></div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import eCharts from 'echarts';

  	export default {
  	  	data() {
  	  	  	return {
  	  	  	  	real: [],
				history: []
			}
		},
		mounted() {
  	  	  	let real = [];
			let eChartsInstance = eCharts.init(document.getElementById('real_time'), {}, {width: 1000, height: 400});
			eChartsInstance.setOption({
				title: {
				  	text: '实时性能图',
					top: 'top',
					left: 'center'
				},
				xAxis: {
				  	time: 'category',
					name: '时间',
					splitLine: {
				  	  	show: false,
						lineStyle: {
				  	  	  	type: 'dashed'
						}
					},
					data: this.getXAsis(20)
				},
				yAxis: {
					type: 'value',
					boundaryGap: [0, '100%'],
					splitLine: {
						show: true,
						lineStyle: {
						  	type: 'dashed'
						}
					}
				},
				toolbox: {
				  	show: true,
					feature: {
				  	  	saveAsImage: {
				  	  	  	type: 'png'
						}
					},
					top: 30,
					right: 80,
					width: 100,
					height: 50
				},
				series: [
					{
					  	name: '源节点',
						type: 'line',
						symbol: 'diamond',
						symbolSize: 8,
						data: [],
						smooth: true
					}
				]
			});
			setInterval(() => {
			  	let now = Date.now();
			  	let item = [
					this.getFormatTime(new Date(now)),
					Math.floor(Math.random() * 100)
				]
				if (real.length >= 10) {
			  	  	real.shift();
				}
				real.push(item);
				eChartsInstance.setOption({
					xAxis: {
					  	data: this.getXAsis(10, now)
					},
					series: [
						{
						  	data: real
						}
					]
				});
			}, 2000)
  	  	},
		methods: {
  	  	  	formatTime(time) {
  	  	  	  	return time < 10 ? '0' + time : time;
			},
  	  	  	getFormatTime(date) {
  	  	  	  	return this.formatTime(date.getHours()) + ':' + this.formatTime(date.getMinutes()) + ':' + this.formatTime(date.getSeconds());
			},
			getXAsis(num, time = Date.now()) {
  	  	  	  	let arr = [];
  	  	  	  	for (let i = 1; i <= num; i++) {
					arr.push(this.getFormatTime(new Date(time - 2000 * (num - i))));
				}
				return arr;
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.xn
		min-height 300px
		.xn-wrap
			margin 20px 30px
			.real-time
				width 800px
				height 400px
			.history
				width 800px
				height 300px
</style>
