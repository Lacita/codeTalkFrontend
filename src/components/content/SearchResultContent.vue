<template>
  <div class="article-list-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <section-title :mainTitle="'搜索内容'" :subTitle="this.$route.query.keywords"> </section-title>
        <article-list-cell v-for="article in articleList" :article="article" :key="article.id"></article-list-cell>
<!--        <iv-card  class="ivu-card ivu-card-bordered"-->
<!--                  style="margin-bottom: 10px; cursor: pointer;background-color: #f5f5f5;width: 830px"-->
<!--                  v-for="article in articleList"-->
<!--                  :key="article.id">-->
<!--          <div class="ivu-row">-->
<!--            <router-link target="_blank" :to="{name:'articleDetails',params:{articleId:article.id}}">-->
<!--              <div class="ivu-col ivu-col-span-7">-->
<!--                &lt;!&ndash;<div class="live-cover" style="background-image:'url('+ article.articleHeadPic +')"></div>&ndash;&gt;-->
<!--                <div class="live-cover" :style="{background: 'url('+article.articleHeadPic+')',backgroundPosition:'center center ',backgroundSize:'cover'}"></div>-->
<!--              </div>-->
<!--              <div class="ivu-col ivu-col-span-15" >-->
<!--                <div class="live-info">-->
<!--                  <div class="live-title" v-html="article.articleName">{{article.articleName}}</div>-->
<!--                  <div class="live-desc" v-html="article.articleRemark">{{article.articleRemark}}</div>-->
<!--                </div>-->
<!--                <div class="live-down">-->
<!--                  <div class="live-down-left" >-->
<!--                    <div  class="live-for" v-for="(item,index) in article.tags" :key="item" :name="item"  >-->
<!--                      <iv-icon type="ios-pricetag" :color="index | mapTagColor" /> {{ item }}-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="live-down-right">-->
<!--                    <div class="live-name"><iv-icon type="ios-contact" class="icon"/>{{article.managerName}}</div>-->
<!--                    <div class="live-time"><iv-icon type="ios-timer-outline" class="icon"/>{{article.createTime}}</div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </router-link>-->
<!--          </div>-->
<!--        </iv-card>-->
        <iv-page class='mt-10 text-right' :total="total" :current='currentPage' :page-size='pageSize' @on-change="changePage" @on-page-size-change="changeSize" show-elevator show-total/>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <recommend></recommend>
          <tag-wall style="margin-top: 15px;"></tag-wall>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
// mixin
import {mixin} from '@/utils'
import ArticlePageContent from '@/components/views/Article/ArticlePageContent'
import ArticlePageFooter from '@/components/views/Article/ArticlePageFooter'
import ArticleListCell from '@/components/views/Article/ArticleListCell'
import Recommend from '@/components/views/Recommend'
import TagWall from '@/components/views/TagWall'
import SectionTitle from '@/components/views/SectionTitle/SectionTitle'
export default {
  data () {
    return {
      articleList: [],
      currentPage: 1,
      pageSize: 10,
      total: 1,
      keywords: ''
    }
  },
  mixins: [mixin],
  created () {
    this.listSearchArticle()
  },
  watch: {
    '$route.query.keywords':function(val, old) {
      if (val !== old) {
        this.listSearchArticle()
      }
    },
  },
  methods: {
    listSearchArticle () {
      this.keywords = this.$route.query.keywords
      this.$http({
        url: this.$http.adornUrl('/article/search'),
        method: 'get',
        params: this.$http.adornParams({keywords: this.keywords,currentPage:this.currentPage,pageSize:this.pageSize})
      }).then(({data}) => {
        if (data.code === 2000) {
          if(data.data.data!==null){
            this.articleList = data.data.data
            this.total = data.data.total
          }else{
            this.articleList = null
            this.total = null
          }
        }
      })
    },

    changePage (page) {
      this.currentPage = page
      this.$router.push({path:this.$route.path,query:{
        latest: true,
        pageSize: 10,
        currentPage: this.currentPage
      }});
      this.listArticle()
    },
    changeSize (size) {
      this.pageSize = size
      this.currentPage = 1
      this.listArticle()
    },
  },
  components: {
    'article-page-content': ArticlePageContent,
    'article-page-footer': ArticlePageFooter,
    'article-list-cell': ArticleListCell,
    'recommend': Recommend,
    'tag-wall': TagWall,
    'section-title': SectionTitle
  }
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl";
  .article-list-content
    width auto
    @media only screen and (max-width: 768px)
      margin 5px 5px 0 5px
    @media screen and (min-width: 768px)
      margin 10px 10px 0 10px
    @media screen and (min-width: 992px)
      margin 15px 35px 0 35px
    @media screen and (min-width: 1200px)
      width 1200px
      margin 15px auto 0
      margin-bottom 200px
    .layout-left, .layout-right
      padding 0
      @media only screen and (max-width: 768px)
        padding 0
      @media screen and (min-width: 768px)
        padding 0
      @media screen and (min-width: 992px)
        padding 0 10px
      @media screen and (min-width: 1200px)
        padding 0 10px

  .ivu-card, .ivu-card-bordered
    border 1px solid #dcdee2
    border-color #e8eaec
  .before {
    box-sizing: border-box;
  }
  .live-cover{
    height: 150px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    border-radius: 4px;
  }
  .live-info{
    height: 130px;
    padding: 10px
  }

  .live-title{
    font-size: 16px;
    font-weight: 700;
  }
  .live-desc{
    color: #9ea7b4;
    margin-top: 20px;
    line-height:20px
  }

  .live-down{
    margin-top :-10px;
  }

  .live-down-left{
    margin-top :20px;
    float: left
    width: 200px;
  }
  .live-for{
    float: left;
    margin-left : 15px;
  }

  .live-down-right{
    width: 50px;
    margin-left : 400px;
  }

  .live-name{
    width :200px;
    font-size: 15px;
  }
  .live-time{
    color: #9ea7b4;
    width: 200px;
    margin-top: 5px;
    font-size: 10px;
    line-height:20px;
  }
  .icon{
    margin-right: 10px;
  }
</style>
