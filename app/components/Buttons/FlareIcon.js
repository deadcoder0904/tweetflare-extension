import React from 'react'

const flareIcon = props => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      fill={props.color}
      stroke={props.color}
      viewBox="0 0 95 74"
    >
      <path d="M56 28C45 21 36 10 30 0c-4 6-5 17-4 23-8-6-15-13-19-19-6 12-3 26 3 34 4 6 11 10 19 14-8 8-17 13-28 14 9 5 17 6 24 6 13 0 20-5 19-11 0-3-3-7-9-10l-4-2C12 41 5 28 8 11l14 13c9 8 20 13 26 15 5 1 13 3 20 3 12-1 19-9 26-10-12-13-26-12-38-4zM33 54c4 2 7 5 8 8l-2 4c-7 4-20 3-27 1 8-2 14-7 21-13zm14-20l-16-8c-2-6-2-12 0-18 5 7 12 16 21 22l-5 4zm18 4l-14-2c12-10 25-15 36-5-5 1-10 7-22 7z" />
    </svg>
  )
}

export default flareIcon
