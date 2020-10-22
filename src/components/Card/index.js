import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Button } from 'antd'
import styles from 'components/Card/card.module.scss'

const Card = () => {
  const history = useHistory()
  return (
    <div className={styles.bg}>
      <Link to="/landing/foodmakers">Foodmakers</Link>
      <Link to="/landing/create_profile">Create Profile</Link>
      <Link to="/landing/create_experience">Create Experience</Link>
      <Link to="/landing/create_shop">Create Shop</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign up</Link>
      <Link to="/signupflow">Sign up flow</Link>
    </div>
  )
}

export default Card
