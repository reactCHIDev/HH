import React, { useEffect } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { getProductInfoRequestAC } from 'actions/product'
import { useParams } from 'react-router-dom'
import { push } from 'connected-react-router'
import cls from 'classnames'
import CardsContainer from 'components/CardsContainer'
import ProdCard from 'components/ProductCard'
import BottomSection from 'components/BottomSection'
import Footer from 'components/Footer'
import styles from './product_page.module.scss'
import ImagePreviewer from './components/ImagePreviewer'
import Header from './components/Header'
import Toolbar from './components/Toolbar'
import Tabs from './components/Tabs'
import AboutMaker from './components/AboutMaker'
import './product_page.less'

const ProductPage = (props) => {
  const { info, getProductInfoRequest, pushRoute } = props

  const { productId } = useParams()

  const openFoodmaker = () => pushRoute(`/foodmaker_page/${info.userProfile.id}`)

  useEffect(() => {
    getProductInfoRequest(productId)
    window.scrollTo(0, 0)
  }, [productId])

  if (!info) return null
  return (
    <div className={cls('product-container', styles.container)}>
      <div className={styles.product}>
        <div className={styles.content}>
          <ImagePreviewer images={[info.coverPhoto, ...info.otherPhotos]} />
          <div className={styles.inner_content}>
            <Header text={info.title} />
            <Toolbar params={info.parameters} isPreOrderOnly={false} />
            <Tabs product={info} />
            <div className={styles.card_link} onClick={openFoodmaker}>
              <AboutMaker
                name={info.userProfile.firstName}
                text={info.userProfile.about}
                photo={info.userProfile.coverPhoto}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.related_products}>
        <h2>Related products</h2>
        <div className={styles.content}>
          <CardsContainer>
            {info &&
              info?.relatedProducts &&
              info.relatedProducts.map((product) => (
                <ProdCard
                  key={product.id}
                  id={product.id}
                  pushRoute={pushRoute}
                  pathname="/product_page"
                  photo={product.coverPhoto}
                  tags={product.productTags.map((t) => t.tagName)}
                  name={product.title}
                  price={product.price}
                  rating={product.rating}
                  rateCount={product.reviews?.length}
                  isShowCart
                />
              ))}
          </CardsContainer>
        </div>
      </div>
      <BottomSection />
      <Footer />
    </div>
  )
}

ProductPage.propTypes = {
  info: T.shape,
  getProductInfoRequest: T.func.isRequired,
  pushRoute: T.func.isRequired,
}

export default connect(({ product }) => ({ info: product.info }), {
  getProductInfoRequest: getProductInfoRequestAC,
  pushRoute: push,
})(ProductPage)
