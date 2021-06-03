/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Input, Select, Button, Form, Checkbox, InputNumber } from 'antd'

import cls from 'classnames'
import T from 'prop-types'

import { searchRequestingnAc } from 'actions/search'
import { getServiceTagsAC, getSpecialityTagsAC } from 'actions/system'

import { getItem, setItem } from 'utils/localStorage'
import BottomSection from 'components/BottomSection'
import Footer from 'components/Footer'
import useClickOutside from 'hooks/useClickOutside'
import FMCard from './components/FMCard'

import styles from './fmexp.module.scss'
import './fm.less'

const FoodmakersExplore = (props) => {
  const fmData = useSelector((state) => state.search.data)
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

  // const filteredTags = specialityTagsToShow.length
  //   ? specialityTagsToShow.filter((o) => !selectedItems.includes(o.tagName))
  //   : []

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
    // eslint-disable-next-line
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
    // eslint-disable-next-line
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
    <div className={styles.container}>
      <section className={styles.page_header}>
        <div className={styles.header_content}>
          <h1>Food makers for food lovers</h1>
          <div className={styles.search_block}>
            <div className={cls(styles.input_wrapper, styles.type_input)}>
              <label className={styles.label}>Type of Food Maker</label>
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
              <label className={styles.label}>Search hosts or brands</label>
              <input
                className={styles.input}
                onChange={(e) => setSearchTitleValue(e.target.value)}
                type="text"
                placeholder="E.g. Mike"
                value={searchTitleValue}
              />
            </div>
            <div className={cls(styles.input_wrapper, styles.service_input)} ref={serviceTagsRef}>
              <label className={styles.label}>Service type</label>
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
            {/*<div className={cls(styles.input_wrapper, styles.speciality_input)}>*/}
            {/*  <label className={styles.label}>Host speciality</label>*/}
            {/*  <input disabled className={styles.input} type="text" />*/}
            {/*</div>*/}
            <div className={cls(styles.input_wrapper, styles.btn_input)}>
              <button type="button" onClick={() => onSearchClickHandler()}>
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
        </div>
      </section>

      <div className={cls(styles.content, 'class')}>
        <div className={styles.exp_section}>
          {fmData.map((item) => (
            <FMCard item={item} key={item.id} />
          ))}
        </div>
      </div>

      <div className={styles.btn_holder}>
        <button type="button">More</button>
      </div>

      <BottomSection />
      <Footer />
    </div>
  )
}

FoodmakersExplore.propTypes = {}

export default FoodmakersExplore
