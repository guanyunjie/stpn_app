/**
* Created by Guanyunjie on 2017/7/7.
*/
<template>
	<div class="s-port">
		<app-title :name="'配置业务基本属性：端口配置'"></app-title>
		<div class="port-wrap">
			<app-paragraph :name="'分配节点'"
						   :color="{bc: '#fff', fc: '#4c4c4c'}"
						   :border="true">
			</app-paragraph>
			<ul>
				<li class="item">node-a</li>
				<li class="item">node-a</li>
				<li class="item">node-a</li>
				<li class="item">node-a</li>
			</ul>
		</div>
		<div class="detail-wrap">
			<app-paragraph :name="'节点详细信息'"
						   :color="{bc: 'linear-gradient(rgb(162, 109, 89), #795548)', fc: '#fff'}"
						   :border="false">
			</app-paragraph>
			<div class="content">
				<div class="port-list">
					<ul>
						<li class="item checked">
							<span class="dot"></span>
							<span>PORT/A/X</span>
						</li>
						<li class="item">
							<span class="dot"></span>
							<span>PORT/A/X</span>
						</li>
						<li class="item">
							<span class="dot"></span>
							<span>PORT/A/X</span>
						</li>
						<li class="item">
							<span class="dot"></span>
							<span>PORT/A/X</span>
						</li>
					</ul>
				</div>
				<div class="oper">
					<table class="tab">
						<tbody>
							<tr>
								<th colspan="1">VPN：</th>
								<td colspan="4">
									<div class="inp">
										<input type="text">
									</div>
								</td>
							</tr>
							<tr>
								<th colspan="1">MASK：</th>
								<td colspan="4">
									<div class="inp">
										<input type="text">
									</div>
								</td>
							</tr>
							<tr>
								<th colspan="1">IP：</th>
								<td colspan="4">
									<div class="inp">
										<input type="text">
									</div>
								</td>
							</tr>
							<tr>
								<th colspan="1">目标IP：</th>
								<td colspan="4">
									<div class="inp">
										<input type="text">
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<router-link class="step-next" to="/business/create/step1">上一步</router-link>
					<router-link class="step-next" to="/business/create/success">下一步</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import title from '../common/title.vue';
	import paragraph from '../common/paragraph.vue';

	export default {
	  	components: {
	  	  	'app-title': title,
			'app-paragraph': paragraph
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.s-port
		.port-wrap, .detail-wrap
			width 90%
			background #fff
			border 1px solid #ddd
			margin 30px auto
		.port-wrap
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
		.detail-wrap
			overflow hidden
			.content
				display flex
				.port-list
					flex 0 0 auto
					border-right 1px solid #ccc
					ul
						margin 50px
						.item
							cursor pointer
							position relative
							text-align left
							line-height 28px
							font-size 16px
							padding 0 40px 0 43px
							.dot
								position absolute
								top 4px
								left 15px
								display inline-block
								padding 8px
								border 1px solid #969696
								border-radius 3px
								background #fff
						.checked
							.dot::after
								position absolute
								color #969696
								content '✔'
								top -5px
								left 1px
								font-size 16px
								font-weight bold
				.oper
					margin 30px 80px
					flex 1 1 auto
					.tab
						width 100%
						th
							line-height 67px
							padding-right 13px
							text-align right
						td
							line-height 67px
							padding-left 13px
							padding-right 30px
							text-align left
							position relative
							.inp
								border: 1px solid #ccc;
								line-height 34px
								padding-left: 12px;
								input
									line-height 34px
									outline none
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
