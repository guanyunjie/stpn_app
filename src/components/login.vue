/**
* Created by Guanyunjie on 2017/7/20.
*/
<template>
	<div class="login">
		<div :class="rotateStyle">
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
			<div id="uname" class="name">
				<!-- 谷歌记住密码会使Input底色变为黄色，无法透明，关闭谷歌保存密码弹框 -->
				<input type="text" autocomplete="off" v-model="name" @blur="nameBlur" @focus="nameErrMsg = ''" placeholder="enter you username">
				<p class="msg" v-show="nameErrMsg">{{nameErrMsg}}</p>
			</div>
			<div class="pwd">
				<input type="password" autocomplete="off" v-model="password" @keydown.enter="submit" @blur="pwdBlur" @focus="pwdErrMsg = ''" placeholder="enter your password">
				<p class="msg" v-show="pwdErrMsg">{{pwdErrMsg}}</p>
			</div>
			<button class="login-btn" type="button" @click="submit">
				<span v-show="!loading">登录</span>
				<i v-show="loading" class="iconfont icon-wait"></i>
			</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
	  	props: ['emit'],
		data() {
			return {
				rotateStyle: 'circle',  /* 动画形状 */
				name: '',	//	用户名
				password: '',	//	密码
				nameErrMsg: '',	// 用户名错误信息
				pwdErrMsg: '',	// 密码错误信息
				loading: false	// 登录生命周期
			}
		},
		created() {
	  	    this.$http.get('/api/topo/demo').then((res) => {
	  	        console.log(res.body)
			});
		},
		mounted() {
	  	    /* 定时动画 */
	  	  	setInterval(() => {
	  	  	    if (this.rotateStyle === 'circle') {
					this.rotateStyle = 'ring';
				} else {
					this.rotateStyle = 'circle';
				}
			}, 15000);
		},
	  	methods: {
	  	    /* 失去焦点时验证 */
			nameBlur() {
			  	if (this.name.length < 3 || this.name.length > 8) {
			  	    this.nameErrMsg = '用户名长度必须大于三位数且少于八位数';
				}
			},
			pwdBlur() {
				if (this.password.length < 3 || this.password.length > 8) {
					this.pwdErrMsg = '用户名长度必须大于三位数且少于八位数';
				}
			},
			/* 点击登录按钮事件 */
			submit() {
			    this.loading = true;
			    if (this.name !== 'admin') {
			        this.nameErrMsg = '用户名不存在';
					this.loading = false;
			        return;
				}
				if (this.password !== 'admin') {
			        this.pwdErrMsg = '密码错误';
					this.loading = false;
			        return;
				}
			    setTimeout(() => {
			        this.loading = false;
			        location.href = '#/';
					this.emit.$emit('sign', true);
				}, 1000);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	outer = 200px
	ring = 500px
	inner = 100px
	half = 50px
	offset = 19px

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
				position relative
				line-height 40px
				width 300px
				margin 0 auto 30px
				border 1px solid rgb(224, 100, 61)
				border-radius 5px
				box-shadow inset 0 0 9px #f77c55
				opacity 0.8
				input
					color #fff
					width 100%
					font-size 16px
					padding-left 12px
					background-color transparent !important
					outline none !important
					user-select none
					&:-webkit-autofill
						-webkit-text-fill-color #fff
				.msg
					position: absolute;
					font-size: 12px;
					color: #e42929
					left: 14px;
					top: 43px;
					height: 20px;
					line-height: 20px;
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
				user-select none
				&:hover
					background linear-gradient(#b34a29, #9a2903)
				.iconfont
					display inline-block
					animation: icon linear 1.5s infinite;

		.circle, .ring
			top 50%
			left 50%
			margin - inner 0 0 - inner
			width: outer
			height:outer
			transition: 1s
			border-radius: 30px;
			position: relative;
			transform-style: preserve-3d;
			transform: rotate3d(1, 1, 1, 45deg)
			user-select none
			>div
				backface-visibility visible
				transition -webkit-transform 2s, opacity 2s;
				background #fff
				width outer
				height outer
				position: absolute
				left 0
				top 0
				color #333
				line-height outer
				font-size 24px
				text-align center
				opacity 0.3
				border-radius 5px
				box-shadow 0 0 60px #fff
		.circle
			animation: rotate linear 15s infinite;
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
				transform: translate3d(half, half, half + offset);
			.c8
				transform: rotateX(0) rotateY(-90deg) rotateZ(0) translate3d(0, half , offset);
			.c9
				transform: rotateX(90deg) translate3d(half, 0, offset);
			.c10
				transform: rotateY(90deg) translate3d(0, half, half * 2 + offset);
			.c11
				transform: rotateX(-90deg) translate3d(half, 0px, half * 2 + offset);
			.c12
				transform: translate3d(half, half, - half - offset);

		.ring
			animation: spin linear 15s infinite;
			.c1
				transform: translateZ(ring)
			.c2
				transform: rotateY(30deg) translateZ(ring)
			.c3
				transform: rotateY(60deg) translateZ(ring)
			.c4
				transform: rotateY(90deg) translateZ(ring)
			.c5
				transform rotateY(120deg) translateZ(ring)
			.c6
				transform: rotateY(150deg) translateZ(ring)
			.c7
				transform: rotateY(180deg) translateZ(ring)
			.c8
				transform: rotateY(210deg) translateZ(ring)
			.c9
				transform rotateY(240deg) translateZ(ring)
			.c10
				transform: rotateY(270deg) translateZ(ring)
			.c11
				transform: rotateY(300deg) translateZ(ring)
			.c12
				transform rotateY(330deg) translateZ(ring)

	// 立方体时的运动轨迹
	@keyframes rotate
		0%
			transform: rotateX(-135deg) rotateY(-135deg) rotateZ(-135deg);
			top 50%
			left 50%
		12.5%
			transform: rotateX(-90deg) rotateY(-90deg) rotateZ(-90deg);
			top 80%
			left 70%
		25%
			transform: rotateX(-45deg) rotateY(-45deg) rotateZ(-45deg);
			top 50%
			left 90%
		37.5%
			transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
			top 20%
			left 70%
		50%
			transform: rotateX(45deg) rotateY(45deg) rotateZ(45deg);
			top 50%
			left 50%
		62.5%
			transform: rotateX(90deg) rotateY(90deg) rotateZ(90deg);
			top 80%
			left 30%
		75%
			transform: rotateX(135deg) rotateY(135deg) rotateZ(135deg);
			top 50%
			left 10%
		87.5%
			transform: rotateX(180deg) rotateY(180deg) rotateZ(180deg);
			top 20%
			left 30%
		100%
			transform: rotateX(-135deg) rotateY(-135deg) rotateZ(-135deg);
			top 50%
			left 50%

	/* 变成环形后的运动轨迹 */
	@keyframes spin
		0%
			transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)

		50%
			transform: rotateX(0deg) rotateY(-180deg) rotateZ(20deg)

		100%
			transform: rotateX(0deg) rotateY(-360deg) rotateZ(0deg)

	/* 登录中等待服务端验证动画 */
	@keyframes icon
		from
			transform rotate(0deg)
		to
			transform rotate(360deg)

</style>
