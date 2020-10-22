import React, { useState, useEffect, useRef } from 'react'
import { string, func, bool } from 'prop-types'
import cls from 'classnames'
import { createPortal } from 'react-dom'
import Crosshair from '../CloseCrossHair'
import styles from './modal.module.scss'

const Modal = (props) => {
  const { children, mode, classname, white, closeFunc } = props
  const [containerElement] = useState(document.getElementById('modal'))
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(mode === 'dark')
    document.body.style.overflow = 'hidden'
    return function() {
      document.body.style.overflow = 'unset'
      return null
    }
  }, [])

  const closeModal = () => {
    setIsDark(false)
    if (typeof closeFunc === 'function') setTimeout(() => closeFunc(false), 300)
  }

  const renderModal = () => (
    <div className={styles.universal_modal}>
      <div
        className={cls(
          styles.universal_modal__background,
          isDark ? styles.universal_modal__background_dark : '',
        )}
        onClick={closeModal}
      />
      <div
        className={cls(
          styles.universal_modal__container,
          isDark ? styles.universal_modal__container_opacity : '',
        )}
      >
        <div className={styles.close_button} onClick={closeModal}>
          <Crosshair white={white} />
        </div>
        {React.cloneElement(children, { closeModal })}
      </div>
    </div>
  )

  return createPortal(renderModal(), containerElement)
}

Modal.propTypes = {
  mode: string,
  classname: string,
  white: bool,
  closeFunc: func,
}

export default Modal
