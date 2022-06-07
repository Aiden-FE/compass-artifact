require('dotenv').config()
const shell = require('shelljs')

console.log('NPM Token: ', process.env.NPM_AUTH_TOKEN)

shell.exec('rush publish --apply')
