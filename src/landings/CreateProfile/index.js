import React from 'react'
import cls from 'classnames'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Link } from 'react-router-dom'
import Scrollchor from 'react-scrollchor'
import Footer from 'components/Footer'
import leading from 'assets/images/landings/create_profile/leading.jpg'
import sec21 from 'assets/images/landings/create_profile/sec21.jpg'
import sec22 from 'assets/images/landings/create_profile/sec22.jpg'
import sec23 from 'assets/images/landings/create_profile/sec23.jpg'
import sec31 from 'assets/images/landings/create_profile/sec41.jpg'
import sec32 from 'assets/images/landings/create_profile/sec42.jpg'
import sec33 from 'assets/images/landings/create_profile/sec43.jpg'
import how1 from 'assets/images/landings/create_profile/howitworks1.svg'
import how2 from 'assets/images/landings/create_profile/howitworks2.svg'
import how31 from 'assets/images/landings/create_profile/howitworks31.svg'
import how32 from 'assets/images/landings/create_profile/howitworks32.svg'
import donut from 'assets/images/landings/create_profile/donut.svg'
import cake from 'assets/images/landings/create_profile/cake.svg'
import glass from 'assets/images/landings/create_profile/glass.svg'
import styles from '../styles.module.scss'

const CreateProfile = ({ role }) => {
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
            <p className={styles.hdr}>Let your brand shine</p>
            <p>Build a professional profile that showcases your talents and specialties.</p>
            <Scrollchor to="#more" animate={{ offset: -100, duration: 300 }} disableHistory>
              <button type="button" className={styles.btn_leading}>
                Start today
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
            <img className={styles.cake} src={cake} alt="cake" />
            <p className={styles.hdr}>Digital without the hassle</p>
            <p>
              Create an online presence without the hassle of website creation or daily social media
              maintenance. Get back to doing what you set out to do: connecting with customers and
              sharing your products or services.
            </p>
          </div>
          <div className={styles.img_container}>
            <img src={sec21} alt="" className={styles.img} />
          </div>
        </section>

        <section className={cls(styles.body_section)}>
          <div className={styles.description}>
            <p className={styles.hdr}>Not just another footnote</p>
            <p>
              On Hungry Hugger, you’re not just the footnote on a product page. Your methods, your
              passion and your story are what our customers are looking for.
            </p>
            <p>
              Your profile is an opportunity to share something unique about your craft, to give
              your business a personal story and to connect with customers who are genuinely
              interested in what you do.
            </p>
          </div>

          <div className={styles.img_container}>
            <img src={sec22} alt="" className={styles.img} />
            <img src={donut} alt="" className={styles.donut} />
          </div>
        </section>

        <section className={cls(styles.body_section, styles.reverse)}>
          <div className={styles.description}>
            <p className={styles.hdr}>Get hired</p>
            <p>
              Our curious food lovers are sometimes looking for the right expert for their private
              event or special design cake. Highlight your strength and reach your target customer.
            </p>
          </div>
          <div className={styles.img_container}>
            <img src={sec23} alt="" className={styles.img} />
          </div>
        </section>

        <section className={styles.card_section_svg}>
          <h2>How it works?</h2>
          <div className={styles.cards_wrapper}>
            <div className={styles.card}>
              <div className={styles.img_wrapper}>
                <img src={how1} alt="" />
              </div>
              <p>1. Create a profile and list your specialty and services</p>
            </div>
            <div className={styles.card}>
              <div className={styles.img_wrapper}>
                <img src={how2} alt="" />
              </div>
              <p>
                2. Users can browse your profile and services and send you enquiries or booking
                request.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.img_wrapper}>
                <div className={styles.glue}>
                  <img className={styles.img1} src={how31} alt="" />
                  <img className={styles.img2} src={how32} alt="" />
                </div>
              </div>
              <p>3. Review requests, send quotes and get hired.</p>
            </div>
          </div>
          <Link to={role == 'FOODMAKER' ? '/exp_dashboard/listings' : '/signupflow'}>
            <button type="button" className={styles.btn_svg_card}>
              Let's start!
            </button>
          </Link>
        </section>

        <section className={styles.learn_more}>
          <img className={styles.abs} src={glass} alt="glass" />
          <h2>Learn more about other dedicated food makers</h2>
          <div className={styles.cards_wrapper}>
            <div className={styles.card}>
              <a href="">
                <img src={sec31} alt="" />
              </a>

              <a className={styles.card_link} href="">
                Chef’s profile sample {'>'}
              </a>
            </div>
            <div className={styles.card}>
              <a href="">
                <img src={sec32} alt="" />
              </a>

              <a className={styles.card_link} href="">
                Taste Master profile sample {'>'}
              </a>
            </div>
            <div className={styles.card}>
              <a href="">
                <img src={sec33} alt="" />
              </a>

              <a className={styles.card_link} href="">
                Craft Maker profile sample {'>'}
              </a>
            </div>
          </div>
        </section>

        <section className={styles.bottom_sec}>
          <div className={styles.joincard}>
            <p>Join a global community of food lovers and food makers</p>
            <Link to={role == 'FOODMAKER' ? '/exp_dashboard/listings' : '/signupflow'}>
              <button type="button">Join now!</button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default CreateProfile
