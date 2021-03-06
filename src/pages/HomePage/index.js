/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { getPublicProductsAC, getPublicExperiencesAC, getPublicFoodmakersAC } from 'actions/pages'
import ProdCard from 'components/ProductCard'
import { push } from 'connected-react-router'
import { Spin, Space } from 'antd'
import ExpCard from 'components/ExperienceCard'

import cls from 'classnames'
import BottomSection from 'components/BottomSection'
import FAQSection from 'components/FAQSection'
import Footer from 'components/Footer'
import { Collapse } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Button from 'components/Button'
import Pattern2 from 'assets/images/pattern 2.svg'
import hands from 'assets/images/landings/home_page/Group 677.svg'
import SearchBlock from './SearchBlock'
import FMCard from './LocalFMCard'
import styles from './home.module.scss'
import './home.less'

const Home = (props) => {
  const {
    getPublicProductsAC,
    getPublicExperiencesAC,
    getPublicFoodmakersAC,
    pushRoute,
    productList,
    experiencesList,
    foodmakersList,
    isLoading,
  } = props

  const { Panel } = Collapse

  const [productStartIndex, setProductStartIndex] = useState(0)
  const [productCollection, setProductCollection] = useState([])

  const [experiencesStartIndex, setExperiencesStartIndex] = useState(0)
  const [experiencesCollection, setExperiencesCollection] = useState([])

  const [foodmakerStartIndex, setFoodmakerStartIndex] = useState(0)
  const [foodmakerCollection, setFoodmakerCollection] = useState([])

  useEffect(() => {
    getPublicProductsAC(productStartIndex, 6)
  }, [productStartIndex])

  useEffect(() => {
    getPublicExperiencesAC(experiencesStartIndex, 6)
  }, [experiencesStartIndex])

  useEffect(() => {
    getPublicFoodmakersAC(foodmakerStartIndex, 3)
  }, [foodmakerStartIndex])

  useEffect(() => {
    setProductCollection((p) =>
      p.concat(productList.filter((e) => !p.find((el) => el.id === e.id))),
    )
  }, [productList])

  useEffect(() => {
    setExperiencesCollection((p) =>
      p.concat(experiencesList.filter((e) => !p.find((el) => el.id === e.id))),
    )
  }, [experiencesList])

  useEffect(() => {
    setFoodmakerCollection((p) =>
      p.concat(foodmakersList.filter((e) => !p.find((el) => el.id === e.id))),
    )
  }, [foodmakersList])

  const moreFoodmakers = () => {
    setFoodmakerStartIndex((si) => si + 3)
  }

  const moreProducts = () => {
    setProductStartIndex((si) => si + 6)
  }

  const moreExperiences = () => {
    setExperiencesStartIndex((si) => si + 6)
  }

  return (
    <div className={styles.frame}>
      <section className={styles.page_header}>
        <div className={styles.header_content}>
          <h1>
            Connecting curious<mark>Food Lovers</mark>
          </h1>
          <p className={styles.slogan}>
            to a global marketplace of local and dedicated food makers
          </p>
          <SearchBlock />
        </div>
      </section>

      <div className={styles.content}>
        <div className={styles.product_section}>
          {experiencesCollection.map(
            (el) =>
              el?.experience?.coverPhoto && (
                <ExpCard
                  photo={el.experience.coverPhoto}
                  tags={el.experience.tagIds.map((i) => i.tagName)}
                  name={el.experience.title}
                  price={el.experience?.priceChild || el.experience.priceAdult}
                  rating={el.experience.rating}
                  rateCount={el.experience.votes}
                  pathname={`/experience/${el.experience.id}`}
                  id={el.experience.id}
                  isFavorite={el.isFavorite}
                />
              ),
          )}
          <div className={styles.btn_holder}>
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}>
                <Space size="middle">
                  <Spin size="large" />
                </Space>
              </div>
            ) : (
              <Button title="Explore more" dark onClick={moreExperiences} />
            )}
          </div>
        </div>
        <section className={styles.product_section}>
          <div className={styles.product_bg_container}>
            <img src={Pattern2} alt="Pattern2" />
            <h1>Local products</h1>
            <p className={styles.slogan}>
              Got a party to plan? Make a group booking for a masterclass or a winery, brewery or
              distillery tour.{' '}
            </p>
          </div>
          {productCollection?.length &&
            productCollection.map((product) => (
              <ProdCard
                key={product.id}
                id={product.id}
                pathname="/product"
                pushRoute={pushRoute}
                photo={product.coverPhoto}
                tags={product.productTags.map((t) => t.tagName)}
                name={product.title}
                price={product.price}
                rating={product.rating}
                rateCount={product.reviews?.length}
                isShowCart
                product={product}
              />
            ))}
          <div className={styles.btn_holder}>
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}>
                <Space size="middle">
                  <Spin size="large" />
                </Space>
              </div>
            ) : (
              <Button title="More products near you" dark onClick={moreProducts} />
            )}
          </div>
        </section>
      </div>

      <section className={styles.local_makers_content}>
        <div className={styles.local_makers_container}>
          <h1>
            <p>
              {' '}
              <img src={hands} alt="img" />
            </p>
            Your local food makers
          </h1>

          <div className={styles.local_tree_columns}>
            {foodmakerCollection &&
              foodmakerCollection.length > 0 &&
              foodmakerCollection.map((fm) => (
                <FMCard key={fm.id} foodmaker={fm} pushRoute={pushRoute} />
              ))}
          </div>

          <div className={styles.btn_holder}>
            <Button title="Explore foodmakers" dark onClick={moreFoodmakers} />
          </div>
        </div>
      </section>

      <FAQSection />

      <BottomSection />
      <Footer />
    </div>
  )
}

Home.propTypes = {
  productList: T.arrayOf(T.shape),
  experiencesList: T.arrayOf(T.shape),
  foodmakersList: T.arrayOf(T.shape),
  getPublicProductsAC: T.func,
  getPublicFoodmakersAC: T.func,
  pushRoute: T.func,
}

export default connect(
  ({ pages }) => ({
    productList: pages.products,
    experiencesList: pages.experiences,
    foodmakersList: pages.foodmakers,
    isLoading: pages.requesting,
  }),
  {
    getPublicProductsAC,
    getPublicExperiencesAC,
    getPublicFoodmakersAC,
    pushRoute: push,
  },
)(Home)
