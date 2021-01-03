import { loadScripts } from '../utils'

export default () => {
  loadScripts([
    {
      name: 'waline-js',
      path: 'https://cdn.jsdelivr.net/npm/@waline/client@0.12.0/dist/Waline.min.js'
    }
  ]).then(() => {
    new Waline({
      el: '#vcomments',
      serverURL: 'https://comments.iiong.com',
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
