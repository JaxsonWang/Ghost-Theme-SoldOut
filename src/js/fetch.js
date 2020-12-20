export default (url, type = 'GET', data = {}, resType = 'json') => {
  const options = {
    headers: {
      // 'content-type': 'application/json'
    },
    method: type
  }
  if (type === 'POST' || type === 'PUT') options.body = JSON.stringify(data)
  return fetch(url, options).then(response => {
    let res = response.json()
    switch (resType) {
      case 'json':
        res = response.json()
        break
      case 'blob':
        res = response.blob()
        break
    }
    return res
  })
}
