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
import mapMarker from 'assets/icons/svg/map_marker.svg'
import likeHeart from 'assets/icons/svg/like_heart.svg'
import envelope from 'assets/icons/svg/envelope.svg'
import review from 'assets/images/signup-flow/svg/medium-business.svg'
import coverPhoto from 'assets/images/landings/foodmakers/fm-leading.jpg'
import acessorieFm from 'assets/icons/svg/FM_page_acessorie.svg'
import Review from './components/Review'
import SliderSection from './components/SliderSection'
import styles from './foodmaker_page.module.scss'
import './foodmaker_page.less'

const cutted =
  'I’m a nutritionist ,and baking cooking instructor. When I was younger I went to England for a year .The experience I had sharing a dormitory kitchen with many students from other countries made me fascinated with world food culture. After I came back to Japan I got a nutrition certificate and learned about cooking more. After I graduated from college,I worked a cooking school run by Tokyo-gas which is the largest gas company in Japan.I have lots of experience teach…'

const FoodmakerPage = (props) => {
  const {
    fm,
    getFoodmakerInfoAC,
    account,
    location: { state: id },
  } = props
  const [readMore, setReadMore] = useState(false)

  console.log('%c   fm   ', 'color: white; background: salmon;', fm)

  useEffect(() => {
    getFoodmakerInfoAC(id)
  }, [])

  const onReadMore = () => setReadMore(!readMore)

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.info_section}>
            <div className={styles.avatar_container}>
              <img src={fm.userPhoto} alt="avatar" />
            </div>
            <div className={styles.location}>
              <div className={styles.maker_location}>
                <img className={styles.map_marker} src={mapMarker} alt="marker" />
                <p className={styles.from}>
                  Maker from <span className={styles.city}>{fm.city}</span>
                </p>
              </div>
              <div className={styles.rating_container}>
                <Rate style={{ color: '#EB5769' }} disabled defaultValue={fm.rating} />
                <p className={styles.qauntity}>(32)</p>
              </div>
            </div>
            <p className={styles.first_last_name}>{fm.firstName + ' ' + fm.lastName}</p>
            <div className={styles.descr}>
              <p>Quick and Easy Vegan Comfort Food. Feel free to get in touch!</p>
            </div>
            <div className={styles.btn_block}>
              <div className={styles.fav_button}>
                <img className={styles.heart} src={likeHeart} alt="heart" />
                <p className={styles.btn_text}>Favorite Maker</p>
                <p className={styles.likes}>(27)</p>
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

        <div className={styles.section_about}>
          <div className={styles.about_shop_container}>
            <div className={styles.about_shop}>
              <div className={styles.about_header}>
                <img className={styles.shop_icon} src={coverPhoto} alt="icon" />
                <p className={styles.shop_name}>Catch and eat</p>
              </div>
              <p className={styles.shop_descr}>
                Annette is a “Сatch and eat” head. She lives and breathes flavours. At his bar
                Oriental Elixir, he plays with flavours from around Asia. Exploring ingredients that
                are known only in small communities across Asia
              </p>
              <div className={styles.btn_container}>
                <Button title="Visit shop" dark={true} />
              </div>
            </div>
          </div>
          <div className={styles.about_me_container}>
            <div className={styles.about_me} onClick={onReadMore}>
              <img className={styles.acc} src={acessorieFm} alt="acc" />
              <p className={styles.heading}>Let’s talk about me ;)</p>
              <p className={styles.about_text}>
                {readMore ? cutted : cutted.substring(0, 350)}
                {!readMore && (
                  <span className={styles.readmore} onClick={onReadMore}>
                    {' '}
                    Read more...
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.section_experiences}>
          <p className={styles.exp_heading}>Upcoming experiences</p>
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

        <div className={styles.slider_section}>
          <SliderSection />
        </div>

        <div className={styles.section_review}>
          <img className={styles.section_image} src={review} alt="review" />
          <p className={styles.review_heading}>Reviews of Annett’s experiences</p>
          <div className={styles.review_container}>
            {[1, 2, 3].map((e) => (
              <Review key={e} />
            ))}
          </div>
        </div>
        <div className={styles.bottom_section_container}>
          <BottomSection />
        </div>
        <div className={styles.footer_container}>
          <Footer />
        </div>
      </div>
    </div>
  )
}

FoodmakerPage.propTypes = {
  getFoodmakerInfoAC: T.func.isRequired,
  fm: T.shape(),
}

export default connect(({ foodmaker, account }) => ({ fm: foodmaker, account }), {
  getFoodmakerInfoAC,
})(FoodmakerPage)
