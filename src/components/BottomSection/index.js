import React from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './bottom.module.scss'

const BottomSection = ({ role }) => {
  return (
    <section className={styles.bottom_sec}>
      <div className={styles.joincard}>
        <p>Join a global community of food lovers and food makers</p>
        <Link to={role == 'FOODMAKER' ? '/exp_dashboard/listings' : '/signupflow'}>
          <button type="button">Join now!</button>
        </Link>
      </div>
    </section>
  )
}

BottomSection.propTypes = {
  role: T.string,
}

export default connect(
  ({ account: { role } }) => ({
    role,
  }),
  null,
)(BottomSection)
