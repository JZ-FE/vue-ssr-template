<template>
  <div class="ui-share">
    <ui-mask v-show="show" @onMask="onHide"></ui-mask>

    <div class="content" :class="{ toggle: show }">
      <ul class="list">
        <li v-for="(value, key) in list" @click="onShare(key)">
          <i :class="['icon', `icon-${key}`]"></i>
          <p class="text">{{ value }}</p>
        </li>
      </ul>

      <p class="close"><span class="btn" @click="onHide">×</span></p>
    </div>
  </div>
</template>

<script>
  import UiMask from 'components/ui/Mask.vue'

  export default {
    name: 'ui-share',

    props: {
      show: {
        type: Boolean,
        default: false,
      },

      title: {
        type: String,
        default: '',
      },

      summary: {
        type: String,
        default: '',
      },
    },

    components: {
      UiMask,
    },

    data () {
      return {
        list: {
          moments: '朋友圈',
          weixin: '微信好友',
          tsina: '新浪微博',
          cqq: 'QQ好友',
          qzone: 'QQ空间',
        },
      }
    },

    methods: {
      onHide () {
        this.show = false
      },

      onShare (name) {
        const { title, summary } = this
        const { jiathis, location } = window

        if (typeof jiathis === 'object') {
          this.onHide()

          jiathis.sendTo(name, title, summary)
        } else {
          const url = encodeURIComponent(location.href)

          const templates = {
            moments: '',
            weixin: '',
            tsina: `http://service.weibo.com/share/share.php?url=${url}&title=${title}&pic=&appkey=2992571369`,
            cqq: `http://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&desc=${summary}&pics=`,
            qzone: `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&summary=${summary}&pics=`,
          }

          const shareUrl = templates[name]

          if (shareUrl) {
            location.href = shareUrl
          } else {
            this.$ui.toast.show('请使用微信分享')
          }
        }
      },
    },
  }
</script>

<style lang="scss">
  @import "~base";

  .ui-share {
    .content {
      display: none;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 5000;
      width: 100%;
      transform: translate(0, 100%);
      transition: transform .3s;
      backface-visibility: hidden;
      background-color: #fff;

      &.toggle {
        display: block;
        transform: translate(0, 0);
      }

      .list {
        li {
          display: inline-block;
          width: 33.3%;
          padding: px2rem(15 0);
          text-align: center;
        }

        .icon {
          display: inline-block;
          margin: px2rem(15 0);
          vertical-align: middle;

          &.icon-moments {
            @include size(79);
            @include background-cover("icon-share-moments.png");
          }

          &.icon-weixin {
            @include size(86, 72);
            @include background-cover("icon-share-wechat.png");
          }

          &.icon-tsina {
            @include size(86, 74);
            @include background-cover("icon-share-weibo.png");
          }

          &.icon-cqq {
            @include size(71, 77);
            @include background-cover("icon-share-qq.png");
          }

          &.icon-qzone {
            @include size(80, 76);
            @include background-cover("icon-share-qzone.png");
          }

        }

      }

      .close {
        text-align: center;

        .btn {
          font-size: px2rem(60);
          color: $gray-light;
        }

      }

    }

  }
</style>
