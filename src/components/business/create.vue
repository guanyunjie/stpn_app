/**
* Created by Guanyunjie on 2017/7/4.
*/
<template>
	<div class="s-create">
		<app-title :name="'配置业务基本属性'"></app-title>
		<div class="c-wrap">
			<app-paragraph :name="'基础信息'"
						   :color="{bc: 'linear-gradient(rgb(40, 146, 136), rgb(42, 101, 95))', fc: '#fff'}"
						   :border="false">
			</app-paragraph>
			<div class="tab-wrap">
				<table class="view-tab">
					<tbody>
						<tr>
							<th>业务带宽：</th>
							<td>
								<div class="inp-wrap">
									<div class="inp">
										<input type="text" placeholder="请填写..." v-model.number="result.ywdk">
									</div>
								</div>
							</td>
							<th>路由策略：</th>
							<td>
								<div class="inp-wrap">
									<div class="inp">
										<input type="text" placeholder="请填写..." v-model="result.lycl">
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th>保护类型：</th>
							<td>
								<div class="inp-wrap">
									<div class="inp"
										 @mouseenter="isSelectOpen1 = true"
										 @mouseleave="isSelectOpen1 = false">
										<label class="custom-select">
											<span>{{bhlxHtml}}</span>
											<i class="iconfont"
											   :class="isSelectOpen1 ? 'icon-arrow-bottom' : 'icon-arrow-left'"></i>
										</label>
										<ul class="custom-ul" v-show="isSelectOpen1">
											<li class="custom-item" value="0" @click="selectBHLX">1+1保护</li>
											<li class="custom-item" value="1" @click="selectBHLX">1+2保护</li>
											<li class="custom-item" value="2" @click="selectBHLX">2+1保护</li>
											<li class="custom-item" value="3" @click="selectBHLX">2+2保护</li>
										</ul>
									</div>
								</div>
							</td>
							<th>VPN类型：</th>
							<td>
								<div class="inp-wrap">
									<div class="inp"
										 @mouseenter="isSelectOpen2 = true"
										 @mouseleave="isSelectOpen2 = false">
										<label class="custom-select">
											<span>{{vpnHTML}}</span>
											<i class="iconfont"
											   :class="isSelectOpen2 ? 'icon-arrow-bottom' : 'icon-arrow-left'"></i>
										</label>
										<ul class="custom-ul" v-show="isSelectOpen2">
											<li class="custom-item" value="0" @click="selectVPN">GHTND</li>
											<li class="custom-item" value="1" @click="selectVPN">OKMJU</li>
											<li class="custom-item" value="2" @click="selectVPN">QSDRFG</li>
											<li class="custom-item" value="3" @click="selectVPN">UHJYRE</li>
											<li class="custom-item" value="4" @click="selectVPN">ETHFGCT</li>
										</ul>
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th>路由类型：</th>
							<td colspan="3">
								<div class="inp-wrap">
									<div class="radio">
										<input id="radio_1_1" name="czsm" value="0" type="radio"
											   v-model="result.lylx">
										<span class="dot"
											  :class="{'checked' : result.lylx === '0'}"></span>
										<label for="radio_1_1" class="r-label">L2V</label>
									</div>
									<div class="radio">
										<input id="radio_1_2" name="czsm" value="1" type="radio"
											   v-model="result.lylx">
										<span class="dot"
											  :class="{'checked' : result.lylx === '1'}"></span>
										<label for="radio_1_2" class="r-label">L3VPF</label>
									</div>
									<div class="radio">
										<input id="radio_1_3" name="czsm" value="2" type="radio"
											   v-model="result.lylx">
										<span class="dot"
											  :class="{'checked' : result.lylx === '2'}"></span>
										<label for="radio_1_3" class="r-label">L4VP</label>
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th>
								端口：
							</th>
							<td colspan="3">
								<div class="inp-wrap">
									<div class="checkbox">
										<input id="checkbox_1_1" type="checkbox" value="0" v-model="result.port">
										<span class="dot" :class="{'checked': result.port.includes('0')}"></span>
										<label for="checkbox_1_1" class="c-label">无尽之刃</label>
									</div>
									<div class="checkbox">
										<input id="checkbox_1_2" type="checkbox" value="1" v-model="result.port">
										<span class="dot" :class="{'checked': result.port.includes('1')}"></span>
										<label for="checkbox_1_2" class="c-label">死亡之舞</label>
									</div>
									<div class="checkbox">
										<input id="checkbox_1_3" type="checkbox" value="2" v-model="result.port">
										<span class="dot" :class="{'checked': result.port.includes('2')}"></span>
										<label for="checkbox_1_3" class="c-label">基克的救赎</label>
									</div>
									<div class="checkbox">
										<input id="checkbox_1_4" type="checkbox" value="3" v-model="result.port">
										<span class="dot" :class="{'checked': result.port.includes('3')}"></span>
										<label for="checkbox_1_4" class="c-label">弗拉基米尔</label>
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th>是否包含波长：</th>
							<td>
								<a class="switch" href="javascript:;" @click="result.isWaveSwitch = !result.isWaveSwitch">
									<i :class="result.isWaveSwitch ? 'icon-switch-on' : 'icon-switch-off'" class="iconfont icon-switch-on"></i>
								</a>
							</td>
							<th>是否预约：</th>
							<td>
								<a class="switch" href="javascript:;" @click="result.isBookSwitch = !result.isBookSwitch">
									<i :class="result.isBookSwitch ? 'icon-switch-on' : 'icon-switch-off'" class="iconfont icon-switch-on"></i>
								</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<router-link class="btn-step" to="/business/create/step1">
				下一步
			</router-link>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import title from '../common/title.vue';
	import paragraph from '../common/paragraph.vue';

	export default {
	  	data() {
	  	  	return {
	  	  	  	result: {},
	  	  	  	isSelectOpen1: false,
				isSelectOpen2: false,
				bhlxHtml: '1+1保护',
				vpnHTML: 'GHTND'
			}
		},
		created() {
	  	  	this.result = JSON.parse(sessionStorage.getItem('basicInfo')) || {
					ywdk: '',
					lycl: '',
					bhlx: '0',
					vpn: '0',
					lylx: '0',
					port: [],
					isWaveSwitch: false,
					isBookSwitch: false
				};
		},
	  	components: {
	  	  	'app-title': title,
			'app-paragraph': paragraph
		},
		methods: {
			selectBHLX(e) {
			  	this.bhlxHtml = e.target.innerHTML;
			  	this.result.bhlx = e.target.getAttribute('value');
				this.isSelectOpen1 = false;
			},
			selectVPN(e) {
			  	this.vpnHTML = e.target.innerHTML;
			  	this.result.vpn = e.target.getAttribute('value');
			  	this.isSelectOpen2 = false;
			}
		},
		beforeRouteLeave(to, from, next) {
	  	  	if (to.path === '/business/create/step1') {
	  	  	  	console.log(this.result);
	  	  	  	let {ywdk, lycl, bhlx, vpn, lylx, port, isWaveSwitch, isBookSwitch} = this.result;
	  	  	  	console.log({ywdk, lycl, bhlx, vpn, lylx, port, isWaveSwitch, isBookSwitch})
	  	  	  	sessionStorage.setItem('basicInfo', JSON.stringify({ywdk, lycl, bhlx, vpn, lylx, port, isWaveSwitch, isBookSwitch}));
				next();
	  	  	} else {
	  	  	  	sessionStorage.removeItem('basicInfo');
				next();
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import "../../common/stylus/main.styl";
	@import "../../common/fonts/iconfont.css";

	.s-create
		.c-wrap
			margin 30px auto
			border 1px solid #ccc
			background #fff
			width 90%
			min-width 950px
			.tab-wrap
				margin 30px 90px
				padding 30px 50px
				border 1px dashed #ccc
				.view-tab
					tr
						color #4c4c4c
						font-size 16px
						th
							line-height 67px
							height 40px
							width 20%
							padding-right 26px
							text-align right
						td
							width 28%
							line-height 67px
							padding-left 10px
							.inp-wrap
								text-align left
								position relative
								.inp
									border: 1px solid #ccc;
									width 100%
									height: 34px;
									position: absolute;
									top: 15px;
									left: 0px;
									padding-left: 12px;
									input
										line-height 34px
										outline none
										float left
									.custom-select
										cursor pointer
										float left
										width 100%
										line-height 40px
										.iconfont
											position absolute
											right 7px
											font-size 14px
											font-weight bold
											top -3px
									.custom-ul
										top 34px
										left -1px
										width 100%
										z-index 99
										border 1px solid #ccc
										position absolute
										max-height 130px
										overflow-y scroll
										.custom-item
											padding-left 12px
											line-height 26px
											background #fff
											&:hover
												cursor pointer
												background #ccc
								.checkbox, .radio
									display inline-block
									position relative
									cursor pointer
									line-height 20px
									width 20%
									.r-label, .c-label
										position relative
										padding-left 10px
										line-height 20px
										display inline-block
										cursor pointer
									input[type=radio], input[type=checkbox]
										position relative
										z-index 89
										float left
										cursor pointer
										height 18px
										width 18px
										opacity 0
									.dot
										position absolute
										top 0px
										left 0px
										display inline-block
										padding 8px
										border 1px solid #969696
										background #fff
									.checked::after
										position absolute
										color #969696
								.checkbox
									.dot
										border-radius 3px
									.checked::after
										content '✔'
										top -1px
										left 1px
										font-size 16px
										font-weight bold
								.radio
									.dot
										border-radius 99px
									.checked::after
										content ' '
										width 10px
										height 10px
										border-radius 50px
										position absolute
										top 3px
										background #969696
										text-shadow 0
										left 3px
										font-size 32px


			.step-next
				display block
				margin 0px auto 50px
				width 140px
				line-height 32px
				border-radius 3px
				color #fff
				background linear-gradient(#4392db, #1d6ebe)
				box-shadow inset 0 0px 2px 0px #8ec6f7
				border 1px solid #3984ce
				border-bottom 1px solid #0e65bc
</style>
