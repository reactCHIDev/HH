import React, { useState, useEffect } from 'react'
import ProdCard from 'components/ProductCard'

import { Spin, Space } from 'antd'
import Button from 'components/Button'
import { push } from 'connected-react-router'

import { getFavProductsAC } from 'actions/bookmarks'
import { useDispatch, useSelector } from 'react-redux'

import styles from './favproducts.module.scss'

const FavProducts = () => {
  const [productsStartIndex, setProductsStartIndex] = useState(0)
  const [productsCollection, setProductsCollection] = useState([])

  const productsList = useSelector((state) => state.bookmarks.favProducts)
  const isLoading = useSelector((state) => state.bookmarks.requesting)

  const dispatch = useDispatch()

  const pushRoute = (route) => dispatch(push(route))

  useEffect(() => {
    dispatch(getFavProductsAC(productsStartIndex, 12))
    // eslint-disable-next-line
  }, [productsStartIndex])

  useEffect(() => {
    setProductsCollection((p) =>
      p.concat(productsList.filter((e) => !p.find((el) => el.id === e.id))),
    )
  }, [productsList])

  const moreProducts = () => {
    setProductsStartIndex((si) => si + 12)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.exp_section}>
          {productsCollection.map(
            (product) =>
              product?.coverPhoto && (
                <ProdCard
                  key={product.id}
                  id={product.id}
                  pathname="/product"
                  pushRoute={pushRoute}
                  photo={product.coverPhoto}
                  tags={product.productTags.map((t) => t.tagName)}
                  name={product.title}
                  price={product.price}
                  rating={product.rating}
                  rateCount={product.reviews?.length}
                  isShowCart
                  product={product}
                />
              ),
          )}
        </div>
        <div className={styles.btn_holder}>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}>
              <Space size="middle">
                <Spin size="large" />
              </Space>
            </div>
          ) : (
            <Button title="Explore more" dark onClick={moreProducts} />
          )}
        </div>
      </div>
    </div>
  )
}

FavProducts.propTypes = {}

export default FavProducts
