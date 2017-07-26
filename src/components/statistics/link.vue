/**
* Created by Guanyunjie on 2017/7/19.
*/
<template>
	<div class="sta-link">
		<app-title :name="title"></app-title>
		<div class="link-wrap">
			<div class="table-wrap">
				<div class="search">
					<input id="searchValue" type="text" @keydown.13="searchLink" placeholder="search...">
					<a class="search-btn" @click="searchLink" href="javascript:;"><i class="iconfont icon-search"></i></a>
				</div>
				<app-loading v-show="loadState === 'loading'" :timeout="isTimeout"></app-loading>
				<table v-show="loadState === 'loaded'" class="custom-tab">
					<thead>
						<tr>
							<th width="2">序号</th>
							<th width="4" class="col-sort" @click="sortByField">
								名称<i class="iconfont" :class="isDesc ? 'icon-desc' : 'icon-asc'"></i>
							</th>
							<th width="4">用户标签</th>
							<th width="3">层速率</th>
							<th width="4">方向</th>
							<th width="4">管理状态</th>
							<th width="4">运行状态</th>
							<th width="6">源节点</th>
							<th width="3">源端口</th>
							<th width="6">宿节点</th>
							<th width="3">宿端口</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="links.length > 0" v-for="(link,index) in page(links)" :class="{odd: link % 2 === 1}">
							<td>{{pageSize * (currentNum - 1) + index + 1}}</td>
							<td><span class="ctn" :title="link.name">{{link.name}}</span></td>
							<td><span class="ctn" :title="link.userLabel">{{link.userLabel || '无'}}</span></td>
							<td><span class="ctn" :title="link.layerRate">{{link.layerRate || '无'}}</span></td>
							<td><span class="ctn" :title="link.direction">{{link.direction || '无'}}</span></td>
							<td><span class="ctn" :title="link.adminStatus.enumeration">{{link.adminStatus.enumeration || '无'}}</span></td>
							<td><span class="ctn" :title="link.operateStatus.enumeration">{{link.operateStatus.enumeration || '无'}}</span></td>
							<td><span class="ctn" :title="link.leftNodeName">{{link.leftNodeName || '无'}}</span></td>
							<td><span class="ctn" :title="link.leftLtpName ">{{link.leftLtpName || '无'}}</span></td>
							<td><span class="ctn" :title="link.rightNodeName">{{link.rightNodeName || '无'}}</span></td>
							<td><span class="ctn" :title="link.rightLtpName ">{{link.rightLtpName || '无'}}</span></td>
						</tr>
					</tbody>
				</table>
				<div class="pagination-wrap" v-show="loadState === 'loaded'">
					<app-noresult :length="links.length"></app-noresult>
					<app-pagination style="margin: 20px 0" :emit="emit" :random="random" :pageNum="pageTotalNum" :currentNum="currentNum"></app-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Vue from 'vue';
	import title from '../common/title.vue';
	import pagination from '../common/pagination.vue';
	import loading from '../common/loading.vue';
	import noresult from '../common/noresult.vue';

	export default {
		data() {
			return {
				title: '统计列表',
				isTimeout: false,	// 记录接口是否超时
				isDesc: true,	// 默认正序
				loadState: 'loading',
				cacheLinks: [],
			    links: [],
				pageTotalNum: 0,
				pageSize: 15,
				emit: new Vue(),
				currentNum: 1,	// 未知生命周期   用轮询模拟
				isSearch: false,
				oldValue: '',
				random: this.getRandom()
			}
		},
		components: {
		    'app-title': title,
			'app-pagination': pagination,
			'app-loading': loading,
			'app-noresult': noresult
		},
		created() {
			this.$http.get('/api/statistics/links').then(response => {
			    console.log(response.body);
				this.cacheLinks = response.body;
				this.links = response.body;
				this.pageTotalNum = Math.ceil(this.links.length / this.pageSize);
				this.loadState = 'loaded';
				this.title = '统计列表：链路 共' + this.links.length + '条';
				this.random = this.getRandom();
			}, response => {
			    if (!response.ok) {
			        this.isTimeout = true;
				}
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
			    if (this.currentNum !== now) {
					this.currentNum = now;
				}
			});
		},
		methods: {
			page(links) {
			    if (this.isSearch) {
					this.currentNum = 1;
					this.isSearch = false;
				}
			    return links.filter((link, index) => {
			        return index >= this.pageSize * (this.currentNum - 1) && index < this.pageSize * this.currentNum;
				});
			},
			searchLink() {
			    this.isSearch = true;
			    let searchValue = document.getElementById('searchValue').value.replace(/\/s/g, '');
			    if (this.oldValue !== searchValue) {
					this.oldValue = searchValue;
					this.links = this.cacheLinks.filter((link) => {
						return link.name.includes(searchValue);
					});
					this.pageTotalNum = Math.ceil(this.links.length / this.pageSize);
					this.title = '统计列表：搜索“' + searchValue + '”的结果共有' + this.links.length + '条';
					if (searchValue.length === 0) {
						this.title = '统计列表：链路 共' + this.links.length + '条';
					}
					this.random = this.getRandom();
				}
			},
			sortByField() {
				this.isDesc = !this.isDesc;
				this.links = this.links.reverse();
			},
			/**
			 * 获取六位随机数
			 * @returns {string}
			 */
			getRandom() {
				return ('00000' + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
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
					position relative
				.search
					position absolute
					top -1px
					right 58px
					margin 10px 45px
					border-bottom 1px solid #ccc
					line-height 25px
					input
						color #ddd
						outline none
						width 150px
						padding-left 6px
						background-color: transparent !important;
					.search-btn
						display inline-block
						padding 0 3px
						.iconfont
							color #ccc
</style>
