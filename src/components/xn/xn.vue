/**
* Created by Guanyunjie on date.
*/

<template>
	<div class="xn">
		<div class="xn-wrap">
			<h4>业务：{{ywId}}</h4>
			<div id="real_time" class="real-time"></div>
			<div class="history_oper">
				<div class="ld">
					<span class="ld-title">粒度</span>
					<div class="inp-wrap">
						<div class="inp inp-radius"
							 @mouseenter="isSelectOpen1 = true"
							 @mouseleave="isSelectOpen1 = false">
							<label class="custom-select">
								<span>15分钟</span>
								<i class="iconfont"
								   :class="isSelectOpen1 ? 'icon-arrow-bottom' : 'icon-arrow-left'"></i>
							</label>
							<ul class="custom-ul" v-show="isSelectOpen1">
								<li class="custom-item">15分钟</li>
								<li class="custom-item">24小时</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="ld">
					<span class="ld-title">粒度</span>
					<div class="inp-wrap">
						<div class="inp inp-radius"
							 @mouseenter="isSelectOpen1 = true"
							 @mouseleave="isSelectOpen1 = false">
							<label class="custom-select">
								<span>15分钟</span>
								<i class="iconfont"
								   :class="isSelectOpen1 ? 'icon-arrow-bottom' : 'icon-arrow-left'"></i>
							</label>
							<ul class="custom-ul" v-show="isSelectOpen1">
								<li class="custom-item">15分钟</li>
								<li class="custom-item">24小时</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="ld">
					<span class="ld-title">粒度</span>
					<div class="inp-wrap">
						<div class="inp inp-radius"
							 @mouseenter="isSelectOpen1 = true"
							 @mouseleave="isSelectOpen1 = false">
							<label class="custom-select">
								<span>15分钟</span>
								<i class="iconfont"
								   :class="isSelectOpen1 ? 'icon-arrow-bottom' : 'icon-arrow-left'"></i>
							</label>
							<ul class="custom-ul" v-show="isSelectOpen1">
								<li class="custom-item">15分钟</li>
								<li class="custom-item">24小时</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div id="history" class="history"></div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import eCharts from 'echarts';
	import moment from 'moment';

  	export default {
  	  	data() {
  	  	  	return {
  	  	  	  	ywId: '',
				isSelectOpen1: false,
  	  	  	  	real: [],
				real2: [],
				history: []
			}
		},
		created() {
  	  	  	this.ywId = this.$route.params.yw;
  	  	  	for (let i = 300; i > 0; i--) {
				let item = [
					Date.now() - 2000 * i,
					Math.floor(Math.random() * 10000000)
				];
				this.history.push(item);
			}
		},
		mounted() {
			let eChartsInstance = eCharts.init(document.getElementById('real_time'), {}, {width: 1000, height: 400});
			eChartsInstance.setOption({
				title: {
				  	text: '实时性能图',
					top: 'top',
					left: 'center'
				},
				legend: {
				  	show: true,
					top: 'top',
					left: 'middle'
				},
				xAxis: {
				  	time: 'time',
					name: '时间',
					nameLocation: 'middle',
					nameGap: 30,
					nameTextStyle: {
				  	  	color: '#333',
						fontSize: 14
					},
					boundaryGap: [0, '100%'],
					min: 'dataMin',
					max: 'dataMax',
					splitLine: {
				  	  	show: false,
						lineStyle: {
				  	  	  	type: 'dashed'
						}
					},
					axisLabel: {
						showMinLabel: true,
						formatter(value, index) {
				  	  	  	let format = moment(value).format('HH:mm:ss');
				  	  	  	if (index === 0) {
								format = moment(value).format('YY年MM月DD日 HH:mm:ss')
							}
						  	return format;
						}
					}
				},
				yAxis: {
					type: 'value',
					name: '收包数',
					nameLocation: 'end',
					nameTextStyle: {
						color: '#333',
						fontSize: 14
					},
					boundaryGap: [0, '100%'],
					splitLine: {
						show: true,
						lineStyle: {
						  	type: 'dashed'
						}
					}
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow',
						snap: true
					},
					position: [130, 50],
					formatter(params, ticket, cb) {
						let html = `
									${params[0].seriesName}:${params[0].data[0]}<br/>
									${moment(params[0].axisValue).format('YYYY/MM/DD HH:mm:ss')}<br/>
									${params[1].seriesName}:${params[1].data[1]}<br/>
									${moment(params[1].axisValue).format('YYYY/MM/DD HH:mm:ss')}<br/>
								`
						return html;
					},
					textStyle: {
						color: '#333'
					},
					backgroundColor: '#fafafa',
					borderColor: '#333',
					borderWidth: 1,
					padding: 3
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
					},
					{
						name: '宿节点',
						type: 'line',
						symbol: 'diamond',
						symbolSize: 8,
						data: [],
						smooth: true
					}
				]
			});
			let time = 0;
			setInterval(() => {
			  	let now = Date.now();
			  	let item = [
					now,
					Math.floor(Math.random() * 10000000)
				];
			  	let item2 = [
					now,
					Math.floor(Math.random() * 10000000)
				]
				if (this.real.length >= 20) {
					this.real.shift();
					this.real2.shift();
				}
				this.real.push(item);
				this.real2.push(item2);
				this.history.push(item);
				eChartsInstance.setOption({
					series: [
						{
						  	data: this.real
						},
						{
							data: this.real2
						}
					]
				});
				if (++time % 10 === 0) {
					eChartsHistoryInstance.setOption({
						series: [
							{
								data: this.history
							}
						]
					});
				}
			}, 3000);
			let eChartsHistoryInstance = eCharts.init(document.getElementById('history'), {}, {width: 1000, height: 400});
			eChartsHistoryInstance.setOption({
				title: {
					text: '历史性能图',
					top: 'top',
					left: 'center',
					subtext: '鼠标拖拽可以进行缩放'
				},
				xAxis: {
					time: 'time',
					name: '时间',
					nameLocation: 'middle',
					nameGap: 30,
					nameTextStyle: {
						color: '#333',
						fontSize: 14
					},
					min: 'dataMin',
					max: 'dataMax',
					scale: true,
					splitLine: {
						show: false,
						lineStyle: {
							type: 'dashed'
						}
					},
					axisLabel: {
						showMinLabel: true,
						formatter(value, index) {
							let format = moment(value).format('HH:mm:ss');
							if (index === 0) {
								format = moment(value).format('YY-MM-DD HH:mm:ss')
							}
							return format;
						}
					}
				},
				yAxis: {
				  	name: '收包数',
					type: 'value',
					nameTextStyle: {
						color: '#333',
						fontSize: 14
					},
					boundaryGap: [0, '100%'],
					splitLine: {
						show: true,
						lineStyle: {
							type: 'dashed'
						}
					}
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow',
						snap: true
					},
					position: [130, 50],
					formatter(params, ticket, cb) {
						params = params[0];
						let html = `
					  		${params.seriesName}:${params.data[1]}<br/>
					  		${moment(params.axisValue).format('YYYY/MM/DD HH:mm:ss')}
					  	`
						return html;
					},
					textStyle: {
						color: '#333'
					},
					backgroundColor: '#fafafa',
					borderColor: '#333',
					borderWidth: 1,
					padding: 3
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
				dataZoom: [
					{
					  	type: 'slider',
						dataBackground: {
							areaStyle: {
							  	color: 'green'
							}
						},
						labelFormatter(value, index) {
							let format = moment(value).format('HH:mm:ss');
							if (index === 0) {
								format = moment(value).format('YY-MM-DD HH:mm:ss')
							}
							return format;
						},
						xAxisIndex: [0],
						dataZoomIndex: 1,
						filterMode: 'filter'
					},
					{
				  		type: 'inside'
					}
				],
				series: [
					{
						name: '源节点',
						type: 'line',
						symbol: 'diamond',
						symbolSize: 5,
						data: this.history,
						smooth: true,
						itemStyle: {
						  	normal: {}
						},
						lineStyle: {
						  	normal: {
						  	  	color: 'green',
								width: 1
							}
						},
						areaStyle: {
						  	normal: {
						  	  	color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0, color: 'blue'
									}, {
										offset: 1, color: '#fff'
									}],
									globalCoord: false
								}
							}
						}
					}
				]
			});
  	  	},
		methods: {
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import "../../common/stylus/main.styl";

	.xn
		min-height 300px
		.xn-wrap
			margin 20px 30px
			.real-time
				width 800px
				height 400px
				margin-bottom 50px
			.history
				width 800px
				height 300px
				margin-bottom 130px
			.history_oper
				height 36px
				margin 20px 100px 10px
				.ld
					float right
					line-height 36px
					width 120px
					height 36px
					position relative
					margin-left 100px
					.ld-title
						top 0px
						left -45px
						line-height 36px
						height 36p
						position absolute
						font-weight bold
						font-size 14px
						color #333

</style>
