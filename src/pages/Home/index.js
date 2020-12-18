import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { getPublicProductsAC, getPublicFoodmakersAC } from 'actions/pages'
import ProdCard from 'components/ProductCard'
import { push } from 'connected-react-router'
import cls from 'classnames'
import BottomSection from 'components/BottomSection'
import Footer from 'components/Footer'
import { Collapse } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Button from 'components/Button'
import Pattern2 from 'assets/images/pattern 2.svg'
import hands from 'assets/images/landings/home_page/Group 677.svg'
import FMCard from './LocalFMCard'
import styles from './home.module.scss'
import './home.less'

const Home = (props) => {
  const {
    getPublicProductsAC,
    getPublicFoodmakersAC,
    pushRoute,
    productList,
    foodmakersList,
  } = props

  const { Panel } = Collapse

  const [productStartIndex, setProductStartIndex] = useState(0)
  const [productCollection, setProductCollection] = useState([])

  const [foodmakerStartIndex, setFoodmakerStartIndex] = useState(0)
  const [foodmakerCollection, setFoodmakerCollection] = useState([])

  useEffect(() => {
    getPublicProductsAC(productStartIndex, 6)
  }, [productStartIndex])

  useEffect(() => {
    getPublicFoodmakersAC(foodmakerStartIndex, 3)
  }, [foodmakerStartIndex])

  useEffect(() => {
    setProductCollection((p) => p.concat(productList))
  }, [productList])

  useEffect(() => {
    setFoodmakerCollection((p) => p.concat(foodmakersList))
  }, [foodmakersList])

  const moreFoodmakers = () => {
    setFoodmakerStartIndex((si) => si + 3)
  }

  const moreProducts = () => {
    setProductStartIndex((si) => si + 6)
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
          <div className={styles.search_block}>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>What are you looking for? *</label>
              <input
                disabled
                className={styles.input}
                type="text"
                // placeholder="Global search (Placeholder text - cakes & bakes products, team building experiences, food makers)"
              />
              <span className={styles.label}>Celebration, Team Building, Family Day etc.</span>
            </div>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>City *</label>
              <input
                disabled
                className={styles.input}
                type="text" /* placeholder="Select a city" */
              />
              <span className={cls(styles.label, 'mobile_hidden')}>Hong-Kong, Sydney</span>
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
                  <circle cx="11.5" cy="11.5" r="8.75" stroke="#000000" stroke-width="1.5"></circle>
                  <path d="M18 18L22 22" stroke="#000000" stroke-width="1.5"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.content}>
        {/* <div className={styles.exp_section}>
          {[1, 2, 3, 4, 5, 6].map((e) => (
            <ExpCard
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
            />
          ))}
          <div className={styles.btn_holder}>
            <Button title="Explore more" dark={true} />
          </div>
        </div> */}

        <section className={styles.product_section}>
          <div className={styles.product_bg_container}>
            <img src={Pattern2} alt="Pattern2" />
            <h1>Shop local makers</h1>
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
              />
            ))}
          <div className={styles.btn_holder}>
            <Button title="More products near you" dark onClick={moreProducts} />
          </div>
        </section>

        {/* <div className={styles.lessons_section}>
          <p className={styles.slogan}>
            Got a party to plan? Make a group booking for a masterclass or a winery, brewery or
            distillery tour.{' '}
          </p>
          {[1, 2, 3, 4, 5, 6].map((e) => (
            <ExpCard
              key={e}
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

        <div className={styles.btn_holder}>
          <Button title="More experiences near you" dark={true} />
        </div> */}
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
              foodmakerCollection.map((fm) => <FMCard foodmaker={fm} pushRoute={pushRoute} />)}
          </div>

          <div className={styles.btn_holder}>
            <Button title="Explore foodmakers" dark onClick={moreFoodmakers} />
          </div>
        </div>
      </section>

      <div className={styles.faq_container}>
        <p className={styles.faq_heading}>Frequently Asked Questions</p>
        <section className={cls(styles.section_faq, 'faq')}>
          <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIconPosition="right"
            expandIcon={({ isActive }) => <PlusOutlined rotate={isActive ? 45 : 0} />}
          >
            <Panel header="What is Hungry Hugger?" key="1" className="site-collapse-custom-panel">
              <p>
                Hungry Hugger is the digital marketplace connecting you to local food lovers. If
                you’re looking for one platform to promote and sell your food services, products or
                experiences, then create a basic profile and you can set up your online shop on
                Hungry Hugger.
              </p>
            </Panel>
            <Panel header="Who is it designed for?" key="2" className="site-collapse-custom-panel">
              <p>
                Our platform is designed for anyone with a passion for quality good food and drink.
                Whether you have a professional culinary background or just opened your first
                business, Hungry Hugger gives you access to a global community of food lovers who
                are hungry for quality authentic food and drink.
              </p>
            </Panel>
            <Panel header="How does it work?" key="3" className="site-collapse-custom-panel">
              <p>
                Start by setting up your profile, where you can tell your story, talk about your
                specialties and show customers your passion for your craft. You’ll then need to
                select the service tags for the types of services and jobs you want to provide. This
                allows food lovers to find your profile quickly and easily when they’re searching
                the marketplace. You’ll also be able to quickly set up your shop. This will be the
                one-stop digital shop for your business, where you can easily manage all of your
                products and experiences in one place.
              </p>
            </Panel>
            <Panel
              header="I am an aspiring or independent maker, can I sign-up and create a profile?  "
              key="4"
              className="site-collapse-custom-panel"
            >
              <p>
                Yes! Not everyone is ready from day one — we’re passionate about connecting with all
                food lovers. You can start by building a professional profile, then choose a path
                that’s suitable for you and your business.
              </p>
            </Panel>
            <Panel
              header="Can I advertise my workshop or festival on your platform?"
              key="5"
              className="site-collapse-custom-panel"
            >
              <p>
                We do not support one-off event listings. As long as your experience is hosted by a
                dedicated food maker, your unique experience can be listed onto the platform once
                you created your basic profile.
              </p>
            </Panel>
            <Panel header="Got an announcement? " key="6" className="site-collapse-custom-panel">
              <p>
                If you have an announcement that you would like us to share with the community,
                please submit a media release at least 5 days in advance to hello@hungryhugger.com
                or submit via your account dashboard. This will make sure we can share your
                announcement in time.
              </p>
            </Panel>
          </Collapse>
        </section>
      </div>
      <BottomSection />
      <Footer />
    </div>
  )
}

Home.propTypes = {
  productList: T.arrayOf(T.shape),
  foodmakersList: T.arrayOf(T.shape),
  getPublicProductsAC: T.func,
  getPublicFoodmakersAC: T.func,
  pushRoute: T.func,
}

export default connect(
  ({ pages }) => ({ productList: pages.products, foodmakersList: pages.foodmakers }),
  {
    getPublicProductsAC,
    getPublicFoodmakersAC,
    pushRoute: push,
  },
)(Home)
