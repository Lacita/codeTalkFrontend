import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import 'iview/dist/styles/iview.css'
import '@/common/stylus/index.styl'
import App from './App.vue'
import httpRequest from '@/utils/httpRequest'
import '@/icon/iconfont.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import VueCookie from 'vue-cookie' // 挂在在全局了
import VueParticles from 'vue-particles'
import MetaInfo from 'vue-meta-info'

// iView UI 组件引入
import {
  Button,Icon,Card,Select,
  Row,
  Col,
  Input,
  Progress,
  Tag,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  Upload,
  LoadingBar,
  Affix,
  Option,
  Form,
  FormItem,
  Carousel,
  CarouselItem,
  DatePicker,
  Spin,
  Rate,
  Modal,
  Message,
  Page,
  Notice,
  TimelineItem,
  Poptip
} from 'view-design'
Vue.use(VueCookie)
Vue.use(VueParticles)
Vue.use(MetaInfo)
Vue.use(mavonEditor)
// Vue.use(VueLazyLoad)
// Vue.use(APlayer, {
//   defaultCover: 'https://github.com/u3u.png',
//   productionTip: true,
// });
// Vue.component('ListItem', ListItem);
// Vue.component('ListItemMeta', ListItemMeta);
// Vue.component('List', List);
Vue.component('iv-row', Row)
Vue.component('iv-col', Col)
Vue.component('iv-card', Card)
Vue.component('iv-button', Button)
Vue.component('iv-page', Page)
Vue.component('iv-input', Input)
Vue.component('iv-progress', Progress)
Vue.component('iv-tag', Tag)
Vue.component('iv-dropdown', Dropdown)
Vue.component('iv-dropdown-menu', DropdownMenu)
Vue.component('iv-dropdown-item', DropdownItem)
Vue.component('iv-menu', Menu)
Vue.component('iv-submenu', Submenu)
Vue.component('iv-menu-item', MenuItem)
Vue.component('iv-icon', Icon)
Vue.component('iv-loadingBar', LoadingBar)
Vue.component('iv-affix', Affix)
// Vue.component('iv-select', Select)
Vue.component('Option', Option)
Vue.component('iv-carousel', Carousel)
Vue.component('iv-carousel-item', CarouselItem)
Vue.component('iv-date-picker', DatePicker)
// Vue.component('iv-date-picker-cell', DatePickerCell)
Vue.component('iv-spin', Spin)
Vue.component('iv-rate', Rate)
Vue.component('iv-upload', Upload)
Vue.component('iv-form', Form)
Vue.component('iv-formItem', FormItem)
Vue.component('iv-modal', Modal)
Vue.component('iv-timelineItem', TimelineItem)
Vue.component('iv-poptip', Poptip)
Vue.component('Icon',Icon)
Vue.component('Card',Card)
Vue.component('Button',Button)
Vue.component('Select',Select)
// Vue.use(iView)
Vue.prototype.$http = httpRequest // Ajax 请求方法
Vue.prototype.$https = httpRequest // Ajax 请求方法
Vue.prototype.$Modal = Modal
Vue.prototype.$Message = Message
Vue.prototype.$Notice = Notice
Vue.prototype.$loadScript = (script, url, callback) => {
  script = script || document.createElement('script')
  if (script.readyState) {
    // IE浏览器
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null
        callback()
      }
    }
  } else {
    // 其他浏览器
    script.onload = function () {
      callback()
    }
  }
  script.src = url
  document.getElementsByTagName('head')[0].appendChild(script)
}
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

Vue.prototype.$Notice.config({
  top: 70,
  duration: 3
})
let vm = new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('custom-render-trigger'))
  }
})

Vue.use({
  vm
})
