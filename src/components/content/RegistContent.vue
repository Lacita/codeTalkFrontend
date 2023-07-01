<template>
  <div class="home-content">
    <iv-row>
      <iv-col :xs="500" :sm="500" :md="500" :lg="500">
        <div class="dev-sign-main ivu-card ivu-card-dis-hover ivu-card-shadow"><!----> <!---->
          <div class="ivu-card-body">
            <iv-form autocomplete="off" class="ivu-form ivu-form-label-top" ref="registForm" :model="form"  @keydown.enter.native="handleSubmit">

              <div class="ivu-form-item ivu-form-item-required ivu-form-item-error">
                <label class="ivu-form-item-label">昵称</label>
                  <iv-formItem  prop="name"><!----> <!---->
                    <iv-input  type="text" placeholder="起一个拉风的名字吧" v-model="form.userName">
                    </iv-input>
                  </iv-formItem>
              </div>
              <div class="ivu-form-item ivu-form-item-required ivu-form-item-error">
                <label class="ivu-form-item-label">密码</label>
                  <iv-formItem  prop="password"><!---->
                    <iv-input autocomplete="off"  type="password" v-model="form.userPassword" placeholder="请输入密码" />
                  </iv-formItem>
              </div>
            </iv-form>
            <div class="dev-sign-main-aside">
              <iv-button  class="ivu-btn ivu-btn-success ivu-btn-long ivu-btn-large" @click="regist"><!---->
                <i class="ivu-icon ivu-icon-md-log-in"></i>
                <span>注册</span>
              </iv-button>
              <span class="ivu-input-prefix"> <i class="ivu-icon ivu-icon-ios-mail-outline"></i></span>
              <div class="dev-sign-main-aside-tip">
                <!--<p><a href="/recover" class="">忘记密码？</a></p>-->
                <p>已有有账户？ <router-link to="/login" class="">登录</router-link></p>
              </div>
            </div>
          </div>
        </div>
      </iv-col>
      <!-- <vue-particles
        color="#409EFF"
        :particleOpacity="0.7"
        :particlesNumber="60"
        shapeType="circle"
        :particleSize="4"
        linesColor="#409EFF"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="lizi"
      >
      </vue-particles> -->
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import 'vue-nav-tabs/themes/paper.css'
  // mixin
  import {mixin} from '@/utils'
  import {Encrypt} from '../../utils/secret'

  export default {
    name: 'registForm',
    data () {
      return {
        form: {
          userName: '',
          userPassword: '',
          name:'',
          code:''
        }
      }
    },
    mixins: [mixin],
    created () {
      // this.getBook()
    },
    methods: {
      regist(){
        // alert("请注意去你的邮箱查收验证码哦");
        if(this.form.userName === null || this.form.userName ===''){
          this.$Message.error('请输入你的账户哦！')
          return
        }
        if(this.form.password === null || this.form.password ===''){
          this.$Message.error('请输入你的密码哦！')
          return
        }
        let params = {
          userName:this.form.userName,
          userPassword:Encrypt(this.form.userPassword),
        };
        this.$http({
          url: this.$http.adornUrl('/user/register'),
          method: 'post',
          data: params
        }).then(({data}) => {
          if (data.code === 2000) {
            this.$Message.success('注册成功，请移步登录页面登录！')
          }else{
            this.$Message.error(data.data)
          }
        })
      },

      handleSubmit () {
        this.$refs.registForm.validate((valid) => {
          if (valid) {
            this.$emit('on-success-valid', {
              userName: this.form.userName,
              password: this.form.password
            })
          }
        })
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl";
  @import "../../common/stylus/article.styl";

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

  element.style {
  }
  .dev-sign-main {
    width: 400px;
    margin: 50px auto;
    padding: 0 16px;
  }
  .ivu-card-shadow {
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
  }
  .ivu-card {
    background: #FAFAFA;
    border-radius: 4px;
    font-size: 14px;
    position: relative;
    transition: all .2s ease-in-out;
  }

  article, aside, blockquote, body, button, dd, details, div, dl, dt, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, hr, iv-input, legend, li, menu, nav, ol, p, section, td, textarea, th, ul {
    margin: 0;
    padding: 0;
  }
  *, :after, :before {
    box-sizing: border-box;
  }
  * {
    -webkit-tap-highlight-color: transparent;
  }
  user agent stylesheet
  div {
    display: block;
  }
  * {
    -webkit-tap-highlight-color: transparent;
  }
  * {
    -webkit-tap-highlight-color: transparent;
  }
  * {
    -webkit-tap-highlight-color: transparent;
  }
  * {
    -webkit-tap-highlight-color: transparent;
  }
  body {
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
    font-size: 12px;
    line-height: 1.5;
    color: #515a6e;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  * {
    -webkit-tap-highlight-color: transparent;
  }
  html {
    font-family: sans-serif;
    line-height: 1.15;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  * {
    -webkit-tap-highlight-color: transparent;
  }
  *, :after, :before {
    box-sizing: border-box;
  }
  *, :after, :before {
    box-sizing: border-box;
  }
  .lizi{
    position: absolute;
    top: 0;
    left: 0;
    height: calc(100VH - 66px);
    width: 100VW;
    z-index: -1;
  }
  html,body{
    width: 100%;
  }
</style>
