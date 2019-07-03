/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'

import FlareIcon from './FlareIcon'

const flareBtn = ({ clicked, tweetId }) => {
  const saveStyle = {
    margin: 0,
    padding: 0,
    position: 'relative',
    bottom: '5px',
    left: '3px',
    fontFamily: 'inherit'
  }

  const divStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  }

  const btnStyle = {
    color: '#657786',
    display: 'inline-block',
    fontSize: '12px',
    fontWeight: 'bold',
    lineHeight: '1',
    marginLeft: '6px',
    position: 'relative',
    verticalAlign: 'text-bottom',
    cursor: 'pointer',
    fontFamily: `system-ui, -apple-system, BlinkMacSystemFont, 
      "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif`
  }

  return (
    <div
      aria-label="Flare Tweet"
      role="button"
      data-focusable="true"
      tabIndex="0"
      onClick={clicked}
      style={divStyle}
    >
      <div className="flare-btn" style={btnStyle} data-tweet-id={tweetId}>
        <span role="presentation" className="flare-icon">
          <FlareIcon size="23" color="#FF6D70" />
        </span>

        <span className="flare-label" style={saveStyle}>
          <span>Flare</span>
        </span>
      </div>
    </div>
  )
}

export default flareBtn
