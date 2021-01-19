/* eslint-disable react/jsx-indent */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import cls from 'classnames'
import T from 'prop-types'

import ExpCard from 'components/ExperienceCard'
import BottomSection from 'components/BottomSection'
import Footer from 'components/Footer'
import { getProductTypes } from 'actions/system'
import { searchRequestingnAc } from 'actions/search'
import { getItem } from 'utils/localStorage'
import stub2 from 'assets/images/landings/create_experience/sec21.jpg'
import styles from './prodexp.module.scss'

const ProductExplore = (props) => {
  const productsData = useSelector((state) => state.search.data)
  const productTypes = useSelector((state) => state.system.productTypes)

  const [productTypeToShow, setProductTypeToShow] = React.useState('')
  const [productTypesToChoose, setProductTypesToChoose] = React.useState([])
  const [isProdictTypesToChooseShown, setIsProductTypesToChooseShown] = React.useState(false)

  const [productCategoriesToShow, setProductCategoriesToShow] = React.useState([])

  const dispatch = useDispatch()
  const { searchTitle } = getItem('search_data')

  React.useEffect(() => {
    dispatch(
      searchRequestingnAc({
        searchType: 'Products',
        dataForSearch: { searchedValue: searchTitle, isExplore: true },
      }),
    )
    dispatch(getProductTypes())
  }, [])

  React.useEffect(() => {
    if (productTypes.length) {
      setProductTypeToShow(productTypes[0].title)
      setProductTypesToChoose(productTypes.slice(1).map((el) => el.title))
      setProductCategoriesToShow(productTypes[0].productCategories)
    }
  }, [productTypes])

  return (
    <div className={styles.container}>
      <div className={styles.page_header}>
        <div className={styles.header_content}>
          <h1>Products from our food makers </h1>
          <div className={styles.search_block}>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>Type of products</label>
              <div
                className={styles.input}
                type="text"
                onClick={() => setIsProductTypesToChooseShown((b) => !b)}
              >
                {productTypeToShow}
              </div>
              {isProdictTypesToChooseShown
                ? productTypesToChoose.map((el) => (
                    <div onClick={() => setProductTypeToShow(el)}>{el}</div>
                  ))
                : null}
            </div>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>Category</label>
              <div className={styles.input} type="text" placeholder="Beer, wine" />
            </div>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>Price</label>
              <div className={styles.input} type="text" />
            </div>
            <div className={styles.input_wrapper}>
              <button type="button">
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
      </div>

      <div className={styles.content}>
        <div className={styles.exp_section}>
          {productsData.map(
            (item) =>
              item.coverPhoto && (
                <ExpCard
                  key={item.id}
                  photo={item.coverPhoto}
                  tags={item.productTags.map((a) => a.tagName)}
                  name={item.title}
                  price={item.price}
                  rating={item.rating}
                  rateCount={Number(item.votes)}
                  pathname={`product/${item.id}`}
                />
              ),
          )}
          <div className={styles.btn_holder}>
            <button type="button">More</button>
          </div>
        </div>
      </div>
      <BottomSection />
      <Footer />
    </div>
  )
}

ProductExplore.propTypes = {}

export default ProductExplore
