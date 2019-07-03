import React from 'react'
import { render } from 'react-dom'

import App from '../components/Popup/App'

const params = new URLSearchParams(window.location.search)
const user = params.get('user')
const source = params.get('source')
const tweetId = params.get('tweetId')

// chrome.runtime.getBackgroundPage(function(background) {
//   console.log(background)
//   // window.close() // Close dialog
// })

render(
  <App user={user} source={source} tweetId={tweetId} />,
  document.getElementById('flare-popup')
)
