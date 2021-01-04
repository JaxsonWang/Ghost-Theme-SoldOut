import { loadScripts, loadStyles } from '../utils'
import baseToast from '../toasts'
import fetch from '../fetch'

/**
 * 根据歌单信息获取详细信息
 */
function getPlayerList(playerId) {
  return new Promise(async function(resolve, reject) {
    const infoList = await fetch({
      url: `https://api.imjad.cn/cloudmusic/?type=playlist&id=${playerId}`
    })
    if (infoList.code !== 100) {
      reject('网易云音乐接口服务器崩啦！')
      return false
    }
    const newList = await Promise.all(infoList.playlist.tracks.map(async function(item) {
      const songUrl = await fetch({
        url: `https://api.imjad.cn/cloudmusic/?type=song&id=${item.id}&br=128000`
      })
      const songLrc = await fetch({
        url: `https://api.imjad.cn/cloudmusic/?type=lyric&id=${item.id}`
      })
      const playList = {
        id: item.id,
        name: item.name,
        cover: item.al.picUrl,
        artist: item.ar.map(i => i.name).join(' & ')
      }
      if (songUrl.code !== 200 || songLrc.code !== 200) {
        reject('网易云音乐接口服务器崩啦！')
        return false
      }
      if (songUrl.code === 200) playList.url = songUrl.data[0].url
      if (songLrc.code === 200) playList.lrc = songLrc.lrc.lyric
      return playList
    }))
    resolve(newList.filter(i => i.url))
  })
}

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
  }]).then(async function() {
    try {
      const musicPlayerList = window.SoldOutConfigMusicPlayerList || '5392087441'
      const playerList = await getPlayerList(musicPlayerList)
      const playerWrapper = document.createElement('div')
      playerWrapper.id = 'player'
      playerWrapper.className = 'player-wrapper'
      document.querySelector('body').appendChild(playerWrapper)

      // eslint-disable-next-line no-undef
      new APlayer({
        container: document.getElementById('player'),
        fixed: true,
        lrcType: 1,
        theme: '#ad7a86',
        order: 'list',
        autoplay: false,
        audio: playerList
      })
    } catch (error) {
      // 通知
      baseToast({
        content: error,
        time: new Date(),
        key: 'musicPlayerToastKey'
      })
    }
  })
}
