export default (options) => {
  const initOptions = {
    url: options.url || '',
    type: options.type || 'GET',
    data: options.data || {},
    resType: options.resType || 'json'
  }
  const fetchOptions = {
    headers: {
      // 'content-type': 'application/json'
    },
    method: initOptions.type
  }
  if (initOptions.type === 'POST' || initOptions.type === 'PUT') fetchOptions.body = JSON.stringify(initOptions.data)
  return fetch(initOptions.url, fetchOptions).then(response => {
    let res = null
    switch (initOptions.resType) {
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
