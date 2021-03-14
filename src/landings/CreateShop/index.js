/* eslint-disable react/prop-types */
import React from 'react'
import cls from 'classnames'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Link } from 'react-router-dom'
import Scrollchor from 'react-scrollchor'
import Footer from 'components/Footer'
import leading from 'assets/images/landings/create_shop/leading.jpg'
import sec21 from 'assets/images/landings/create_shop/sec21.jpg'
import sec22 from 'assets/images/landings/create_shop/sec22.jpg'
import sec23 from 'assets/images/landings/create_shop/sec23.jpg'
import sec24 from 'assets/images/landings/create_shop/sec24.jpg'
import sec31 from 'assets/images/landings/create_shop/sec31.jpg'
import sec32 from 'assets/images/landings/create_shop/sec32.jpg'
import sec33 from 'assets/images/landings/create_shop/sec33.jpg'
import label from 'assets/images/landings/create_shop/label.svg'
import parachute from 'assets/images/landings/create_shop/parachute.svg'
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
            <p className={styles.hdr}>One place to manage it all</p>
            <p>
              Set up a one-stop digital shop for your business, and manage all of your products,
              services and experiences in one place. Our platform provides a simple way to open your
              business to a community of curious food lovers hungry for authentic food and drink.
            </p>
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
            <img className={styles.label} src={label} alt="label" />

            <p className={styles.hdr}>The booking platform that goes beyond and above</p>
            <p>
              We understand that many independent makers who offer experiences are makers at heart.
              Your secret recipe pastes, sauce and sweets. Your customers want to enjoy it at home
              too. Our platform provides a simple way to set up your online shop and manage
              everything in one place.
            </p>
          </div>
          <div className={styles.img_container}>
            <img src={sec21} alt="" className={styles.img} />
          </div>
        </section>

        <section className={cls(styles.body_section)}>
          <div className={styles.description}>
            <p className={styles.hdr}>Time to prepare</p>
            <p>
              Take the stress out of juggling production, service and management all at once. Our
              pre-order option means you can stay on top of your orders and prepare for upcoming
              batches.
            </p>
          </div>

          <div className={styles.img_container}>
            <img src={sec22} alt="" className={styles.img} />
          </div>
        </section>

        <section className={cls(styles.body_section, styles.reverse)}>
          <div className={styles.description}>
            <p className={styles.hdr}>Connecting your customer both offline and online</p>
            <p>
              Each shop receives a dedicated QR code, giving you a quick and versatile way to
              connect customers in-store to your Hungry Hugger shop online.
            </p>
          </div>
          <div className={styles.img_container}>
            <img src={sec23} alt="" className={styles.img} />
          </div>
        </section>

        <section className={cls(styles.body_section)}>
          <div className={styles.description}>
            <p className={styles.hdr}>Turn analytics into action</p>
            <p>
              Our bespoke analytics will help you find out what’s working and what isn’t. See how
              many people are viewing your listing and making an order. Along with our customer
              reviews, these actionable insights will help you improve your experience and drive
              more orders.
            </p>
          </div>
          <div className={styles.img_container}>
            <img src={sec24} alt="" className={styles.img} />
          </div>
        </section>
        <Link to={role === 'FOODMAKER' ? '/product_dashboard/listings' : '/signupflow'}>
          <button type="button" className={styles.btn_alone}>
            Let's start!
          </button>
        </Link>

        <section className={styles.learn_more}>
          <img className={styles.parachute} src={parachute} alt="parachute" />

          <h2>Learn more about other dedicated food makers</h2>
          <div className={styles.cards_wrapper}>
            <div className={styles.card}>
              <a href="">
                <img src={sec31} alt="sec" />
              </a>
              <a className={styles.card_link} href="">
                Chef’s shop sample {'>'}
              </a>
            </div>
            <div className={styles.card}>
              <a href="sec">
                <img src={sec32} alt="" />
              </a>
              <a className={styles.card_link} href="">
                Taste Master shop sample {'>'}
              </a>
            </div>
            <div className={styles.card}>
              <a href="sec">
                <img src={sec33} alt="" />
              </a>

              <a className={styles.card_link} href="">
                Craft Maker shop sample {'>'}
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
