import React from 'react'
import cls from 'classnames'
import { bool } from 'prop-types'
import crosshair from './close.svg'
import crosshairWhite from './close-white.svg'

const Crosshair = ({ white }) => (
  <div className={cls('crosshair-container', { 'crosshair-container__white': white })}>
    <img src={white ? crosshairWhite : crosshair} alt="close" />
  </div>
)

Crosshair.propTypes = {
  white: bool,
}

export default Crosshair
