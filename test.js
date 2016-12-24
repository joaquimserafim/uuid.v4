/*
eslint
no-multi-spaces: ["error", {exceptions: {"VariableDeclarator": true}}]
padded-blocks: ["error", {"classes": "always"}]
max-len: ["error", 80]
*/
'use strict'

const test = require('tape')

const uuidV4 = require('./')

const uuidV4Regex = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5]' +
'[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$', 'i')

test('check if is a valid uuid v4', (assert) => {
  assert.deepEqual(uuidV4Regex.test(uuidV4()), true, 'should match the regex')
  assert.end()
})

test('test uniqueness of the uuid.v4 with `100000` entries',
  {timeout: 15000},
  (assert) => {
    assert.plan(1)

    let hold = []

    for (let i = 0; i < 1000000; i++) {
      hold.push(uuidV4())
    }

    let res = hold.reduce((prev, item) => {
      return (((item in prev) && prev[item]++) || (prev[item] = 1)) && prev
    }, {})

    assert.equal(
      Object.keys(res).filter((uuid) => { return res[uuid] !== 1 }).length,
      0,
      'should return `0` for duplicate uuid v4'
    )
  }
)
