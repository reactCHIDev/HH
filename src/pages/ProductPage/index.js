/* eslint-disable react/prop-types */
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Space, Spin} from 'antd'
import {useParams} from 'react-router-dom'
import {push} from 'connected-react-router'
import cls from 'classnames'

import {getProductInfoRequestAC} from 'actions/product'
import {getFoodmakerInfoAC} from 'actions/foodmaker'
import {getProductReviewsAC} from 'actions/reviews'
import {getShopByFoodmakerIdAC} from 'actions/shop'

import CardsContainer from 'components/CardsContainer'
import ProdCard from 'components/ProductCard'
import BottomSection from 'components/BottomSection'
import Footer from 'components/Footer'

import styles from './product_page.module.scss'
import ImagePreviewer from './components/ImagePreviewer'
import Header from './components/Header'
import Toolbar from './components/Toolbar'
import Tabs from './components/Tabs'
import AboutMaker from './components/AboutMaker'
import './product_page.less'

const ProductPage = (props) => {
    const {
        info,
        fm,
        deliveryMethods,
        getProductInfoRequest,
        getFoodmakerInfo,
        getProductReviews,
        getShopByFoodmakerId,
        pushRoute,
        productReviews,
        productReviewsCount,
        currentPage,
        isUserCanReview,
        isAuth
    } = props

    const {productId} = useParams()

    const openFoodmaker = () => pushRoute(`/${fm.hungryHuggerLink.split('/').pop()}`)

    useEffect(() => {
        getProductInfoRequest(productId)
        window.scrollTo(0, 0)
        // eslint-disable-next-line
    }, [productId])

    useEffect(() => {
        if (info?.userProfile) getFoodmakerInfo(info.userProfile.id)
        if (info?.userProfile) getShopByFoodmakerId(info.userProfile.id)
        if (info?.userProfile) getProductReviews({id: info.id, page: 1})
        // eslint-disable-next-line
    }, [info])


    if (!info || info.id != productId)
        return (
            <div style={{display: 'flex', justifyContent: 'center', paddingTop: 100}}>
                <Space size="middle">
                    <Spin size="large"/>
                </Space>
            </div>
        )

    return (
        <div className={styles.frame}>
            <div className={styles.product}>
                <div className={cls('container')}>
                    <div className={styles.content}>
                        <ImagePreviewer images={[info.coverPhoto, ...info.otherPhotos]}/>
                        <div className={styles.inner_content}>
                            <Header text={info.title} isFavourite={info.isFavorite} id={info.id} isAuth={isAuth}/>
                            <Toolbar params={info.parameters} isPreOrderOnly={false}/>
                            <Tabs
                                product={info}
                                deliveryMethods={deliveryMethods}
                                productReviews={productReviews}
                                productReviewsCount={productReviewsCount}
                                currentPage={currentPage}
                                isUserCanReview={isUserCanReview}
                            />
                            <div className={styles.card_link} onClick={openFoodmaker}>
                                <AboutMaker
                                    name={fm.profileName}
                                    text={info.userProfile.about}
                                    photo={fm.userPhoto}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.related_products}>
                <h2>Related products</h2>
                <div className={styles.content}>
                    <CardsContainer>
                        {info &&
                        info?.relatedProducts &&
                        info.relatedProducts.map((product) => (
                            <ProdCard
                                key={product.id}
                                id={product.id}
                                pushRoute={pushRoute}
                                pathname="/product"
                                photo={product.coverPhoto}
                                tags={product.productTags.map((t) => t.tagName)}
                                name={product.title}
                                price={product.price}
                                rating={product.rating}
                                rateCount={product.reviews?.length}
                                isShowCart
                                product={product}
                                isAuth={isAuth}
                            />
                        ))}
                    </CardsContainer>
                </div>
            </div>
            <BottomSection/>
            <Footer/>
        </div>
    )
}

// ProductPage.propTypes = {
//   info: T.shape,
//   fm: T.shape,
//   deliveryMethods: T.shape,
//   getProductInfoRequest: T.func.isRequired,
//   getFoodmakerInfo: T.func.isRequired,
//   getShopByFoodmakerId: T.func.isRequired,
//   pushRoute: T.func.isRequired,
// }

export default connect(
    ({product, foodmaker, shop, reviews, login}) => ({
        info: product.info,
        fm: foodmaker,
        deliveryMethods: shop?.shopData?.deliveryMethods,
        productReviews: reviews.productReviews,
        productReviewsCount: reviews.productReviewsCount,
        currentPage: reviews.currentPage,
        isUserCanReview: reviews.isUserCanReview,
        isAuth: login.authorized
    }),
    {
        getProductInfoRequest: getProductInfoRequestAC,
        getFoodmakerInfo: getFoodmakerInfoAC,
        getShopByFoodmakerId: getShopByFoodmakerIdAC,
        pushRoute: push,
        getProductReviews: getProductReviewsAC,
    },
)(ProductPage)
