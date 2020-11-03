import React from 'react'
import T from 'prop-types'
import ChkBox from 'components/ChkBox'
import CollapsedBlock from './components/CollapsedBlock'
import styles from './listing.module.scss'
import './listing.less'

const filters = [
  { food: ['dry Goods', 'Desserts', 'snaks'] },
  { drinks: ['rum', 'vine', 'beer', 'whiskey'] },
  { 'kitchen & dining': ['pasta', 'soup'] },
  { "food maker's set": ['launch', 'dinner'] },
]

const colors = [
  '#fff3f3',
  '#fff7ef',
  '#fdfeee',
  '#eeefff',
  '#fff3f3',
  '#fff7ef',
  '#fdfeee',
  '#eeefff',
]

const Listings = (props) => {
  const {} = props

  return (
    <div className={styles.container}>
      {filters.map((el, i) => (
        <CollapsedBlock key={Object.keys(el)[0]} headerText={Object.keys(el)[0]} color={colors[i]}>
          <div className={styles.panel_content}>
            {Object.values(el)[0].map((chk) => (
              <ChkBox key={chk} labelText={chk} />
            ))}
          </div>
        </CollapsedBlock>
      ))}
    </div>
  )
}

Listings.propTypes = {}

export default Listings
