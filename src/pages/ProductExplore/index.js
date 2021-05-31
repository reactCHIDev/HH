/* eslint-disable react/jsx-indent */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProdCard from 'components/ProductCard'
import { push } from 'connected-react-router'
import cls from 'classnames'
import BottomSection from 'components/BottomSection'
import Footer from 'components/Footer'
import { getProductTypes } from 'actions/system'
import { searchRequestingnAc } from 'actions/search'
import { getItem, setItem } from 'utils/localStorage'
import useClickOutside from 'hooks/useClickOutside'

import PriceSelector from './PriceSelector'
import styles from './prodexp.module.scss'

const ProductExplore = (props) => {
  const productsData = useSelector((state) => state.search.data)
  const productTypes = useSelector((state) => state.system.productTypes)
  const isAuth = useSelector(state => state.login.authorized)

  const [productTypeToShow, setProductTypeToShow] = React.useState()
  const [productTypesToChoose, setProductTypesToChoose] = React.useState([])
  const [isProductTypesToChooseShown, setIsProductTypesToChooseShown] = React.useState(false)

  const [productCategoriesToShow, setProductCategoriesToShow] = React.useState()
  const [selectedCategories, updateSelectedCategories] = React.useState([])
  const [isProductCategoriesToChooseShown, setIsProductCategoriesToChooseShown] = React.useState(
    false,
  )

  const [isVisiblePriceSelector, setVisibilityPriceSelector] = React.useState(false)
  const [minPrice, setMinPrice] = React.useState(0)
  const [maxPrice, setMaxPrice] = React.useState(1000)

  const dispatch = useDispatch()

  const searchData = getItem('search_data')
  const searchTitle = searchData?.searchTitle || ''
  const city = searchData?.city || ''

  const visiblePriceSelectorRef = React.useRef()
  const productCategoriesRef = React.useRef()
  const productTypesRef = React.useRef()
  useClickOutside(productTypesRef, () => setIsProductTypesToChooseShown(false))
  useClickOutside(productCategoriesRef, () => setIsProductCategoriesToChooseShown(false))
  useClickOutside(visiblePriceSelectorRef, () => setVisibilityPriceSelector(false))

  React.useEffect(() => {
    dispatch(
      searchRequestingnAc({
        searchType: 'Products',
        dataForSearch: { searchedValue: searchTitle, city, isExplore: true },
      }),
    )
    dispatch(getProductTypes())
    return () => {
      setItem('search_data', {})
    }
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    if (productTypes.length) {
      setProductTypeToShow(productTypes[0])
    }
  }, [productTypes])

  React.useEffect(() => {
    if (productTypeToShow) {
      setProductTypesToChoose(productTypes.filter((el) => el.title !== productTypeToShow.title))
      setProductCategoriesToShow(
        productTypes.filter((el) => el.title === productTypeToShow.title)[0]?.productCategories,
      )
      updateSelectedCategories([])
    }
    // eslint-disable-next-line
  }, [productTypeToShow])

  const onCategoriesClickHandler = (el) => {
    const { id } = el
    if (selectedCategories.some((e) => e.id === id)) {
      updateSelectedCategories(selectedCategories.filter((e) => e.id !== id))
    } else {
      updateSelectedCategories([...selectedCategories, el])
    }
  }

  const onSearchCLick = () => {
    dispatch(
      searchRequestingnAc({
        searchType: 'Products',
        dataForSearch: {
          searchedValue: searchTitle || '',
          prodTypeId: productTypeToShow.id,
          prodCategoryId: selectedCategories.map((el) => el.id).toString(),
          isExplore: true,
          prodPrice: `${minPrice},${maxPrice}`,
        },
      }),
    )
  }

  const pushRoute = (url) => {
    dispatch(push(url))
  }

  return (
    <div className={styles.container}>
      <div className={styles.page_header}>
        <div className={styles.header_content}>
          <h1>Products from our food makers </h1>
          <div style={{ width: '100%' }} className={styles.search_block}>
            <div className={cls(styles.input_wrapper, styles.type_input)} ref={productTypesRef}>
              <label className={styles.label}>Type of products</label>
              <div
                className={styles.input}
                type="text"
                onClick={() => setIsProductTypesToChooseShown((b) => !b)}
              >
                {productTypeToShow?.title}
              </div>
              {isProductTypesToChooseShown ? (
                <div className={styles.typesWrapper}>
                  {productTypesToChoose.map((el) => (
                    <div
                      key={el.id}
                      onClick={() => {
                        setProductTypeToShow(el)
                        setIsProductTypesToChooseShown(false)
                      }}
                    >
                      {el.title}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className={cls(styles.input_wrapper, styles.cat_input)} ref={productCategoriesRef}>
              <label className={styles.label}>Category</label>
              <div
                className={styles.input}
                type="text"
                onClick={() => setIsProductCategoriesToChooseShown((b) => !b)}
              >
                {selectedCategories.map((el, index) => (
                  <span key={el.id}>{(index ? ', ' : '') + el.title}</span>
                ))}
              </div>
              {isProductCategoriesToChooseShown ? (
                <div className={styles.categoriesWrapper}>
                  {productCategoriesToShow.map((el) => (
                    <div
                      className={styles.category}
                      key={el.id}
                      style={{ display: 'flex', alignItems: 'center' }}
                      onClick={() => onCategoriesClickHandler(el)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.some((e) => e.id === el.id)}
                      />
                      <div key={el.id}>{el.title}</div>
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
              <div className={styles.input} type="text">{`$${minPrice} - $${maxPrice}`}</div>
              <PriceSelector
                min={minPrice}
                max={maxPrice}
                setMin={setMinPrice}
                setMax={setMaxPrice}
                visible={isVisiblePriceSelector}
              />
            </div>
            <div className={cls(styles.input_wrapper, styles.btn_input)}>
              <button className={styles.btn_button} type="button" onClick={() => onSearchCLick()}>
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
          {productsData &&
            productsData.map(
              (item) =>
                item.coverPhoto && (
                  <ProdCard
                    key={item.id}
                    id={item.id}
                    pathname="/product"
                    pushRoute={pushRoute}
                    photo={item.coverPhoto}
                    tags={item.productTags.map((t) => t.tagName)}
                    name={item.title}
                    price={item.price}
                    rating={item.rating}
                    rateCount={Number(item.votes)}
                    isShowCart
                    product={item}
                    isAuth={isAuth}
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
