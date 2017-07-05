/**
* Created by Guanyunjie on 2017/7/4.
*/
<template>
	<div class="view">
		<app-title :name="'查看业务路由'"></app-title>
		<div class="v-business">
			<h4 class="yw-title">业务列表</h4>
			<ul>
				<router-link class="item"
							 v-for="(item, index) in items"
							 tag="li"
							 v-show="index >= 7 * selectIndex && index < 7 * selectIndex + 7 || isListShow"
							 active-class="list-active"
							 @click.native="selectYW(item.id, index)"
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
		<div class="view-wrap">
			<div class="detail" v-show="selectBusinessId">
				<h4 class="bas-title">基础信息</h4>
				<table class="view-tab">
					<tbody>
						<tr>
							<th>保护类型</th>
							<td>1+1保护</td>
						</tr>
						<tr>
							<th>VPN类型</th>
							<td>L3vPn</td>
						</tr>
						<tr>
							<th>带宽</th>
							<td>1000M</td>
						</tr>
						<tr>
							<th>路由策略</th>
							<td>最小跳数</td>
						</tr>
						<tr>
							<th>扩展</th>
							<td>是粉色粉色方式</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="view-wrap">
			<h4 class="lx-title">
				<span>路由性能信息:</span>
				<div class="btns">
					<router-link class="btn-cb"
								 :to="{path: '/business/view/'+selectBusinessId+'/rout'}"
								 active-class="rx-active">
						路由
					</router-link>
					<router-link class="btn-cb"
								 :to="{path: '/business/view/'+selectBusinessId+'/xn'}"
								 active-class="rx-active">
						性能
					</router-link>
				</div>
			</h4>
			<div class="ext" v-show="selectBusinessId">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import title from '../common/title.vue';

	export default {
	  	created() {
	  	  	this.selectBusinessId = '';
	  	  	for (let i = 0; i < 100; i++) {
	  	  	  	let obj = {
	  	  	  	  	id: 'id' + i,
					name: 'name' + i
				};
	  	  	  	this.items.push(obj);
			}
		},
	  	data() {
	  	  	return {
			  	items: [],
				selectIndex: 0,
				selectBusinessId: '',
				isListShow: true
		  	}
		},
		methods: {
			selectYW(id, index) {
			  	this.selectBusinessId = id;
			  	this.selectIndex = Math.floor(index / 7);
			  	this.isListShow = false;
			}
		},
	  	components: {
	  	  	'app-title': title
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
			background #666 !important
		.rx-active
			color #333 !important
			background #fff
		.v-business
			background #fff
			width 90%
			margin 30px auto
			position relative
			border 1px solid #ccc
			.yw-title
				margin 0 auto
				padding-left 26px
				color #4c4c4c
				font-size 20px
				font-weight bold
				border-bottom 1px dashed #ccc
				line-height 50px
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
				.bas-title
					padding-left 26px
					margin 0 auto
					background #ff7200
					margin-bottom 20px
					color #fff
					font-size 20px
					line-height 50px
				.view-tab
					width 90%
					margin 0 auto
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
