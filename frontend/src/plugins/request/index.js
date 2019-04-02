const S_ACCESS_TOKEN = 'credential_access_token'
const S_EXPIRES_AT = 'credential_expires_at'
const S_REFRESH_TOKEN = 'credential_refresh_token'
const S_TOKEN_TYPE = 'credential_token_type'

import Utils from './utils'

class TokenStorage {
  constructor() {
    this.accessToken = ''
    this.expiresAt = 0
    this.refreshToken = ''
    this.tokenType = ''
  }

  get logged() {
    return (
      !!this.accessToken
      && !!this.expiresAt
      && !!this.refreshToken
      && !!this.tokenType
    )
  }

  login(args) {
    if (args === undefined) {
      const expiresAt = (+localStorage.getItem(S_EXPIRES_AT) || 0)

      if (+new Date() > expiresAt) {
        this.logout()
        return false
      }

      this.accessToken = localStorage.getItem(S_ACCESS_TOKEN)
      this.expiresAt = expiresAt
      this.refreshToken = localStorage.getItem(S_REFRESH_TOKEN)
      this.tokenType = localStorage.getItem(S_TOKEN_TYPE)
    } else {
      this.refresh(args)
    }

    this.setCredentialToLocalStorage()
    return true
  }

  setCredentialToLocalStorage() {
    localStorage.setItem(S_ACCESS_TOKEN, this.accessToken)
    localStorage.setItem(S_EXPIRES_AT, this.expiresAt)
    localStorage.setItem(S_REFRESH_TOKEN, this.refreshToken)
    localStorage.setItem(S_TOKEN_TYPE, this.tokenType)
  }

  refresh(args) {
    this.accessToken = args.access_token
    this.expiresAt = (+new Date() + args.expires_in * 1000)
    this.refreshToken = args.refresh_token
    this.tokenType = args.token_type

    this.setCredentialToLocalStorage()
  }

  logout() {
    this.accessToken = ''
    this.expiresAt = 0
    this.refreshToken = ''
    this.tokenType = ''

    localStorage.removeItem(S_ACCESS_TOKEN)
    localStorage.removeItem(S_EXPIRES_AT)
    localStorage.removeItem(S_REFRESH_TOKEN)
    localStorage.removeItem(S_TOKEN_TYPE)
  }
}

const tokenStorage = new TokenStorage()

const sendRequest = function(
  url = '',
  method = 'GET',
  headers = {},
  params = {}
) {
  const xhr = new XMLHttpRequest()
  const currentURL = method === 'GET' ? url + Utils.queryStringify(params) : url
  const hasBlobValue = method === 'GET' ? false : Object.keys(params).some(key => {
    return (params[key] instanceof Blob) || (params[key] instanceof File)
  })
  const body = hasBlobValue ? Utils.getFormData(params) : Utils.formatBody(params)

  xhr.open(method, url)
  if (tokenStorage.logged) {
    headers.Authorization = tokenStorage.tokenType + ' ' + tokenStorage.accessToken
  }
  Utils.setCustomHeader(xhr, headers, body instanceof FormData)

  return new Promise(function(resolve, reject) {
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return
      }

      if ((xhr.status + '')[0] === '2') {
        let json = xhr.responseText

        try {
          json = JSON.parse(xhr.responseText)
        } catch (err) {
          // do nothing
        } finally {
          return resolve(json)
        }
      }

      let errMsg = xhr.responseText

      try {
        errMsg = JSON.parse(errMsg).message
      } catch (err) {
        // do nothing
      } finally {
        return reject(errMsg)
      }
    }

    xhr.send((method !== 'GET') && body)
  })
}

const installPlugin = Vue => {
  const getArgs = (obj = {}) => {
    if ('headers' in obj && ('params' in obj)) {
      return {
        headers: obj.headers,
        params: obj.params
      }
    }

    return {
      headers: {},
      params: obj
    }
  }

  Vue.prototype.$http = {
    get(url, args) {
      const { headers, params } = getArgs(args)
      return sendRequest(url, 'GET', headers, params)
    },
    post(url, args) {
      const { headers, params } = getArgs(args)
      return sendRequest(url, 'POST', headers, params)
    },
    put(url, args) {
      const { headers, params } = getArgs(args)
      return sendRequest(url, 'PUT', headers, params)
    },
    delete(url, args) {
      const { headers, params } = getArgs(args)
      return sendRequest(url, 'DELETE', headers, params)
    },
    patch(url, args) {
      const { headers, params } = getArgs(args)
      return sendRequest(url, 'PATCH', headers, params)
    },

    login(...args) {
      return tokenStorage.login(...args)
    },
    refresh(...args) {
      return tokenStorage.refresh(...args)
    },
    logout(...args) {
      return tokenStorage.logout(...args)
    }
  }
}

export default installPlugin