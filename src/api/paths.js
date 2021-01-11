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

  // Listing

  // Product
  createProduct: '/v1/product/create',
  updateProduct: '/v1/product/update',
  getProductInfo: '/v1/product/info/',
  toggleStatus: '/v1/product/toggle_status',

  // Foodmaker
  getFoodmakerInfo: '/v1/account/foodmaker/',
  getFoodmakerInfoByName: '/v1/foodmaker/info_by_profile_name/',
  updateFoodmakerAccount: '/v1/account/update_foodmaker',

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
  getShopByFoodmakerId: '/v1/shop/foodmaker/',
  getShopByUrl: '/v1/shop/shop_url/',

  // Home page
  getHomePageProducts: '/v1/product/list_all',
  listFoodmakersForHome: '/v1/foodmaker/list_all',

  // Stripe
  stripe: '/v1/stripe/create_payment',

  // Order
  order: '/v1/order/create',
  charge: '/v1/stripe/charge',
  fm_orders: '/v1/order/list_foodmaker_orders',
  fl_orders: '/v1/order/list_customer_orders',
  fmOrderInfo: '/v1/order/foodmaker_order/',
  flOrderInfo: '/v1/order/customer_order/',

  //
  //
  //
  //
  // ========================================================
}
