<template>
  <div class="simple-header">
    <transition name="slide-fade">
      <div id="mobile-bar" v-show="show" >
        <a class="menu-button" ref="menubutton"></a>
        <router-link class="logo" to="/"></router-link>
      </div>
    </transition>
    <transition name="slide-fade">
      <div id="header"  v-show="show">
    <router-link id="logo" to="/">
      <img src="../../../assets/logo.png">
      <span class="title">code-talks</span>
<!--      <span class="motto">编程交流社区</span>-->
    </router-link>
    <ul id="nav" >
      <li><router-link to="/" class="nav-link contribute" ><Icon type="paper-airplane"></Icon> 首页</router-link></li>
      <li><router-link to="/java" class="nav-link contribute" ><Icon type="code"></Icon> JAVA</router-link></li>
      <li><router-link to="/embedded" class="nav-link contribute" ><Icon type="social-tux"></Icon> 嵌入式</router-link></li>
      <li><router-link to="/frontEnd" class="nav-link contribute" ><Icon type="android-laptop"></Icon> 前端</router-link></li>
      <li><router-link to="/weakElectrical" class="nav-link contribute" ><Icon type="flash"></Icon> 弱电</router-link></li>
      <li><router-link to="/tipsArticle" class="nav-link contribute" ><Icon type="ios-book-outline" /> 小知识</router-link></li>
      <li>
        <!-- <form id="search-form" action="/articles/search"> -->
      <span class="algolia-autocomplete" style="position: relative; display: inline-block; direction: ltr;">
        <input
          type="text" id="search-query-nav" class="search-query st-default-search-input aa-input" name="keywords" v-model="keywords" @keyup.enter="submit(keywords)"
          autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false"
          aria-owns="algolia-autocomplete-listbox-0" dir="auto" style="position: relative; vertical-align: top;" placeholder="全站搜索">
        <pre
          aria-hidden="true"
          style="position: absolute; visibility: hidden; white-space: pre; font-family: system-ui; font-size: 12px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; word-spacing: 0px; letter-spacing: normal; text-indent: 0px; text-rendering: auto; text-transform: none;"></pre>
        <span
          class="aa-dropdown-menu" role="listbox" id="algolia-autocomplete-listbox-0"
          style="position: absolute; top: 100%; z-index: 100; display: none; left: 0px; right: auto;"><div
          class="aa-dataset-1"></div></span></span>
        <!-- </form> -->
      </li>
     <li  v-show="this.manager == null"><router-link to="/login"  class="nav-link contribute" style="margin-right: 0px;color: #E6E61A">登录</router-link></li>
      <li v-show="this.manager != null"><router-link :to="{name:'publish',params:{managerId:manager}}"  class="nav-link contribute" style="margin-right: 0px;color: dodgerblue"><span class="iconfont icon-wen"> 发表文章</span></router-link></li>
      <li v-show="this.manager != null"><router-link target="_blank" to="/myContent"  class="nav-link contribute" style="margin-right: 0px;color: dodgerblue"><Icon type="person"></Icon> 我的</router-link></li>
      <li v-show="this.manager != null"><a class="nav-link contribute iconfont" style="margin-right: 0px;color: dodgerblue;" @click="noLogin"><Icon type="power"></Icon> 注销</a></li>
    </ul>
    </div>
    </transition>
    <sidebar ref="sidebar"></sidebar>
  </div>

</template>

<script >
import SideBar from '@/components/header/SimpleHeader/SideBar'
import {treeDataTranslate} from '@/utils'
import qs from 'qs'
export default {
  components: {
    'sidebar': SideBar
  },
  data () {
    return {
      show: true,
      managerId:'',
      keywords: '',
      manager:{}
    }
  },
  created () {
    this.keywords = this.$route.query.keywords
    let manager =  localStorage.getItem('userInfo')
    // let manager = JSON.parse(this.$store.state.user)
    if (manager !== null){
      this.manager = JSON.parse(manager).id;
    } else {
      this.manager = null;
    }
    this.$nextTick(function () {
      this.initMobileMenu()
    })
  },
  mounted: function () {
    // let manager = JSON.parse(sessionStorage.getItem('currentManager'))

    // 给页面绑定滑轮滚动事件
    if (document.addEventListener) { // firefox
      document.addEventListener('DOMMouseScroll', this.watchScroll, false)
    }
    // 滚动滑轮触发scrollFunc方法  //ie 谷歌
    window.onmousewheel = document.onmousewheel = this.watchScroll

  },
  methods: {
    noLogin(){
     localStorage.removeItem('userInfo')
      localStorage.removeItem('currentManager')
      this.$Message.success('已退出')
      this.manager = null
      setTimeout(()=>{
        this.$router.push("/login")
      },500)
    },
    submit(keywords){
      let routeData = this.$router.resolve({
        path: '/articles/search',
        query: {keywords}
      })
      window.open(routeData.href, '_blank')

    },
    initMobileMenu () {
      // 显示手机端的菜单
      var sidebar = this.$refs.sidebar
      this.$refs.menubutton.addEventListener('click', function () {
        sidebar.toggleSideBar()
      })
    },
    watchScroll (e) {
      e = e || window.event
      if (e.wheelDelta) {
        if (e.wheelDelta > 0 && this.show === false) { // 当滑轮向上滚动
          this.show = true
        }
        if (e.wheelDelta < 0 && this.show === true) { // 当滑轮向下滚动
          this.show = false
        }
      } else if (e.detail) {
        if (e.detail < 0 && this.show === false) { // 当滑轮向上滚动
          this.show = true
        }
        if (e.detail > 0 && this.show === true) { // 当滑轮向下滚动
          this.show = false
        }
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/header.styl";
   // 添加导航栏显示动画
  .slide-fade-enter-active ,.slide-fade-leave-active {
    transition: all .8s ease;
  }
  .slide-fade-leave-to ,.slide-fade-enter {
    /* .slide-fade-leave-active for below version 2.1.8 */
    transform: translateY(-70px);
    opacity: 0;
  }
</style>
