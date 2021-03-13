import React, { useState, useEffect } from 'react'
import ShopCard from 'components/ShopCard'

import { Spin, Space } from 'antd'
import Button from 'components/Button'

import { getFavShopsAC } from 'actions/bookmarks'
import { useDispatch, useSelector } from 'react-redux'

import styles from './favshops.module.scss'

const FavShops = () => {
  const [shopsStartIndex, setShopsStartIndex] = useState(0)
  const [shopsCollection, setShopsCollection] = useState([])

  const shopsList = useSelector((state) => state.bookmarks.favShops)
  const isLoading = useSelector((state) => state.bookmarks.requesting)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFavShopsAC(shopsStartIndex, 12))
    // eslint-disable-next-line
  }, [shopsStartIndex])

  useEffect(() => {
    setShopsCollection((p) => p.concat(shopsList.filter((e) => !p.find((el) => el.id === e.id))))
  }, [shopsList])

  const moreShops = () => {
    setShopsStartIndex((si) => si + 12)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.exp_section}>
          {shopsCollection.map((shop) => (
            <ShopCard
              key={shop.id}
              photo={shop.coverPhoto}
              tags={shop.tags}
              name={shop.title}
              price={0}
              rating={shop.rating}
              rateCount={shop.votes}
              pathname={shop.shopUrl}
              id={shop.id}
              isFavorite={shop.isFavorite}
            />
          ))}
        </div>
        <div className={styles.btn_holder}>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}>
              <Space size="middle">
                <Spin size="large" />
              </Space>
            </div>
          ) : (
            <Button title="Explore more" dark onClick={moreShops} />
          )}
        </div>
      </div>
    </div>
  )
}

FavShops.propTypes = {}

export default FavShops
