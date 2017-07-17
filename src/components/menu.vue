/**
* Created by Guanyunjie on 2017/7/4.
*/
<template>
	<div class="m-wrap">
		<div class="m-co">
			<a href="javascript:;">
				<i class="iconfont icon-admin"></i>
			</a>
		</div>
		<router-link class="m-tp" to="/topology">
			<i class="iconfont icon-topo"></i>
			<span>拓扑</span>
		</router-link>
		<div class="m-bsn" @click="isBusShow = !isBusShow">
			<i class="iconfont icon-business"></i>
			<span>业务</span>
			<span class="opr">
				<i v-show="!isBusShow" class="iconfont icon-arrow-left"></i>
				<i v-show="isBusShow" class="iconfont icon-arrow-bottom"></i>
			</span>
		</div>
		<ul class="bsn-ul" v-show="isBusShow">
			<router-link class="item" to="/business/create" tag="li">
				<a>
					创建业务
				</a>
			</router-link>
			<router-link class="item" to="/business/view" tag="li">
				<a>
					查看业务
				</a>
			</router-link>
		</ul>
		<div class="m-bsn" @click="isYYShow = !isYYShow">
			<i class="iconfont icon-business"></i>
			<span>预约报名</span>
			<span class="opr">
				<i v-show="!isYYShow" class="iconfont icon-arrow-left"></i>
				<i v-show="isYYShow" class="iconfont icon-arrow-bottom"></i>
			</span>
		</div>
		<ul class="bsn-ul" v-show="isYYShow">
			<router-link class="item" to="/business" tag="li">
				<a>
					预约管理
				</a>
			</router-link>
			<router-link class="item" to="/business" tag="li">
				<a>
					预约统计
				</a>
			</router-link>
			<router-link class="item" to="/business" tag="li">
				<a>
					客服管理
				</a>
			</router-link>
			<router-link class="item" to="/business" tag="li">
				<a>
					客服评价
				</a>
			</router-link>
		</ul>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
	  	data() {
	  	 	return {
	  	 	  	isBusShow: false,
				isYYShow: false
			};
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	color-ccc = #ccc

	.m-wrap
		height 100%
		background #3d3d3d
		border-right 1px solid #ccc
		padding-top 15px
		.m-co
			height 40px
		.m-tp,.m-bsn
			display block
			position relative
			padding-left 25px
			text-align left
			line-height 41px
			border-bottom 1px solid #5c5c5c
			font-size 14px
			color #fff
			cursor pointer
			.iconfont
				color #969696
				margin-right 4px
			.opr
				position absolute
				top 0px
				right 10px
				.iconfont
					font-size 12px
			&:hover
				background #303030
		.bsn-ul
			list-style none
			padding-left 25px
			background #383838
			border-bottom 1px solid #5c5c5c
			.item
				line-height 34px
				border-left 1px dotted #5c5c5c
				&:last-child
					border-bottom none
				a
					display block
					color #bdbdbd
					font-size 13px
					&:hover
						color #fff
						background #575757
</style>
