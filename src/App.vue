<template>
	<div id="app">
		<div class="app-head">
			<app-head></app-head>
		</div>
		<div class="app-body">
			<div class="menu">
				<app-menu></app-menu>
			</div>
			<div class="main">
				<router-view></router-view>
			</div>
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
	.app-body
		position absolute
		display flex
		top 75px
		left 0px
		bottom 0px
		right 0px
		width 100%
		margin 0px
		padding 0px
		.menu
			width 200px
		.main
			flex 1 1 auto
	.active
		background #ccc
		&:hover
			background #ccc !important
</style>
