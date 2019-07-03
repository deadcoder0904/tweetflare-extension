import React from 'react'
import { render } from 'react-dom'

import FlareBtnDefault from '../components/Buttons/FlareBtnDefault'
import FlareBtnNew from '../components/Buttons/FlareBtnNew'
import FlareBtnTweetDeck from '../components/Buttons/FlareBtnTweetDeck'

let platform
const config = {
  tweetFlareBtnDiv: 'flare-div',
  tweetFlareBtnClass: 'flare-btn'
}

const findReact = el => {
  for (const key in el) {
    if (key.startsWith('__reactInternalInstance$')) {
      const fiberNode = el[key]
      return fiberNode.return.stateNode
    }
  }
  return null
}

const checkPlatform = () => {
  const currentUrl = window.location.toString()

  if (currentUrl.includes('tweetdeck')) {
    platform = 'tweetdeck'
  } else if (document.getElementById('react-root')) {
    platform = 'new'
  } else {
    platform = 'default'
  }
}

const isTweetDeck = () => {
  return platform === 'tweetdeck'
}

const isTwitterDefault = () => {
  return platform === 'default'
}

const isTwitterNew = () => {
  return platform === 'new'
}

const getUser = () => {
  if (platform === 'new') {
    /*
     * Twitter (react) injects a script after the div#react-root
     * with the "INITIAL_STATE" that contains the username
     * from the user logged in
     */
    const reactRoot = document.getElementById('react-root')
    const reactScript = reactRoot.nextElementSibling.innerHTML

    /*
     * Besides the INITIAL_STATE, it injects other information that
     * isn't needed for this extension, so we parse it
     */
    let parsedScript = reactScript.replace('window.__INITIAL_STATE__ = ', '')
    let endString = parsedScript.substring(
      parsedScript.indexOf('window.__META_DATA__ ')
    )
    parsedScript = parsedScript.replace(endString, '')
    parsedScript = parsedScript.substring(0, parsedScript.length - 2)

    /*
     * After getting only the INITIAL_STATE object, transform
     * it in json to access teh session.user.screen_name
     */
    parsedScript = JSON.parse(parsedScript)
    const user = parsedScript.session.user.screen_name
    return user
  }

  if (platform === 'default') {
    /*
     * Twitter (default) creates a hidden input
     * containing the initial state of the application
     * as it's value. So we get it and transform in JSON
     */
    const initData = document.getElementById('init-data')
    const parsedUser = JSON.parse(initData.value)
    const user = parsedUser.screenName
    return user
  }

  if (platform === 'tweetdeck') {
    /*
     * TweetDeck doesn't inject initial state, but stores the logged user info
     * in the .js-account-summary div. Inside it, we have a link with
     * a rel of "user" and a data-user-name with the handler as it's value
     */
    const accountDiv = document.querySelector('.js-account-summary')
    const userDiv = accountDiv.querySelector('a[rel=user]')
    const user = userDiv.dataset.userName
    return user
  }
}

const setPlatformConfig = () => {
  switch (platform) {
    case 'new':
      config.timelineQuerySelector = 'article'
      config.actionsDivSelector = 'div[role=group]'
      config.flareBtnCustomClasses = [config.tweetFlareBtnDiv]
      break
    case 'tweetdeck':
      config.timelineQuerySelector = '.js-tweet'
      config.actionsDivSelector = '.js-tweet-actions.tweet-actions'
      config.detailsDivSelector = '.tweet-detail-actions'
      config.flareBtnCustomClasses = [
        'tweet-action-item',
        'tweet-action--flare',
        'pull-left',
        'margin-r--10',
        config.tweetFlareBtnDiv
      ]
      config.flareBtnCustomClassesDetail = [
        'tweet-detail-action-item',
        'tweet-detail-action--flare',
        config.tweetFlareBtnDiv
      ]
      break
    default:
      config.timelineQuerySelector = '.tweet'
      config.actionsDivSelector = '.ProfileTweet-actionList.js-actions'
      config.flareBtnCustomClasses = [
        'ProfileTweet-action',
        'ProfileTweet-action--flare',
        config.tweetFlareBtnDiv
      ]
      break
  }
}

const isTweetDeckDetails = tweet => {
  return platform === 'tweetdeck' && tweet.className.includes('tweet-detail')
}

const renderBtnForPlatform = (tweetId, flareDiv) => {
  let btn
  // Render Flare btn
  if (platform === 'new') {
    btn = (
      <FlareBtnNew tweetId={tweetId} clicked={() => handleBtnClick(tweetId)} />
    )
  } else if (platform === 'default') {
    btn = (
      <FlareBtnDefault
        tweetId={tweetId}
        clicked={() => handleBtnClick(tweetId)}
      />
    )
  } else if (platform === 'tweetdeck') {
    btn = (
      <FlareBtnTweetDeck
        tweetId={tweetId}
        clicked={() => handleBtnClick(tweetId)}
      />
    )
  }
  render(btn, flareDiv)
}

const checkFlareBtnExists = tweet => {
  return tweet.querySelector(`.${config.tweetFlareBtnDiv}`)
}

const handleBtnClick = async tweetId => {
  window.postMessage({
    source: platform,
    flare: JSON.stringify(tweetId),
    user: getUser()
  })
}

/*
 * Main function that creates
 * the btn and append to the tweet
 */
const createAndAppendBtn = tweet => {
  let tweetId
  let reactComponent
  let reactState

  // Check if already exists a Flare btn
  const flareButton = checkFlareBtnExists(tweet)

  // Add new btn if doesn't exists
  if (!flareButton) {
    /*
     * Get the "Actions" div from the tweet
     * "actions" is the div after the tweet content with all buttons
     */
    let actionsDiv = tweet.querySelector(config.actionsDivSelector)

    if (platform === 'tweetdeck') {
      actionsDiv = tweet.querySelector(config.actionsDivSelector)
      if (isTweetDeckDetails(tweet)) {
        actionsDiv = tweet.querySelector(config.detailsDivSelector)
      }
    }

    // Check if the div exists and has a child node
    if (actionsDiv && actionsDiv.childNodes) {
      // Get a child node for clonning to the Flare Wrapper
      let actionBtn = actionsDiv.childNodes[1]

      if (platform === 'new') {
        actionsDiv.style.cssText = 'max-width: 100%;'
        actionBtn = actionsDiv.childNodes[3]
        reactComponent = tweet.parentElement.parentElement.parentElement
        reactState = findReact(reactComponent)
      }

      const flareDiv = actionBtn.cloneNode()

      // Add flare attributes
      if (platform === 'default') {
        flareDiv.className = ''
        flareDiv.style.cssText = 'float: right;'
        tweetId = tweet.dataset.itemId
      }

      flareDiv.classList.add(...config.flareBtnCustomClasses)

      if (platform === 'tweetdeck') {
        let parent = tweet.parentElement.parentElement
        tweetId = parent.dataset.key

        if (tweet.className.includes('tweet-detail')) {
          flareDiv.className = ''
          flareDiv.classList.add(...config.flareBtnCustomClassesDetail)
          flareDiv.style.cssText = 'float: right; margin-top: 8px;'
        }
      }

      if (platform === 'new') {
        tweetId = reactState.props.id
      }

      // Append the Flare Wrapper to the actions div
      if (actionBtn) {
        actionsDiv.append(flareDiv)

        renderBtnForPlatform(tweetId, flareDiv)
      }
    }
  }
}

/*
 * Loop for each tweet in timeline to
 * append the btn, based on the platform
 */
const addBtnToTweets = () => {
  const tweetsTimeline = document.querySelectorAll(config.timelineQuerySelector)

  for (const tweet of tweetsTimeline) {
    createAndAppendBtn(tweet)
  }
}

/*
 *  Extension Setup
 */
function initExtension() {
  /*
   * For future reference: Night Mode
   * default: document.cookie.includes('night_mode=1')
   */

  /*
   * Check the platform
   *
   * Twitter has 3 implementations:
   * - twitter.com (old)
   * - mobile.twitter.com / twitter.com (new) - React
   * - tweetdeck.twitter.com
   */
  checkPlatform()
  setPlatformConfig()

  /*
   * Every second, check the timeline to insert
   * TweetFlare buttons
   */
  // eslint-disable-next-line
  setInterval(function() {
    addBtnToTweets()
  }, 1000)
}

// Load Extension when DOM's ready
document.addEventListener('DOMContentLoaded', initExtension())
