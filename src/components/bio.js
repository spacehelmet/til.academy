import React from "react"

import { rhythm } from "../utils/typography"

function Bio() {
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <p>
        Weekly updates on cool tech in a <em>Today I Learned</em> fashion
      </p>
    </div>
  )
}

export default Bio
