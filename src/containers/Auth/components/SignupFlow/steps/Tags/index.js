import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { Select } from 'antd'
import Heading from '../../components/heading'
import styles from './tags.module.scss'
import './tags.less'

const OPTIONS_MAIN = [
  'Chef',
  'Backer',
  'Mixologist',
  'Taste maker',
  'Food maker',
  'Craft maker',
  'Urban Farmer',
  'Chocolatier',
  'Cheese maker',
  'Food guide',
  'Food & Beverage Brand',
  'Festival/Event Host',
  'Coffe',
  'Beer & Cider',
  'Wine',
  'Whisky',
  'Spirits',
  'Tea',
  'Health Drinks',
  'Cakes & Bakes',
  'Paste, Sauce & Spreads',
  'Snacks',
  'Kitchen & Dining',
]
const OPTIONS_ADD = [
  'Event hire',
  'Catering',
  'Custom made',
  'Cooking Class',
  'Tour',
  'Workshop',
  'Dining',
]

const Tags = (props) => {
  const {
    properties: { name, value },
    onSubmit,
  } = props
  const [serviceTagIds, setMainTags] = useState([])
  const [specialityTagIds, setAddTags] = useState([])

  useEffect(() => {
    setMainTags(
      OPTIONS_MAIN.reduce((acc, o, i) => {
        if (value.serviceTagIds.includes(i)) return acc.concat([o])
        return acc
      }, []),
    )
    setAddTags(
      OPTIONS_ADD.reduce((acc, o, i) => {
        if (value.specialityTagIds.includes(i)) return acc.concat([o])
        return acc
      }, []),
    )
  }, [])

  const handleChangeMain = (selectedItems) => {
    setMainTags(selectedItems)
  }
  const handleChangeAdd = (selectedItems) => {
    setAddTags(selectedItems)
  }

  const submitData = {
    serviceTagIds: {
      serviceTagIds: OPTIONS_MAIN.reduce((acc, o, i) => {
        if (serviceTagIds.includes(o)) return acc.concat([i])
        return acc
      }, []),
      specialityTagIds: OPTIONS_ADD.reduce((acc, o, i) => {
        if (specialityTagIds.includes(o)) return acc.concat([i])
        return acc
      }, []),
    },
  }

  const submit = () => onSubmit(submitData)

  const filteredOptions = OPTIONS_MAIN.filter((o) => !serviceTagIds.includes(o))
  const filteredAddOptions = OPTIONS_ADD.filter((o) => !specialityTagIds.includes(o))

  /* const filteredOptions = OPTIONS_MAIN.reduce((acc, o, i) => {
    if (!mainTags.includes(o)) return acc.concat([i])
    return acc
  }, []) */

  return (
    <div className={styles.container}>
      <Heading category="About" name="Customize your tags" />
      <div className="selector_container">
        <p className={styles.label}>Service tags</p>
        <Select
          mode="multiple"
          placeholder="Customize your tags"
          value={serviceTagIds}
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

        <p className={styles.label}>Additional Tags</p>
        <Select
          mode="tags"
          placeholder="Customize your tags"
          value={specialityTagIds}
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
  }),
  onSubmit: T.func,
}

export default Tags
