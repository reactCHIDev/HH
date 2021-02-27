export default {
  url: true ? process.env.REACT_APP_BASE_URL : 'localhost:3000',

  // Test
  userbyname: '/v1/user/profile_name/',
  userbyemail: '/v1/user/email/',

  // Auth
  signUpUser: '/v1/user/register_foodlover',
  signUpFoodmaker: '/v1/user/register_foodmaker',
  signUpLoverAsFoodmaker: '/v1/user/register_foodlover_as_foodmaker',
  loginUser: '/v1/user/login',
  logout: '/v1/user/logout',
  forgotStep1: '/v1/user/forgot_password/step_one',
  forgotStep3: '/v1/user/forgot_password/step_two',
  billingHistory: '/v1/account/billing',

  // Account
  getUserAccount: '/v1/account/info/',
  getUserByHHLink: '/v1/user/hh_link/',
  updateSettings: '/v1/account/update_settings',
  confirmEmailUpdate: '/v1/account/confirm_email_update',
  updatePhotoName: '/v1/account/update_photo_name',
  registrationEmail: '/v1/user/verify_registration_email',
  experiencesReviews: '',
  // Listing

  // Product
  createProduct: '/v1/product/create',
  updateProduct: '/v1/product/update',
  getProductInfo: '/v1/product/info/',
  toggleStatus: '/v1/product/toggle_status',
  duplicate: '/v1/product/duplicate/',

  // Experience
  createExperience: '/v1/experience/create',
  updateExperience: '/v1/experience/update',
  getExperiencesByDate: '/v1/experience/list_my_experiences_by_date?date=',
  expTypes: '/v1/experience/types',
  expTags: '/v1/experience/tags',
  toggleExpStatus: '/v1/experience/toggle_status',
  getExperienceById: '/v1/experience/by_id/',
  experienceReviews: '/v1/review/experience/by_id/',
  // /v1/review/experience/by_id/23?startIndex=0&limit=3
  foodmakerExperiencesReviews: '/v1/review/experience/by_foodmaker/',
  // /v1/review/experience/by_foodmaker/214
  getBookingByDate: '/v1/experience/',
  createPublicBooking: '/v1/experience/create/public_booking',
  fmBookingHistory: '',

  // Foodmaker
  getFoodmakerInfo: '/v1/account/foodmaker/',
  getFoodmakerInfoByName: '/v1/foodmaker/info_by_profile_name/',
  updateFoodmakerAccount: '/v1/account/update_foodmaker',
  createWithdraw: '/v1/foodmaker/create_withdraw_request',
  updateBankData: '/v1/foodmaker/payment_info',

  // System
  getProductTypes: '/v1/product/list_types',
  getServiceTags: '/v1/tag/service_tag',
  getSpecialityTags: '/v1/tag/speciality_tag',
  getProductTags: '/v1/product/tags',
  getCities: '/v1/city/list',
  getCountries: '/v1/country/list',

  // Shop
  isShopExist: '/v1/shop/check_if_exist/',
  updateShop: '/v1/shop/update',
  createShop: '/v1/shop/create',
  getShopByFoodmakerId: '/v1/shop/foodmaker/',
  getShopByUrl: '/v1/shop/shop_url/',

  // Home page
  getHomePageProducts: '/v1/product/list_all',
  listFoodmakersForHome: '/v1/foodmaker/list_all',

  // Stripe
  stripe: '/v1/stripe/create_payment',
  stripeCheckout: '/v1/stripe/create-checkout-session',

  // Order
  order: '/v1/order/create',
  charge: '/v1/stripe/charge',
  fm_orders: '/v1/order/list_foodmaker_orders',
  fl_orders: '/v1/order/list_customer_orders',
  fmOrderInfo: '/v1/order/foodmaker_order/',
  flOrderInfo: '/v1/order/customer_order/',
  changeDelStatus: '/v1/order/update_status',

  // Admin
  getUsersList: '/v1/admin/user/list_all',
  getShopsList: '/v1/admin/shop/list_all',
  getWithdrawList: '/v1/admin/foodmaker/withdraw',
  approveWithdraw: '/v1/admin/foodmaker/withdraw',

  // Favourites
  toggleFavouriteProduct: '/v1/product/toggle_favorite',
  toggleFavouriteFoodmaker: '/v1/foodmaker/toggle_favorite',
  toggleFavouriteShop: '/v1/shop/toggle_favorite',
  toggleFavouriteExp: '/v1/experience/toggle_favorite',

  // Search
  searchInProducts: '/v1/search/product/predictive',
  searchInFoodMakers: '/v1/search/foodmaker/predictive',
  searchInExperiences: '/v1/search/experience/predictive',

  // Files
  deleteFile: '/v1/file/delete/file/',

  // Review
  unreviewedProduct: '/v1/review/product/latest/pending',
  createProductReview: '/v1/review/product/create',
  getFlProductReviews: '/v1/review/product/list_my',
  getProductReviews: '/v1/review/product/by_id/',
}
