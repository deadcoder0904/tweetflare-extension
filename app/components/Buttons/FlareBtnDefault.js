import React from 'react'

import FlareIcon from './FlareIcon'

const flareBtnDefault = ({ tweetId, clicked }) => {
  const saveStyle = {
    margin: 0,
    padding: 0,
    position: 'relative',
    bottom: '5px',
    left: '3px'
  }

  const twitterClasses = `
    ProfileTweet-actionButton
    ProfileTweet-action--flare
    u-linkClean
    js-actionButton
    js-actionFlare
    flare-btn`

  return (
    <button
      className={twitterClasses}
      type="button"
      data-tweet-id={tweetId}
      onClick={clicked}
    >
      <div className="IconContainer js-tooltip" data-original-title="Flare">
        <span role="presentation" className="Icon Icon--medium">
          <FlareIcon size="18" color="#FF6D70" />
        </span>
        <span className="ProfileTweet-actionCount" style={saveStyle}>
          <span
            className="ProfileTweet-actionCountForPresentation"
            aria-hidden="true"
          >
            Flare
          </span>
        </span>
        <span className="u-hiddenVisually">Flare</span>
      </div>
    </button>
  )
}

export default flareBtnDefault
