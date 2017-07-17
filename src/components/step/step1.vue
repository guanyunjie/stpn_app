/**
* Created by Guanyunjie on 2017/7/5.
*/
<template>
	<div class="step1">
		<app-title :name="'配置业务基本属性：选择端点'"></app-title>
		<div class="step1-wrap">
			<div id="routArea" class="s-rout" :style="{width: routWidth}">
				<app-rout :nodeChecked="nodeChecked"
						  :size="{width: routWidth, height: 800}"
						  :nodeSelectType="'multiple'"
						  :selectedNodes="selectedNodes">

				</app-rout>
			</div>
			<div class="drag-line" @click="suofang"></div>
			<div class="panel">
				<h4 class="title">已选节点</h4>
				<div class="own-node-wrap">
					<div class="own-node">
						<span v-for="node in selectedNodes" class="node-item">
							{{node}}
							<em @click="removeNode(node)">&times;</em>
						</span>
					</div>
				</div>
				<h4 class="title">配置tunnel</h4>
				<div class="set-tunnel">
					<table class="tab">
						<thead>
							<tr>
								<th>名称</th>
								<th>源节点</th>
								<th>宿节点</th>
								<th>保护方式</th>
								<th>包含排斥</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="tunnel in tunnelInfo">
								<td>{{tunnel.name}}</td>
								<td>{{tunnel.source}}</td>
								<td>{{tunnel.target}}</td>
								<td>{{tunnel.protoType}}</td>
								<td>{{tunnel.isBH}}</td>
								<td>&times;</td>
							</tr>
						</tbody>
					</table>
				</div>
				<router-link class="btn-step" to="/business/create">
					上一步
				</router-link>
				<router-link class="btn-step" to="/business/create/port">
					下一步
				</router-link>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import title from '../common/title.vue';
	import paragraph from '../common/paragraph.vue';
	import rout from '../rout/rout.vue';

	export default {
	  	data() {
	  	  	return {
	  	  	  	selectedNodes: [],
				tunnelInfo: [],
				routWidth: 800
			}
		},
	  	components: {
	  	  	'app-title': title,
			'app-rout': rout,
			'app-paragraph': paragraph
		},
		methods: {
			nodeChecked(id) {
				if (!this.selectedNodes.includes(id)) {
					this.selectedNodes.push(id);
				}
			},
			linkChecked(id) {},
			removeNode(node) {
			  	this.selectedNodes.forEach((item, index) => {
			  	  	if (item === node) {
						this.selectedNodes.splice(index, 1);
					}
				})
			},
			suofang() {
			  	console.log(this.routWidth)
				document.getElementById('routArea').style.width = this.routWidth;
			  	if (this.routWidth === 800) {
			  	  	this.routWidth = 600;
				} else {
			  	  	this.routWidth = 800;
				}
			}
		},
		watch: {
			selectedNodes(now) {
			  	this.tunnelInfo = [];
				now.forEach((item) => {
				  	let tunnel = {
				  	  	name: item,
						source: 'source' + item,
						target: 'target' + item,
						protoType: '1+1保护',
						isBH: '排斥'
					}
					this.tunnelInfo.push(tunnel);
				});
			}
		},
		beforeRouteLeave(to, from, next) {
			if (to.path === '/business/create/port') {
			  	console.log('asfse')
			} else if (to.path === '/business/create') {
			  	console.log('aaaaaaaaa')
			}
			next();
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import "../../common/stylus/main.styl";

	.step1
		width 100%
		height 100%
		.step1-wrap
			background #fff
			display flex
			flex-wrap nowrap
			.s-rout
				top 0px
				bottom 0px
				position inherit
				border-right 1px solid #ccc
			.drag-line
				width 5px
				background #ccc
				cursor e-resize
			.panel
				flex auto
				height 100%
				background #f2f2f2
				overflow hidden
				.title
					background #10674c
					margin 20px 30px 0
					line-height 32px
					text-align left
					padding-left 20px
					color #fff
				.set-tunnel
					overflow-y hidden
					overflow-x scroll
				.own-node-wrap
					overflow hidden
				.own-node-wrap, .set-tunnel
					background #dbe5f7
					min-height 80px
					margin 0px 30px 50px
					padding 20px 9px
					text-align left
					.own-node
						min-width 300px
					.tab
						background #fff
						margin 0 auto
						width 85%
						min-width 450px
						border 1px solid #ccc
						tr
							color #4c4c4c
							font-size 14px
							th
								line-height 40px
								height 40px
								padding-left 5px
								font-weight bold
								border-right 1px dashed #ccc
								border-bottom 1px dashed #ccc
							td
								line-height 40px
								padding-left 5px
								border-right 1px dashed #ccc
								border-bottom 1px dashed #ccc
					.node-item
						position relative
						display inline-block
						margin 5px 10px
						padding 0 30px 0 10px
						background #86ce5f
						color #fff
						font-size 14px
						border-top-right-radius 99px
						border-bottom-right-radius 99px
						line-height 24px
						em
							top 6px
							font-size 18px
							right 10px
							line-height 10px
							width 10px
							cursor pointer
							text-align center
							display block
							position absolute
							&:hover
								color #fb9494
</style>
