const KEY = 'theme-dark-mode'
const BOOTSTRAP_STYLE_LINK_ID = 'bootstrap-style'

const installPlugin = Vue => {
  const link = document.createElement('link')
  let darkMode = false

  link.id = BOOTSTRAP_STYLE_LINK_ID
  link.rel = 'stylesheet'
  
  if (localStorage.getItem(KEY) === '1') {
    darkMode = true
    link.href = '/assets/lib/bootstrap-cyborg.min.css'
  } else {
    darkMode = false
    localStorage.setItem(KEY, '0')
    link.href = '/assets/lib/bootstrap-origin.min.css'
  }

  document.head.append(link)

  Vue.mixin({
    computed: {
      $darkMode: {
        get() {
          return localStorage.getItem(KEY) === '1'
        },
        set(val) {
          const darkMode = !!val
          localStorage.setItem(KEY, darkMode ? '1' : '0')

          const link = document.getElementById(BOOTSTRAP_STYLE_LINK_ID)
          link.href = darkMode
            ? '/assets/lib/bootstrap-cyborg.min.css'
            : '/assets/lib/bootstrap-origin.min.css'
        }
      }
    }
  })
}

export default installPlugin