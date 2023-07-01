<template>
  <div class="home-content">
    <iv-row style="position:relative;">
      <iv-col :xs="500" :sm="500" :md="500" :lg="500">
        <div class="dev-sign-main ivu-card ivu-card-dis-hover ivu-card-shadow">
          <div class="ivu-card-body">
            <iv-form autocomplete="off" class="ivu-form ivu-form-label-top" ref="registForm" :model="form"  @keydown.enter.native="handleSubmit">
              <div class="ivu-form-item ivu-form-item-required ivu-form-item-error">
                <label class="ivu-form-item-label">用户名</label>
                <iv-formItem  ><!----> <!---->
                  <iv-input  type="text" placeholder="请填写你的用户名" v-model="form.userName">
                  </iv-input>
                </iv-formItem>
              </div>
              <div class="ivu-form-item ivu-form-item-required ivu-form-item-error">
                <label class="ivu-form-item-label">密码</label>
                <iv-formItem ><!---->
                  <iv-input autocomplete="off"  type="password" v-model="form.password" placeholder="请输入密码" />
                </iv-formItem>
              </div>
            </iv-form>
            <div class="dev-sign-main-aside">
              <iv-button type="primary" class="ivu-btn ivu-btn-success ivu-btn-long ivu-btn-large" @click="logins"><!---->
                <i class="ivu-icon ivu-icon-md-log-in"></i>
                <span>登录</span>
              </iv-button>
              <span class="ivu-input-prefix"> <i class="ivu-icon ivu-icon-ios-mail-outline"></i></span>
              <div class="dev-sign-main-aside-tip">
                <span class="ivu-input-prefix"> <i class="ivu-icon ivu-icon-ios-mail-outline"></i></span>
                <p>还没有账户？ <router-link to="/regist" class="">注册</router-link></p>
              </div>
            </div>
          </div>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>

<script >
import 'vue-nav-tabs/themes/paper.css'
import { mapGetters } from 'vuex'
// mixin
import {mixin} from '@/utils'
import {Encrypt} from '../../utils/secret'

export default {
  name: 'registForm',
  inject: ['reload'],
  data () {
    return {
      form: {
        userName: '',
        password: ''
      }
    }
  },
  mixins: [mixin],
  created () {
    // this.getBook()
  },
  methods: {
    logins(){
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
        userPassword:Encrypt(this.form.password)
      };
      this.$http({
        url: this.$http.adornUrl('/user/login'),
        method: 'post',
        data: params
      }).then(({data}) => {
        if (data.code === 3000) {
          this.$Message.error(data.data)
          return
        }else {
          console.log()
          this.$Message.success('登录成功')
          // 组件中直接使用 来设置session,把用户人id存入session
          this.$store.commit('SET_USER',JSON.stringify(data.data.user))
          localStorage.setItem('userInfo',JSON.stringify(data.data.user));
          localStorage.setItem('currentManager',data.data.token);
          this.reload()
          this.$router.push({ path: '/'  })
          // this.$router.go(-1)
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
