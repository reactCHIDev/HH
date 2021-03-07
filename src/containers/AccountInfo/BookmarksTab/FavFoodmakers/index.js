import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import FMCard from 'pages/FoodmakersExplore/components/FMCard'

import { Spin, Space } from 'antd'
import Button from 'components/Button'
import { push } from 'connected-react-router'

import { getFavMakersAC } from 'actions/bookmarks'
import { useDispatch, useSelector } from 'react-redux'

import styles from './favmakers.module.scss'

const FavMakers = () => {
  const [makersStartIndex, setMakersStartIndex] = useState(0)
  const [makersCollection, setMakersCollection] = useState([])

  const makersList = useSelector((state) => state.bookmarks.favFoodmakers)
  const isLoading = useSelector((state) => state.bookmarks.requesting)

  const dispatch = useDispatch()

  const pushRoute = (route) => dispatch(push(route))

  useEffect(() => {
    dispatch(getFavMakersAC(makersStartIndex, 12))
  }, [makersStartIndex])

  useEffect(() => {
    setMakersCollection((p) => p.concat(makersList.filter((e) => !p.find((el) => el.id === e.id))))
  }, [makersList])

  const moreMakers = () => {
    setMakersStartIndex((si) => si + 12)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.exp_section}>
          {makersCollection.map((maker) => maker?.coverPhoto && <FMCard item={maker} />)}
        </div>
        <div className={styles.btn_holder}>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}>
              <Space size="middle">
                <Spin size="large" />
              </Space>
            </div>
          ) : (
            <Button title="Explore more" dark onClick={moreMakers} />
          )}
        </div>
      </div>
    </div>
  )
}

FavMakers.propTypes = {}

export default FavMakers
