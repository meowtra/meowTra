import style from './style.useable.styl'

const disableSafariZoomActionMixin = {
  __lastTouchEnd: 0,
  __touchstartHandler(event) {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  },
  __touchendHandler(event) {
    let now = (new Date()).getTime()
    if (now - this.$options.__lastTouchEnd <= 300) {
      event.preventDefault()
    }
    this.$options.__lastTouchEnd = now
  },
  __gesturestartHandler(event) {
    event.preventDefault()
  },

  created() {
    this.$options.__touchendHandler = this.$options.__touchendHandler.bind(this)

    document.addEventListener('touchstart', this.$options.__touchstartHandler)
    document.addEventListener('touchend', this.$options.__touchendHandler, false)
    document.addEventListener('gesturestart', this.$options.__gesturestartHandler)
  },
  beforeDestroy() {
    document.removeEventListener('touchstart', this.$options.__touchstartHandler)
    document.removeEventListener('touchend', this.$options.__touchendHandler, false)
    document.removeEventListener('gesturestart', this.$options.__gesturestartHandler)
  }
}

const disableSafariBodyScrollMixin = {
  __stopTouchMove: e => e.preventDefault(),
  created() {
    // passive 参数不能省略，用来兼容ios和android
    document.body.addEventListener('touchmove', this.$options.__stopTouchMove, { passive: false })
  },
  beforeDestroy() {
    document.body.removeEventListener('touchmove', this.$options.__stopTouchMove, { passive: false })
  }
}

const svgTest = {
  mixins: [
    disableSafariZoomActionMixin,
    disableSafariBodyScrollMixin
  ],
  created() {
    style.use()
  },
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h1 class="display-4">Editor</h1>
            <svg
              viewBox="0 0 600 600"
              width="100%"
              style="border:solid 1px #666"
              PointerEvent
            >
              <defs>
                <linearGradient id="demo-linear-gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stop-color="red"/>
                  <stop offset="100%" stop-color="blue"/>
                </linearGradient>
              </defs>
              <rect x="50" y="50" width="100" height="100" fill="url(#demo-linear-gradient)"></rect>
            </svg>
          </div>
        </div>
      </div>
    )
  },
  beforeDestroy() {
    style.unuse()
  },
  methods: {
    handleGestureStart(e) {
      e.preventDefault()

      console.log('handleGestureStart')
    },
    handleGestureMove(e) {
      e.preventDefault()

      console.log('handleGestureMove')
    },
    handleGestureEnd(e) {
      e.preventDefault()

      console.log('handleGestureEnd')
    },
    handleGestureEnd(e) {
      e.preventDefault()

      console.log('handleGestureEnd')
    },
  }
}

const columnInput = {
  mixins: [
    disableSafariZoomActionMixin,
    disableSafariBodyScrollMixin
  ],
  created() {
    style.use()
  },
  render() {
    return (
      <div class="container">
        <h1 class="display-4">Editor</h1>
        <div class="row">
          <div class="col-6">
            <div class="card">
              <svg viewBox="0 0 200 600" width="100%">
                <defs>
                  <linearGradient id="demo-linear-gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stop-color="red"/>
                    <stop offset="100%" stop-color="blue"/>
                  </linearGradient>
                </defs>
                <rect x="50" y="50" width="100" height="100" fill="url(#demo-linear-gradient)"></rect>
              </svg>
            </div>
          </div>
          <div class="col-6">
            <div class="card">
              <div
                contenteditable="true"
                class="col-input"
                onFocus={this.handleFocusDiv}
                onBlur={this.handleBlurDiv}
              />
            </div>
          </div>
        </div>
      </div>
    )
  },
  beforeDestroy() {
    style.unuse()
  },
  methods: {
    handleFocusDiv() {
      let clientTop = document.body.clientHeight


      setTimeout(() => {
        document.body.scrollTop = 0
        document.body.style.height = window.innerHeight + 'px'
      }, 300)
    },
    handleBlurDiv() {
      document.body.removeAttribute('style')
    }
  }
}

export default columnInput