const baseUrl = process.env.REACT_APP_API_BASE_URL;
const constants = {
  api: baseUrl,
  googleMapsApiKey: 'AIzaSyCCNLEIYNAMIByAkGj4FDKGAfJ62fFB7Jg',
  dateFormat: 'MM/DD/YYYY',
  dateTableDisplay: 'MMMM Do YYYY',
  dateAndTimeFormat: 'MM/DD/YYYY HH:mm:ss',
  dateAndTimeWithoutSeconds: 'MM/DD/YYYY HH:mm',
  timeFormat: 'HH:mm',
  emojiPattern: /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug,
  urlPattern: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/){1}[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,7}(:[0-9]{1,5})?(\/.*)?$/i,
  linkPattern: /(www.)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,7}(:[0-9]{1,5})?(\/.*)?$/i,
  protocolPattern: /^(http:\/\/|https:\/\/)/i,
  spacesPattern: /\s/g,
  numberPattern: /^[0-9]+$/g,
  defaultMaxTextInputSymbols: 70,
  imageSizeValue: 5000000,
  searchPageSize: 200,
  errorCodes: {
    permissionsError: 812716,
  },
  reportFileNme: {
    0: 'Evalutation_report',
    1: 'A_specifik_evaluation_report',
    2: 'Total_report',
    3: 'Study_result_per_course',
  },
  roles: [
    {
      text: 'User',
      value: 1,
    },
    {
      text: 'Admin',
      value: 2,
    },
  ],
  statuses: [
    {
      text: 'Yes',
      value: true,
    },
    {
      text: 'No',
      value: false,
    },
  ],
  deletedStatuses: [
    {
      text: 'Active',
      value: true,
    },
    {
      text: 'Deleted',
      value: false,
    },
  ],
  updateStatuses: [
    { text: 'Enabled', value: true },
    { text: 'Disabled', value: false },
  ],
  eventStatuses: [
    {
      text: 'Current',
      value: true,
    },
    {
      text: 'Past',
      value: false,
    },
  ],
  statusesReverse: [
    {
      text: 'Yes',
      value: false,
    },
    {
      text: 'No',
      value: true,
    },
  ],
  activeStatuses: [
    {
      text: 'Active',
      value: true,
    },
    {
      text: 'Deleted',
      value: false,
    },
  ],
  activeStatusesReverse: [
    {
      text: 'Active',
      value: false,
    },
    {
      text: 'Deleted',
      value: true,
    },
  ],
  directoriesDeleteModal: {
    header: 'You can\'t delete this item until it\'s linked to other entities',
    content: 'If you want to delete the item you should follow the links below and unlink related entities:',
  },
  linkDeleteModal: {
    ok: 'Delete',
  },
  userActiveStatuses: [
    {
      text: 'Activated',
      value: true,
    },
    {
      text: 'Deactivated',
      value: false,
    },
  ],
  externalUpdate: [
    {
      text: 'Enabled',
      value: true,
    },
    {
      text: 'Disabled',
      value: false,
    },
  ],
  emailConfirmed: [
    {
      text: 'Confirmed',
      value: true,
    },
    {
      text: 'Not confirmed',
      value: false,
    },
  ],
  eventStatus: [
    {
      text: 'Current',
      value: true,
    },
    {
      text: 'Past',
      value: false,
    },
  ],
  assets: [
    {
      text: 'Coin',
      value: 1,
    },
    {
      text: 'Token',
      value: 2,
    },
    {
      text: 'Fiat currency',
      value: 3,
    },
  ],
  changeableAssets: [
    {
      text: 'Coin',
      value: 1,
    },
    {
      text: 'Token',
      value: 2,
    },
  ],
  marketTradingPair: [
    {
      text: 'Yes',
      value: 'restore',
    },
    {
      text: 'No',
      value: 'soft_delete',
    },
  ],
  icoValues: [
    {
      text: 'BTC',
      value: 1,
    },
    {
      text: 'USD',
      value: 2,
    },
    {
      text: 'ETH',
      value: 3,
    },
  ],
  months: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  colors: {
    filterActive: '#108ee9',
    filterNotActive: '#aaa',
  },
  news: {
    drivers: ['rss', 'twitter'],
  },
  passwordLengthErr: 'Password must be at least 6 characters',
  confirmPassErr: 'Please confirm password',
  twoPassErr: 'Two passwords that you enter is inconsistent!',
  directory: [
    {
      title: 'Asset categories',
      value: 'assetCategory',
    },
    {
      title: 'Asset classifications',
      value: 'assetClassification',
    },
    {
      title: 'Event categories',
      value: 'eventCategory',
    },
    {
      title: 'Event classification',
      value: 'eventClassification',
    },
    {
      title: 'Asset types',
      value: 'assetType',
    },
    {
      title: 'Blockchain platforms',
      value: 'blockchainPlatform',
    },
    {
      title: 'Token standards',
      value: 'tokenType',
    },
    {
      title: 'Proof types',
      value: 'proofType',
    },
    {
      title: 'Encryption algorithms',
      value: 'encryptionAlgorithm',
    },
    {
      title: 'News source types',
      value: 'newsSourceStatusesType',
    },
  ],
  userStatuses: {
    created: {
      text: 'A new user has been created',
      status: 'success',
    },
    updated: {
      text: 'User has been updated',
      status: 'success',
    },
    deleted: {
      text: 'An user has been deleted',
      status: 'warning',
    },
    reset: {
      text: 'An password has been reseted',
      status: 'warning',
    },
    nothing_updated: {
      text: 'Nothing update',
      status: 'warning',
    },
    username_already_exist: {
      text: 'User with this name already exists',
      status: 'warning',
    },
    email_already_exist: {
      text: 'Email already exist',
      status: 'warning',
    },
    resend: {
      text: 'Email confirmation has been resend',
      status: 'success',
    },
  },
  assetStatuses: {
    created: {
      text: 'A new asset has been created',
      status: 'success',
    },
    updated: {
      text: 'Asset has been updated',
      status: 'success',
    },
    nothing_updated: {
      text: 'Nothing update',
      status: 'warning',
    },
    asset_symbol_already_exists: {
      text: 'Asset ticker symbol already exist',
      status: 'warning',
    },
  },
  teamStatuses: {
    created: {
      text: 'A new member has been created',
      status: 'success',
    },
    updated: {
      text: 'Member has been updated',
      status: 'success',
    },
    deleted: {
      text: 'Member has been deleted',
      status: 'success',
    },
  },
  eventsStatuses: {
    created: {
      text: 'New event has been created',
      status: 'success',
    },
    updated: {
      text: 'Event has been updated',
      status: 'success',
    },
  },
  softDeleteStatuses: {
    successfully_deleted: true,
    already_deleted: true,
    successfully_restored: false,
    this_had_not_deleted: false,
  },
  newsStatuses: {
    created: {
      text: 'A new news has been created',
      status: 'success',
    },
    updated: {
      text: 'News has been updated',
      status: 'success',
    },
    nothing_updated: {
      text: 'Nothing update',
      status: 'warning',
    },
  },
  linkStatuses: {
    created: {
      text: 'A new link has been created',
      status: 'success',
    },
    updated: {
      text: 'Link has been updated',
      status: 'success',
    },
    deleted: {
      text: 'Link has been deleted',
      status: 'success',
    },
    success: {
      text: 'Link has been updated',
      status: 'success',
    },
    uri_already_exists: {
      text: 'Link already exist',
      status: 'warning',
    },
  },
  productStatuses: {
    update: {
      text: 'Product has been updated',
      status: 'success',
    },
    created: {
      text: 'Product has been created',
      status: 'success',
    },
    imgAdded: {
      text: 'Image has been created',
      status: 'success',
    },
    deleted: {
      text: 'Product has been deleted',
      status: 'success',
    },
  },
  blogStatuses: {
    createdCategory: {
      text: 'Cannot add image',
      status: 'success',
    },
    updatedCategory: {
      text: 'Category has been updated',
      status: 'success',
    },
    deletedCategory: {
      text: 'Category has been deleted',
      status: 'success',
    },
    addedCategory: {
      text: 'Category has been added',
      status: 'success',
    },
    errorImgUpload: {
      text: 'Cannot add image',
      status: 'warning',
    },
    deletedArticle: {
      text: 'Article has been deleted',
      status: 'success',
    },
    addedArticle: {
      text: 'Article has been added',
      status: 'success',
    },
    updatedArticle: {
      text: 'Article has been updated',
      status: 'success',
    },
    errorImage: {
      text: 'Image must not exceed 5мб',
      status: 'error',
    },
  },
  couponStatuses: {
    addedCoupon: {
      text: 'Coupon has been added',
      status: 'success',
    },
    deleteCoupon: {
      text: 'Coupon has been deleted',
      status: 'success',
    },
    updatedCoupon: {
      text: 'Coupon has been updated',
      status: 'success',
    },
  },
  exchangeStatuses: {
    updated: {
      text: 'A new exchange has been updated',
      status: 'success',
    },
  },
  assetFields: {
    title: true,
    technology: true,
    features: true,
    startDate: true,
    logoImageUri: true,
    description: true,
    tickerSymbol: true,
    rateTransformChainId: true,
  },
  assetCoinFields: {
    encryptionAlgorithmId: true,
    proofTypeId: true,
    blockHeight: true,
    netHashesPerSecond: true,
    blockReward: true,
    lastBlockExplorerUpdate: true,
  },
  assetCurrencyFields: {
    title: true,
  },
  exchangeFields: {
    title: true,
    linkText: true,
    website: true,
  },
  icoCurrency: {
    btc: 1,
    usd: 2,
    eth: 3,
  },
  validationErrors: {
    emptySpaces: 'Empty spaces is not allowed!',
    linkError: 'Source link should contain a link',
    protocolError: 'Source link should contain "http://" or "https://" protocol',
  },
  assetLinkErrors: {
    avatarReq: 'Avatar is required',
    memberExist: 'This team member already exist',
    uri: {
      valid: 'Must be a valid link',
      required: 'Link is required',
    },
    title: {
      valid: 'Must be a valid title',
      required: 'Title is required',
    },
  },
  teamMemberErrors: {
    avatarReq: 'Avatar is required',
    memberExist: 'This team member already exist',
    uri: {
      valid: 'Must be a valid link',
      required: 'Link is required',
    },
    title: {
      valid: 'Must be a valid title',
      required: 'Title is required',
    },
  },
  dateErrors: {
    dateStartRequired: 'Start date is required',
    dateEndRequired: 'End date is required',
    largerThanNow: 'Date must be larger than current date',
    dateOrder: '“Finish Date” can\'t be earlier than “Start Date”',
    dateStart: '"Start date" must be lower than "End date"',
    datEnd: '"End date" must be larger than "Start date"',
    dateOrderEndDate: '“End Date” can\'t be earlier than “Start Date”',
    dateOrderStartDate: '“Start Date” can\'t be later than “End Date”',
  },
  filterTypes: {
    ILIKE: '$ilike',
    EQ: '$eq',
    IN: '$in',
  },
  API: {
    signin: '/api/auth/signin',
    news: '/news',
    feedNews: '/feed',
    users: '/admin/user',
    assets: '/asset',
    markets: '/markets',
    confirmationResend: '/users/confirmation/resend',
    entities_configuration: '/entities_configuration',
    news_sources: '/news_sources',
    news_source: '/news_source',
    feed_sources: '/feed_sources',
    feed_source: '/feed_source',
    news_source_categories: '/catalogs/news_source_categories',
    news_source_classes: '/news_source_classes',
    news_source_types: '/news_source_types',
    asset_calendar: '/asset_calendar',
    feed_source_categories: '/catalogs/feed_source_categories',
    feed_source_classes: '/feed_source_classes',
    feed_source_types: '/feed_source_types',
    newsSourcesPath: '/dashboard/feed/news_sources',
    offline_event: '/offline_event',
    offline_event_category: '/catalogs/offline_event_category',
    google_api: 'https://maps.googleapis.com',
    countries: '/catalogs/country',
    city: '/city',
    chains: '/rate_transform_chain',
    catalogs: '/catalogs',
    exchangeLinks: '/market_links',
    linkGroups: '/link_groups',
    assetLinks: '/asset_links',
  },
  deleteRestoreStatuses: {
    successfully_deleted: {
      text: 'item(-s) have been deleted',
      userText: 'user(-s) have been deactivated',
      status: 'success',
    },
    already_deleted: {
      text: 'item(-s) have already been deleted',
      userText: 'user(-s) have already been deactivated',
      status: 'warning',
    },
    not_found: {
      text: 'item(-s) not found',
      userText: 'user(-s) not found',
      status: 'error',
    },
    successfully_restored: {
      text: 'item(-s) have been restored',
      userText: 'user(-s) have been restored',
      status: 'success',
    },
    this_had_not_deleted: {
      text: 'item(-s) have already been activated',
      userText: 'user(-s) have already been activated',
      status: 'warning',
    },
    asset_is_not_deleted: {
      text: 'item(-s) have already been activated',
      status: 'warning',
    },
  },
  newsSourceErrors: {
    imageUri: 'News source image is required',
    defaultNewsImage: 'News default image is required',
    class: 'Class is required',
    type: 'Type is required',
  },
  feedSourceErrors: {
    imageUri: 'Feed source image is required',
    defaultFeedImage: 'Feed default image is required',
    classError: 'Class is required',
    typeError: 'Type is required',
  },
  exchangeErrors: {
    imageUrl: 'Logo image is required',
    websiteLink: 'Website link is required',
  },
  linkErrors: {
    imageUri: 'Link icon is required',
    source: 'Link is required',
  },
  newsSourceTypeErrors: {
    imageUri: 'Image is required',
  },
  blogErrors: {
    imageUri: 'Article image is required',
    previewImageUri: 'Preview image is required',
    blogText: 'Article text is required',
    sizeErrorMessage: 'Maximum file size shouldn\'t exceed 5 MB',
  },
  linkPlaceholders: {
    sourcePlaceholder: 'Link (should contain \'http://\' or \'https://\' protocol)',
  },
  selectClearValue: {
    text: 'Not selected',
    value: null,
  },
  filterParams: {
    isUpdate: 'isUpdate',
    isActive: 'isActive',
    isDeleted: 'isDeleted',
  },
  googleMaps: {
    statuses: {
      ZERO_RESULTS: 'Address not found. Please, repeat and write more full address.',
    },
    placeTypes: {
      region: 'administrative_area_level_1',
      city: 'locality',
      country: 'country',
    },
  },
  reactQuillSettings: {
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['clean'],
      ],
    },
    theme: 'snow',
  },
  icoPrices: [
    'icoBtcPrice',
    'icoUsdPrice',
    'icoEthPrice',
  ],
  assetCalendarPage: '/dashboard/all_events/asset_calendar',
  offlineEventsPage: '/dashboard/all_events/offline_events',
  fiatAssetTypeId: 3,
  CHAINS_DIR_NAME: 'conversion_chains',
  DEFAULT_CONVERSION_CHAIN: {
    id: 0,
    name: 'Direct chain',
    chain: [
      { id: 3709, tickerSymbol: 'BTC', title: 'Bitcoin' },
    ],
  },
  DEFAULT_SOURCE_IMAGES: [
    '/static/images/reddit.png',
    '/static/images/twitter.png',
  ],
  SORT_ASSETS_BY_RANK: [
    {
      field: 'stableInternalRank',
      order: 'ascend',
    },
    {
      field: 'unstableInternalRank',
      order: 'ascend',
    },
  ],
};

export default constants;
