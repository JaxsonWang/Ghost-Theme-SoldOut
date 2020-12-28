'use strict'
const fs = require('fs')
const config = require('../site.config')

const rootDir = './dist'

/**
 * 文件操作 - j
 */
fs.readFile(`${rootDir}/assets/sold-out.js`, 'utf8', (err, data) => {
  if (err) {
    throw err
  }

  const result = data
    .replace(/https:\/\/comments.iiong.com/, config.walineServerURL)
    .replace(/请您理智发言，共建美好社会！/, config.walinePlaceholder)

  fs.writeFile(`${rootDir}/assets/sold-out.js`, result, 'utf8', (err) => {
    if (err) {
      throw err
    }
  })
})
