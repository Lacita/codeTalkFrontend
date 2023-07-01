<template>
  <div class="article-list-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <section-title :mainTitle="'我的主页'" :tipText="'调整文章'">
            <!-- <title-menu-filter @filterByMenu="listArticle"  slot="menu" :menu-filter-list="defaultFilterList"></title-menu-filter> -->
          </section-title>
<!--          <article-list-cell v-for="article in articleList" :article="article" :key="article.id"></article-list-cell>-->
          <Table border :columns="columns7" :data="articleList"></Table>
          <div style="height: 16px"></div>
          <iv-page class='mt-10 text-right' :total="total" :current='currentPage' :page-size='pageSize' @on-change="changePage" @on-page-size-change="changeSize" show-elevator show-total/>
        </div>
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
      self: this,
      articleList: [],
      countTags: [],
      tagsColor: ['#D52BB3','#E6E61A','#3CC48D'],
      categoryList: ['java', 'hahah'],
      selected_category: this.$route.params.id,
      currentPage: 1,
      pageSize: 5,
      total: 1,
      categoryId: this.$route.params.id,
      defaultFilterList: DefaultFilterList,
      columns7: [
        {
          title: '文章id',
          key: 'id',
        },
        {
          title: '文章名称',
          key: 'articleName'
        },
        {
          title: '发布时间',
          key: 'createTime'
        },
        {
          title: '文章状态',
          key: 'articleState',
          align:'center',
          render:(h,params) =>{
            if (this.articleList[params.index].articleState===0){
              return h('span','已发布')
            }
            else if(this.articleList[params.index].articleState===2){
              return h('span','暂存中')
            }
    }
        },
        {
          title: 'Action',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.editArticle(params.row.id)
                  }
                }
              }, '修改文章'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.row.id)
                  }
                }
              }, '删除文章')
            ]);
          }
        }
      ],
    }
  },
  created () {
    let param = {}
    param.latest = true
    this.listArticle(param)
  },
  methods: {
    editArticle(id){
      let routeData = this.$router.resolve({
        path:`/compile/${id}`
      });
      window.open(routeData.href, '_blank');
    },
    // 删除文章
    async remove(id){
        this.$Modal.confirm({
          title: '警告',
          content: '<p>确定删除此文章吗？</p>',
          onOk: () => {
            let params = {
             id:id,
            managerId: JSON.parse(localStorage.getItem('userInfo')).id
            }
            this.$http({
              url: this.$http.adornUrl('/article/delete'),
              method: 'post',
              header: {'currentManager':localStorage.getItem('currentManager')},
              data: params
            }).then(({data}) => {
              if (data.code === 2000) {
                this.$Message.info('删除成功');
                setTimeout(()=>{
                  this.listArticle(params)
                },500)
              }
              else {
                this.$Message.error('删除失败');
              }
            })
          },
          onCancel: () => {

          }
        });
    },
    /**
     * 修改文章内容
     * @param index
     */
    show (index) {
    },
    listArticle (param) {
      let orderby = {
        managerId: JSON.parse(localStorage.getItem('userInfo')).id,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }
      let params = merge(param, orderby)
      this.$http({
        url: this.$http.adornUrl('/article/myBlog'),
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
