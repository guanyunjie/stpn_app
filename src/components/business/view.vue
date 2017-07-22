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
						{{index+1}}、{{item.name}}
					</a>
				</router-link>
			</ul>
			<button type="button" class="oper-biz" v-show="items.length > 7" @click="isListShow = !isListShow">
				<span v-text="isListShow ? '收起' : '打开'"></span>
			</button>
		</div>
		<div class="view-wrap" v-show="selectBusiness.id">
			<div class="detail">
				<app-paragraph :name="'基础信息'"
							   :color="{bc: 'linear-gradient(#d49665, #9a6943)', fc: '#fff'}"
							   :border="false">
				</app-paragraph>
				<table class="view-tab" style="width: 90%;">
					<tbody>
						<tr>
							<th width="30%">保护类型</th>
							<td width="70%">{{selectBusiness.prototype}}</td>
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
		},
		beforeRouteLeave(to, from, next) {
	  	  	console.log(to.path)
	  	  	if (to.path === '/business/view/' + this.selectBusiness.id + '/xn') {
				console.log('sfsfasefsf')
			}
			next();
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import "../../common/stylus/main.styl";

	.view
		text-align left
		background #f2f2f2
		height 100%
		.list-active
			background #9a9a9a !important
			a
				color #fff
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
					line-height 24px
					text-align center
					color #797979
					border none
					border-radius 3px
					background #ececec
					margin 10px 15px
					&:hover
						background #9b9b9b
						a
							color #fff
					a
						font-size 12px
						text-overflow ellipsis
						white-space: nowrap;
						display block
			.oper-biz
				padding 0px 25px
				line-height 22px
				font-size 12px
				border 1px solid #ccc
				outline none
				cursor pointer
				border-radius 3px
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
			.lx-title
				background #91c854
				height 50px
				padding-left 26px
				margin 0 auto
				color #fff
				font-size 20px
				font-weight bold
				line-height 50px
				user-select none
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
