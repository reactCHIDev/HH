/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import cls from 'classnames'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { getPublicProductsAC, getPublicExperiencesAC, getPublicFoodmakersAC } from 'actions/pages'
import ProdCard from 'components/ProductCard'
import { push } from 'connected-react-router'
import rightArrow from 'assets/icons/svg/Vector 3.svg'
import { Spin, Space } from 'antd'
import ExpCard from 'components/ExperienceCard'
import BottomSection from 'components/BottomSection'
import FAQSection from 'components/FAQSection'
import Tags from 'components/Tags/index'
import Footer from 'components/Footer'
import Button from 'components/Button'
import Pattern2 from 'assets/images/pattern 2.svg'
import hands from 'assets/images/landings/home_page/Group 677.svg'
import SearchBlock from './SearchBlock'
import FMCard from './LocalFMCard'

import styles from './home.module.scss'
import './home.less'

function SampleNextArrow(props) {
  const { style, onClick } = props
  return (
    <div
      style={{
        ...style,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '54%',
        right: 54,
        transform: 'translate(50%,0)',
        backgroundColor: '#FFFFFF',
        backgroundImage: "url('./assets/'icons/svg/Vector 3.svg)",
        borderRadius: '24px',
        height: 48,
        width: 48,
        zIndex: 1000,
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <img src={rightArrow} alt="right-arrow" />
    </div>
  )
}

function SamplePrevArrow(props) {
  const { style, onClick } = props
  return (
    <div
      style={{
        ...style,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '54%',
        left: 16,
        transform: 'translate(50%,0)',
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        height: 48,
        width: 48,
        zIndex: 1000,
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <img style={{ transform: 'rotate(180deg)' }} src={rightArrow} alt="right-arrow" />
    </div>
  )
}

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
  const history = useHistory()

  const [productStartIndex, setProductStartIndex] = useState(0)
  const [productCollection, setProductCollection] = useState([])

  const [experiencesStartIndex, setExperiencesStartIndex] = useState(0)
  const [experiencesCollection, setExperiencesCollection] = useState([])

  const [foodmakerStartIndex, setFoodmakerStartIndex] = useState(0)
  const [foodmakerCollection, setFoodmakerCollection] = useState([])

  const settings = React.useMemo(
    () => ({
      draggable: true,
      touchThreshold: 30,
      useCSS: true,
      infinite: false,
      swipeToSlide: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      speed: 500,
      slidesToScroll: 1,
      slidesToShow: 1,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            dots: true,
          },
        },
      ],
    }),
    [],
  )

  useEffect(() => {
    getPublicProductsAC(productStartIndex, 6)
    // eslint-disable-next-line
  }, [productStartIndex])

  useEffect(() => {
    getPublicExperiencesAC(experiencesStartIndex, 6)
    // eslint-disable-next-line
  }, [experiencesStartIndex])

  useEffect(() => {
    getPublicFoodmakersAC(foodmakerStartIndex, 3)
    // eslint-disable-next-line
  }, [foodmakerStartIndex])

  useEffect(() => {
    setProductCollection((p) =>
      p.concat(productList.filter((e) => !p.find((el) => el.id === e.id))),
    )
  }, [productList])

  useEffect(() => {
    setExperiencesCollection((p) =>
      p.concat(
        experiencesList.filter((e) => !p.find((el) => el.experience.id === e.experience.id)),
      ),
    )
  }, [experiencesList])

  useEffect(() => {
    setFoodmakerCollection((p) =>
      p.concat(foodmakersList.filter((e) => !p.find((el) => el.id === e.id))),
    )
  }, [foodmakersList])

  const goToProducts = () => {
    history.push('/product_explore')
  }
  const goToFoodMakers = () => {
    history.push('/foodmakers_explore')
  }
  const goToExperiences = () => {
    history.push('/explore_experiences')
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
          <div className={styles.product_bg_container}>
            <img src={Pattern2} alt="Pattern2" />
            <h1>Things to do this week</h1>

            <Tags
              tags={[
                'Celebration',
                'Dating',
                'Family day',
                'Workshop',
                'Cooking class',
                'Tour',
                'Tasting',
                'Team building',
              ]}
            />
          </div>
          <div className={cls(styles.slider_container, 'slick_container')}>
            <Slider {...settings}>
              {experiencesCollection.map(
                (el) =>
                  el?.experience?.coverPhoto && (
                    <div className={styles.preview_container}>
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
                        key={el.experience.id}
                      />
                    </div>
                  ),
              )}
            </Slider>
          </div>

          <div className={styles.btn_holder}>
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}>
                <Space size="middle">
                  <Spin size="large" />
                </Space>
              </div>
            ) : (
              <Button title="Explore more experiences" dark onClick={goToExperiences} />
            )}
          </div>
        </div>
        <section className={styles.product_section}>
          <div className={styles.product_bg_container}>
            <img src={Pattern2} alt="Pattern2" />
            <h1>Shop quality local made</h1>
            <Tags tags={['Gift hampers', 'Custom made', 'Catering', 'Vegan']} />
          </div>
          <div className={cls(styles.slider_container, 'slick_container')}>
            <Slider {...settings}>
              {productCollection?.length &&
                productCollection.map((product) => (
                  <div className={styles.preview_container}>
                    <ProdCard
                      className={styles.preview_container}
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
                  </div>
                ))}
            </Slider>
          </div>

          <div className={styles.btn_holder}>
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}>
                <Space size="middle">
                  <Spin size="large" />
                </Space>
              </div>
            ) : (
              <Button title="More products near you" dark onClick={goToProducts} />
            )}
          </div>
        </section>

        <section className={styles.local_makers_content}>
          <div className={styles.local_makers_container}>
            <h1>
              <div>
                <img src={hands} alt="img" />
              </div>
              <p>Discover your local food makers</p>
            </h1>
            <Tags
              tags={[
                'Event hire',
                'Food maker',
                'Taste master',
                'Food guide',
                'Chef',
                'Barista',
                'Brewer',
                'Baker',
              ]}
            />
            <div className={cls(styles.slider_container, 'slick_container')}>
              <Slider {...settings}>
                {foodmakerCollection &&
                  foodmakerCollection.length > 0 &&
                  foodmakerCollection.map((fm) => (
                    <div className={styles.preview_container}>
                      <FMCard
                        className={styles.preview_container}
                        key={fm.id}
                        foodmaker={fm}
                        pushRoute={pushRoute}
                      />
                    </div>
                  ))}
              </Slider>
            </div>

            <div className={styles.btn_holder}>
              <Button title="Explore foodmakers" dark onClick={goToFoodMakers} />
            </div>
          </div>
        </section>
      </div>

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
