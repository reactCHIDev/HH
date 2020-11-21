import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import ChkBox from 'components/ChkBox'
import { getProductTypes } from 'actions/listing'
import { getProductInfoRequestAC } from 'actions/product'
import { Select, Slider } from 'antd'
import cls from 'classnames'
import stub2 from 'assets/images/landings/create_experience/sec21.jpg'
import Card from 'components/ExperienceCard'
import BottomSection from 'components/BottomSection'
import Footer from 'components/Footer'
import styles from './product_explore.module.scss'
import './product_explore.less'

const ProductExplore = (props) => {
  const { info, types = [], getProductTypes, getProductInfoRequestAC } = props

  const [filters, setFilters] = useState(types)
  const [filtersType, setTypeFilters] = useState(types)
  const [filtersCategory, setCategoryFilters] = useState(types)
  const [productTypes, setProductTypes] = useState([])
  const [category, setCategory] = useState([])
  const [ids, setIds] = useState([])

  const { Option } = Select

  const resetFilters = () => {
    setFilters(
      productTypes.map((type) => {
        type.productCategories = type.productCategories.map((category) => {
          category.checked = false
          return category
        })
        return type
      }),
    )
  }

  useEffect(() => {
    const prodTypes = types.map((e1) => ({
      ...e1,
      productCategories: [...e1.productCategories].map((e3) => ({ ...e3 })),
    }))
    setProductTypes(prodTypes)
    setTypeFilters(prodTypes)
    setCategoryFilters(prodTypes)
  }, [types])

  useEffect(() => {
    resetFilters()
  }, [productTypes])

  useEffect(() => {
    getProductTypes()
    getProductInfoRequestAC(188)
  }, [])

  const onChangeTypeChkBox = (e) => {
    const { id, checked } = e.currentTarget
    if (checked && !ids.includes(id)) setIds(ids.concat([id]))
    if (!checked && ids.includes(id)) setIds(ids.filter((el) => el !== id))
    setFilters(
      filters.map((type) => {
        type.productCategories = type.productCategories.map((category) => {
          if (category.id === Number(id)) {
            category.checked = checked
          }
          return category
        })
        return type
      }),
    )
    console.log('%c   filters   ', 'color: white; background: salmon;', filters)
  }

  const onChangeChkBox = (e) => {
    const { id, checked } = e.currentTarget
    if (checked && !ids.includes(id)) setIds(ids.concat([id]))
    if (!checked && ids.includes(id)) setIds(ids.filter((el) => el !== id))
    setFilters(
      filters.map((type) => {
        type.productCategories = type.productCategories.map((category) => {
          if (category.id === Number(id)) {
            category.checked = checked
          }
          return category
        })
        return type
      }),
    )
    console.log('%c   filters   ', 'color: white; background: salmon;', filters)
  }

  const handleType = (data) => {
    setCategory(types.find((t) => t.id === data).productCategories)
    console.log('%c   Select type data   ', 'color: white; background: salmon;', data)
  }

  const onChange = (data) =>
    console.log('%c   Select Cat data   ', 'color: white; background: salmon;', data)

  const onRange = (data) => console.log('%c   data   ', 'color: white; background: salmon;', data)

  return (
    <div className={cls('product-container', styles.container)}>
      <div className={styles.header_section}>
        <p className={styles.heading}>Products from our food makers</p>
        <div className={cls(styles.select_container, 'pe-selects')}>
          <Select onChange={handleType}>
            {types &&
              types.map((type) => (
                <Option key={type.id} value={type.id}>
                  {type.title}
                </Option>
              ))}
          </Select>

          <Select onChange={onChange}>
            {category.map((cat) => (
              <Option key={cat.id} value={cat.id}>
                {cat.title}
              </Option>
            ))}
          </Select>
        </div>

        <div className={styles.type_list}>
          {types.map((chk) => (
            <ChkBox
              key={chk.id}
              id={chk.id}
              labelText={chk.title}
              checked={chk.checked}
              onChange={onChangeTypeChkBox}
            />
          ))}
        </div>

        <div className={styles.type_list}>
          {category.map((chk) => (
            <ChkBox
              key={chk.id}
              id={chk.id}
              labelText={chk.title}
              checked={chk.checked}
              onChange={onChangeChkBox}
            />
          ))}
        </div>

        <div className={cls(styles.range_container, 'range')}>
          <Slider range defaultValue={[10, 30]} onAfterChange={onRange} />
        </div>
      </div>
      <div className={styles.products}>
        <div className={styles.content}>
          {[1, 2, 3, 4, 5, 6].map(() => (
            <Card
              photo={stub2}
              tags={[
                'desserts',
                'cupcak1',
                'cupcak2',
                'cupcak3',
                'cupcak4',
                'cupcak5',
                'cupcak6',
                'cupcak7',
                'cupcak8',
              ]}
              name="Donut Set 1 (x12)"
              price={15.59}
              rating={3}
              rateCount={63}
              isShowCart
            />
          ))}
        </div>
      </div>
      <BottomSection />
      <Footer />
    </div>
  )
}

ProductExplore.propTypes = {
  getProductInfoRequestAC: T.func.isRequired,
  getProductTypes: T.func.isRequired,
  info: T.shape,
}

export default connect(({ product, listing }) => ({ info: product.info, types: listing.types }), {
  getProductTypes,
  getProductInfoRequestAC,
})(ProductExplore)
