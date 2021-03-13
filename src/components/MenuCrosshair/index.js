/* eslint-disable react/prop-types */
import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import s from './menucrosshair.module.scss'

const MenuCrosshair = ({ visible, dark }) => {
  return (
    <div className={s.container}>
      <div
        className={cls(visible ? s.nav__opener_opened : s.nav__opener, dark ? s.dark_opener : ' ')}
      >
        <span className={s.upper} />
        <span className={s.middle} />
        <span className={s.lower} />
      </div>
    </div>
  )
}

MenuCrosshair.propTypes = {
  visible: T.bool.isRequired,
}

export default MenuCrosshair
