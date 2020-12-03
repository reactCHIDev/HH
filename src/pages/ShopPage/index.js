import React, { useState, useEffect } from 'react'
import T from 'prop-types'
import { connect } from 'react-redux'
import { getFoodmakerInfoAC } from 'actions/foodmaker'
import Button from 'components/Button'
import ExpCard from 'components/ExperienceCard'
import { Rate } from 'antd'
import BottomSection from 'components/BottomSection'
import Footer from 'components/Footer'
import avatar from 'assets/TMP-AVATAR.jpg'
import sec21 from 'assets/images/landings/create_profile/sec21.jpg'
import mapMarker from 'assets/icons/svg/map_marker gray.svg'
import likeHeart from 'assets/icons/svg/like_heart_red.svg'
import envelope from 'assets/icons/svg/envelope white.svg'
import coverPhoto from 'assets/images/landings/foodmakers/fm-leading.jpg'
import acessorieFm from 'assets/icons/svg/FM_page_acessorie.svg'
import styles from './shop_page.module.scss'
import './shop_page.less'
import Pattern2 from 'assets/images/pattern 2.svg'
import Shop from 'assets/images/landings/create_shop/shop.svg'
import Avatar from 'assets/images/landings/create_shop/avatar.jpg'

const aboutShop =
  "After walking the same ground as the best boxers of all time, learning some of it's history and watching future legends prepare for upcoming matches. It’s your turn to step into the ring. After walking the same ground as the best boxers of all time, learning some of it's history and watching future legends prepare for upcoming matches, it’s your turn to step into the ring. It's history and watching future legends prepare for upcoming matches. "

const ShopPage = (props) => {
  const { fm, getFoodmakerInfoAC, account } = props

  /*   useEffect(() => {
    getFoodmakerInfoAC(account.id)
  }, [account]) */

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.pattern}><img src={Pattern2} alt="Pattern2"/></div>
        <div className={styles.container}>
          <div className={styles.info_section}>
            <div className={styles.location}>
              <div className={styles.maker_location}>
                <img className={styles.map_marker} src={mapMarker} alt="marker" />
                <p className={styles.from}>
                  Shop from <span className={styles.city}>{fm.city}</span>
                </p>
              </div>
              <div className={styles.rating_container}>
                <Rate style={{ color: '#EB5769' }} disabled defaultValue={fm.rating} />
                <p className={styles.qauntity}>(32)</p>
              </div>
            </div>
            <p className={styles.first_last_name}>{fm.firstName + ' ' + fm.lastName}</p>
            <div className={styles.descr}>
              <p>Event hire, custom made, catering.</p>
              <p>Quick and Easy Vegan Comfort Food. Feel free to get in touch!</p>
            </div>
            <div className={styles.btn_block}>
              <div className={styles.fav_button}>
                <img className={styles.heart} src={likeHeart} alt="heart" />
                <p className={styles.btn_text}>Favorite Maker</p>
                <span className={styles.likes}>(27)</span>
              </div>
              <div className={styles.send_msg}>
                <img className={styles.heart} src={envelope} alt="envelope" />
              </div>
            </div>
          </div>
          <div className={styles.photo_section}>
            <div className={styles.cover_photo_container}>
              <img className={styles.cover_photo} src={coverPhoto} alt="envelope" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.content_container}>
            <div className={styles.section_experiences}>
              <div className={styles.exp_container}>
                {[1, 2, 3, 4, 5, 6].map((e) => (
                  <ExpCard
                    key={e}
                    photo={sec21}
                    tags={[
                      'Chef',
                      'Backer',
                      'Mixologist',
                      'Taste maker',
                      'Food maker',
                      'Craft maker',
                      'Urban Farmer',
                      'Chocolatier',
                    ]}
                    name="Singapore Cooking Lesson: Charity Project"
                    price={650}
                    rating={3}
                    rateCount={32}
                  />
                ))}
              </div>
              <div className={styles.exp_btn_container}>
                <Button title="See all experiences" dark={true} />
              </div>
            </div>

            <div className={styles.about_shop_container}>
              <div className={styles.about_shop}>
                <img className={styles.acc} src={Shop} alt="Shop" />
                <p className={styles.heading}>A few words about the shop</p>
                <p className={styles.about_text}>{aboutShop}</p>
                <div className={styles.shop_autor}>
                  <img src={Avatar} alt="Avatar" className={styles.avatar}/>
                  <div className={styles.text_holder}>
                    <span className={styles.owner}>Shop owner</span>
                    <strong className={styles.title}>Annette Pehrsson</strong>
                    <p>I’m a nutritionist ,and baking cooking instructor. When I was younger I went to England for a year .The experience I had sharing a dormy... <a href="#">Read more</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

         
        </div>
      </div>
      <div className={styles.bottom_section_container}>
        <BottomSection />
      </div>
      <div className={styles.footer_container}>
        <Footer />
      </div>
    </div>
  )
}

ShopPage.propTypes = {
  getFoodmakerInfoAC: T.func.isRequired,
  fm: T.shape(),
}

export default connect(({ foodmaker, account }) => ({ fm: foodmaker, account }), {
  getFoodmakerInfoAC,
})(ShopPage)