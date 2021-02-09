import React, { useState, useEffect } from 'react'
import T, { shape } from 'prop-types'
import { connect } from 'react-redux'

import { setItem, getItem, removeKey } from 'utils/localStorage'
import { createProductRequestAC } from 'actions/product'
import { getProductTypes, getProductTagsRequestAC, getCountriesAC } from 'actions/system'
import cls from 'classnames'
import Button from 'components/Button'
import Header from './EditHeader'
import Step1 from '../../../AddProduct/components/Steps/Step1'
import Step2 from '../../../AddProduct/components/Steps/Step2'
import Step3 from '../../../AddProduct/components/Steps/Step3'
import Step4 from '../../../AddProduct/components/Steps/Step4'
import styles from './editproduct.module.scss'
import './editproduct.less'

const EditProduct = (props) => {
  const {
    product,
    account,
    countries,
    types,
    tags,
    getCountriesAC,
    getProductTypes,
    createProductRequestAC,
    getProductTagsRequestAC,
  } = props
  // let { step } = useParams()
  // console.log('%c   shopId   ', 'color: darkgreen; background: palegreen;', shopId)
  // console.log('%c   step   ', 'color: darkgreen; background: palegreen;', step)
  // if (shopId && Number(step) === 0) step = 1
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(null)
  const [stepper, setStepper] = useState(false)
  const [tagsCollection, setTagsCollection] = useState(false)

  useEffect(() => {
    getProductTypes()
    getProductTagsRequestAC()
    getCountriesAC()
  }, [])

  useEffect(() => {
    if (types && tags) {
      const newTags = types.reduce((acc, e) => {
        return acc.concat(e.productCategories.map((c) => c.title))
      }, [])
      setTagsCollection(tags)
    }
  }, [types, tags])

  const onClick = (s) => setStep(s)

  if (!tagsCollection || tagsCollection.length === 0) return <p>NO TGS</p>

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        {Number(step) === 1 && (
          <Step2 setStep={onClick} types={types} setStepper={() => {}} stepper={false} />
        )}
        {Number(step) === 2 && <Step3 setStep={onClick} />}
        {Number(step) === 3 && (
          <Step4 create={createProductRequestAC} tags={tagsCollection} countries={countries} edit />
        )}
      </div>
    </div>
  )
}

EditProduct.propTypes = {
  types: T.arrayOf(shape()),
  tags: T.arrayOf(shape()),
  countries: T.arrayOf(shape()),
  getCountriesAC: T.func,
  getProductTypes: T.func,
  createProductRequestAC: T.func,
  getProductTagsRequestAC: T.func,
}

EditProduct.defaultProperties = {
  types: [],
  tags: [],
}

export default connect(
  ({ system: { productTags: tags, productTypes, countries }, account }) => ({
    tags,
    types: productTypes,
    account,
    countries,
  }),
  {
    getProductTypes,
    getCountriesAC,
    createProductRequestAC,
    getProductTagsRequestAC,
  },
)(EditProduct)
