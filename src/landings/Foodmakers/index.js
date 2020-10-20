import React from 'react'
import cls from 'classnames'
import { Collapse } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Header from 'components/Header'
import Footer from 'components/Footer'
import leading from 'assets/images/landings/foodmakers/fm-leading.jpg'
import sec21 from 'assets/images/landings/foodmakers/sec2-1.jpg'
import sec22 from 'assets/images/landings/foodmakers/sec2-2.jpg'
import sec23 from 'assets/images/landings/foodmakers/sec2-3.jpg'
import sec31 from 'assets/images/landings/foodmakers/sec3-1.jpg'
import sec32 from 'assets/images/landings/foodmakers/sec3-2.jpg'
import sec33 from 'assets/images/landings/foodmakers/sec3-3.jpg'
import bag from 'assets/images/landings/foodmakers/bag.svg'
import styles from './foodmakers.module.scss'
import './foodmakers.less'

const Foodmakers = () => {
  const { Panel } = Collapse
  return (
    <>
      <Header />
      <main>
        <section className={styles.standart_section}>
          <div className={styles.description}>
            <h2 style={{ fontSize: 56, lineHeight: '64px' }}>
              Calling on all passionate food and drink makers!
            </h2>
            <p>
              Join the online marketplace connecting passionate food and drink hosts to a global
              community of food lovers.
            </p>
            <button type="button" className={styles.btn}>
              Tell me more
            </button>
          </div>
          <div className={styles.img_container}>
            <img src={leading} alt="" className={styles.img} />
          </div>
        </section>

        <section className={styles.patch}>
          <h2 className={styles.header}>
            Hungry Hugger is a discovery and booking platform connecting passionate food and drink
            makers with local food lover’s community.
          </h2>
          <p className={styles.desc}>
            We are calling on makers who run unique, authentic, or sustainable businesses to join
            the community.
          </p>
          <img className={styles.bag} src={bag} alt="bag" />
        </section>

        <div className={styles.headings}>
          <h2 className={styles.sec2head}>
            We know how hard you have been working to build your online presence.
          </h2>
          <h5 className={styles.sec2subhead}>Be seen consistently and reach new customers.</h5>
        </div>

        <section className={cls(styles.standart_section, styles.reverse)}>
          <div className={styles.description}>
            <h2>Boost your online presence with your professional profile</h2>
            <p>
              Build a professional profile that highlights your speciality and services for event
              hire.
            </p>
            <button type="button" className={styles.btn}>
              Create profile
            </button>
          </div>
          <div className={styles.img_container}>
            <img src={sec21} alt="" className={styles.img} />
          </div>
        </section>

        <section className={styles.standart_section}>
          <div className={styles.description}>
            <h2>List your experience and events where curious food lovers are</h2>
            <p>Reach new audience with a diverse yet targeted food and drink makers community.</p>
            <button type="button" className={styles.btn}>
              Create experience
            </button>
          </div>
          <div className={styles.img_container}>
            <img src={sec22} alt="" className={styles.img} />
          </div>
        </section>

        <section className={cls(styles.standart_section, styles.reverse)}>
          <div className={styles.description}>
            <h2>One place to manage all your products and experiences</h2>
            <p>
              Set up a shop to list your products, services and experiences – all in the one place.
            </p>
            <button type="button" className={styles.btn}>
              Create shop
            </button>
          </div>
          <div className={styles.img_container}>
            <img src={sec23} alt="" className={styles.img} />
          </div>
        </section>

        <section className={styles.card_section}>
          <div className={styles.card}>
            <img src={sec31} alt="" />
            <h2>Event hire</h2>
            <p>
              Whether you are looking to get hired or building your visibility within a speciality,
              our platform enables you to be discovered and found easily.{' '}
            </p>
            <a href="">Learn more</a>
          </div>
          <div className={styles.card}>
            <img src={sec32} alt="" />
            <h2>Classes, workshops, tours and festivals</h2>
            <p>
              Besides selling your goodies, many of our passionate food and drinks makers choose to
              share their passion with cooking classes, tasting workshops, tableware workshops or
              brewery tours. Our platform helps you to streamline your operations, secure bookings
              and enable food lovers’ reviews for every experience to boost your sales.
            </p>
            <a href="">Learn more</a>
          </div>
          <div className={styles.card}>
            <img src={sec33} alt="" />
            <h2>E-commerce and retail</h2>
            <p>
              We understand you are makers at heart. Whether you are making your signature sauce,
              custom brew, handmade tableware or maker’s gift box that you want to share with your
              customers. You can set up your own shop and get it up and running quickly.
            </p>
            <a href="">Learn more</a>
          </div>
        </section>

        <section className={cls(styles.section_faq, 'faq')}>
          <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIconPosition="right"
            expandIcon={({ isActive }) => <PlusOutlined rotate={isActive ? 45 : 0} />}
          >
            <Panel header="What is Hungry Hugger?" key="1" className="site-collapse-custom-panel">
              <p>
                Hungry Hugger is a discovery and booking platform connecting passionate food and
                drink makers to a global community of food lovers. If you are looking for a place
                where you can promote your food services, classes, workshops or event experiences
                and manage all bookings in one place, then you should create a profile and set up
                your own shop with Hungry Hugger.
              </p>
            </Panel>
            <Panel header="Who is it designed for?" key="2" className="site-collapse-custom-panel">
              <p>
                Hungry Hugger is a discovery and booking platform connecting passionate food and
                drink makers to a global community of food lovers. If you are looking for a place
                where you can promote your food services, classes, workshops or event experiences
                and manage all bookings in one place, then you should create a profile and set up
                your own shop with Hungry Hugger.
              </p>
            </Panel>
            <Panel header="How does it work?" key="3" className="site-collapse-custom-panel">
              <p>
                Hungry Hugger is a discovery and booking platform connecting passionate food and
                drink makers to a global community of food lovers. If you are looking for a place
                where you can promote your food services, classes, workshops or event experiences
                and manage all bookings in one place, then you should create a profile and set up
                your own shop with Hungry Hugger.
              </p>
            </Panel>
            <Panel header="What about the fees?" key="4" className="site-collapse-custom-panel">
              <p>
                Hungry Hugger is a discovery and booking platform connecting passionate food and
                drink makers to a global community of food lovers. If you are looking for a place
                where you can promote your food services, classes, workshops or event experiences
                and manage all bookings in one place, then you should create a profile and set up
                your own shop with Hungry Hugger.
              </p>
            </Panel>
            <Panel
              header="I am an aspiring independent maker, can I sign-up and create a profile? "
              key="5"
              className="site-collapse-custom-panel"
            >
              <p>
                Hungry Hugger is a discovery and booking platform connecting passionate food and
                drink makers to a global community of food lovers. If you are looking for a place
                where you can promote your food services, classes, workshops or event experiences
                and manage all bookings in one place, then you should create a profile and set up
                your own shop with Hungry Hugger.
              </p>
            </Panel>
            <Panel
              header="Can I advertise my workshop or festival on your platform?"
              key="6"
              className="site-collapse-custom-panel"
            >
              <p>
                Hungry Hugger is a discovery and booking platform connecting passionate food and
                drink makers to a global community of food lovers. If you are looking for a place
                where you can promote your food services, classes, workshops or event experiences
                and manage all bookings in one place, then you should create a profile and set up
                your own shop with Hungry Hugger.
              </p>
            </Panel>
          </Collapse>
        </section>

        <section className={styles.bottom_sec}>
          <div className={styles.joincard}>
            <p>Join a global community of food lovers and food makers</p>
            <button type="button">Join now!</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Foodmakers
