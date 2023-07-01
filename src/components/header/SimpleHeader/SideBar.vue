<template>
  <div class="side-bar" @touchmove.stop.prevent :class="{ open: show }">
    <div class="main-area">
      <div class="top-wrapper" @touchmove.stop>
        <div class="top-area">
           <div class="homepage-hero-module">

<!--                <video autoplay loop muted playsinline src="../../../assets/photowall/Up.mp4" class="fillWidth"></video>-->
            </div>
          <div class="site-info">
            <h1 class="site-name">code-talks</h1>
            <h1 class="site-desc">分享您的经验</h1>
          </div>
        </div>
        <div class="sidebar-menus" >
          <div class="site-nav">
            <p>
              编程社区|欢迎您分享经验
            </p>
          </div>
        </div>
         <div class="sidebar-menus" >
          <div class="site-nav">
            <p>
              粤ICP备2023005210号-1
            </p>
          </div>
        </div>
        <div class="sidebar-menus" >
          <div class="site-nav">
            <p>
              <Icon type="paper-airplane"></Icon>
              <router-link to="/" class="nav-link">
                首页</router-link>
            </p>
          </div>
        </div>
        <div class="sidebar-menus" >
          <div class="site-nav">
            <p>
              <Icon type="code"></Icon>
              <router-link to="/java" class="nav-link">
                java</router-link>
            </p>
          </div>
        </div>
        <div class="sidebar-menus" >
          <div class="site-nav">
            <p>
              <Icon type="social-tux"></Icon>
              <router-link to="/embedded" class="nav-link">
              嵌入式分享</router-link>
            </p>
          </div>
        </div>
        <div class="sidebar-menus" >
          <div class="site-nav">
            <p>
              <Icon type="android-laptop"></Icon>
              <router-link to="/frontEnd" class="nav-link">
                前端</router-link>
            </p>
          </div>
        </div>
        <div class="sidebar-menus" >
          <div class="site-nav">
            <p>
              <Icon type="flash"></Icon>
              <router-link to="/weakElectrical" class="nav-link">
                弱电</router-link>
            </p>
          </div>
        </div>
        <div class="sidebar-menus" >
          <div class="site-nav">
            <p>
              <Icon type="flash"></Icon>
              <router-link to="/tipsArticle" class="nav-link">
                小知识</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" @click.prevent="toggleSideBar"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mixin} from '@/utils'

export default {
  name: 'side-bar',
  data () {
    return {
      show: false,
      showNav: false
    }
  },
  mixins: [mixin],
  beforeRouteUpdate (to, from, next) {
    next()
  },
  methods: {
    rootRouterLink (category) {
      let router = {}
      router.name = category.category_type
      return router
    },
    routerLink (category) {
      let router = {}
      router.name = category.category_type
      router.params = {}
      router.params['id'] = category.id
      return router
    },
    toggleSideBar () {
      this.show = !this.show
      this.showNav = !(
          this.$route.name === 'index' ||
          this.$route.name === 'code' ||
          this.$route.name === 'embedded' ||
          this.$route.name === 'frontEnd' ||
          this.$route.name === 'weakElectrical'
      )
    }
  }
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "./stylus/sidebar.styl";


  .homepage-hero-module
    width: 100%
    height: 250px
    overflow hidden

    .fillWidth
      width: 100%
</style>
