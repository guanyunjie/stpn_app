/**
* Created by Guanyunjie on 2017/7/22.
*/
<template>
	<div class="pagination" v-if="pageNum > 0">
		<em class="prev" @click="previous" :class="{'disabled': curNum === 1}">
			<i class="iconfont icon-arrow-left"></i>上一页
		</em>
		<em class="num" @click="selectPageNum"></em>
		<em class="dot" @click="selectPageNum" v-show="prevDotShow">...</em>
		<em class="num" @click="selectPageNum"></em>
		<em class="num" @click="selectPageNum"></em>
		<em class="num" @click="selectPageNum"></em>
		<em class="num" @click="selectPageNum"></em>
		<em class="num" @click="selectPageNum"></em>
		<em class="num" @click="selectPageNum"></em>
		<em class="num" @click="selectPageNum"></em>
		<em class="dot" @click="selectPageNum" v-show="nextDotShow">...</em>
		<em class="num" @click="selectPageNum"></em>
		<em class="next" @click="prospective" :class="{'disabled': curNum === pageNum}">
			下一页<i class="iconfont icon-arrow-right"></i>
		</em>
	</div>
</template>

<script type="text/ecmascript-6">
	let $ = window.jQuery = window.$ = require('jquery');

	export default {
	    props: ['pageNum', 'currentNum', 'emit'],
		data() {
			return {
				prevDotShow: false,
				nextDotShow: false,
				curNum: this.currentNum
			}
		},
		mounted() {
	        setTimeout(() => {
				this.curNum = 1;
			}, 5000)
		},
		methods: {
			previous() {
			    if (this.curNum !== 1) {
					this.curNum -= 1;
				}
			},
			prospective() {
			    if (this.curNum !== this.pageNum) {
					this.curNum += 1;
				}
			},
			selectPageNum(e) {
			    let num = parseInt($(e.target).text());
			    if (num === this.curNum) {
			        return;
				}
				this.curNum = num;
			},
			reverse(arr) {
			    let newArr = [];
			    $.each(arr, (index, item) => {
			        newArr.push(item);
				});
			    return newArr.reverse();
			}
		},
		watch: {
			curNum(now, old) {
			    this.emit.$emit('pageChange', now);
				if (this.pageNum <= 9) {
					this.prevDotShow = false;
					this.nextDotShow = false;
					$.each($('.pagination>.num'), (index, item) => {
						$(item).text(index + 1).removeClass('on');
						if (index + 1 === this.curNum) {
							$(item).text(index + 1).addClass('on');
						}
						if (index + 1 > this.pageNum) {
							$(item).hide();
						}
					});
				} else {
					if (this.curNum <= 5) {
						this.prevDotShow = false;
						this.nextDotShow = true;
						$.each($('.pagination>.num'), (index, item) => {
							$(item).text(index + 1).removeClass('on');
							if (index + 1 === this.curNum) {
								$(item).text(this.curNum).addClass('on');
							}
							if (index + 1 === $('.pagination>.num').length) {
								$(item).text(this.pageNum);
							}
						});
					} else if (this.curNum >= this.pageNum - 4) {
						this.prevDotShow = true;
						this.nextDotShow = false;
						$.each(this.reverse($('.pagination>.num')), (index, item) => {
							$(item).text(this.pageNum - index).removeClass('on');
							if ((this.pageNum - index) === this.curNum) {
								$(item).text(this.curNum).addClass('on');
							}
							if (index + 1 === $('.pagination>.num').length) {
								$(item).text(1);
							}
						});
					} else {
						this.prevDotShow = true;
						this.nextDotShow = true;
						$.each($('.pagination>.num'), (index, item) => {
							$(item).text(this.pageNum - index).removeClass('on');
							if (index === 0) {
								$(item).text(1);
							} else if (index + 1 === $('.pagination>.num').length) {
								$(item).text(this.pageNum);
							} else {
							    $(item).text(this.curNum + index + 1 - 5);
							    if (index + 1 === 5) {
									$(item).addClass('on');
								}
								if (old === this.curNum + index + 1 - 5) {
									$(item).addClass('on');
							        setTimeout(() => {
										$(item).removeClass('on');
									}, 200);
								}
							}
						});
					}
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	/* 分页样式 */
	.pagination
		display block
		line-height 40px
		transition 0.3s
		user-select none
		em
			font-style normal
			font-size 14px
			color #666
			display inline-block
			height 24px
			padding 0 7px
			background #fff
			border-radius 3px
			cursor pointer
			line-height 24px
			border 1px solid #ccc
			transition 0.3s
			user-select none
		.dot
			background none
			border none
			margin 0
			padding 0
			cursor default
		.num
			&:hover
				border 1px solid #666
		.on
			background #666
			color #fff
			cursor default
			&:hover
				border 1px solid #ccc !important
		.prev, .next
			position relative
			background linear-gradient(rgb(255, 255, 255), rgb(228, 228, 228))
			&:hover
				color #888
				background linear-gradient(rgb(255, 255, 255), #ececec)
		.prev.disabled, .next.disabled
			background linear-gradient(rgb(255, 255, 255), #ececec)
			color #c1c1c1
			cursor default
			&:hover
				background linear-gradient(rgb(255, 255, 255), #ececec)
				color #c1c1c1
				cursor default
		.prev
			padding 0 10px 0 20px
			.iconfont
				position absolute
				top -1px
				left 8px
				font-size 14px
		.next
			padding 0 22px 0 10px
			.iconfont
				position absolute
				top 1px
				right 8px
				font-size 12px
</style>
