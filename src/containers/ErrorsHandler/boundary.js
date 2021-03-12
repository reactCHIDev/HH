import React from 'react'
import Catch from './index'
import ErrorScreen from './ErrorScreen/ErrorScreen'

const MyErrorBoundary = Catch(function MyErrorBoundary(props, error, reset) {
  if (error) {
    return <ErrorScreen error={error.message} reset={reset} />
    // eslint-disable-next-line no-else-return
  } else {
    const { children } = props
    return <>{children}</>
  }
})

export default MyErrorBoundary
