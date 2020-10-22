import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { Select } from 'antd'
import Heading from '../../components/heading'
import styles from './tags.module.scss'
import './tags.less'

const OPTIONS_MAIN = [
  'Apples',
  'Nails',
  'Bananas',
  'Helicopters',
  'Coocking class',
  'Tour',
  'smth else',
]
const OPTIONS_ADD = [
  'Apples',
  'Nails',
  'Bananas',
  'Helicopters',
  'Coocking class',
  'Tour',
  'smth else',
]

const Tags = (props) => {
  const {
    properties: { name, value },
    onSubmit,
  } = props
  const [mainTags, setMainTags] = useState(value.mainTags)
  const [addTags, setAddTags] = useState(value.addTags)

  useEffect(() => {
    setMainTags(value.mainTags)
    setAddTags(value.addTags)
  }, [])

  const handleChangeMain = (selectedItems) => {
    setMainTags(selectedItems)
  }
  const handleChangeAdd = (selectedItems) => {
    setAddTags(selectedItems)
  }

  const submitData = {
    serviceTagIds: {
      mainTags,
      addTags,
    },
  }

  const submit = () => onSubmit(submitData)

  const filteredOptions = OPTIONS_MAIN.filter((o) => !mainTags.includes(o))
  const filteredAddOptions = OPTIONS_ADD.filter((o) => !addTags.includes(o))

  return (
    <>
      <Heading category="About" name="Customize your tags" />
      <div className="selector_container">
        <p className={styles.label}>Service tags</p>
        <Select
          mode="multiple"
          placeholder="Customize your tags"
          value={mainTags}
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
          value={addTags}
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
      <input className={styles.next} onClick={submit} type="button" value="Next  >" />
    </>
  )
}

Tags.propTypes = {
  properties: T.shape({
    name: T.string,
    value: T.string,
  }),
  onSubmit: T.func,
}

export default Tags
