/**
* Created by Guanyunjie on 2017/7/4.
*/
<template>
	<div class="view">
		<h3 class="title">查看业务界面</h3>
		<div class="v-business">
			<ul>
				<router-link class="item" tag="li" to="/business/view/biz/123">
					<a>
						<span>biz1</span>
					</a>
				</router-link>
				<router-link class="item" tag="li" to="/business/view/biz/234">
					<a>biz2</a>
				</router-link>
				<router-link class="item" tag="li" to="/business/view/biz/432">
					<a>biz3</a>
				</router-link>
				<router-link class="item" tag="li" to="/business/view/biz/623">
					<a>biz4</a>
				</router-link>
				<router-link class="item" tag="li" to="/business/view/biz/789">
					<a>biz5</a>
				</router-link>
				<router-link class="item" tag="li" to="/business/view/biz/125">
					<a>biz6</a>
				</router-link>
				<router-link class="item" tag="li" to="/business/view/biz/465">
					<a>biz7</a>
				</router-link>
				<router-link class="item" tag="li" to="/business/view/biz/432">
					<a>biz3</a>
				</router-link>
				<router-link class="item" tag="li" to="/business/view/biz/623">
					<a>biz4</a>
				</router-link>
				<router-link class="item" tag="li" to="/business/view/biz/789">
					<a>biz5</a>
				</router-link>
				<router-link class="item" tag="li" to="/business/view/biz/125">
					<a>biz6</a>
				</router-link>
				<router-link class="item" tag="li" to="/business/view/biz/465">
					<a>biz7</a>
				</router-link>
				<router-link class="item" tag="li" to="/business/view/biz/432">
					<a>biz3</a>
				</router-link>
				<router-link class="item" tag="li" to="/business/view/biz/623">
					<a>biz4</a>
				</router-link>
				<router-link class="item" tag="li" to="/business/view/biz/789">
					<a>biz5</a>
				</router-link>
				<router-link class="item" tag="li" to="/business/view/biz/125">
					<a>biz6</a>
				</router-link>
				<router-link class="item" tag="li" to="/business/view/biz/465">
					<a>biz7</a>
				</router-link>
			</ul>
			<button type="button" class="oper-biz">收起</button>
		</div>
		<div class="detail">
			<div class="d-wrap">
				<div class="detail-item">
					<div class="item-f">
						<span>保护类型：</span>
						<div class="inp">
							<input type="text">
						</div>
					</div>
					<div class="item-r">
						<span>VPN类型：</span>
						<div class="inp">
							<input type="text">
						</div>
					</div>
				</div>
				<div class="detail-item">
					<div class="item-f">
						<span>保护类型：</span>
						<div class="inp">
							<input type="text">
						</div>
					</div>
					<div class="item-r">
						<span>VPN类型：</span>
						<div class="inp">
							<input type="text">
						</div>
					</div>
				</div>
				<div class="detail-item">
					<div class="item-f">
						<span>保护类型：</span>
						<div class="inp">
							<input type="text">
						</div>
					</div>
					<div class="item-r">
						<span>VPN类型：</span>
						<div class="inp">
							<input type="text">
						</div>
					</div>
				</div>
			</div>
			<div class="btns">
				<router-link to="/business/view/router">路由</router-link>
				<router-link to="/business/view/xn">性能</router-link>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.view
		text-align left
		.title
			font-size 18px
			color #333
			background #e4e4e4
			font-weight bold
			padding 15px 0 8px 20px
		.v-business
			padding 10px 150px 10px 15px
			background #fafafa
			position relative
			border-top 1px solid #ccc
			border-bottom 1px solid #ccc
			ul
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
			.oper-biz
				position absolute
				bottom 8px
				right 10px

		.detail
			width 100%
			display block
			padding 20px 0
			border-bottom 1px solid #ccc
			position relative
			.d-wrap
				.detail-item
					position relative
					overflow hidden
					.item-f, .item-r
						position relative
						line-height 35px
						height 35px
						overflow hidden
						width 49%
						span
							line-height 35px
							position absolute
							left 50px
							top 5px
						.inp
							position absolute
							height 24px
							left 200px
							top 5px
							padding 0 7px
							border 1px solid #ccc
							input
								margin-top 4px
								display block
								outline none
					.item-f
						float left
					.item-r
						float right

</style>
