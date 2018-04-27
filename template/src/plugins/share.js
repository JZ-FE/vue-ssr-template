import UiShare from 'components/ui/Share.vue'

let $vm

export default {
  install (Vue) {
    const Share = Vue.extend(UiShare)

    if (!$vm) {
      $vm = new Share({
        el: document.createElement('div'),
      })
      document.body.appendChild($vm.$el)
    }

    const share = {
      show (options) {
        if (typeof options === 'string') {
          $vm.title = options
        } else if (typeof options === 'object') {
          Object.keys(options).forEach((key) => {
            $vm[key] = options[key]
          })
        }

        $vm.show = true
      },

      hide () {
        $vm.show = false
      },
    }

    if (!Vue.$ui) {
      Vue.$ui = {
        share,
      }
    } else {
      Vue.$ui.share = share
    }

    Vue.mixin({
      created () {
        this.$ui = Vue.$ui
      },
    })

    if (typeof window !== 'undefined') {
      /* eslint-disable */
      // borrowed from http://v3.jiathis.com/code/jiathis_m.js
      (function() {
        var m = document,
          t = window,
          p = parseInt,
          n = m.body,
          d = encodeURIComponent,
          q = {},
          g = navigator.userAgent.toLowerCase(),
          isUC = /UCBrowser/i.test(g),
          h = -1 != g.indexOf('opera') && opera.version(); - 1 != g.indexOf('msie') && !h && g.substr(g.indexOf('msie') + 5, 3);
        for (var c = 'undefined' == typeof jiathis_config ? {} : jiathis_config, g = m.getElementsByTagName('script'), e = 0; h = g[e++];) !h.src || -1 == h.src.indexOf('jiathis_m.js') && -1 == h.src.indexOf('jiathis.com/code/jiathis_m.js') || h.src.replace(/(uid|UYUserId|style|lang|footmark)=([^&]+)/g, function(b, a, l) {
          q[a] = l
        });
        t.jiathis_mh5 = {
          getDes: function() {
            var b = '',
              a = m.getElementsByTagName('meta'),
              c = a.length,
              k;
            if (/msie/i.test(navigator.userAgent)) {
              for (e = 0; e < c; e++) 'description' == a[e].name && (b = a[e].content);
              if ('' == b)
                for (k in a) 'description' == k && (b = a[k].content);
              /msie 6/i.test(navigator.userAgent) && (b = '')
            } else
              for (k in a) /chrome/i.test(navigator.userAgent) ? 'undefined' != typeof a[k].name && 'description' == a[k].name && (b = a[k].content) : 'description' == k && (b = a[k].content);
            return b = b.replace(/\s/g, '')
          },
          getPic: function() {
            var b = m.getElementsByTagName('img'),
              a = '',
              c = '',
              d = [];
            for (e = 0; e < b.length; e++) {
              var d = p(b.item(e).offsetWidth),
                f = p(b.item(e).offsetHeight),
                g = 300 / f * 150,
                h = 150 / d * 300;
              300 <= d && 150 <= f && 150 >= g - h && (a += c + b.item(e).src, c = ',')
            }
            d = a.split(',');
            b = p(Math.random() * d.length);
            return d[b]
          },
          sendTo: function(b, i, j) {
            var a = jiathis_mh5.getDes(),
              l = jiathis_mh5.getPic(),
              e = '?webid=' + b,
              img = c.pic || l,
              url = String(c.url || document.location),
              f = '&url=' + d(url),
              title = String(c.title || i || document.title),
              g = '&title=' + d(title),
              summary = c.summary || j || a,
              a = summary ? '&summary=' + d(summary) : '',
              h = q.uid ? '&uid=' + p(q.uid) : '&uid=1626433',
              m = c.data_track_clickback ? '&jtss=1' : '',
              n = c.appkey && c.appkey[b] ? '&appkey=' + c.appkey[b] : '',
              l = img ? '&pic=' + d(img) : '',
              B = 'http://s.jiathis.com/' + e + f + g + h + m + n + l + (c.ralateuid && c.ralateuid[b] ? '&ralateuid=' + c.ralateuid[b] : '') + a + (0 == c.shortUrl ? '' : '&su=1' + (b == 'weixin' ? '&isexit=false' : ''));
            if (isUC && typeof ucbrowser !== 'undefined' && b === 'moments') {
              ucbrowser.web_share(title, summary, url, 'kWeixinFriend', '', '', '')
            } else if (isUC && typeof ucbrowser !== 'undefined' && b === 'weixin') {
              ucbrowser.web_share(title, summary, url, 'kWeixin', '', '', '')
            } else {
              window.open(B, '')
            }
          }
        }
      })()
    }
  },
}
