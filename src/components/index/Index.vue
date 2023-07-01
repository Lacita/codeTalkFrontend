<template xmlns="http://www.w3.org/1999/html">
  <div class="main-wrapper">
    <!-- <canvas id="canvas" width="1920" height='1080'>
    </canvas> -->
    <canvas id="snowbox" width="1920" height='1080'></canvas>
    <router-view name="header"></router-view>
     <router-view name="content"></router-view>
    <router-view name="footer"></router-view>
    <div class="backTop" v-show="btnFlag" @click="backTop"></div>
  </div>
</template>

<script >
import {mapState} from 'vuex'

export default {
  data () {
    return {
      btnFlag: false,
      audio: [
      ]
    }
  },
  created () {
    // vue的两个生命钩子，这里不多解释。
    // window对象，所有浏览器都支持window对象。它表示浏览器窗口，监听滚动事件
    window.addEventListener('scroll', this.scrollToTop)
  },

  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
  },

  computed: {
    ...mapState(['loadingStatus'])
  },

  mounted () {
  },

  methods: {
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop () {
      const that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    },

    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop () {
      const that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 0) {
        that.btnFlag = true
      } else {
        that.btnFlag = false
      }
    }
  }
}

</script>
<style scoped>
   #snowbox{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100VH;
    z-index: -1;
  }
  .backTop{
    position:fixed;
    bottom:10px;
    right:45px;
    width: 23px;
    height: 23px;;
    background: url('../../assets/toTop.png');
    cursor: pointer;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus">
  html,body{
    height: 100%;
  }
  .main-wrapper
    width 100%
    margin 0 auto
</style>
