<template>
    <div>
        <div id="target">
            <iv-input
                    v-model="inputComment"
                    type="textarea"
                    :rows="3"
                    :placeholder="placeholders">
            </iv-input>
            <div style="text-align: right;margin-top: 10px">
                <iv-button @click="cancel" style="margin-right: 10px">取消</iv-button>
                <iv-button type="primary" round @click="commitComment">确定</iv-button>
            </div>
        </div>
        <List item-layout="vertical" size="small" :split="false">
            <ListItem v-for="item in commentList" :key="item.id" >
              <ListItem>
                  <li style="margin-left: 0px;height: 50px"  v-show="item !== '' || item.content !== null" @click="showCommentInput(comment,item)">
                  <span style="color: #2d9aff">{{item.nickname}} </span>：{{item.content}}
<!--                  <a style="margin-left: 30px;">-->
<!--                      <iv-icon type="ios-chatbubbles-outline"/> 回复-->
<!--                  </a>-->
                  </li>
                    <!-- <template slot="action"> -->
                        <!-- <li>
                            <Icon type="ios-calendar-outline"/>
                            {{dateFilter(item.createTime)}}
                        </li> -->
                       <!-- <li>
                          <span @click="showCommentInput(item,item)"><Icon type="ios-chatbubbles-outline"/> 回复</span>
                        </li> -->
                    <!-- </template> -->
              </ListItem>
                <div v-if="item.replyComments" class='commentSecond'>
                    <Reply :replyComment="item.replyComments" :comment='item'
                           v-on:showCommentInput="showCommentInput"></Reply>
                </div>
            </ListItem>
        </List>

    </div>
</template>

<script>

    import Reply from './Reply'

    export default {
        components: {
            Reply,
        },
        name: 'Comment',
        props: {
            commentList: Array,
            postId: String,
        },
        data() {
            return {
                //评论内容
                inputComment: '',
                //输入框默认内容
                placeholders: '写下你的评论',
            }
        },

        methods: {
          /**
           * 获取评论
           */
          showCommentById(articleId) {
            this.$http({
              url: this.$http.adornUrl('/comment/' + articleId),
              method: 'get'
            }).then(({data}) => {
              if (data.code === 2000) {
                this.commentList.push(data.data)
              } else {
                this.$Message.success(data.data)
              }
            })
          },
            /**
             * 点击取消按钮
             */
            cancel() {
                this.inputComment = '';
                this.placeholders = '写下你的评论';
                this.fromId = null;
            },
            /**
             * 提交评论
             */
            async commitComment() {
                let redata = localStorage.getItem('userInfo')
                let nickname = ""
                let byManagerId = null;
                if (redata) {
                    nickname = JSON.parse(redata).userName
                    byManagerId = JSON.parse(redata).id
                    scrollTo(0, 0);
                    }
                // } else {
                    if (!this.inputComment) {
                        this.$Message.warning({
                            background: true,
                            content: '评论信息不能为空！',
                        });
                    } else {
                        const comment = {
                            nickname: nickname,
                            content: this.inputComment,
                            articleId: this.postId,
                            byManagerId:byManagerId,
                            pid: this.fromId
                        };
                        this.$http({
                          url: this.$http.adornUrl('/comment/save'),
                          method: 'post',
                          data: comment
                        }).then(({data}) => {
                          if (data.code !== 2000) {
                            this.$Message.error(data.data)
                            return
                          }else {
                            this.$Message.success('评论成功')
                            this.$emit("on-comment", this.postId);
                            // setTimeout(()=>{
                            //   this.showCommentById(this.postId)
                            // },500)
                          }
                        })
                    }
                // }
                this.placeholders = '写下你的评论';
                this.inputComment = '';
            },
            //根据id查询该的评论信息
            // async showCommentById(id) {
            //     const {data: result} = await this.$http.get("getListByBlogId/" + id)
            //     if (result.code === 200) {
            //         this.commentList = result.data
            //     } else {
            //         this.$Message.success(result.message)
            //     }
            // },
            /**
             * 点击评论按钮显示输入框
             * item: 当前大评论
             * reply: 当前回复的评论
             */

            showCommentInput(item, reply) {
                if (reply) {
                    this.placeholders = "@" + reply.nickname + " "
                } else {
                    this.inputComment = ''
                }
                //当点击了回复时，页面滚动到评论框的位置
                document.getElementById("target").scrollIntoView();
                this.fromId = reply.id
            },
            //格式化时间的方法
            dateFilter: function (input) {
                var d = new Date(input);
                var year = d.getFullYear();
                var month = d.getMonth() < 9 ? "0" + (d.getMonth() + 1) : "" + (d.getMonth() + 1);
                var day = d.getDate() < 10 ? "0" + d.getDate() : "" + d.getDate();
                var hour = d.getHours() < 10 ? "0" + d.getHours() : "" + d.getHours();
                var minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : "" + d.getMinutes();
                var seconds = d.getSeconds() < 10 ? "0" + d.getSeconds() : "" + d.getSeconds();
                return (year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds);
            },
        },
    }

</script>

<style scoped>
.commentSecond{
    padding: 2px;
    /* background-color: #EAEAEC; */
    border-radius: 5px;
    margin: 2px 10px;
}
list,listitem {
    display: block;
}
</style>
