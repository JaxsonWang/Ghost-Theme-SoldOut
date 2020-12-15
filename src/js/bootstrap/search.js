export default () => {
  const search = document.querySelector('.search-click-action')
  if (search === null) return
  document.querySelector('.ha__search').classList.add('d-none')
  // 开启搜索界面
  search.onclick = () => {
    // 禁止滚动
    document.body.classList.add('overflow-hidden')
    document.querySelector('.ha__search').classList.remove('fade-out', 'd-none')
    document.querySelector('.ha__search').classList.add('animated', 'fade-in')
  }
  // 关闭搜索界面
  document.querySelector('.ha__search .search-close').onclick = () => {
    document.querySelector('.ha__search').classList.add('fade-out')
    document.querySelector('.ha__search').classList.remove('fade-in')
    // 延迟 500ms 关闭隐藏，动画执行
    setTimeout(() => document.querySelector('.ha__search').classList.add('d-none'), 500)

    // 清除表单
    document.querySelector('.ha__search input.form-control').value = ''
    // 解锁滚动
    document.body.classList.remove('overflow-hidden')
  }
}
