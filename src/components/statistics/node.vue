/**
* Created by Guanyunjie on 2017/7/19.
*/
<template>
	<div class="sta-node">
		<app-title :name="'统计列表：节点  共（'+devices.length+'条）'"></app-title>
		<div class="node-wrap">
			<div class="rotate-box" :style="{transform: rotate, height: rotateHeight + 'px'}">
				<div class="rotate-tab" :style="{transform: translateZ}">
					<div class="search">
						<input id="searchValue" type="text" @keydown.13="searchDevice" placeholder="search...">
						<a class="search-btn" @click="searchDevice" href="javascript:;"><i class="iconfont icon-search"></i></a>
					</div>
					<app-loading v-show="loadState === 'loading'"></app-loading>
					<table class="custom-tab" v-show="loadState === 'loaded'">
						<thead>
						<tr>
							<th width="2">序号</th>
							<th width="5">名称</th>
							<th width="5">节点ID</th>
							<th width="5">MASTER</th>
							<th width="2">端口数</th>
							<th width="4">地点</th>
							<th width="5">H/W 版本</th>
							<th width="10">S/W 版本</th>
							<th width="4">保护</th>
						</tr>
						</thead>
						<tbody>
							<tr v-for="(device, index) in page(devices)" title="点击查看详情" @click="selectTr(device.id)">
								<td>{{pageSize * (currentNum - 1) + index + 1}}</td>
								<td><span class="ctn" title="of:123456780abe1740">{{device.name}}</span></td>
								<td><span class="ctn" title="of:123456780abe1740">{{device.nodeid}}</span></td>
								<td>{{device.master}}</td>
								<td>{{device.ports}}</td>
								<td>{{device.site}}</td>
								<td>{{device.hw}}</td>
								<td><span class="ctn" :title="device.sw">{{device.sw}}</span></td>
								<td>{{device.proto}}</td>
							</tr>
						</tbody>
					</table>
					<div class="pagination-wrap" v-show="loadState === 'loaded'">
						<app-noresult :length="devices.length"></app-noresult>
						<app-pagination :emit="emit" :random="random" :pageNum="pageTotalNum" :currentNum="currentNum"></app-pagination>
					</div>
				</div>
				<div class="rotate-panel" :style="{transform: ' rotateY(90deg) '+translateZ}">
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
	import pagination from '../common/pagination.vue';
	import loading from '../common/loading.vue';
	import noresult from '../common/noresult.vue';
	import Vue from 'vue';

	export default {
	  	data() {
	  	  	let arr = [];
	  	  	for (let i = 0; i < 10; i++) {
	  	  	  	arr.push(Math.floor(Math.random() * 100));
			}
	  	  	return {
				loadState: 'loading',
	  	  	    cacheDevices: [],
				devices: [],
				rotate: 'rotateY(0deg)',
				selectNodeId: '',
				ports: arr,
				rotateHeight: 0,
				isBackShow: false,
				translateZ: '',
				// 分页字段
				pageTotalNum: 0,
				pageSize: 15,
				emit: new Vue(),
				oldValue: '',
				currentNum: 1,	// 未知生命周期   用轮询模拟
				isSearch: false,
				random: this.getRandom()
			}
		},
	  	components: {
	  	  	'app-title': title,
			'app-paragraph': paragraph,
			'app-pagination': pagination,
			'app-loading': loading,
			'app-noresult': noresult
		},
		created() {
	  	    /**
			 * 调用接口获取节点数据
			 */
	  	    setTimeout(() => {
				this.$http.get('/api/statistics/devices').then((res) => {
					let result = res.body.result;
					this.cacheDevices = result.devices;
					this.devices = result.devices;
					this.pageTotalNum = Math.ceil(this.devices.length / this.pageSize);
					this.loadState = 'loaded';
					this.random = this.getRandom();
				});
			}, 2000);
		},
		mounted() {
	  	    /* 默认translateZ */
	  	  	let width = document.getElementsByClassName('rotate-tab')[0].clientWidth;
	  	  	this.translateZ = 'translateZ(' + (width / 2) + 'px)';
			this.emit.$on('pageChange', (now) => {
				if (this.currentNum !== now) {
					this.currentNum = now;
				}
			});
		},
		methods: {
			/**
			 * 点击tr时事件
			 * @param id
			 */
			selectTr(id) {
	  	  	    this.updateTranslateZ();
	  	  	  	this.rotate = 'rotateY(-89.99deg)';
	  	  	  	this.selectNodeId = id;
	  	  	  	let panelHeight = document.getElementsByClassName('rotate-panel')[0].clientHeight;
	  	  	  	// 监听高度
	  	  	  	this.rotateHeight = panelHeight + 50;
	  	  	  	this.isBackShow = true;
			},
			/**
			 * 点击back 图标事件
			 */
			backToTable() {
				this.updateTranslateZ();
				this.rotate = 'rotateY(0deg)';
				let nodeHeight = document.getElementsByClassName('rotate-tab')[0].clientHeight;
				// 监听高度
				this.rotateHeight = nodeHeight + 50;
				this.isBackShow = false;
			},
			/**
			 * 旋转半径自适应屏幕宽度
			 */
			updateTranslateZ() {
				let nodeWidth = document.getElementsByClassName('rotate-tab')[0].clientWidth;
				let panelWidth = document.getElementsByClassName('rotate-panel')[0].clientWidth;
				let width = nodeWidth > panelWidth ? nodeWidth : panelWidth;
				this.translateZ = 'translateZ(' + (width / 2) + 'px)';
			},
			/**
			 * 分页显示
			 * @param devices
			 * @returns {Array}
			 */
			page(devices) {
				if (this.isSearch) {
					this.currentNum = 1;
					this.isSearch = false;
				}
				return devices.filter((device, index) => {
					return index >= this.pageSize * (this.currentNum - 1) && index < this.pageSize * this.currentNum;
				});
			},
			/**
			 * 搜索框事件
			 */
			searchDevice() {
				this.isSearch = true;
				let searchValue = document.getElementById('searchValue').value.replace(/\/s/g, '');
				if (this.oldValue !== searchValue) {
				    this.oldValue = searchValue;
					this.devices = this.cacheDevices.filter((device) => {
						return device.name.includes(searchValue);
					});
					this.pageTotalNum = Math.ceil(this.devices.length / this.pageSize);
					this.random = this.getRandom();
				}
			},
			/**
			 * 获取六位随机数
			 * @returns {string}
			 */
			getRandom() {
				return ('00000' + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
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
					left 0
					top 0
				.rotate-tab
					position relative
					margin-bottom 50px
					.pagination-wrap
						margin 20px 0
					.search
						position: absolute
						top: -78px
						right: 0
						margin: 10px 45px
						border-bottom 1px solid #ccc
						line-height: 25px
						input
							color #ddd
							outline none
							width 150px
							padding-left 6px
							background-color: transparent !important;
						.search-btn
							display inline-block
							padding 0 3px
							.iconfont
								color #ccc
				.rotate-panel
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
	/* back 图标上下浮动 */
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
