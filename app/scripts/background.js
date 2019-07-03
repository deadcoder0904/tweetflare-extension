/* global browser */

// browser.runtime.onInstalled.addListener(details => {
//   console.log('previousVersion', details.previousVersion)
// })

browser.runtime.onMessage.addListener(async req => {
  const tweet = `source=${req.source}&tweetId=${JSON.parse(req.flare)}&user=${
    req.user
  }`
  // browser.windows.create({
  //   url: `${browser.extension.getURL('pages/popup.html')}?${encodeURI(tweet)}`,
  //   type: 'popup',
  //   width: 400,
  //   height: 600,
  //   focused: true,
  //   setSelfAsOpener: true
  // })
})
function logURL(requestDetails) {
  if (
    requestDetails.method === 'GET' &&
    requestDetails.url.includes('api.twitter.com/2/timeline/conversation')
  ) {
    console.log(requestDetails.requestId)
    let filter = browser.webRequest.filterResponseData(requestDetails.requestId)
    let decoder = new TextDecoder('utf-8')
    let encoder = new TextEncoder()

    filter.ondata = event => {
      let str = decoder.decode(event.data, { stream: true })
      // Just change any instance of Example in the HTTP response
      // to WebExtension Example.
      // str = str.replace(/Example/g, 'WebExtension Example')
      // filter.write(encoder.encode(str))
      // filter.disconnect()
      console.log(str)
    }
  }
}

browser.webRequest.onCompleted.addListener(logURL, { urls: ['<all_urls>'] })
