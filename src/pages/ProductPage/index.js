import React, { useEffect } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { getProductInfoRequestAC } from 'actions/product'
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
    info,
    getProductInfoRequestAC,
    location: { state: product },
  } = props

  const { userProfile } = product

  useEffect(() => {
    getProductInfoRequestAC(188)
  }, [])

  useEffect(() => console.log('%c   product  info ', 'color: white; background: salmon;', info), [
    info,
  ])

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
          {[1, 2, 3, 4, 5, 6].map(() => (
            <Card
              photo={stub2}
              tags={[
                'desserts',
                'cupcake',
                'cupcake',
                'cupcake',
                'cupcake',
                'cupcake',
                'cupcake',
                'cupcake',
                'cupcake',
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

ProductPage.propTypes = {
  getProductInfoRequestAC: T.func.isRequired,
  info: T.shape,
  product: T.shape,
}

export default connect(({ product }) => ({ info: product.info }), { getProductInfoRequestAC })(
  ProductPage,
)
