export default {
  url: true ? process.env.REACT_APP_BASE_URL : 'localhost:3000',

  // Test
  userbyname: '/v1/user/profile_name/',
  userbyemail: '/v1/user/email/',
  getCities: '/v1/city/list',

  // Auth
  signUpUser: '/v1/user/register_foodlover',
  loginUser: '/v1/user/login',
  logout: '/v1/user/logout',
  forgotStep1: '/v1/user/forgot_password/step_one',
  forgotStep3: '/v1/user/forgot_password/step_two',

  //
  //
  //
  //
  //
  // ========================================================

  uploadUnregisterProfileImage: '/auth/registration/profile_image',
  getQuickBloxToken: '/auth/quickblox/token',
  loginByGoogle: '/auth/google',
  loginByApple: '/auth/apple',
  loginByFacebook: '/auth/facebook_dev',
  loginByFacebookProd: '/auth/facebook',
  signUp: '/auth/registration',
  checkName: '/validation/username',
  authToken: '/auth/token',

  // Account
  profileImages: '/account/profile_images',
  profileImagesById: (id) => `/account/profile_images/${id}`,
  footerImages: '/account/footer_images', // todo: image or images?
  userAllDetails: (id) => `/account/details/all/${id}`,
  workDetails: '/account/details/work',
  educationDetails: '/account/details/education',
  locationDetails: '/account/details/location',
  relationsDetails: '/account/details/relations',
  detailsById: (id) => `/account/details/${id}`, // todo: is endpoint url correct?
  usersStories: (id) => `/account/activities/forums/${id}`,
  usersReactions: (id) => `/account/activities/reactions/${id}`,
  usersConnections: (id) => `/account/activities/connections/${id})`,
  linkFBAndAlfaAccounts: '/account/integration/facebook)',

  // Comments
  commentOrReply: '/comments',
  commentOrReplyById: (id) => `/comments/${id}`,
  likeComment: (id) => `/comments/like/${id}`,
  unlikeComment: (id) => `/comments/unlike/${id}`,
  reportComment: (id) => `/comments/report/${id}`,

  // Conversation
  messages: '/messages',
  readMessage: '/messages/read',
  messagesById: (id) => `/messages/${id}`,
  listOfConversations: '/conversations',
  messagesHistory: (id) => `/conversations/${id}`,

  // Feed
  feed: '/feed',

  // Notifications
  notificationsSeen: '/notifications/seen',
  allNotificationsSeen: '/notifications/seen/all',
  token: '/notifications/tokens',

  // Report
  userReport: (id) => `/reports/user/${id}`,
  storyReport: (id) => `/reports/story/${id}`,

  // Resources
  resourceCreate: '/resources',
  resourceById: (id) => `/resources/${id}`,

  // Search
  randomUsersSearch: '/search/random_users',
  usersSearch: '/search/users',
  mentionedSearch: '/search/mentioned',
  hashtagsSearch: '/search/hashtags',

  // Settings
  listOfAppCollections: '/settings',
  versionOfAppCollections: '/settings/version',

  // Stories
  newTextStory: '/stories',
  storyReactionIncrease: '/stories/reactions/increase',
  storyReactionDecrease: '/stories/reactions/decrease',
  storyById: (id) => `/stories/${id}`,
  storiesUnread: '/stories/unread',
  storyMarkAsRead: '/stories/mark_as_read',
  listOfExchangeRates: '/rates',

  // User Activities
  userActivities: '/user_activities',
  userActivitiesRead: '/user_activities/read',
  userActivitiesCount: '/user_activities/count',
  userActivitiesDelete: '/user_activities/delete',

  // User
  userInfo: (id) => `/user/${id}`,
  passwordChange: '/user/change_password',
  passwordForgot: '/forgot_password',
  passwordReset: '/reset_password',
  userEmailActivate: '/user/activate_email',
  userEmailDeactivate: (id) => `/user/deactivate_email/${id}`,
  emailConfirmationLink: '/user/confirm_email',
  profileImage: '/me/profile_image',
  userProfile: (id) => `/user/${id}/profile`,
  userStories: (id) => `/user/${id}/profile/forums`,
  userContent: (id) => `/user/${id}/content`,
  userContentStories: (id) => `/user/${id}/content/stories`,

  // Validation
  emailValidation: '/validation/email',
  userNameValidation: '/validation/username',
  phoneNumber: '/validation/phone',

  // Weather
  currentWeather: '/weather/current',
  forecastWeather: '/weather/forecast',

  // Friendship
  usersFriendsById: (id) => `/friendship/${id}`,
  inviteFriend: (id) => `/friendship/invite/${id}`,
  acceptInvitation: (id) => `/friendship/accept/${id}`,
  getPeopleYouMayKnowList: '/suggest_friendship',

  // Highlights
  updatehighlightData: '/me/highlights',
  deleteHighlight: (id) => `/me/highlights/${id}`,
  getUserHighlights: (id, data) => `/user/${id}/highlights/?${data}`,
  updateHighlight: (id) => `/me/highlights/resource/${id}`,
}
