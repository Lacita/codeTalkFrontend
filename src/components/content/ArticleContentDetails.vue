<template>
  <div class="home-content"  v-cloak>
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left" style="background-color: #fff;padding:30px 20px 10px 20px">
          <div v-if="hasRole"> <Card :bordered="false">
            <p slot="title">文章操作</p>
            <Button type="primary" icon="android-create" @click="editArticle">修改文章</Button>
            <Button type="error" icon="android-delete" style="float: right" @click="deleteArticle" >删除文章</Button>
          </Card></div>
          <article-page-header :article="article"></article-page-header>
          <article-page-content>
            <article id="article-main-page" class="typo container" slot="content" ref="article" v-html="article.articleContent" >
            </article>
          </article-page-content>
         <!-- <article-page-footer  :commentList="arrlist"></article-page-footer>-->
          <article-page-footer  :tags="tags" :postId="this.article.id" :commentList="commentList" @on-comment="showCommentById"></article-page-footer>
        </div>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
         <recommend></recommend> <!-- 这里是引入推荐阅读 -->
           <iv-affix :offset-top="60">
            <side-toc style="margin-top: 15px;"></side-toc>
          </iv-affix>
          <!-- <tag-wall style="margin-top: 15px;"></tag-wall> -->
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>
<script type="text/ecmascript-6">
import ArticlePageHeader from '@/components/views/Article/ArticlePageHeader'
import ArticlePageContent from '@/components/views/Article/ArticlePageContent'
import ArticlePageFooter from '@/components/views/Article/ArticlePageFooter'
import About from '@/components/views/About'
import FriendLinks from '@/components/views/FriendLinks'
import TagWall from '@/components/views/TagWall'
import Recommend from '@/components/views/Recommend'
import TOC from '@/common/js/MarkdownToc'
import SideToc from '@/components/views/SideToc'
// highlight.js引入
import hljs from 'highlight.js'
// 样式文件
import 'highlight.js/styles/solarized-light.css'
// TOC滚动监听
import TocScrollSpy from '@/common/js/TocScrollSpy'
import {Spin} from 'view-design'

var HLJS = hljs

export default {
  data () {
    return {
      hasRole:false,
      commentList:[],
      article: {},
      tags: [],
      arrlist: [],
      arrnum: 5
    }
  },
  components: {
    'article-page-header': ArticlePageHeader,
    'article-page-content': ArticlePageContent,
    'article-page-footer': ArticlePageFooter,
    'about': About,
    'friend-links': FriendLinks,
    'tag-wall': TagWall,
    'recommend': Recommend,
    'side-toc':SideToc
  },
  created: function () {
    Spin.show()
    this.article = {}
    this.getArticle(this.$route.params.articleId)
    this.showCommentById(this.$route.params.articleId)
    this.checkUserRole()
    Spin.hide()
    // this.refreshDiectory()
    // this.refreshMobileDirectory()
  },
  //监听路由id是否发生变化，变化就重新请求
  watch: {
    '$route.params.articleId':function(val, old) {
      if (val !== old) {
        this.tags = []
        this.getArticle(val)
        this.showCommentById(val)
      }
    },
  },
  methods: {
    //检查用户是否管理员
    checkUserRole(){
      let userInfoId= JSON.parse(localStorage.getItem('userInfo')).id
      this.$http({
        url: this.$http.adornUrl('/user/getUserRole/' + userInfoId),
        method: 'get'
      }).then(({data}) => {
        if (data.code === 2000) {
          if (data.data === true)
          this.hasRole = true
        }
      })
    },
    // 管理员编辑文档
    editArticle(){
      let articleId = this.$route.params.articleId
      let routeData = this.$router.resolve({
        path:`/compile/${articleId}`
      });
      window.open(routeData.href, '_blank');
    },
    // 管理员删除文档
    deleteArticle(){
      let articleId = this.$route.params.articleId
      this.$Modal.confirm({
        title: '警告',
        content: '<p>确定删除此文章吗？</p>',
        onOk: () => {
          let params = {
            id:articleId,
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
                this.$router.push("/")
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
    addCodeLineNumber () {
      // 添加行号
      let blocks = this.$refs.article.querySelectorAll('pre code')
      blocks.forEach((block) => {
        HLJS.highlightBlock(block)
        // 去前后空格并添加行号
        block.innerHTML = '<ul><li>' + block.innerHTML.replace(/(^\s*)|(\s*$)/g, '').replace(/\n/g, '\n</li><li>') + '\n</li></ul>'
      })
    },
    getArticle (articleId) {
      this.$http({
        url: this.$http.adornUrl('/article/' + articleId),
        method: 'get'
      }).then(({data}) => {
        if ( data.code === 2000) {
          this.article = data.data
          // let articleTags = this.article.articleTag.split(',');
          // for(let i in articleTags) {
          //   if ( articleTags[i] !== null &&  articleTags[i] !== '')
          //     this.tags.push(articleTags[i])
          // }
          // 更新目录、高亮代码
            this.$nextTick(function () {
              this.addCodeLineNumber()
              this.refreshDiectory()//这个就是更新渲染目录
              // this.refreshMobileDirectory()
              document.title = this.article.articleName + ' | code-talks '
            })
        }
      })
    },
    //根据id查询该的评论信息
    showCommentById(articleId) {
      this.$http({
        url: this.$http.adornUrl('/comment/' + articleId),
        method: 'get'
      }).then(({data}) => {
        if (data.code === 2000) {
            this.commentList = data.data
        } else {
            this.$Message.success(data.data)
        }
      })
        // const {data: result} = await this.$http.get("getListByBlogId/" + id)
        // if (result.code === 200) {
        //     this.commentList = result.data
        // } else {
        //     this.$Message.success(result.message)
        // }
    },
     refreshDiectory () {
      /* eslint-disable*/
        new TOC('article-main-page', {
          'level': 8,
          'top': 0,
          'class': 'list',
          'targetId': 'side-toc'
        })
        /* eslint-disable */
        new TocScrollSpy('article-main-page', 'side-toc', {
          'spayLevel': 8,
          'articleMarginTop': 0
        })
      }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .home-content
    width auto
    min-height calc(100vh - 108px)
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
  /*.live-bg{
    background-image:url({{this.imgUrl}})
  }*/
</style>
