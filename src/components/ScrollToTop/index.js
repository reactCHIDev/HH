import React, { useEffect } from 'react'
import { withRouter } from 'react-router'

const ScrollToTop = ({ children, location: { pathname } }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
    // setTimeout(() => window.scrollTo(0, 1), 10);
  }, [pathname])

  return children || null
}

export default withRouter(ScrollToTop)
