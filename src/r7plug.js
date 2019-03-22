import { Router } from 'splay'

export default class R7 {
  static id = 0
  static requests = {}
  static registerKeys () {
    R7.addKeys([
      'Up', 'Down', 'Left', 'Right', 'Enter', 'Rec', 'Menu', 'Play', 'Pause',
      'Forward', 'Rewind'
    ].reduce((acc, cur) => { acc[cur] = false; return acc }, {}))
  }
  static addKeys (k, callback) {
    R7.rpc('addKeys', k, callback)
  }
  static rpc (method, params, callback) {
    if (typeof params === 'function') {
      callback = params
      params = {}
    }
    const uid = R7.id++
    if (callback) R7.requests[uid] = callback
    window.parent.postMessage({
      jsonrpc: '2.0',
      id: uid,
      method: method,
      params: params
    }, '*')
  }
  static ready (callback) {
    R7.rpc('ready', callback)
  }
  static removeKeys (keysarr, callback) {
    R7.rpc('removeKeys', keysarr, callback)
  }
  static init () {
    window.addEventListener('message', R7.onMessage, false)
  }
  static onMessage ({ data }) {
    if (!data) return // only accept webapp messages
    if (data.key) R7.keyHandler(data.key) // case its a key message
    else R7.responseHandler(data) // case its a response to a request
  }
  static keyHandler (key) {
    const keyCodes = {
      Left: '37',
      Up: '38',
      Right: '39',
      Down: '40',
      Enter: '13',
      Rec: '117',
      Back: '8',
      Menu: '120',
      Play: 'F2',
      Pause: 'F5',
      Forward: 'F3',
      Rewind: 'F1'
    }
    Router.currentComponent._onKeyPress(key.indexOf('Numeric') !== -1
      ? (key.slice(-1) >> 0) + 48
      : (keyCodes[key] || ''))
  }
  static responseHandler ({ id, result = null, error }) {
    if (id < 0 || (result && error)) return
    const requests = R7.requests
    if (!requests[id]) return
    const cb = requests[id]
    delete requests[id]
    cb.call(R7, result, error ? new Error(error.message) : null)
  }
}
