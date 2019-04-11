import style from './style.useable.styl'

import calc from 'calculatorjs'

const Hammer = window.Hammer

/**
 * 获取鼠标位置在svg元素中的坐标
 * @param   {SVGElement}  SVGElement  SVG元素
 * @param   {Event}       e           Event
 * @return  {Object}                  鼠标指针在SVG中的坐标（xy结构）
 */
const getPositionInSvg = (SVGElement, e) => {
  const point = SVGElement.createSVGPoint()

  point.x = e.clientX
  point.y = e.clientY

  const position = point.matrixTransform(SVGElement.getScreenCTM().inverse())

  return {
    x: position.x,
    y: position.y
  }
}

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

const SCALE = 20

const getInitialData = () => ({
  editing: false,
  viewBox: '0 0 600 600',
  lastViewBox: '0 0 600 600',
  scale: 1,
  lastScale: 1,
  lastCenter: {
    x: 300,
    y: 300
  },
  center: {
    x: 300,
    y: 300
  },

  selectedTagIndex: null,
  tags: [],
  addMode: false
})

const transBrand = {
  props: {
    scale: Number
  },
  render() {
    return (
      <circle
        r={20 / this.scale}
        width={100 / this.scale}
        height={100 / this.scale}
        fill="#f00"
        stroke="#000"
        stroke-width={2 / this.scale}
      />
    )
  }
}

const svgTest = {
  mixins: [
    disableSafariZoomActionMixin,
    disableSafariBodyScrollMixin
  ],
  components: {
    transBrand
  },
  data() {
    return getInitialData()
  },
  watch: {
    addMode(addMode) {
      addMode
        ? this.unbindHammerJS()
        : this.bindHammerJS()
    }
  },
  created() {
    style.use()
  },
  render() {
    const scale = this.editing ? this.scale : this.lastScale

    return (
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h1 class="display-4">Editor</h1>
            <div class="workspace">
              <div id="action-area" style={this.addMode ? 'display:none' : ''}></div>
              <svg
                ref="svg"
                viewBox={this.editing ? this.viewBox : this.lastViewBox}
                onMouseup={this.handleTouchWorkspace}
              >
                <image xlinkHref="/assets/img/example.png" x="0" y="0" width="600" height="600"/>
                {
                  this.tags.map(point => {
                    return <trans-brand scale={scale} cx={point.x} cy={point.y}/>
                  })
                }
              </svg>
              <div class="clearfloat"></div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <button class="btn btn-primary mt-3" onClick={this.reset}>reset</button>
            {
              this.addMode
                ? <button class="btn btn-primary mt-3 ml-3">add</button>
                : <button class="btn btn-outline-secondary mt-3 ml-3" onClick={this.addTag}>add</button>
            }
          </div>
        </div>
      </div>
    )
  },
  mounted() {
    this.bindHammerJS()
  },
  beforeDestroy() {
    style.unuse()
  },
  methods: {
    bindHammerJS() {
      const myElement = document.getElementById('action-area')
      const mc = new Hammer.Manager(myElement)

      const pinch = new Hammer.Pinch()
      const rotate = new Hammer.Rotate({
        threshold: 20
      })

      // we want to detect both the same time
      pinch.recognizeWith(rotate)

      // add to the Manager
      mc.add([pinch, rotate])

      mc.on('pinchstart', e => {
        if (this.addMode) {
          return
        }

        this.editing = true
      })

      mc.on("pinch", e => {
        if (!this.editing) {
          return
        }

        const scale = this.lastScale * e.scale

        const center = {
          x: calc.round(calc(`${this.lastCenter.x} - ${e.deltaX} * 1.2 / ${scale}`), 5),
          y: calc.round(calc(`${this.lastCenter.y} - ${e.deltaY} * 1.2 / ${scale}`), 5)
        }

        if (scale < 1) {
          return
        }

        const viewBox = this.getViewBox(scale, center)
        if (!viewBox) {
          return
        }

        Object.assign(this, {
          center,
          scale,
          viewBox
        })
      })

      mc.on('pinchend', e => {
        this.editing = false
        this.lastScale = this.scale
        this.lastViewBox = this.viewBox
        this.lastCenter = {
          ...this.center
        }
      })

      this.$options.__hammerManager = mc
    },
    unbindHammerJS() {
      this.$options.__hammerManager.destroy()
      this.$options.__hammerManager = null
    },

    getViewBox(scale, center) {
      const CENTER_X = center.x
      const CENTER_Y = center.y

      const HALF_WIDTH = 300
      const HALF_HEIGHT = 300

      const VIEWBOX_X = CENTER_X - HALF_WIDTH / scale
      const VIEWBOX_Y = CENTER_Y - HALF_HEIGHT / scale
      const VIEWBOX_WIDTH = HALF_WIDTH / scale * 2
      const VIEWBOX_HEIGHT = HALF_HEIGHT / scale * 2

      if ((VIEWBOX_HEIGHT < 50) || (VIEWBOX_WIDTH < 50)) {
        return
      }

      const viewBox = [VIEWBOX_X, VIEWBOX_Y, VIEWBOX_WIDTH, VIEWBOX_HEIGHT]
        .map(n => calc.round(n, 5))
        .join(' ')

      return viewBox
    },
    reset() {
      Object.assign(this, getInitialData())
    },

    addTag() {
      document.removeEventListener('click', this.quitAddMode, false)
      this.addMode = true

      setTimeout(() => {
        document.addEventListener('click', this.quitAddMode, false)
      }, 0)
    },
    quitAddMode() {
      setTimeout(() => {
        document.removeEventListener('click', this.quitAddMode, false)
        this.addMode = false
      }, 0)
    },
    handleTouchWorkspace(e) {
      const point = getPositionInSvg(this.$refs.svg, e)
      this.tags.push(point)
    }
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

export default svgTest