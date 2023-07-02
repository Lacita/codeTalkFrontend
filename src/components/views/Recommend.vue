<template>
  <div class="recommend">
    <panel :title="'推荐阅读'">
      <div slot="content" class="content">
        <div class="top" v-for="recommend in recommendList" :key="recommend.id">
          <!-- <a :href="'/article' + '/' + recommend.id" preventDefault> -->
          <router-link target="_blank" :to="{name:'articleDetails',params:{articleId:recommend.id}}">
            <p class="title">{{recommend.articleName}}</p>
            <div class="tags">
<!--              <iv-tag  :color="index " v-for="(item,index) in recommend.tags" :key="index">{{item}}</iv-tag>-->
            </div>
            <p class="info">
              <span class="time">{{recommend.createTime}}</span>
              <span class="likes"><a><iv-icon type="heart"></iv-icon> {{recommend.likeNum}} </a></span>
              <span class="comments"><a><iv-icon type="compose"></iv-icon> {{recommend.commentNum}} </a></span>
              <span class="readings"><a><iv-icon type="eye"></iv-icon> {{recommend.readNum}} </a></span>
            </p>
          </router-link>
        </div>
      </div>
    </panel>
  </div>
</template>

<script >
import {mixin} from '@/utils/index'
import Panel from '@/components/utils/Panel'
import merge from 'lodash/merge' // 合并对象工具

export default {
  data () {
    return {
      recommendList: [],
      currentPage: 1,
      pageSize: 3
      // topRecommend: {}
    }
  },
  // mixins: [mixin],
  created () {
    this.listRecommend()
  },
  methods: {
    listRecommend () {
      let orderBy = {
        pageSize: this.pageSize,
        currentPage: 0
      }
      let params = merge(orderBy)
      // params = merge(params, this.menuParams)
      this.$http({
        url: this.$http.adornUrl('/article/recommend'),
        headers:{"currentManager":localStorage.getItem('currentManager')},
        method: 'get',
        params: this.$http.adornParams(params)
      }).then(({data}) => {
        if (data.code === 2000) {
          this.recommendList = data.data.list
        }
      })
    }
  },
  components: {
    'panel': Panel
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/index.styl";

  .recommend
    .content
      padding 5px 20px
    .top, .others
      a
        display block
        overflow hidden
        .tags
          margin-bottom 10px
        .title
          text-align justify
          color $color-gradually-gray-41
          font-size 16px
          line-height 23px
          margin-bottom 5px
        .info
          margin 5px 0 0px
          span
            font-size 13px
            line-height 18px
            font-weight 100
            color $color-secondary-info
            + span
              float right
              margin-left 10px
          a
            display inline-block
            color: #777
            cursor pointer
            &:hover
              color $color-main-primary
              text-decoration underline
        .img
          padding-bottom: 40%
          width: 100%
          height: 0
          margin 5px 0
          overflow hidden
          img
            width 100%
            transition: All 0.4s ease-in-out
            transform: scale(1.0)
            zoom: 1.0
        .desc
          text-align justify
          color $color-secondary-info
          font-size 13px
          line-height 20px
          margin 5px 0 0
        &:hover
          .title
            color $color-main-primary
          img
            transition: All 0.4s ease-in-out
            transform: scale(1.05)
            zoom: 1.05
    .others
      li
        list-style-type none
        margin-top 10px
        padding-top 10px
        border-top 1px solid $color-border

</style>
