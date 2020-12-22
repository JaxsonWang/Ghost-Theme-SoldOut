import { loadScripts } from '../utils'

export default () => {
  if (document.getElementById('vcomments') !== null) {
    loadScripts([
      {
        name: 'waline-js',
        path: 'https://cdn.jsdelivr.net/npm/@waline/client@0.9.0/dist/Waline.min.js'
      }
    ]).then(() => {
      // eslint-disable-next-line no-undef
      new Waline({
        el: '#vcomments',
        serverURL: 'https://waline-test.vercel.app',
        avatar: 'mm',
        visitor: true,
        highlight: true,
        recordIP: true,
        placeholder: '请您理智发言，共建美好社会！',
        path: window.location.pathname,
        meta: ['nick', 'mail', 'link'],
        pageSize: 10,
        lang: 'zh-CN',
        avatarForce: false
      })
    })
  }
}
