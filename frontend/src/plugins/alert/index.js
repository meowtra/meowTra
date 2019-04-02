/**
 * bootstrap alert plugin
 * base on bootstrap 4.3 version
 */

import Vue from 'vue'
import './style.styl'

const ALERT_TYPE = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  danger: 'danger',
  warning: 'warning',
  info: 'info',
  light: 'light',
  dark: 'dark'
}

const alertContainer = document.createElement('div')
alertContainer.id = 'alert-container'
document.body.append(alertContainer)

const alertInstance = new Vue({
  msgListKeyCount: 0,

  el: alertContainer,
  data() {
    return {
      msgList: []
    }
  },
  render() {
    return (
      <div id="alert-container" class="row justify-content-center ">
        <transition-group tag="div" name="fade" class="col-xs-10 col-sm-10 col-md-10 col-lg-8 col-xl-6">
        {
          this.msgList.map((item, i) => {
            let vnode
            if (item.autoClose) {
              vnode = <div key={item.id} class={'alert alert-' + item.type} domPropsInnerHTML={item.content} />
            } else {
              vnode = (
                <div
                  key={item.id}
                  class={'alert alert-' + item.type}
                >
                  <span domPropsInnerHTML={item.content}/>
                  <button type="button" class="close">
                    <span data-id={item.id} onClick={this.removeMessage}>&times;</span>
                  </button>
                </div>
              )
            }

            // return i === 0 ? vnode : [<br/>, vnode]
            return vnode
          })
        }
        </transition-group>
      </div>
    )
  },
  methods: {
    insertAlertMessage({
      typeStr = ALERT_TYPE.primary,
      content = '',
      autoClose = true
    }) {
      const id = ++this.$options.msgListKeyCount
      const type = typeStr in ALERT_TYPE ? typeStr : ALERT_TYPE.primary

      this.msgList.push({ id, type, content, autoClose })
      this.$forceUpdate()

      if (autoClose) {
        this.autoRemoveMessage(id)
      }
    },
    autoRemoveMessage(id, timeout = 3000) {
      setTimeout(() => {
        let i = this.msgList.length
        while(i-- > 0) {
          if (this.msgList[i].id === id) {
            this.msgList.splice(i, 1)
            // this.$forceUpdate()
            break
          }
        }
      }, timeout)
    },
    removeMessage(e) {
      const id = +e.currentTarget.dataset.id

      let i = this.msgList.length
      while(i-- > 0) {
        if (this.msgList[i].id === id) {
          this.msgList.splice(i, 1)
          // this.$forceUpdate()
          break
        }
      }
    }
  }
})

const installPlugin = Vue => {
  const func = function(...args) {
    alertInstance.insertAlertMessage(...args)
  }

  func.primary = function(content, autoClose) {
    alertInstance.insertAlertMessage({
      typeStr: 'primary',
      content,
      autoClose
    })
  }

  func.secondary = function(content, autoClose) {
    alertInstance.insertAlertMessage({
      typeStr: 'secondary',
      content,
      autoClose
    })
  }

  func.success = function(content, autoClose) {
    alertInstance.insertAlertMessage({
      typeStr: 'success',
      content,
      autoClose
    })
  }

  func.danger = function(content, autoClose) {
    alertInstance.insertAlertMessage({
      typeStr: 'danger',
      content,
      autoClose
    })
  }

  func.warning = function(content, autoClose) {
    alertInstance.insertAlertMessage({
      typeStr: 'warning',
      content,
      autoClose
    })
  }

  func.info = function(content, autoClose) {
    alertInstance.insertAlertMessage({
      typeStr: '= ',
      content,
      autoClose
    })
  }

  func.light = function(content, autoClose) {
    alertInstance.insertAlertMessage({
      typeStr: ' =',
      content,
      autoClose
    })
  }

  func.dark = function(content, autoClose) {
    alertInstance.insertAlertMessage({
      typeStr: '= ',
      content,
      autoClose
    })
  }

  Vue.prototype.$alert = func
}

export default installPlugin