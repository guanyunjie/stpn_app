/**
* Created by Guanyunjie on 2017/7/20.
*/
<template>
	<div class="login">
		<div class="circle">
			<div class="c1">鼬神</div>
			<div class="c2">鸣人</div>
			<div class="c3">自来也</div>
			<div class="c4">卡卡西</div>
			<div class="c5">烽火</div>
			<div class="c6">凯</div>
			<div class="c7">带土</div>
			<div class="c8">佐助</div>
			<div class="c9">大蛇丸</div>
			<div class="c10">长门</div>
			<div class="c11">六道仙人</div>
			<div class="c12">宇智波斑</div>
		</div>

		<div class="login-panel">
			<p class="p-title">SPTN5G登录界面</p>
			<div class="name">
				<input type="text" placeholder="enter you username">
			</div>
			<div class="pwd">
				<input type="password" placeholder="enter your password">
			</div>
			<button class="login-btn" type="button" @click="submit">登录</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
	  	props: ['emit'],
	  	methods: {
			submit() {
			  	this.emit.$emit('sign', true);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	outer = 200px
	inner = 100px
	half = 50px

	.login
		background #222
		width 100%
		position absolute
		left 0
		right 0
		top 0
		bottom 0
		.login-panel
			width 500px
			height 300px
			position absolute
			left 50%
			top 50%
			margin-left -250px
			margin-top -150px
			.p-title
				font-size 26px
				line-height 60px
				color #fff
			.name, .pwd
				line-height 40px
				width 300px
				margin 0 auto 30px
				border 1px solid #666
				border-radius 5px
				opacity 0.8
				input
					color #fff
					width 100%
					font-size 16px
					padding-left 12px
					background-color transparent
					outline none
			.login-btn
				width 300px
				height 40px
				border-radius 5px
				background linear-gradient(#ca532e, #b12c00)
				color #fff
				font-size 16px
				cursor pointer
				outline none
				border none


		.circle
			top 50%
			left 50%
			margin - inner 0 0 - inner
			width: outer
			height:outer
			border-radius: 30px;
			position: relative;
			transform-style: preserve-3d;
			transform: rotate3d(1, 1, 1, 45deg)
			animation: rotate linear 15s infinite;
			.c1, .c2, .c3, .c4, .c5, .c6, .c7, .c8, .c9, .c10, .c11, .c12
				background #fff
				width outer
				height outer
				position: absolute
				left 0
				top 0
				color #000
				line-height outer
				font-size 24px
				text-align center
				opacity 0.3
				border-radius 5px
				box-shadow 0 0 60px #fff
			.c7, .c8, .c9, .c10, .c11, .c12
				width inner
				height inner
				opacity 0.5
				box-shadow none
				line-height inner
			.c1
				transform: translateZ(inner);
			.c2
				transform: rotateY(-90deg) translateZ(inner);
			.c3
				transform: rotateX(90deg) translateZ(- inner);
			.c4
				transform: rotateY(90deg) translateZ(inner);
			.c5
				transform: rotateX(-90deg) translateZ(- inner);
			.c6
				transform: translateZ(- inner);
			.c7
				transform: translate3d(half, half, half);
			.c8
				transform: rotateY(-90deg) translate3d(0px, half, 0px);
			.c9
				transform: rotateX(90deg) translate3d(half, 0px, 0);
			.c10
				transform: rotateY(90deg) translate3d(0px, half, half * 2);
			.c11
				transform: rotateX(-90deg) translate3d(half, 0px, half * 2);
			.c12
				transform: translate3d(half, half, - half);

	@keyframes rotate {
		0% {
			transform: rotateX(-180deg) rotateY(-180deg) rotateZ(-180deg);
			top 20%
			left 30%
		}
		12.5% {
			transform: rotateX(-135deg) rotateY(-135deg) rotateZ(-135deg);
			top 50%
			left 50%
		}
		25% {
			transform: rotateX(-90deg) rotateY(-90deg) rotateZ(-90deg);
			top 80%
			left 70%
		}
		37.5% {
			transform: rotateX(-45deg) rotateY(-45deg) rotateZ(-45deg);
			top 50%
			left 90%
		}
		50% {
			transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
			top 20%
			left 70%
		}
		62.5% {
			transform: rotateX(45deg) rotateY(45deg) rotateZ(45deg);
			top 50%
			left 50%
		}
		75% {
			transform: rotateX(90deg) rotateY(90deg) rotateZ(90deg);
			top 80%
			left 30%
		}
		87.5% {
			transform: rotateX(135deg) rotateY(135deg) rotateZ(135deg);
			top 50%
			left 10%
		}
		100% {
			transform: rotateX(180deg) rotateY(180deg) rotateZ(180deg);
			top 20%
			left 30%
		}
	}

</style>
