import './assets/stylesheets/globals.less'

import 'core-js/es6/function'
import 'core-js/es6/promise'
import 'core-js/es7/promise'
import 'core-js/es6/array'
import 'core-js/es7/array'
import 'core-js/es6/string'
import 'core-js/es7/string'
import 'core-js/es6/object'
import 'core-js/es7/object'

import 'isomorphic-fetch'

import Root from './root'
import Error from './error'
import { globals, Router } from 'splay'
import R7 from './r7plug'

const isBox = globals.isBox = window.self !== window.top
if (isBox) {
  R7.init()
  R7.registerKeys()
}

Router.init('app', [
  { re: /^error$/, Component: Error },
  { re: /(.*)/, Component: Root }])

if (isBox) R7.ready()
