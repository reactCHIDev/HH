import React, { useState } from 'react'
import T from 'prop-types'
import s from './menucrosshair.module.scss'

const MenuCrosshair = ({ data, func }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const switchNav = (e) => {
    if (func) func(!isMenuVisible)
    setIsMenuVisible((isMenuVisible) => {
      // document.body.style.position = isMenuVisible ? 'static' : 'fixed'
      // document.body.style.overflowY = isMenuVisible ? 'visible' : 'scroll'
      return !isMenuVisible
    })
  }

  return (
    <div className={s.container}>
      <a
        href="javascript:void(0)"
        className={`${isMenuVisible ? s.nav__opener_opened : s.nav__opener}`}
        onClick={switchNav}
      >
        <span className={s.upper} />
        <span className={s.middle} />
        <span className={s.lower} />
      </a>
    </div>
  )
}

MenuCrosshair.propTypes = {
  data: T.string,
  func: T.func,
}

export default MenuCrosshair
