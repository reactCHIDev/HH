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
  duplicate: '/v1/product/duplicate/',

  // Foodmaker
  getFoodmakerInfo: '/v1/account/foodmaker/',
  getFoodmakerInfoByName: '/v1/foodmaker/info_by_profile_name/',
  updateFoodmakerAccount: '/v1/account/update_foodmaker',
  createWithdraw: '/v1/foodmaker/create_withdraw_request',

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

  // Search
  searchInProducts: '/v1/search/product/predictive',
  searchInFoodMakers: '/v1/search/foodmaker/predictive',

  // Files
  deleteFile: '/v1/file/delete/file/',
}
