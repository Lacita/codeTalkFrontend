<template>
  <div class="about">
    <img class="background" src="../../assets/350.jpg" alt="">
     <img class="avatar" src="../../assets/0.jpg" alt="">
    <p v-show="this.manager.userName == null" class="name">guest</p>
    <p v-show="this.manager.userName != null" class="name">{{manager.userName}}</p>
    <div class="line">
    </div>
    <ul class="social">
      <li>
        <div style="float: left;margin-top: 0px" class="desc">加入我们:</div>
        <a href="#" @click="zoomImage"  style="margin-left: -50px;width: 50px; "><img src="../../assets/icon/Qqun.png"  alt=""><span style="font-size: 5px">微信交流</span></a>
      </li>
      <!-- 放大的图片部分 -->
      <div v-if="isZoomed" class="zoomed-image-container" @click="closeZoom" style=" position: fixed;top: 0;left: 0;width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;">
        <img src="../../assets/icon/Qqun.png" alt="Zoomed Image" class="zoomed-image"  style=" max-width: 90%;max-height: 90%;"/>
      </div>
    </ul>
  </div>

</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      manager:{
        userName:'',
      },
      isZoomed: false
    }
  },
  mounted: function () {
    let manager = JSON.parse(localStorage.getItem('userInfo'))
    if (manager !== null){
      this.manager.userName = manager.userName;
    } else {
      this.manager.userName = null;
    }
  },
  methods:{
    zoomImage() {
      this.isZoomed = true;
    },
    closeZoom() {
      this.isZoomed = false;
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/theme.styl";

  .about
    position relative
    text-align center
    border 1px solid $color-border
    padding-bottom 20px
    background-color #fff
    img.background
      position absolute
      top 0
      left 0
      right 0
      width 100%
      height 125px
      z-index 1
    img.avatar
      position relative
      margin 75px auto 15px
      width 100px
      height 100px
      border 5px solid $color-gradually-gray-91
      border-radius 50%
      z-index 9
    .name
      font-size 22px
      color $color-typegraphy-title
      line-height 30px
      font-weight 700
    .desc
      font-size 15px
      color $color-secondary-info
      line-height 30px
      font-weight 100
    .social
      text-align center
      padding 0 20px
      margin-top 15px
      > li
        padding 8px
        a
          display inline-block
          width: 44px
          height: 44px
          margin: auto
          img
            width 90%
    .line
      height 1px
      background-color $color-gradually-gray-91
      margin 10px 20px
    h4
      font-size 19px
      margin 30px 0 20px
      font-weight 600
    .progresses
      padding 0 20px
      p.title
        height 38px
        line-height 38px
        text-align right
      .bar
        margin 10px 0
</style>
