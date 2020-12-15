const themeMap = {
  dark: 'dark',
  light: 'light'
}

const toggleLight = () => {
  document.body.classList.add(themeMap.light)
  document.body.classList.remove(themeMap.dark)
}

const toggleDark = () => {
  document.body.classList.add(themeMap.dark)
  document.body.classList.remove(themeMap.light)
}

const darkSwitch = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? toggleDark() : toggleLight()

export default () => {
  // 初始化
  darkSwitch()
  // 监听系统风格切换
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
      console.log('🎉 Dark mode is supported')
      //dark mode
    } else {
      //light mode
      console.log('🎉 Light mode is supported')
    }
  })
  // 设置主题
  const darkToggleDom = document.querySelector('.dark-click-action')
  let style = window.matchMedia('(prefers-color-scheme: dark)').matches
  darkToggleDom.onclick = () => {
    if (!style) {
      toggleDark()
      style = true
    } else {
      toggleLight()
      style = false
    }
  }
}
