import '@/style/index.styl'

import Vue from 'vue'
import app from '@/app'

import darkModeSwitcherPlugin from '@/plugins/dark-mode'
import requestPlugin from '@/plugins/request'
import alertPlugin from '@/plugins/alert'

Vue.use(darkModeSwitcherPlugin)
Vue.use(requestPlugin)
Vue.use(alertPlugin)

new Vue(app)