/**
* Created by Guanyunjie on 2017/7/4.
*/
<template>
	<div class="m-wrap" :class="isMenuOpen ? 'm-open' : 'm-close'" @mouseleave="itemLeave">
		<div class="m-co">
			<a class="btn" @click="menuOper">
				<i class="iconfont" :class="isMenuOpen ? 'icon-menu-close' : 'icon-menu-open'"></i>
			</a>
		</div>
		<router-link class="m-tp" to="/topology">
			<div class="m-tp-wrap" @mouseenter="itemEnter">
				<i class="iconfont icon-topo"></i>
				<span class="title">拓扑</span>
			</div>
		</router-link>
		<div class="m-bsn" @click="isBusShow = !isBusShow" @mouseenter="itemEnter">
			<i class="iconfont icon-business"></i>
			<span class="title">业务</span>
			<span class="opr">
				<i v-show="!isBusShow" class="iconfont icon-arrow-left"></i>
				<i v-show="isBusShow" class="iconfont icon-arrow-bottom"></i>
			</span>
		</div>
		<ul class="bsn-ul" v-show="isBusShow" @mouseenter="itemEnter">
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
		<div class="m-bsn" @click="isYYShow = !isYYShow" @mouseenter="itemEnter">
			<i class="iconfont icon-statistics"></i>
			<span class="title">统计列表</span>
			<span class="opr">
				<i v-show="!isYYShow" class="iconfont icon-arrow-left"></i>
				<i v-show="isYYShow" class="iconfont icon-arrow-bottom"></i>
			</span>
		</div>
		<ul class="bsn-ul" v-show="isYYShow">
			<router-link class="item" to="/statistics/node" tag="li">
				<a>
					节点
				</a>
			</router-link>
			<router-link class="item" to="/statistics/link" tag="li">
				<a>
					链路
				</a>
			</router-link>
		</ul>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
	  	props: ['emit'],
	  	data() {
	  	 	return {
	  	 	  	isBusShow: false,
				isYYShow: false,
				isMenuOpen: true,
				isMoControl: true
			};
		},
		methods: {
			menuOper() {
			  	if (this.isMenuOpen !== this.isMoControl) {
			  	  	this.isMenuOpen = false;
			  	  	this.isMoControl = false;
				} else {
					this.isMenuOpen = !this.isMenuOpen;
					this.isMoControl = !this.isMoControl;
				}
				this.isBusShow = false;
				this.isYYShow = false;
			  	this.emit.$emit('menuChange', this.isMenuOpen);
			},
			itemEnter() {
			  	if (!this.isMenuOpen) {
					this.isMenuOpen = true;
					this.emit.$emit('hoverChange', this.isMenuOpen);
				}
			},
			itemLeave() {
			  	if (!this.isMoControl) {
					this.isMenuOpen = false;
					this.isBusShow = false;
					this.isYYShow = false;
					this.emit.$emit('hoverChange', this.isMenuOpen);
				}
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	color-ccc = #ccc

	.m-wrap
		height 100%
		background #3d3d3d
		border-right 1px solid #333
		padding-top 15px
		z-index 1000
		.m-co
			height 34px
			line-height 34px
			margin-bottom 3px
			position relative
			.btn
				display inline-block
				line-height 34px
				height 34px
				float right
				margin-right 5px
				width 34px
				background #333
				cursor pointer
				.iconfont
					color #fff
					font-size 16px
		.m-tp
			padding-left 0px !important
			.m-tp-wrap
				padding-left 25px
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
				top 0
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
					text-align left
					padding-left 28px
					color #bdbdbd
					font-size 13px
					&:hover
						color #fff
						background #575757
	.m-close
		.title,.opr
			transition 0.5s
			display none
		.m-bsn,.m-tp-wrap
			padding-left 8px !important
</style>
