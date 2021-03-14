import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import cls from 'classnames'
import { Select } from 'antd'
import Heading from '../../components/heading'
import styles from './tags.module.scss'
import './tags.less'

const Tags = (props) => {
  const {
    properties: { value, specialityTags, serviceTags },
    onSubmit,
  } = props
  const [specialityTagIds, setMainTags] = useState([])
  const [serviceTagIds, setAddTags] = useState([])

  useEffect(() => {
    setMainTags(
      specialityTags.reduce((acc, tag) => {
        if (value.specialityTagIds && value.specialityTagIds.includes(tag.id))
          return acc.concat([tag.tagName])
        return acc
      }, []),
    )
    setAddTags(
      serviceTags.reduce((acc, tag) => {
        if (value.serviceTagIds && value.serviceTagIds.includes(tag.id))
          return acc.concat([tag.tagName])
        return acc
      }, []),
    )
    // eslint-disable-next-line
  }, [])

  const handleChangeMain = (selectedItems) => {
    setMainTags(selectedItems.slice(0, 3))
  }
  const handleChangeAdd = (selectedItems) => {
    setAddTags(selectedItems.slice(0, 3))
  }

  const submitData = {
    serviceTagIds: {
      serviceTagIds: serviceTags.reduce((acc, tag) => {
        if (serviceTagIds.includes(tag.tagName)) return acc.concat([tag.id])
        return acc
      }, []),
      specialityTagIds: specialityTags.reduce((acc, tag) => {
        if (specialityTagIds.includes(tag.tagName)) return acc.concat([tag.id])
        return acc
      }, []),
    },
  }

  const submit = () => onSubmit(submitData)

  const filteredOptions = specialityTags
    .map((e) => e.tagName)
    .filter((o) => !specialityTagIds.includes(o))
  const filteredAddOptions = serviceTags
    .map((e) => e.tagName)
    .filter((o) => !serviceTagIds.includes(o))

  return (
    <div className={styles.container}>
      <Heading category="About" name="Customize your tags (up to 3)" />
      <div className={cls(styles.selectors, 'selector_container')}>
        <p className={styles.label}>Your speciality</p>
        <Select
          mode="multiple"
          placeholder="Baker"
          value={specialityTagIds}
          showArrow
          onChange={handleChangeMain}
          style={{ width: '100%' }}
        >
          {filteredOptions.map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>

        <p className={styles.label}>Your services tags and additional tags</p>
        <Select
          mode="multiple"
          placeholder="Catering, Custom made"
          value={serviceTagIds}
          showArrow
          onChange={handleChangeAdd}
          style={{ width: '100%' }}
        >
          {filteredAddOptions.map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </div>
      <input
        className={styles.next}
        disabled={!serviceTagIds.length || !specialityTagIds.length}
        onClick={submit}
        type="button"
        value="Next  >"
      />
    </div>
  )
}

Tags.propTypes = {
  properties: T.shape({
    name: T.string,
    value: T.shape(),
    specialityTags: T.arrayOf(T.shape()),
    serviceTags: T.arrayOf(T.shape()),
  }),
  onSubmit: T.func,
}

export default Tags
