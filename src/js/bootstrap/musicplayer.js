import { loadScripts, loadStyles } from '../utils'
import fetch from '../fetch'

export default () => {
  const playerEle = document.getElementById('player')
  if (playerEle !== null) return

  loadStyles([{
    name: 'player-css',
    path: 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css'
  }]).then()

  loadScripts([{
    name: 'player-js',
    path: 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js'
  }]).then(() => {
    // todo 网易云音乐支持
    // fetch({
    //   url: 'https://api.imjad.cn/cloudmusic/?type=playlist&id=5392087441&br=320000'
    // }).then(({ playlist }) => {
    //   console.log(playlist.tracks)
    // })
    const playerWrapper = document.createElement('div')
    playerWrapper.id = 'player'
    playerWrapper.className = 'player-wrapper'
    document.querySelector('body').appendChild(playerWrapper)

    new APlayer({
      container: document.getElementById('player'),
      fixed: true,
      lrcType: 3,
      theme: '#ad7a86',
      order: 'list',
      autoplay: true,
      audio: [
        {
          name: 'Sold Out',
          artist: 'Hawk Nelson',
          url: 'https://raw.githubusercontent.com/JaxsonWang/jaxsonwang.github.io/master/music/Sold%20Out.mp3',
          cover: 'https://raw.githubusercontent.com/JaxsonWang/jaxsonwang.github.io/master/music/Sold%20Out.jpeg',
          lrc: 'https://raw.githubusercontent.com/JaxsonWang/jaxsonwang.github.io/master/music/Sold%20Out.lrcx'
        }
      ]
    })
  })
}
