import React from 'react'
import stub1 from 'assets/images/landings/create_experience/leading.jpg'
import stub2 from 'assets/images/landings/create_experience/sec21.jpg'
import stub3 from 'assets/images/landings/create_experience/sec22.jpg'
import stub4 from 'assets/images/landings/create_experience/sec23.jpg'
import styles from './product_page.module.scss'
import ImagePreviewer from './components/ImagePreviewer'
import Header from './components/Header'
import Toolbar from './components/Toolbar'
import Tabs from './components/Tabs'
import AboutMaker from './components/AboutMaker'
import './product_page.less'

const ProductPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ImagePreviewer images={[stub1, stub2, stub3, stub4, stub1, stub2, stub3, stub4]} />
        <div className={styles.inner_content}>
          <Header text="Pie with carrots, apple and cinnamon" />
          <Toolbar
            price={12.59}
            weightOptions={[250, 450, 600]}
            isShowWeightOptions
            isPreOrderOnly={false}
          />
          <Tabs />
          <AboutMaker
            name="Annette P."
            text="I’m a nutritionist ,and baking cooking instructor. When I was younger I went to England for a year. The experience I had sharing a dormitory kitchen a nutritionist ,and baking cooking nutritionist ,and baking cooking instructor. When I was cooking."
          />
        </div>
      </div>
    </div>
  )
}

ProductPage.propTypes = {}

export default ProductPage
