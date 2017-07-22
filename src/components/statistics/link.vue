/**
* Created by Guanyunjie on 2017/7/19.
*/
<template>
	<div class="sta-link">
		<app-title :name="'统计列表：链路'"></app-title>
		<div class="link-wrap">
			<div class="table-wrap">
				<table class="custom-tab">
					<thead>
					<tr>
						<th width="2">序号</th>
						<th width="5">PORT1</th>
						<th width="5">PORT2</th>
						<th width="3">TYPE</th>
						<th width="2">DIRECTION </th>
						<th width="4">DURABLE </th>
					</tr>
					</thead>
					<tbody>
						<tr v-if="links.length > 0" v-for="(link,index) in links" :class="{odd: link % 2 === 1}">
							<td>{{index}}</td>
							<td><span class="ctn" title="of:123456780abe1740">{{link.source}}</span></td>
							<td><span class="ctn" title="of:123456780abe1740">{{link.target}}</span></td>
							<td>{{link.type}}</td>
							<td>{{link.direction}}</td>
							<td>{{link.durable}}</td>
						</tr>
					</tbody>
				</table>
				<div class="pagination-wrap">
					<app-pagination :emit="emit" :pageNum="pageTotalNum" :currentNum="currentNum"></app-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Vue from 'vue';
	import title from '../common/title.vue';
	import pagination from '../common/pagination.vue';

	export default {
		data() {
			return {
			    links: [],
				pageTotalNum: 0,
				emit: new Vue(),
				currentNum: 0
			}
		},
		components: {
		    'app-title': title,
			'app-pagination': pagination
		},
		created() {
			this.$http.get('/api/statistics/links/1').then((res) => {
				let result = res.body.result;
				this.links = result.links;
				this.pageTotalNum = result.totalPageNum;
			});
		},
		mounted() {
			/**
			 * 父子组件双向通信（分页当前页数改变时：父组件负责表格数据，子组件负责分页样式；）
			 * 1：父组件向子组件传入属性
			 * 2：字组件接收该属性，创建属性副本。
			 * 3：属性副本改变时，通过$emit通知父组件，父组件$on接收属性副本。
			 * 4：将属性副本的值赋给原属性。实现双向绑定
			 */
			this.emit.$on('pageChange', (now) => {
		  	    this.currentNum = now;
			});
		},
		watch: {
			currentNum(now) {
			    this.$http.get('/api/statistics/links/' + now).then((res) => {
					let result = res.body.result;
					this.links = result.links;
					this.pageNum = result.totalPageNum;
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import "../../common/stylus/main.styl";

	.sta-link
		.link-wrap
			margin 30px 60px
			.table-wrap
				margin-bottom 50px
				.pagination-wrap
					margin 20px 0
</style>
