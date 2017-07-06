/**
* Created by Guanyunjie on 2017/7/5.
*/
<template>
	<div class="step1">
		<app-title :name="'配置业务基本属性：选择端点'"></app-title>
		<div class="step1-wrap">
			<div class="s-rout">
				<app-rout></app-rout>
			</div>
			<div class="panel">
				<h4 class="title">已选节点</h4>
				<div class="own-node-wrap">
					<div class="own-node">
					<span class="node-item">
						节点1
						<em>&times;</em>
					</span>
						<span class="node-item">节点434534<em>&times;</em></span>
						<span class="node-item">节点1<em>&times;</em></span>
						<span class="node-item">节ffsefsffefsf<em>&times;</em></span>
						<span class="node-item">节<em>&times;</em></span>
						<span class="node-item">节点1<em>&times;</em></span>
						<span class="node-item">节点1<em>&times;</em></span>
					</div>
				</div>
				<h4 class="title">配置tunnel</h4>
				<div class="set-tunnel">
					<table class="tab">
						<thead>
						<tr>
							<th>名称</th>
							<th>源节点</th>
							<th>宿节点</th>
							<th>保护方式</th>
							<th>包含排斥</th>
							<th>操作</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>tunnel1</td>
							<td>节点a</td>
							<td>节点b</td>
							<td>1+1保护</td>
							<td>排斥</td>
							<td>&times;</td>
						</tr>
						<tr>
							<td>tunnel1</td>
							<td>节点a</td>
							<td>节点b</td>
							<td>1+1保护</td>
							<td>排斥</td>
							<td>&times;</td>
						</tr>
						<tr>
							<td>tunnel1</td>
							<td>节点a</td>
							<td>节点b</td>
							<td>1+1保护</td>
							<td>排斥</td>
							<td>&times;</td>
						</tr>
						</tbody>
					</table>
				</div>
				<router-link class="step-next" to="/business/create">
					上一步
				</router-link>
				<router-link class="step-next" to="/business/create/step2">
					下一步
				</router-link>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import title from '../common/title.vue';
	import paragraph from '../common/paragraph.vue';
	import rout from '../rout/rout.vue';

	export default {
	  	components: {
	  	  	'app-title': title,
			'app-rout': rout,
			'app-paragraph': paragraph
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.step1
		width 100%
		height 100%
		.step1-wrap
			background #fff
			display flex
			flex-wrap nowrap
		.s-rout
			flex 0 0 60%
			top 0px
			bottom 0px
			position inherit
			border-right 1px solid #ccc
		.panel
			flex auto
			height 100%
			background #f2f2f2
			overflow hidden
			.title
				background #10674c
				margin 20px 30px 0
				line-height 32px
				text-align left
				padding-left 20px
				color #fff
			.set-tunnel
				overflow-y hidden
				overflow-x scroll
			.own-node-wrap
				overflow hidden
			.own-node-wrap, .set-tunnel
				background #dbe5f7
				min-height 80px
				margin 0 30px
				padding 20px 9px
				text-align left
				.own-node
					min-width 300px
				.tab
					background #fff
					margin 0 auto
					width 85%
					min-width 450px
					border 1px solid #ccc
					tr
						color #4c4c4c
						font-size 14px
						th
							line-height 40px
							height 40px
							padding-left 5px
							font-weight bold
							border-right 1px dashed #ccc
							border-bottom 1px dashed #ccc
						td
							line-height 40px
							padding-left 5px
							border-right 1px dashed #ccc
							border-bottom 1px dashed #ccc
				.node-item
					position relative
					display inline-block
					margin 5px 10px
					padding 0 30px 0 10px
					background #86ce5f
					color #fff
					font-size 14px
					border-top-right-radius 99px
					border-bottom-right-radius 99px
					line-height 24px
					em
						top 6px
						font-size 18px
						right 10px
						line-height 10px
						width 10px
						cursor pointer
						text-align center
						display block
						position absolute
						&:hover
							color #fb9494
			.step-next
				display inline-block
				margin 30px auto 50px
				width 140px
				line-height 32px
				border-radius 3px
				color #fff
				background linear-gradient(#4392db, #1d6ebe)
				box-shadow inset 0 0px 2px 0px #8ec6f7
				border 1px solid #3984ce
				border-bottom 1px solid #0e65bc
</style>
