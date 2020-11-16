import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Button } from 'antd'
import styles from 'components/Card/card.module.scss'

const Card = () => {
  const history = useHistory()
  return (
    <div className={styles.bg}>
      <Link to="/product_page" style={{ color: 'grey' }}>
        Product Page
      </Link>
      <Link to="/foodmaker_page" style={{ color: 'grey' }}>
        Foodmaker Page
      </Link>
      <Link to="/product_page" style={{ color: 'grey' }}>
        Product Page
      </Link>
      <Link to="/addproduct/0" style={{ color: 'grey' }}>
        Add Product
      </Link>
      <Link to="/settings" style={{ color: 'grey' }}>
        Account Settings
      </Link>
      <Link to="/profile" style={{ color: 'grey' }}>
        Profile / Listings
      </Link>
      <hr style={{ width: 250, color: 'grey' }} />
      <Link to="/signupflow">Sign up flow</Link>
      <hr style={{ width: 250, color: 'grey' }} />
      <Link to="/landing/foodmakers">Foodmakers</Link>
      <Link to="/landing/create_profile">Create Profile</Link>
      <Link to="/landing/create_experience">Create Experience</Link>
      <Link to="/landing/create_shop">Create Shop</Link>
      <hr style={{ width: 250, color: 'grey' }} />
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign up</Link>
    </div>
  )
}

export default Card
