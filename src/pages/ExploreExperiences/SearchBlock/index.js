import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Select } from 'antd'

import cls from 'classnames'

import { searchRequestingnAc } from 'actions/search'
import { getServiceTagsAC, getSpecialityTagsAC } from 'actions/system'

import { getItem, setItem } from 'utils/localStorage'
import useClickOutside from 'hooks/useClickOutside'
import styles from './searchBlock.module.scss'
import './searchBlock.less'

function SearchBlock() {
  const specialityTags = useSelector((state) => state.system.specialityTags)
  const serviceTags = useSelector((state) => state.system.serviceTags)
  const searchData = getItem('search_data')
  const getInitialSearchValue = () => getItem('search_data')?.searchTitle || ''
  const searchTitle = searchData?.searchTitle || ''
  const city = searchData?.city || ''
  const dispatch = useDispatch()

  const [specialityTagsToShow, setSpecialityTagsToShow] = React.useState([])
  const [selectedItems, setSelectedItems] = React.useState([])
  const [searchTitleValue, setSearchTitleValue] = React.useState(getInitialSearchValue)

  const [serviceTagToShow, setServiceTagToShow] = React.useState()
  const [serviceTagsToChoose, setServiceTagsToChoose] = React.useState([])
  const [isServiceTagsToChooseShown, setIsServiceTagsToChooseShown] = React.useState(false)

  const serviceTagsRef = React.useRef()
  useClickOutside(serviceTagsRef, () => setIsServiceTagsToChooseShown(false))

  const { control } = useForm({
    mode: 'onBlur',
  })

  React.useEffect(() => {
    dispatch(
      searchRequestingnAc({
        searchType: 'Foodmakers',
        dataForSearch: { searchedValue: searchTitle, city, isExplore: true },
      }),
    )
    dispatch(getSpecialityTagsAC())
    dispatch(getServiceTagsAC())
    return () => {
      setItem('search_data', {})
    }
  }, [])

  React.useEffect(() => {
    if (specialityTags.length) {
      setSpecialityTagsToShow(specialityTags)
    }
  }, [specialityTags])

  React.useEffect(() => {
    if (serviceTags && serviceTags.length) {
      setServiceTagToShow('')
    }
  }, [serviceTags])

  React.useEffect(() => {
    setServiceTagsToChoose(serviceTags.filter((el) => el.tagName !== serviceTagToShow?.tagName))
  }, [serviceTagToShow])

  const handleTags = (onChange) => (e) => {
    setSelectedItems(e)
    onChange(e)
  }

  const onSearchClickHandler = () => {
    dispatch(
      searchRequestingnAc({
        searchType: 'Foodmakers',
        dataForSearch: {
          searchedValue: searchTitleValue,
          isExplore: true,
          fmTags: [...selectedItems, serviceTagToShow.tagName].toString(),
        },
      }),
    )
  }

  return (
    <div className={styles.search_block}>
      <div className={cls(styles.input_wrapper, styles.type_input)}>
        <label className={styles.label}>Type of experience</label>
        <div className="fmSelectWrapper">
          <Controller
            style={{ width: '100%', position: 'absolute', left: 0, top: '0px' }}
            control={control}
            name="tags"
            rules={{ required: false }}
            render={({ onChange, value, name }) => (
              <Select
                mode="multiple"
                name={name}
                onChange={handleTags(onChange)}
                value={selectedItems}
                showArrow
                style={{ width: '100%' }}
                tokenSeparators={[',']}
                maxTagCount={3}
              >
                {specialityTagsToShow.map((item) => (
                  <Select.Option key={item.id} value={item.tagName}>
                    {item.tagName}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
        </div>
      </div>
      <div className={cls(styles.input_wrapper, styles.brand_input)}>
        <label className={styles.label}>Date</label>
        <input
          className={styles.input}
          onChange={(e) => setSearchTitleValue(e.target.value)}
          type="text"
          placeholder="E.g. Mike"
          value={searchTitleValue}
        />
      </div>
      <div className={cls(styles.input_wrapper, styles.service_input)} ref={serviceTagsRef}>
        <label className={styles.label}>Number of guests</label>
        <div
          onClick={() => setIsServiceTagsToChooseShown((b) => !b)}
          className={styles.serviceTagsType}
        >
          {serviceTagToShow?.tagName}
        </div>
        {isServiceTagsToChooseShown ? (
          <div className={styles.typesWrapper}>
            {serviceTagsToChoose.map((el) => (
              <div
                key={el.id}
                onClick={() => {
                  setServiceTagToShow(el)
                  setIsServiceTagsToChooseShown(false)
                }}
              >
                {el.tagName}
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className={cls(styles.input_wrapper, styles.speciality_input)}>
        <label className={styles.label}>Price ($)</label>
        <input
          className={styles.input}
          onChange={(e) => setSearchTitleValue(e.target.value)}
          type="text"
          placeholder="E.g. Mike"
          value={searchTitleValue}
        />
      </div>
    </div>
  )
}

export default SearchBlock
