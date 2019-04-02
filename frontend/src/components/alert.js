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

export default {
  name: 'alert',
  data() {
    return {
      alertType: ALERT_TYPE.primary,
      text: '',
      _show: false
    }
  },
  render() {
    if (!this._show) {
      return <div></div>
    }

    return <div class={'alert alert-' + this.alertType}>{this.text}</div>
  },
  methods: {
    show(typeStr, text) {
      const currentType = typeStr in ALERT_TYPE ? typeStr : ALERT_TYPE.primary

      Object.assign(this, {
        alertType: currentType,
        text: text,
        _show: true
      })
      this.$forceUpdate()
    },
    hide() {
      this._show = false
      this.$forceUpdate()
    }
  }
}