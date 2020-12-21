/* eslint-disable react/prop-types */
import React from 'react'
import styles from '../../product.module.scss'

const data = [
  { type: 'STANDART', price: 20, amountToFree: 200 },
  { type: 'EXPRESS', price: 40, amountToFree: 400 },
  { type: 'SUPER', price: 60, amountToFree: 500 },
]

function ProductSummary({ shop }) {
  const { price } = shop

  const [curVal, setCurValue] = React.useState(data[0])
  const [dataToShow, setDataToShow] = React.useState()
  const [isDataShown, setIsDataShown] = React.useState(false)

  React.useEffect(() => {
    setDataToShow(data.filter((e) => e.type !== curVal.type))
  }, [curVal])

  return (
    <div className={styles.informationWrapper}>
      <div className={styles.orderDetails}>
        <div className={styles.textWrapper}>
          <p className={styles.regularText} style={{ marginBottom: '10px' }}>
            Subtotal with delivery:{' '}
            <span className={styles.mainAmount}>
              {`$ ${curVal.amountToFree >= price ? price + curVal.price : price}.`}
            </span>
            <span className={styles.secondaryAmount}>00</span>
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
              <span className={styles.deliveryType}>{`${curVal.type} $${curVal.price}`}</span>
              <span>{'>'}</span>
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
                    setCurValue(item)
                    setIsDataShown(false)
                  }}
                  key={item.type}
                  style={{
                    height: '30px',
                  }}
                >
                  <p className={styles.regularText}>
                    Delivery:{' '}
                    <span className={styles.deliveryType}>{`${item.type} ${item.price}`}</span>
                    <span>{'>'}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div className={styles.textWrapper}>
          <p className={styles.regularText}>
            {curVal.amountToFree - price > 0 ? (
              <>
                <span className={styles.freeShipping}>
                  {`$${curVal.amountToFree - price} more `}
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
                  (price * 100) / curVal.amountToFree > 100
                    ? 100
                    : (price * 100) / curVal.amountToFree
                }%`,
                transition: 'width linear 0.2s',
              }}
            />
          </div>
        </div>
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
