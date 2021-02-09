/* eslint-disable react/prop-types */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cls from 'classnames'
import { changeDeliveryType } from 'actions/cart'
import styles from '../../product.module.scss'

function ProductSummary({ shop, title }) {
  const dispatch = useDispatch()
  const { price } = shop
  const deliveryPrice = useSelector((state) => state.cart.shopsData[title].delivery.price)

  const delTypes = useSelector((state) => state.cart.shopsData[title].methods)
  const curDelType = useSelector((state) => state.cart.shopsData[title].delivery)

  const [curVal, setCurValue] = React.useState(
    delTypes.filter((e) => e.type === curDelType.type)[0],
  )

  const [dataToShow, setDataToShow] = React.useState()
  const [isDataShown, setIsDataShown] = React.useState(false)
  const [isDiscount, setIsDiscount] = React.useState(false)
  const [freeDelPrice, setFreeDelPrice] = React.useState(
    delTypes.filter((e) => e.type === 'FreeDelivery')[0]?.freeDeliveryOver,
  )
  const [freeDelInfoShown, setFreeDelInfoShown] = React.useState(false)

  const changeType = (type, delPrice) => {
    dispatch(changeDeliveryType({ type, price: delPrice, shop: title }))
  }

  React.useEffect(() => {
    setDataToShow(delTypes.filter((e) => e.type !== curVal.type))
  }, [curVal])

  const typePrettier = (type) => {
    if (type === 'Express') return 'Express'
    if (type === 'Standard') return 'Standard'
    if (type === 'FreeDelivery') return 'Free'
    if (type === 'FreePickUp') return 'Pick up'
    return null
  }

  React.useEffect(() => {
    if (curDelType.type === 'FreeDelivery' && price < curVal.freeDeliveryOver) {
      const newT = delTypes.filter((e) => e.type !== 'FreeDelivery')[0]
      setCurValue(newT)
      changeType(newT.type, newT.delPrice)
    }
    if (price >= curVal.freeDeliveryOver && !isDiscount) {
      setIsDiscount(true)
      dispatch(changeDeliveryType({ type: curVal.type, price: 0, shop: title }))
    }
    if (price < curVal.freeDeliveryOver && isDiscount) {
      setIsDiscount(false)
      dispatch(changeDeliveryType({ type: curVal.type, price: curVal.delPrice, shop: title }))
    }
  }, [price])

  const priceToShow = (isFirstPart, sum = 0) => {
    const curPrice = sum.toFixed(2)
    if (isFirstPart) {
      return curPrice.substring(0, curPrice.indexOf('.'))
    }
    return curPrice.substring(curPrice.lastIndexOf('.') + 1)
  }

  const freeDelHandler = () => {
    setFreeDelInfoShown(true)
    setTimeout(() => {
      setFreeDelInfoShown(false)
    }, 3000)
  }

  return (
    <div className={styles.informationWrapper}>
      <div className={styles.orderDetails}>
        <div className={styles.textWrapper}>
          <p className={styles.regularText} style={{ marginBottom: '10px' }}>
            Subtotal with delivery:{' '}
            <span className={styles.mainAmount}>
              {`$ ${
                curVal.freeDeliveryOver > price
                  ? priceToShow(true, price + curVal.delPrice)
                  : priceToShow(true, price)
              }.`}
            </span>
            <span className={styles.secondaryAmount}>
              {curVal.freeDeliveryOver > price
                ? priceToShow(false, price + curVal.delPrice)
                : priceToShow(false, price)}
            </span>
          </p>
        </div>
        {dataToShow ? (
          <div
            className={styles.textWrapper}
            onMouseEnter={() => setIsDataShown(true)}
            onMouseLeave={() => setIsDataShown(false)}
          >
            <p className={styles.regularText}>
              Delivery:{' '}
              {curVal.delPrice ? (
                <>
                  <span className={styles.deliveryType}>
                    {`${typePrettier(curVal.type)} $${curVal.delPrice}`}
                  </span>
                  <span>{'>'}</span>
                </>
              ) : (
                <>
                  <span className={styles.deliveryType}>{typePrettier(curVal.type)}</span>
                </>
              )}
            </p>
            <div
              style={
                isDataShown
                  ? {
                      position: 'absolute',
                      background: 'white',
                    }
                  : {
                      display: 'none',
                    }
              }
              className={styles.textWrapper}
            >
              {dataToShow.map((item) => (
                <div
                  onClick={() => {
                    if (item.type === 'FreeDelivery' && item.freeDeliveryOver > price) {
                      freeDelHandler()
                    } else {
                      setCurValue(item)
                      setIsDataShown(false)
                      changeType(item.type, item.delPrice)
                    }
                  }}
                  key={item.type}
                  style={{
                    height: '30px',
                  }}
                >
                  <p className={styles.regularText}>
                    Delivery:{' '}
                    {item.delPrice ? (
                      <>
                        <span className={styles.deliveryType}>
                          {`${typePrettier(item.type)} $${item.delPrice}`}
                        </span>
                        <span>{'>'}</span>
                      </>
                    ) : (
                      <>
                        <span className={styles.deliveryType}>{`${typePrettier(item.type)}`}</span>
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {freeDelInfoShown ? (
          <div className={cls(styles.textWrapper, styles.progress)}>
            <p className={styles.regularText}>
              <span className={styles.freeShipping}>
                {`$${(freeDelPrice - price).toFixed(2)} more `}
              </span>
              <span>for free delivery type</span>
            </p>
          </div>
        ) : (deliveryPrice || isDiscount) && curDelType.type !== 'FreeDelivery' ? (
          <div className={cls(styles.textWrapper, styles.progress)}>
            <p className={styles.regularText}>
              {curVal.freeDeliveryOver - price > 0 ? (
                <>
                  <span className={styles.freeShipping}>
                    {`$${(curVal.freeDeliveryOver - price).toFixed(2)} more `}
                  </span>
                  <span>for free shipping</span>
                </>
              ) : (
                <p>You get a free shipping</p>
              )}
            </p>
            <div className={styles.amountLoader}>
              <div
                className={styles.amountLoaderWidth}
                style={{
                  width: `${
                    (price * 100) / curVal.freeDeliveryOver > 100
                      ? 100
                      : (price * 100) / curVal.freeDeliveryOver
                  }%`,
                  transition: 'width linear 0.2s',
                }}
              />
            </div>
          </div>
        ) : null}
      </div>
      <div>
        <p className={styles.policyText}>
          Cancellation policy <span>›</span>
        </p>
      </div>
    </div>
  )
}

export default ProductSummary
