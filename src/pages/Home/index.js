import React from 'react'
import { connect } from 'react-redux'
import ExpCard from 'components/ExperienceCard'
import cls from 'classnames'
import BottomSection from 'components/BottomSection'
import Footer from 'components/Footer'
import stub2 from 'assets/images/landings/create_experience/sec21.jpg'
import { Collapse } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import T from 'prop-types'
import styles from './home.module.scss'
import './home.less'

const Home = (props) => {
  const { Panel } = Collapse

  return (
    <div className={styles.container}>
      <div className={styles.page_header}>
        <div className={styles.header_content}>
          <p>Connecting curious Food Lovers</p>
          <p>to a global marketplace of local and dedicated food makers</p>
          <div className={styles.search_block}>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>What are you looking for? *</label>
              <input className={styles.input} type="text" />
            </div>
            <div className={styles.input_wrapper}>
              <label className={styles.label}>City *</label>
              <input className={styles.input} type="text" />
            </div>
            <div className={styles.input_wrapper}>
              <button type="button">Q</button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.exp_section}>
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
        </div>

        <div className={styles.product_section}>
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

        <div className={styles.lessons_section}>
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
      </div>

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

Home.propTypes = {}

export default connect(null, null)(Home)
