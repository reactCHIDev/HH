import React from 'react'
import T from 'prop-types'
import s from './menucrosshair.module.scss'

const MenuCrosshair = ({ visible }) => {
  return (
    <div className={s.container}>
      <div className={`${visible ? s.nav__opener_opened : s.nav__opener}`}>
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
