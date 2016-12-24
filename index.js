/*
eslint
no-multi-spaces: ["error", {exceptions: {"VariableDeclarator": true}}]
padded-blocks: ["error", {"classes": "always"}]
max-len: ["error", 80]
*/
'use strict'

const randomBytes = require('crypto').randomBytes

module.exports = uuidV4

function uuidV4 () {
  let buf = randomBytes(16)

  buf[6] = (buf[6] & 0x0f) | 0x40
  buf[8] = (buf[8] & 0x3f) | 0x80

  return bytes2Uuid(buf)
}

const byte2hex = []

for (let i = 0; i < 256; ++i) {
  byte2hex[i] = (i + 0x100).toString(16).substr(1)
}

function bytes2Uuid (buf) {
  let b = byte2hex

  return b[buf[0]] +
    b[buf[1]] +
    b[buf[2]] +
    b[buf[3]] + '-' +
    b[buf[4]] +
    b[buf[5]] + '-' +
    b[buf[6]] +
    b[buf[7]] + '-' +
    b[buf[8]] +
    b[buf[9]] + '-' +
    b[buf[10]] +
    b[buf[11]] +
    b[buf[12]] +
    b[buf[13]] +
    b[buf[14]] +
    b[buf[15]]
}
