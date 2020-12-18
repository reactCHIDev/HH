/* eslint-disable react/prop-types */
import React from 'react'
import { useDispatch } from 'react-redux'
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
    dispatch(deleteItemFromProducts({ title: item.title, shopTitle: item.shop.title }))
  }
  return (
    <tr key={item.id} className={styles.tableRow}>
      <td>
        <div className={styles.firstColumn}>
          <div>
            <div style={{ background: item.img }} className={styles.productImage}>
              {item.isHit ? <div className={styles.hitProduct}>HIT</div> : null}
            </div>
          </div>
          <div>
            <div className={styles.productName}>{item.title}</div>
            <div className={styles.productCode}>#{item.id}</div>
          </div>
        </div>
      </td>
      <td>{`${item.parameters[0].volume}  ${item.parameters[0].measure}`}</td>
      <td>
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
              incAmount()
            }}
          >
            +
          </div>
        </div>
      </td>
      <td>${item.price}</td>
      <td>${item.price * item.total}</td>
      <td>
        <div className={styles.deleteIcon}>
          <div onClick={() => deleteProduct()}>x</div>
        </div>
      </td>
    </tr>
  )
}

export default TableRow
