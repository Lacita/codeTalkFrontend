<template>

        <div class="layout-left">
          <section-title :mainTitle="'置顶帖'" :subTitle="'topPost'">
          </section-title>
          <article-list-cell v-for="article in articleList" :article="article" :key="article.id" ></article-list-cell>
        </div>
</template>

<script type="text/ecmascript-6">
import Recommend from '@/components/views/Recommend'
import TagWall from '@/components/views/TagWall'
import BrowseMore from '@/components/views/BrowseMore'
import ArticleListHeader from '@/components/views/Article/ArticleListHeader'
import ArticleListCell from '@/components/views/Article/ArticleListCell'
import SectionTitle from '@/components/views/SectionTitle/SectionTitle'
import TitleMenuFilter from '@/components/views/SectionTitle/TitleMenuFilter'
import merge from 'lodash/merge'
import {DefaultFilterList} from '@/common/js/const'

export default {
  data () {
    return {
      articleList: [],
      countTags: [],
      tagsColor: ['#D52BB3','#E6E61A','#3CC48D'],
      categoryList: ['java', 'hahah'],
      selected_category: this.$route.params.id,
      currentPage: 1,
      pageSize: 5,
      total: 1,
      categoryId: this.$route.params.id,
      defaultFilterList: DefaultFilterList
    }
  },
  created () {
    let param = {}
    param.latest = true
    this.listArticle(param)
  },
  methods: {
    listArticle (param) {
      let orderby = {
        articleType: 0,
        pageSize: 2,
        currentPage: this.currentPage
      }
      let params = merge(param, orderby)
      this.$http({
        url: this.$http.adornUrl('/article/topPosts'),
        method: 'get',
        params: this.$http.adornParams(params)
      }).then(({data}) => {
        if (data.code === 2000) {
          this.articleList = data.data.list
          this.total = data.data.total
        }
      })
    },
    getTagsColor (index) {
      return this.tagsColor[index]
    },
    changePage (page) {
      this.currentPage = page
      this.$router.push({path:this.$route.path,query:{
        latest: true,
        pageSize: 5,
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
    'recommend': Recommend,
    'tag-wall': TagWall,
    'browse-more': BrowseMore,
    'article-list-header': ArticleListHeader,
    'article-list-cell': ArticleListCell,
    'section-title': SectionTitle,
    'title-menu-filter': TitleMenuFilter
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.home-content
  width auto
  min-height calc(100vh - 550px)
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
  .article-list-content
    width auto
    min-height calc(100vh - 308px)
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
</style>
