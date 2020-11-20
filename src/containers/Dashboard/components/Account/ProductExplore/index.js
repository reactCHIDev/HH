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
import './product_page.less'

const ProductExplore = (props) => {
  const { info, getProductInfoRequestAC } = props

  useEffect(() => {
    getProductInfoRequestAC(188)
  }, [])

  useEffect(() => console.log('%c   product  info ', 'color: white; background: salmon;', info), [
    info,
  ])

  return (
    <div className={cls('product-container', styles.container)}>
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

ProductExplore.propTypes = {
  getProductInfoRequestAC: T.func.isRequired,
  info: T.shape,
}

export default connect(({ product }) => ({ info: product.info }), { getProductInfoRequestAC })(
  ProductExplore,
)
