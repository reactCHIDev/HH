/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { DatePicker, Select } from 'antd'

import cls from 'classnames'

import { searchRequestingnAc } from 'actions/search'
import { getServiceTagsAC, getSpecialityTagsAC } from 'actions/system'

import { getItem, setItem } from 'utils/localStorage'
import useClickOutside from 'hooks/useClickOutside'
import PriceSelector from './PriceSelector'
import styles from './searchBlock.module.scss'
import './searchBlock.less'

function SearchBlock() {
  // const specialityTags = useSelector((state) => state.system.specialityTags)
  // const serviceTags = useSelector((state) => state.system.serviceTags)
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

  const [minPrice, setMinPrice] = React.useState(0)
  const [maxPrice, setMaxPrice] = React.useState(100)
  const [isVisiblePriceSelector, setVisibilityPriceSelector] = React.useState(false)

  const [date, setDate] = React.useState(new Date())

  const serviceTagsRef = React.useRef()
  const visiblePriceSelectorRef = React.useRef()

  useClickOutside(serviceTagsRef, () => setIsServiceTagsToChooseShown(false))
  useClickOutside(visiblePriceSelectorRef, () => setVisibilityPriceSelector(false))

  const { control } = useForm({
    mode: 'onBlur',
  })

  React.useEffect(() => {
    dispatch(
      searchRequestingnAc({
        searchType: 'Experiences',
        dataForSearch: { isExplore: true, searchedValue: searchTitle },
      }),
    )
    return () => {
      setItem('search_data', {})
    }
  }, [])

  // React.useEffect(() => {
  //   if (specialityTags.length) {
  //     setSpecialityTagsToShow(specialityTags)
  //   }
  // }, [specialityTags])

  // React.useEffect(() => {
  //   if (serviceTags && serviceTags.length) {
  //     setServiceTagToShow('')
  //   }
  // }, [serviceTags])

  // React.useEffect(() => {
  //   setServiceTagsToChoose(serviceTags.filter((el) => el.tagName !== serviceTagToShow?.tagName))
  // }, [serviceTagToShow])

  const handleTags = (onChange) => (e) => {
    setSelectedItems(e)
    onChange(e)
  }

  const onSearchClickHandler = () => {
    console.log(date, minPrice, maxPrice, 'AAA')
    // dispatch(
    //   searchRequestingnAc({
    //     searchType: 'Foodmakers',
    //     dataForSearch: {
    //       searchedValue: searchTitleValue,
    //       isExplore: true,
    //       fmTags: [...selectedItems, serviceTagToShow.tagName].toString(),
    //     },
    //   }),
    // )
  }

  const onApply = () => {
    setVisibilityPriceSelector(false)
  }

  const onDateChange = (selectedDate) => setDate(selectedDate)

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
      <div className={cls(styles.input_wrapper, styles.service_input, 'dateInput')}>
        <label className={styles.label}>Date</label>

        <div className="dateInput">
          <DatePicker disabled={false} id="1" format="DD MMM YY" onChange={onDateChange} />
        </div>
      </div>
      <div className={cls(styles.input_wrapper, styles.service_input)} ref={serviceTagsRef}>
        <label className={styles.label}>Number of guests</label>
        <div
          // onClick={() => setIsServiceTagsToChooseShown((b) => !b)}
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
      <div
        className={cls(styles.input_wrapper, styles.price_input)}
        onClick={() => setVisibilityPriceSelector((v) => !v)}
        ref={visiblePriceSelectorRef}
      >
        <label className={styles.label}>Price</label>
        <div className={styles.priceLabel} type="text">{`$${minPrice} - $${maxPrice}`}</div>
        <PriceSelector
          min={minPrice}
          max={maxPrice}
          setMin={setMinPrice}
          setMax={setMaxPrice}
          onApply={onApply}
          visible={isVisiblePriceSelector}
        />
      </div>
      <div className={cls(styles.input_wrapper, styles.btn_input)}>
        <button className={styles.btn_button} type="button" onClick={() => onSearchClickHandler()}>
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11.5" cy="11.5" r="8.75" stroke="#000000" />
            <path d="M18 18L22 22" stroke="#000000" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default SearchBlock
