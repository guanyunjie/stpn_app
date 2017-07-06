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
							<th>保护类型：</th>
							<td>
								<div class="inp-wrap">
									<div class="inp">
										<input type="text">
									</div>
								</div>
							</td>
							<th>路由策略：</th>
							<td>
								<div class="inp-wrap">
									<div class="inp">
										<input type="text">
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th>业务带宽：</th>
							<td>
								<div class="inp-wrap">
									<div class="inp"
										 @mouseenter="isSelectOpen1 = true"
										 @mouseleave="isSelectOpen1 = false">
										<label class="custom-select">
											<span>1+1保护</span>
											<i class="iconfont"
											   :class="isSelectOpen1 ? 'icon-arrow-bottom' : 'icon-arrow-left'"></i>
										</label>
										<ul class="custom-ul" v-show="isSelectOpen1">
											<li class="custom-item">2+2保护</li>
											<li class="custom-item">2+2保护</li>
											<li class="custom-item">2+2保护</li>
											<li class="custom-item">2+2保护</li>
											<li class="custom-item">2+2保护</li>
											<li class="custom-item">2+2保护</li>
											<li class="custom-item">2+2保护</li>
											<li class="custom-item">2+2保护</li>
											<li class="custom-item">2+2保护</li>
											<li class="custom-item">2+2保护</li>
											<li class="custom-item">2+2保护</li>
											<li class="custom-item">2+2保护</li>
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
											<span>1+1保护</span>
											<i class="iconfont"
											   :class="isSelectOpen2 ? 'icon-arrow-bottom' : 'icon-arrow-left'"></i>
										</label>
										<ul class="custom-ul" v-show="isSelectOpen2">
											<li class="custom-item">2+2保护</li>
											<li class="custom-item">2+2保护</li>
											<li class="custom-item">2+2保护</li>
											<li class="custom-item">2+2保护</li>
											<li class="custom-item">2+2保护</li>
											<li class="custom-item">2+2保护</li>
											<li class="custom-item">2+2保护</li>
											<li class="custom-item">2+2保护</li>
											<li class="custom-item">2+2保护</li>
											<li class="custom-item">2+2保护</li>
											<li class="custom-item">2+2保护</li>
											<li class="custom-item">2+2保护</li>
										</ul>
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<th>成长生命：</th>
							<td colspan="3">
								<div class="inp-wrap">
									<div class="radio">
										<input id="radio_1_1" name="czsm" value="l2" type="radio"
											   v-model="life">
										<span class="dot"
											  :class="{'checked' : life === 'l2'}"></span>
										<label for="radio_1_1" class="r-label">L2VPN</label>
									</div>
									<div class="radio">
										<input id="radio_1_2" name="czsm" value="l3" type="radio"
											   v-model="life">
										<span class="dot"
											  :class="{'checked' : life === 'l3'}"></span>
										<label for="radio_1_2" class="r-label">L3VPN</label>
									</div>
									<div class="radio">
										<input id="radio_1_3" name="czsm" value="l4" type="radio"
											   v-model="life">
										<span class="dot"
											  :class="{'checked' : life === 'l4'}"></span>
										<label for="radio_1_3" class="r-label">L4VPN</label>
									</div>
								</div>
							</td>
						</tr>
					<tr>
						<th>
							装备：
						</th>
						<td colspan="3">
							<div class="inp-wrap">
								<div class="checkbox">
									<input id="checkbox_1_1" type="checkbox" value="0" v-model="zbs">
									<span class="dot" :class="{'checked': zbs.includes('0')}"></span>
									<label for="checkbox_1_1" class="c-label">无尽之刃</label>
								</div>
								<div class="checkbox">
									<input id="checkbox_1_2" type="checkbox" value="1" v-model="zbs">
									<span class="dot" :class="{'checked': zbs.includes('1')}"></span>
									<label for="checkbox_1_2" class="c-label">死亡之舞</label>
								</div>
								<div class="checkbox">
									<input id="checkbox_1_3" type="checkbox" value="2" v-model="zbs">
									<span class="dot" :class="{'checked': zbs.includes('2')}"></span>
									<label for="checkbox_1_3" class="c-label">基克的救赎</label>
								</div>
								<div class="checkbox">
									<input id="checkbox_1_4" type="checkbox" value="3" v-model="zbs">
									<span class="dot" :class="{'checked': zbs.includes('3')}"></span>
									<label for="checkbox_1_4" class="c-label">弗拉基米尔</label>
								</div>
							</div>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
			<router-link class="step-next" to="/business/create/step1">
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
	  	  	  	isSelectOpen1: false,
				isSelectOpen2: false,
				life: 'l2',
				zbs: []
			}
		},
	  	components: {
	  	  	'app-title': title,
			'app-paragraph': paragraph
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
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



								.checkbox
									display inline-block
									position relative
									cursor pointer
									line-height 36px
									margin-right 15px
									.dot
										position absolute
										top 8px
										left 0px
										display inline-block
										padding 8px
										border 1px solid #969696
										border-radius 3px
										background #fff
									.checked::after
										content '✔'
										position absolute
										color #969696
										top -9px
										text-shadow 0
										left 1px
										font-size 16px
										font-weight bold
									.c-label
										position relative
										padding-left 10px
										cursor pointer
									input[type=checkbox]
										position relative
										z-index 99
										opacity 0
								.radio
									display inline-block
									position relative
									cursor pointer
									line-height 36px
									width 17%
									.dot
										position absolute
										top 8px
										left 0px
										display inline-block
										padding 8px
										border 1px solid #969696
										border-radius 99px
										background #fff
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
									.r-label
										position relative
										padding-left 10px
										cursor pointer
									input[type=radio]
										position relative
										z-index 99
										opacity 0

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
