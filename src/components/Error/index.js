import React from 'react'
import T from 'prop-types'
import Modal from 'components/UniversalModal'
import Error from './components/Error'

const ErrorPopUp = (props) => {
  const { msg, close } = props

  return (
    <Modal closeFunc={close} mode="dark">
      <Error message={msg} close={close} />
    </Modal>
  )
}

ErrorPopUp.propTypes = {
  msg: T.string.isRequired,
  close: T.func.isRequired,
}

export default ErrorPopUp
