/**
* Created by Guanyunjie on 2017/7/4.
*/
<template>
	<div class="view">
		<app-title :name="'查看业务路由'"></app-title>
		<div class="v-business">
			<app-paragraph :name="'业务列表'"
						   :color="{bc: '#fff', fc: '#4c4c4c'}"
						   :border="true">
			</app-paragraph>
			<ul v-if="items.length > 0">
				<router-link class="item"
							 v-for="(item, index) in items"
							 tag="li"
							 v-show="index >= 7 * selectIndex && index < 7 * selectIndex + 7 || isListShow"
							 active-class="list-active"
							 @click.native="selectYW(item, index)"
							 :to="{path: '/business/view/'+item.id}">
					<a>
						<span>{{item.name}}</span>
					</a>
				</router-link>
			</ul>
			<button type="button" class="oper-biz" @click="isListShow = !isListShow">
				<span v-text="isListShow ? '收起' : '打开'"></span>
			</button>
		</div>
		<div class="view-wrap" v-show="selectBusiness.id">
			<div class="detail">
				<app-paragraph :name="'基础信息'"
							   :color="{bc: 'linear-gradient(#d49665, #9a6943)', fc: '#fff'}"
							   :border="false">
				</app-paragraph>
				<table class="view-tab">
					<tbody>
						<tr>
							<th>保护类型</th>
							<td>{{selectBusiness.prototype}}</td>
						</tr>
						<tr>
							<th>VPN类型</th>
							<td>{{selectBusiness.vpnType}}</td>
						</tr>
						<tr>
							<th>带宽</th>
							<td>{{selectBusiness.dk}}</td>
						</tr>
						<tr>
							<th>路由策略</th>
							<td>{{selectBusiness.routCL}}</td>
						</tr>
						<tr>
							<th>扩展</th>
							<td>{{selectBusiness.else}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<div class="view-wrap" v-show="selectBusiness.id">
			<h4 class="lx-title">
				<span>路由性能信息:</span>
				<div class="btns">
					<router-link class="btn-cb"
								 :to="{path: '/business/view/'+selectBusiness.id+'/rout'}"
								 active-class="rx-active">
						路由
					</router-link>
					<router-link class="btn-cb"
								 :to="{path: '/business/view/'+selectBusiness.id+'/xn'}"
								 active-class="rx-active">
						性能
					</router-link>
				</div>
			</h4>
			<div class="ext" v-show="selectBusiness.id">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import title from '../common/title.vue';
	import paragraph from '../common/paragraph.vue';

	export default {
	  	created() {
	  	  	let _this = this;

			this.$http.get('/api/ywList').then((res) => {
				_this.items = res.data.result;
			});
		},
	  	data() {
	  	  	return {
			  	items: [],
				selectIndex: 0,
				selectBusiness: {},
				isListShow: true
		  	}
		},
		methods: {
			selectYW(item, index) {
			  	this.selectBusiness = item;
			  	this.selectIndex = Math.floor(index / 7);
			  	this.isListShow = false;
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
	.view
		text-align left
		background #f2f2f2
		height 100%
		.list-active
			background #d8d8d8 !important
		.rx-active
			color #333 !important
			background #fff
		.v-business
			background #fff
			width 90%
			margin 30px auto
			position relative
			border 1px solid #ccc
			ul
				width 90%
				margin 10px auto
				display flex
				flex-direction row
				flex-wrap wrap
				justify-content flex-start
				.item
					flex 0 0 10%
					border 1px solid #ccc
					border-radius 5px
					line-height 24px
					background #fff
					text-align center
					margin 10px 15px
					a
						display block
			.oper-biz
				padding 0px 25px
				line-height 22px
				font-size 12px
				border 1px solid #ccc
				outline none
				cursor pointer
				border-radius 4px
				background #fff
				color #333
				position absolute
				top 11px
				right 20px
		.view-wrap
			width 90%
			background #fff
			border 1px solid #ddd
			margin 30px auto
			.detail
				width 100%
				display block
				padding 0 0 70px 0
				border-bottom 1px solid #ccc
				position relative
				.view-tab
					width 90%
					margin 20px auto
					border 5px solid #fff1e5
					tr
						color #4c4c4c
						font-size 14px
						th
							line-height 40px
							height 40px
							width 30%
							padding-left 26px
							border-right 1px dashed #ccc
							border-bottom 1px dashed #ccc
						td
							width 68%
							line-height 40px
							padding-left 26px
							border-bottom 1px dashed #ccc
			.lx-title
				background #91c854
				height 50px
				padding-left 26px
				margin 0 auto
				color #fff
				font-size 20px
				font-weight bold
				line-height 50px
				.btns
					height 50px
					display inline-block
					.btn-cb
						padding 0 12px
						color #fff
						font-size 18px
						font-weight 200
						display inline-block


</style>
