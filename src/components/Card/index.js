import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd'
import styles from 'components/Card/card.module.scss'

const Card = () => {
  const history = useHistory()
  return (
    <div className={styles.bg}>
      <Button
        onClick={() => history.push('/login')}
        style={{
          color: 'black',
          fontSize: '10px',
          letterSpacing: 2,
        }}
      >
        Login
      </Button>
    </div>
  )
}

export default Card
