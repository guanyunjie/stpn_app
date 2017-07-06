<template>
	<div id="app">
		<div class="app-head">
			<app-head></app-head>
		</div>
		<div class="menu">
			<app-menu></app-menu>
		</div>
		<div class="main">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import Head from './components/head.vue';
	import Menu from './components/menu.vue';

	export default {
		name: 'app',
		components: {
			'app-head': Head,
			'app-menu': Menu
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
		top 0px
		height 68px
		width 100%
		right 0px
		left 0px
		z-index 999
	.menu
		width 200px
		position fixed
		left 0px
		top 74px
		bottom 0px
		height 100%
	.main
		margin 74px 0 0 200px
		position absolute
		top 0px
		left 0px
		right 0px
		bottom 0px
		background #f2f2f2
		overflow-y scroll
	.active
		background #ccc
		&:hover
			background #ccc !important
</style>
