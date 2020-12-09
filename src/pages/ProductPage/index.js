import React, { useEffect } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { getProductInfoRequestAC } from 'actions/product'
import { getShopByFoodmakerIdAC } from 'actions/shop'
import cls from 'classnames'
import stub2 from 'assets/images/landings/create_experience/sec21.jpg'
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
    shop,
    getProductInfoRequestAC,
    getShopByFoodmakerIdAC,
    location: { state: product },
  } = props

  const { userProfile } = product

  useEffect(() => {
    getShopByFoodmakerIdAC(userProfile.id)
  }, [])

  return (
    <div className={cls('product-container', styles.container)}>
      <div className={styles.product}>
        <div className={styles.content}>
          <ImagePreviewer images={[product.coverPhoto, ...product.otherPhotos]} />
          <div className={styles.inner_content}>
            <Header text={product.title} />
            <Toolbar params={product.parameters} isPreOrderOnly={false} />
            <Tabs product={product} />
            <AboutMaker
              name={userProfile.firstName}
              text={userProfile.about}
              photo={userProfile.coverPhoto}
            />
          </div>
        </div>
      </div>
      <div className={styles.related_products}>
        <h2>Related products</h2>
        <div className={styles.content}>
          {shop &&
            shop.products &&
            shop.products.map((product) => (
              <Card
                key={product.id}
                pathname="/product_page"
                state={product}
                photo={product.coverPhoto}
                // tags={product.productTags.map((t) => t.tagName)}
                tags={['Vegan']}
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
  getProductInfoRequestAC: T.func.isRequired,
  getShopByFoodmakerIdAC: T.func.isRequired,
  product: T.shape,
}

export default connect(({ product, shop }) => ({ info: product.info, shop: shop.shopData }), {
  getProductInfoRequestAC,
  getShopByFoodmakerIdAC,
})(ProductPage)
