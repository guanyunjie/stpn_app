/**
* Created by Guanyunjie on 2017/7/4.
*/
<template>
	<div class="s-create">
		<app-title :name="'配置业务基本属性'"></app-title>
		<div class="c-wrap">
			<div class="c-item">
				<span>保护类型：</span>
				<div class="inp">
					<input type="text">
				</div>
			</div>
			<div class="c-item">
				<span>保护类型：</span>
				<div class="inp">
					<input type="text">
				</div>
			</div>
			<div class="c-item">
				<span>保护类型：</span>
				<div class="inp">
					<input type="text">
				</div>
			</div>
			<div class="c-item">
				<span>保护类型：</span>
				<div class="inp">
					<input type="text">
				</div>
			</div>
			<div class="c-item">
				<span>保护类型：</span>
				<div class="inp">
					<input type="text">
				</div>
			</div>
			<div class="c-item">
				<span>保护类型：</span>
				<div class="inp">
					<input type="text">
				</div>
			</div>
		</div>
		<router-link to="/business/create/step1">
			下一步
		</router-link>
	</div>
</template>

<script type="text/ecmascript-6">
	import title from '../common/title.vue';

	export default {
	  	components: {
	  	  	'app-title': title
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
