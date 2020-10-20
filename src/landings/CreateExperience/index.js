import React from 'react'
import T from 'prop-types'
import cls from 'classnames'
import Header from 'components/Header'
import Footer from 'components/Footer'
import leading from 'assets/images/landings/create_experience/leading.jpg'
import sec21 from 'assets/images/landings/create_experience/sec21.jpg'
import sec22 from 'assets/images/landings/create_experience/sec22.jpg'
import sec23 from 'assets/images/landings/create_experience/sec23.jpg'
import sec24 from 'assets/images/landings/create_experience/sec24.jpg'
import sec31 from 'assets/images/landings/create_experience/sec31.jpg'
import sec32 from 'assets/images/landings/create_experience/sec32.jpg'
import sec33 from 'assets/images/landings/create_experience/sec33.jpg'
import calendar from 'assets/images/landings/create_experience/calendar.svg'
import mixer from 'assets/images/landings/create_experience/mixer.svg'
import styles from './create_experience.module.scss'

const CreateExperience = () => {
  return (
    <>
      <Header />
      <main>
        <section className={styles.standart_section}>
          <div className={styles.description}>
            <h2 style={{ fontSize: 56, lineHeight: '64px' }}>
              Get discovered with the right community
            </h2>
            <p>Reach a diverse global community of food lovers by running bespoke experiences. </p>
            <button type="button" className={styles.btn_leading}>
              Let’s start!
            </button>
          </div>
          <div className={styles.img_container}>
            <img src={leading} alt="" className={styles.img} />
          </div>
        </section>

        <section className={cls(styles.standart_section, styles.reverse)}>
          <div className={styles.description}>
            <img className={styles.calendar} src={calendar} alt="calendar" />

            <h2>The booking platform that empowers you</h2>
            <p>
              Our platform provides a simple way to open your business to a community of curious
              food lovers who are hungry for genuine food and drink experiences. You can list,
              manage and re-schedule your experience easily. Food lovers can now find all your
              experiences in one place.
            </p>
          </div>
          <div className={styles.img_container}>
            <img src={sec21} alt="" className={styles.img} />
          </div>
        </section>

        <section className={styles.standart_section}>
          <div className={styles.description}>
            <h2>There is no template</h2>
            <p>
              Your experience doesn’t need to be a class, a workshop or a tasting experience. There
              is no template for listing on Hungry Hugger. All it takes is a passion for food and
              drink. Some of our hosts are starting on their culinary journeys — start-ups with a
              fresh idea and an innovative approach. Others have been in the business for decades,
              established venues with a heritage and a menu that goes back generations. We want to
              give you the opportunity to share something unique about your craft, to give your
              business a personal story and to connect with customers who are genuinely interested
              in what you do.
            </p>
          </div>

          <div className={styles.img_container}>
            <img src={sec22} alt="" className={styles.img} />
          </div>
        </section>

        <section className={cls(styles.standart_section, styles.reverse)}>
          <div className={styles.description}>
            <h2>Not just another footnote</h2>
            <p>
              With a community as dedicated as ours, customer reviews for your experiences will
              carry more weight than social media. Their reviews will take you beyond simple star
              ratings and create genuine word of mouth momentum for your business
            </p>
          </div>
          <div className={styles.img_container}>
            <img src={sec23} alt="" className={styles.img} />
          </div>
        </section>

        <section className={cls(styles.standart_section, styles)}>
          <div className={styles.description}>
            <h2>Turn analytics into action</h2>
            <p>
              Our bespoke analytics will help you find out what’s working and what isn’t. See how
              many people are viewing your listing and making an order. Along with our customer
              reviews, these actionable insights will help you improve your experience and drive
              more bookings.
            </p>
          </div>
          <div className={styles.img_container}>
            <img src={sec24} alt="" className={styles.img} />
          </div>
        </section>
        <button type="button" className={styles.btn}>
          Let's start!
        </button>

        <section className={styles.learn_more}>
          <img className={styles.mixer} src={mixer} alt="mixer" />

          <h2>Learn more about other dedicated food makers</h2>
          <div className={styles.cards_wrapper}>
            <div className={styles.card}>
              <img src={sec31} alt="" />

              <a href="">Chef’s experience sample</a>
            </div>
            <div className={styles.card}>
              <img src={sec32} alt="" />

              <a href="">Taste Master experience sample</a>
            </div>
            <div className={styles.card}>
              <img src={sec33} alt="" />

              <a href="">Craft Maker experience sample</a>
            </div>
          </div>
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

CreateExperience.propTypes = {}

export default CreateExperience
