<template>
	<div id="app">
		<div class="login" v-if="!isLogin">
			<app-login :emit="vue"></app-login>
		</div>
		<div class="app-head" v-if="isLogin">
			<app-head :emit="vue"></app-head>
		</div>
		<div id="menu" class="menu" ref="menu" v-if="isLogin">
			<app-menu :emit="vue"></app-menu>
		</div>
		<div id="mainArea" class="main" ref="main" v-if="isLogin" @scroll="scroll">
			<router-view></router-view>
			<div class="totop" title="返回顶部" @click="toTop" v-show="scrollTop >= 100">
				<i class="iconfont icon-totop"></i>
			</div>
		</div>
	</div>
</template>

<script>
	import Head from './components/head.vue';
	import Menu from './components/menu.vue';
	import Login from './components/login.vue';
	import Vue from 'vue';
	let $ = window.jQuery = window.$ = require('jquery/dist/jquery.min');
	let velocity = require('velocity-animate');
	export default {
		name: 'app',
		components: {
			'app-head': Head,
			'app-menu': Menu,
			'app-login': Login
		},
		data() {
		  	return {
				isMenuOpen: true,
				vue: new Vue(),
				menuWidth: 225,
				isLogin: false,
				scrollTop: 0
			}
		},
		created() {},
		mounted() {
		  	this.vue.$on('sign', (isLogin) => {
		  	    if (!isLogin) {
					location.href = '#/login';
				}
		  	  	this.isLogin = isLogin;
			});
		  	this.vue.$on('menuChange', (isMenuOpen) => {
				this.menuWidth = isMenuOpen ? 225 : 35;
				velocity(this.$refs['menu'],
					{'width': this.menuWidth + 'px'},
					{
						easing: 'linear',
						duration: 250
					}
				);
				velocity(this.$refs['main'],
					{'margin-left': this.menuWidth},
					{
						easing: 'linear',
						duration: 250
					}
				);
				let nodeBack = document.getElementById('node-back');
				if (nodeBack) {
					velocity(nodeBack,
						{'left': this.menuWidth},
						{
							easing: 'linear',
							duration: 250
						}
					);
				}
			});
		  	this.vue.$on('hoverChange', (isMenuOpen) => {
				this.menuWidth = isMenuOpen ? 225 : 35;
				velocity(this.$refs['menu'],
					{'width': this.menuWidth + 'px'},
					{
						easing: 'linear',
						duration: 250
					}
				);
			});
		},
		methods: {
			toTop() {
				// this.$refs['main'].scrollTop = 0;
				$('#mainArea').animate({scrollTop: '0px'}, 400);
			},
			scroll(e) {
			    this.scrollTop = e.target.scrollTop;
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	#app
		font-family 'Avenir', Helvetica, Arial, sans-serif
		-webkit-font-smoothing antialiased
		-moz-osx-font-smoothing grayscale
		text-align center
	.app-head
		position fixed
		top 0
		height 55px
		width 100%
		right 0
		left 0
		z-index 999
	.menu
		position fixed
		left 0px
		top 54px
		width 225px
		bottom 0px
		height 100%
		z-index 99
		user-select none
	.main
		margin-top 54px
		position absolute
		top 0px
		left 0px
		right 0px
		bottom 0px
		margin-left 225px
		background #f2f2f2
		overflow-y scroll
		.totop
			position fixed
			right 20px
			bottom 20%
			background #fff
			border 1px solid #ccc
			line-height 32px
			width 26px
			display block
			cursor pointer
			.iconfont
				font-size 24px
				color #666
	.active
		background #2b2b2b
		&:hover
			background #2b2b2b !important
</style>
