import React, { useEffect } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { getProductInfoRequestAC } from 'actions/product'
import cls from 'classnames'
import { Link } from 'react-router-dom'
import CardsContainer from 'components/CardsContainer'
import Card from 'components/ExperienceCard'
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
  const {
    info,
    getProductInfoRequest,
    location: { state: product },
  } = props

  const { userProfile } = product

  useEffect(() => {
    getProductInfoRequest(product.id)
    window.scrollTo(0, 0)
  }, [product])

  return (
    <div className={cls('product-container', styles.container)}>
      <div className={styles.product}>
        <div className={styles.content}>
          <ImagePreviewer images={[product.coverPhoto, ...product.otherPhotos]} />
          <div className={styles.inner_content}>
            <Header text={product.title} />
            <Toolbar params={product.parameters} isPreOrderOnly={false} />
            <Tabs product={product} />
            <Link
              className={styles.card_link}
              to={{ pathname: '/foodmaker_page', state: userProfile.id }}
            >
              <AboutMaker
                name={userProfile.firstName}
                text={userProfile.about}
                photo={userProfile.coverPhoto}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.related_products}>
        <h2>Related products</h2>
        <div className={styles.content}>
          {info &&
            info?.relatedProducts &&
            info.relatedProducts.map((product) => (
              <Card
                key={product.id}
                pathname="/product_page"
                state={product}
                photo={product.coverPhoto}
                tags={product.productTags.map((t) => t.tagName)}
                // tags={['Vegan']}
                name={product.title}
                price={product.price}
                rating={product.rating}
                rateCount={product.reviews?.length}
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

ProductPage.propTypes = {
  info: T.shape,
  location: T.shape,
  getProductInfoRequest: T.func.isRequired,
}

export default connect(({ product, shop }) => ({ info: product.info, shop: shop.shopData }), {
  getProductInfoRequest: getProductInfoRequestAC,
})(ProductPage)
