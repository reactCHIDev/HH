/* eslint-disable react/prop-types */
import React from 'react'
import { useDispatch } from 'react-redux'
import del from 'assets/icons/svg/del.svg'
import { incProductAmount, decProductAmount, deleteItemFromProducts } from 'actions/cart'
import styles from './table.module.scss'

function TableRow({ item }) {
  const dispatch = useDispatch()

  const incAmount = () => {
    dispatch(incProductAmount({ id: item.id, shop: item.shop.title, price: item.price }))
  }

  const decAmount = () => {
    dispatch(decProductAmount({ id: item.id, shop: item.shop.title, price: item.price }))
  }

  const deleteProduct = () => {
    dispatch(
      deleteItemFromProducts({
        title: item.title,
        shopTitle: item.shop.title,
        price: item.price * item.total,
        id: item.id,
      }),
    )
  }

  return (
    <div key={item.id} className={styles.tableRow}>
      <div className={styles.upperrow}>
        <div className={styles.firstColumn}>
          <div>
            <div
              style={{ backgroundImage: `url('${item.coverPhoto}')` }}
              className={styles.productImage}
            >
              {item.hitmark === 'Hit' ? <div className={styles.hitProduct}>HIT</div> : null}
            </div>
          </div>
          <div className={styles.upper_subrow}>
            <div>
              <div className={styles.productName}>{item.title}</div>
              <div className={styles.productCode}>#{item.id}</div>
            </div>
            <div className={styles.qty_wrapper}>
              <div className={styles.selected_value}>Selected value:</div>
              <div className={styles.order_qty}>
                {`${item.parameters[0].volume}  ${item.parameters[0].measure || null}`}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.quanityContainer}>
          <div className={styles.quanityWrapper}>
            <div
              className={styles.sign}
              onClick={() => {
                if (item.total < 2) return
                decAmount()
              }}
            >
              -
            </div>
            <div className={styles.quantity}>{item.total}</div>
            <div
              className={styles.sign}
              onClick={() => {
                if (item.total === item.quantity) return
                incAmount()
              }}
            >
              +
            </div>
          </div>
        </div>
      </div>
      <div className={styles.lowerrow}>
        <div className={styles.gray_wrapper}>
          <div className={styles.price_title}>Price:</div>
          <div className={styles.price}>${item.price.toFixed(2)}</div>
          <div className={styles.total_title}>Total:</div>
          <div className={styles.total}>${item.totalPrice.toFixed(2)}</div>
        </div>
        <div className={styles.delete_container}>
          <div className={styles.deleteIcon} onClick={() => deleteProduct()}>
            <img src={del} alt="del" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableRow
