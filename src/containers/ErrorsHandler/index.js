import React from 'react'

export default function Catch(component, errorHandler) {
  return class extends React.Component {
    constructor() {
      super()
      this.state = {
        error: undefined,
      }
    }

    static getDerivedStateFromError(error) {
      return { error }
    }

    componentDidCatch(error, info) {
      if (errorHandler) {
        errorHandler(error, info)
      }
    }

    reset = () => {
      this.setState({ error: undefined })
    }

    render() {
      const { error } = this.state
      return component(this.props, error, this.reset)
    }
  }
}
