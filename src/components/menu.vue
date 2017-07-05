/**
* Created by Guanyunjie on 2017/7/4.
*/
<template>
	<div class="m-wrap">
		<div class="m-co"></div>
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
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
	  	data() {
	  	 	return {
	  	 	  	isBusShow: false
			};
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	color-ccc = #ccc

	.m-wrap
		height 100%
		background #eaeaea
		border-right 1px solid #ccc
		.m-co
			padding-bottom 35px
		.m-tp,.m-bsn
			display block
			position relative
			padding-left 25px
			text-align left
			line-height 34px
			border-bottom 1px solid color-ccc
			border-bottom-left-radius 6px
			color #666
			cursor pointer
			.iconfont
				margin-right 4px
			.opr
				position absolute
				top 0px
				right 10px
			&:hover
				background #eee
		.bsn-ul
			list-style none
			padding-left 25px
			border-bottom 1px solid color-ccc
			border-bottom-left-radius 6px
			.item
				line-height 34px
				border-left 1px solid color-ccc
				&:last-child
					border-bottom none
				a
					display block
				&:hover
					background #eee
</style>
