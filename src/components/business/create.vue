/**
* Created by Guanyunjie on 2017/7/4.
*/
<template>
	<div>
		<app-title :name="'创建业务步骤'"></app-title>
		this is create!!!
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
