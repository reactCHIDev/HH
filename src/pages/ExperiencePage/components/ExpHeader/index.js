import React, { useState, useEffect, useCallback, useMemo } from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { Select, Slider, InputNumber, Checkbox, Button } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import _ from 'lodash/fp'
import ImagePreviewer from 'pages/ProductPage/components/ImagePreviewer'
import Calendar from '../Calendar'
import styles from './exp_page_header.module.scss'
import './exp_page_header.less'

const ExpHeader = () => {
  const { register, handleSubmit, control, setValue, errors } = useForm({
    mode: 'onBlur',
  })
  const qty = 2
  const price = 46
  const discount = 10

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ImagePreviewer
          images={[
            'https://hungryhugger-space.fra1.digitaloceanspaces.com/72cb3de3-61ef-4149-afae-75f9bf1be702_1611842017824.jpg',
            'https://hungryhugger-space.fra1.digitaloceanspaces.com/72cb3de3-61ef-4149-afae-75f9bf1be702_1611842017824.jpg',
            'https://hungryhugger-space.fra1.digitaloceanspaces.com/72cb3de3-61ef-4149-afae-75f9bf1be702_1611842017824.jpg',
            'https://hungryhugger-space.fra1.digitaloceanspaces.com/72cb3de3-61ef-4149-afae-75f9bf1be702_1611842017824.jpg',
            'https://hungryhugger-space.fra1.digitaloceanspaces.com/72cb3de3-61ef-4149-afae-75f9bf1be702_1611842017824.jpg',
            'https://hungryhugger-space.fra1.digitaloceanspaces.com/72cb3de3-61ef-4149-afae-75f9bf1be702_1611842017824.jpg',
          ]}
        />
        <div className={styles.inner_content}>
          <p className={styles.exp_heading}>Experience title</p>
          <div className={cls(styles.input_number, 'exp-guests_number')}>
            <label className={styles.label}>Number of guests</label>
            <Controller
              control={control}
              name="guests"
              rules={{ required: true }}
              render={({ onChange, value, name }) => (
                <div className={cls(styles.input_wrapper, 'exp-page-input')}>
                  <div className={styles.success}>10% OFF</div>
                  <InputNumber name={name} value={value} onChange={onChange} />
                </div>
              )}
            />
            {_.get('guests.type', errors) === 'required' && (
              <p className={styles.errmsg}>This field is required</p>
            )}
          </div>
          <Calendar />
          <div className={styles.info_wrapper}>
            <div className={styles.info_container}>
              <div className={styles.info_text}>{`Adults x ${qty} ($${price}) = $${qty *
                price}`}</div>
              <div className={styles.info_text}>{`Children x ${qty} ($${price}) = $${qty *
                price}`}</div>
              <div className={styles.info_text}>
                Total <span>{` (with ${discount}% discount) `}</span> = 1100HKD
              </div>
            </div>
            <div className={cls(styles.button_container, 'booking_btn')}>
              <Button type="primary" block size="large">
                BOOK
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ExpHeader.propTypes = {}

export default ExpHeader
