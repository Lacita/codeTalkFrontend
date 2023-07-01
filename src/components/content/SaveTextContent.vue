<template>
  <div class="bookNote-list-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <iv-form ref="article" :model="article" :label-width="80" >
<!--          <iv-input type="hidden" name='id' v-model="article.id" />-->
          <iv-formItem label="选择封面：">
            <iv-upload
              action=""
              :format = "['jpg','jpeg','png', 'gif']"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload">
              <iv-button  icon="ios-cloud-upload-outline">上传封面</iv-button>
              <span v-if = "article.articleHeadPic !== '' ">上传成功</span>
            </iv-upload>
          </iv-formItem>

          <iv-formItem label="文章标题：">
            <iv-input  placeholder="请填写文章标题" :maxlength="64" v-model="article.articleName" style="width: 300px" ></iv-input>
          </iv-formItem>

          <iv-formItem label="文章内容：">
            <mavon-editor ref=md @imgAdd="imgAdd" v-model="article.articleContent" :toolbars="toolbars" @change="mavonChangeHandle"/>
          </iv-formItem>

          <iv-formItem label="文章标签：">
            <iv-tag v-for="item in countTags" :key="item" :name="item" closable @on-close="handleClose(item)">{{ item }}</iv-tag >
            <iv-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </iv-input>
            <iv-button v-else size="small" type="dashed" icon="ios-add" @click="showInput">+ 添加标签</iv-button>
          </iv-formItem>

          <iv-formItem label="文章类型：">
<!--            <iv-select v-model="article.articleType" style="width: 200px;">-->
<!--              <iv-option v-for="item in statusArr" :value="item.key" :key="item.key">-->
<!--                {{ item.label }}-->
<!--              </iv-option>-->
<!--            </iv-select>-->
            <Select v-model="article.articleType" style="width:200px">
              <Option v-for="item in statusArr" :value="item.key" :key="item.key">{{ item.label }}</Option>
            </Select>
          </iv-formItem>

          <iv-formItem label="文章备注：">
            <iv-input  type="textarea"  placeholder="请填写文章备注..." v-model="article.articleRemark" :maxlength="100" style="width: 500px"></iv-input>
          </iv-formItem>

<!--          <iv-formItem label="选择附件：">-->
<!--            <iv-upload-->
<!--              action=""-->
<!--              :format = "['zip']"-->
<!--              :on-format-error="handleFormatError"-->
<!--              :on-exceeded-size="handleMaxSize"-->
<!--              :before-upload="handleUpload">-->
<!--              <iv-button icon="ios-cloud-upload-outline">选择附件</iv-button>-->
<!--              <span v-if = "article.enclosure !=='' ">上传成功</span>-->
<!--            </iv-upload>-->
<!--          </iv-formItem>-->
        </iv-form>
        <iv-button type="success" @click="saveArticle" >暂存内容</iv-button>
        <iv-button type="error" @click="saveArticle" style="float: right">发表文章</iv-button>
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

<script >
import Recommend from '@/components/views/Recommend'
import TagWall from '@/components/views/TagWall'
import BrowseMore from '@/components/views/BrowseMore'
// eslint-disable-next-line no-unused-vars
import merge from 'lodash/merge' // 合并对象工具
import axios from 'axios'
import marked from 'marked'

export default {

  /* CREDITOR有点小难，百度了很久找不到相关博文在vue中怎么完美实现图片上传
  name: 'edtiText',
  mounted  () {
    CKEDITOR.replace('editor1', {height: '300px', width: '100%', customConfig: 'config.js', toolbar: 'Project', filebrowserImageUploadUrl: 'http://localhost:8080/article/uploadImageByEditor'})
  }, */
  data: function () {
    return {
      // tag参数
      userInfo:'',
      countTags: ['JAVA',"嵌入式",'前端'],
      inputVisible: false,
      inputValue: '',
      contentxt: '',
      statusArr: [{
        key: 1001,
        label: '小知识'
      }, {
        key: 1002,
        label: 'JAVA'
      }, {
        key: 1003,
        label: '嵌入式'
      }, {
        key: 1004,
        label: '前端'
      }, {
        key: 1005,
        label: '弱电'
      }],
      article: {
        recommend: false,
        Tag: [],
        articleHeadPic: '',
        articleName: '',
        articleRemark: '',
        enclosure: '',
        managerId:'',
        managerName:'',
        articleContentMd:''
      },
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: false, // 标记
        superscript: false, // 上角标
        subscript: false, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: false, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: false, // 下一步
        trash: false, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
        boxShadow: false
      }
    }
  },
  created: function () {
    let param = {}
    param.latest = true
    // 初始化方法
  },
  mounted () {
    this.userInfo=JSON.parse(localStorage.getItem('userInfo'))
  },
  methods: {
    handleClose(tag) {
      this.countTags.splice(this.countTags.indexOf(tag), 1);
    },
    // 展示标签输入框
    showInput(){
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
      // this.countTags.push(this.inputValue);
    },
    handleInputConfirm(){
      let inputValue = this.inputValue;
      if (inputValue) {
        this.countTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },

    // 上传图片
    imgAdd (pos, file) {
      let formData = new FormData()
      formData.append('file', file)
      axios({
        url: this.$http.adornUrl('/file/upload'),
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((data) => {
        // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1.  通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        this.$refs.md.$img2Url(pos, data.data.data)
      })
    },

    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传格式的图片。'
      })
    },

    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超出文件大小限制',
        desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
      })
    },

    handleUpload (file) {
      let formData = new FormData()
      formData.append('file', file)
      axios({
        url: this.$http.adornUrl('/file/upload'),
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((data) => {
        if (data.data.code === 2000) {
          this.article.enclosure = data.data.data
          this.$Message.success('封面上传成功')
        }
      })
    },

    handleBeforeUpload (file) {
      let formData = new FormData()
      formData.append('file', file)
      axios({
        url: this.$http.adornUrl('/file/upload'),
        // url: 'http://127.0.0.1:8090/file/upload',
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((data) => {
        if (data.data.code === 2000) {
          this.article.articleHeadPic = data.data.data
          this.$Message.success('封面上传成功')
        }
      })
    },

    // 暂存文章
    temporaryArticle: function () {
      let userMessage = this.userInfo
      let article = this.article
      article.managerName=userMessage.userName
      article.managerId=userMessage.id
      let tag = ""
      for (let i = 0; i < this.countTags.length; i++) {
        // eslint-disable-next-line no-unused-vars
        tag += this.countTags[i] + ","
      }
      this.article.articleTag = tag
      if (article.articleName === null || article.articleName === '') {
        this.$Message.error('请输入文章名称')
        return
      } else if (article.articleContent === null || article.articleContent === '') {
        this.$Message.error('请输入文章内容')
        return
      }
      article.articleContent = this.$refs.md.d_render
      article.articleContentMd = this.$refs.md.d_value
      article.articleState = 2
      this.$http({
        url: this.$http.adornUrl(`/article/save`),
        method: 'post',
        data: this.$http.adornData(article),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'currentManager':JSON.parse(sessionStorage.getItem('currentManager'))
        }
      }).then(({data}) => {
        if (data.code  === 2000) {
          this.$Message.success('暂存成功')
          // 关闭当前标签
          this.$emit('closeCurrentTabs')
          // 跳转到list
          this.$router.push('/')
        } else {
          this.$Message.warning(data.data)
          // this.$router.push('/login')
        }
      })
    },

    // 保存文章
    saveArticle: function () {
      let userMessage = this.userInfo
      let article = this.article
      article.managerName=userMessage.userName
      article.managerId=userMessage.id
      let tag = ""
      for (let i = 0; i < this.countTags.length; i++) {
        // eslint-disable-next-line no-unused-vars
        tag += this.countTags[i] + ","
      }
      this.article.articleTag = tag
      if (article.articleName === null || article.articleName === '') {
        this.$Message.error('请输入文章名称')
        return
      } else if (article.articleContent === null || article.articleContent === '') {
        this.$Message.error('请输入文章内容')
        return
      }
      article.articleContent = this.$refs.md.d_render
      article.articleContentMd = this.$refs.md.d_value
      article.articleState =0
      this.$http({
        url: this.$http.adornUrl(`/article/save`),
        method: 'post',
        data: this.$http.adornData(article),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'currentManager':JSON.parse(sessionStorage.getItem('currentManager'))
        }
      }).then(({data}) => {
        if (data.code  === 2000) {
          this.$Message.success('发表成功')
          // 关闭当前标签
          this.$emit('closeCurrentTabs')
          // 跳转到list
          this.$router.push('/')
        } else {
          this.$Message.warning(data.data)
          // this.$router.push('/login')
        }
      })
    },
    mavonChangeHandle (context, html) {
      this.contentxt = html
      this.article.articleContent = marked(html)
    }

  },
  components: {
    'recommend': Recommend,
    'tag-wall': TagWall,
    'browse-more': BrowseMore
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .bookNote-list-content
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
  .iv-tag + .iv-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 20px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 80px;
    margin-left: 0;
  }
  .ivu-form >>> .ivu-form-item-label{
    width: 100px;
  }
</style>
