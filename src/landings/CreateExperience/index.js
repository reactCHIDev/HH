/* eslint-disable react/prop-types */
import React from 'react'
import cls from 'classnames'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Link } from 'react-router-dom'
import Scrollchor from 'react-scrollchor'
import Footer from 'components/Footer'
import leading from 'assets/images/landings/create_experience/leading.jpg'
import sec21 from 'assets/images/landings/create_experience/sec21.jpg'
import sec22 from 'assets/images/landings/create_experience/sec22.jpg'
import sec23 from 'assets/images/landings/create_experience/sec23.jpg'
import sec24 from 'assets/images/landings/create_experience/sec24.jpg'
import sec31 from 'assets/images/landings/create_experience/sec31.jpg'
import sec32 from 'assets/images/landings/create_experience/sec32.jpg'
import sec33 from 'assets/images/landings/create_experience/sec33.jpg'
import star1 from 'assets/images/landings/create_experience/star1.svg'
import star2 from 'assets/images/landings/create_experience/star2.svg'
import star3 from 'assets/images/landings/create_experience/star3.svg'
import sparks from 'assets/images/landings/create_experience/sparks.svg'
import calendar from 'assets/images/landings/create_experience/calendar.svg'
import mixer from 'assets/images/landings/create_experience/mixer.svg'
import styles from '../styles.module.scss'

const CreateExperience = ({ role }) => {
  const settings = {
    draggable: true,
    touchThreshold: 30,
    useCSS: true,
    swipeToSlide: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <div className={styles.body_container}>
      <main className={styles.main}>
        <section className={styles.standart_section}>
          <div className={styles.description}>
            <p className={styles.hdr}>Get discovered with the right community</p>
            <p>Reach a diverse global community of food lovers by running bespoke experiences. </p>
            <Scrollchor to="#more" animate={{ offset: -100, duration: 300 }} disableHistory>
              <button type="button" className={styles.btn_leading}>
                Let’s start!
              </button>
            </Scrollchor>
          </div>
          <div className={styles.overflow_container}>
            <div className={styles.slider_container}>
              <Slider {...settings}>
                <div className={styles.img_container}>
                  <img src={leading} alt="" className={styles.img} />
                </div>
                <div className={styles.img_container}>
                  <img src={leading} alt="" className={styles.img} />
                </div>
                <div className={styles.img_container}>
                  <img src={leading} alt="" className={styles.img} />
                </div>
              </Slider>
            </div>
          </div>
        </section>

        <section id="more" className={cls(styles.body_section, styles.reverse)}>
          <div className={styles.description}>
            <img className={styles.calendar} src={mixer} alt="calendar" />

            <p className={styles.hdr}>The booking platform that empowers you</p>
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

        <section className={cls(styles.body_section)}>
          <div className={styles.description}>
            <p className={styles.hdr}>There is no template</p>
            <p>
              Your experience doesn’t need to be a class, a workshop or a tasting experience. There
              is no template for listing on Hungry Hugger. All it takes is a passion for food and
              drink. Some of our hosts are starting on their culinary journeys — start-ups with a
              fresh idea and an innovative approach. Others have been in the business for decades,
              established venues with a heritage and a menu that goes back generations.
            </p>
            <p>
              We want to give you the opportunity to share something unique about your craft, to
              give your business a personal story and to connect with customers who are genuinely
              interested in what you do.
            </p>
          </div>

          <div className={styles.img_container}>
            <img src={sec22} alt="" className={styles.img} />
          </div>
        </section>

        <section className={cls(styles.body_section, styles.reverse)}>
          <div className={styles.description}>
            <p className={styles.hdr}>Not just another footnote</p>
            <p>
              With a community as dedicated as ours, customer reviews for your experiences will
              carry more weight than social media. Their reviews will take you beyond simple star
              ratings and create genuine word of mouth momentum for your business
            </p>
          </div>
          <div className={styles.img_container}>
            <img src={sec23} alt="" className={styles.img} />
            <img src={star1} alt="" className={styles.star1} />
            <img src={star2} alt="" className={styles.star2} />
            <img src={star3} alt="" className={styles.star3} />
          </div>
        </section>

        <section className={cls(styles.body_section)}>
          <div className={styles.description}>
            <p className={styles.hdr}>Turn analytics into action</p>
            <p>
              Our bespoke analytics will help you find out what’s working and what isn’t. See how
              many people are viewing your listing and making an order. Along with our customer
              reviews, these actionable insights will help you improve your experience and drive
              more bookings.
            </p>
          </div>
          <div className={styles.img_container}>
            <img src={sec24} alt="" className={styles.img} />
            <img src={sparks} alt="" className={styles.sparks} />
          </div>
        </section>
        <Link to={role === 'FOODMAKER' ? '/product_dashboard/listings' : '/signupflow'}>
          <button type="button" className={styles.btn_alone}>
            Let's start!
          </button>
        </Link>

        <section className={styles.learn_more}>
          <img className={styles.abs} src={calendar} alt="mixer" />

          <h2>Learn more about other dedicated food makers</h2>
          <div className={styles.cards_wrapper}>
            <div className={styles.card}>
              <a href="">
                <img src={sec31} alt="" />
              </a>

              <a className={styles.card_link} href="">
                Chef’s experience sample {'>'}
              </a>
            </div>
            <div className={styles.card}>
              <a href="">
                <img src={sec32} alt="" />
              </a>

              <a className={styles.card_link} href="">
                Taste Master experience sample {'>'}
              </a>
            </div>
            <div className={styles.card}>
              <a href="">
                <img src={sec33} alt="" />
              </a>

              <a className={styles.card_link} href="">
                Craft Maker experience sample {'>'}
              </a>
            </div>
          </div>
        </section>

        <section className={styles.bottom_sec}>
          <div className={styles.joincard}>
            <p>Join a global community of food lovers and food makers</p>
            <Link to={role === 'FOODMAKER' ? '/product_dashboard/listings' : '/signupflow'}>
              <button type="button">Join now!</button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default CreateExperience
