/* REACT */
import React, { useEffect } from 'react'
import { node, shape, string, func, bool } from 'prop-types'

/* MODULES */
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

/* CUSTOM MODULES */
import setConnectionState from 'actions/connection'
import { clearChat } from 'actions/chat'
import OfflinePage from './OfflinePage'

function ConnectionProvider({
  location,
  children,
  setConnectionState: setState,
  isConnected,
  clearChat,
}) {
  const handleConnectionChange = () => {
    setState(navigator.onLine)
  }

  useEffect(() => {
    window.addEventListener('online', handleConnectionChange)
    // window.addEventListener('offline', handleConnectionChange)

    return () => {
      window.removeEventListener('online', handleConnectionChange)
      // window.removeEventListener('offline', handleConnectionChange)
    }
  }, [])

  useEffect(() => {
    if (!navigator.onLine) {
      setState(false)
    }
    if (location.pathname !== '/messages') clearChat()
  }, [location.pathname])

  return isConnected ? children : <OfflinePage />
}

ConnectionProvider.propTypes = {
  children: node,
  location: shape({
    hash: string,
    pathname: string,
  }),
  setConnectionState: func,
  isConnected: bool,
}

export default connect(
  ({ connection }) => ({
    isConnected: connection.isConnected,
  }),
  { setConnectionState, clearChat },
)(withRouter(ConnectionProvider))
