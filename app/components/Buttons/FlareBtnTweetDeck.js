import React from 'react'

import FlareIcon from './FlareIcon'

const flareBtnTweetDeck = ({ tweetId, clicked }) => {
  return (
    <a
      className="js-show-tip tweet-action position-rel"
      href="#"
      rel="flare"
      title="Flare"
      data-tweet-id={tweetId}
      onClick={clicked}
    >
      <FlareIcon
        className="icon txt-center pull-left"
        size="18"
        color="#FF6D70"
      />
      <span className="is-vishidden"> Flare </span>
    </a>
  )
}

export default flareBtnTweetDeck
