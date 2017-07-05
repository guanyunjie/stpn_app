/**
* Created by Guanyunjie on 2017/7/5.
*/
<template>
	<div class="step4">
		<app-title :name="'配置业务基本属性：节点详细信息'"></app-title>
		<div class="panel">
			this is panel area
			<router-link to="/business/create/step4">
				下一步
			</router-link>
		</div>
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
