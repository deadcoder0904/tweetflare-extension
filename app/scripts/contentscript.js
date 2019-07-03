/* global chrome, browser */

function injectScript(path) {
  const node = document.getElementsByTagName('body')[0]
  const script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.setAttribute('async', true)
  script.setAttribute('src', browser.extension.getURL(path))
  node.appendChild(script)
}

document.addEventListener('DOMContentLoaded', injectScript('scripts/inject.js'))

window.addEventListener('message', event => {
  if (event.data.flare) {
    // window.open(browser.extension.getURL('pages/popup.html'))
    console.log(event.data)
    browser.runtime.sendMessage(event.data)
  } else {
    return true
  }
})
