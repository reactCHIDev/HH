import React, { Component } from 'react'
import Header from 'components/Header'

function wrapWithHeader(WrappedComponent) {
  class WithHeader extends Component {
    render() {
      return (
        <>
          <Header />
          <div>
            <WrappedComponent {...this.props} />
          </div>
        </>
      )
    }
  }

  return WithHeader
}

export default wrapWithHeader
