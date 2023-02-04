const { SnakeNamingStrategy } = require('typeorm-naming-strategies');

module.exports = {
  jwt: {
    tokenLength: 32,
    jwtSecret: '1_L0V3_L1TTL3_P0N135',
    jwtSession: {
      session: false,
    },
  },
  frontendHost: 'http://xpectum-develop.s3-website-us-east-1.amazonaws.com',
  backendHost: 'http://xpectum-backend-develop-1367682842.us-east-1.elb.amazonaws.com/api',
  password: {
    defaultPasswordLength: 8,
    passwordSalt: '0e5020ee2c1a5dbc54c323cf7f27790ac09a3c26',
  },
  typeorm: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'user',
    password: 'password',
    database: 'xpectum',
    synchronize: false,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
  },
  swagger: {
    basePath: '/api/',
  },
  aws: {
    s3: {
      mediaBucket: 'dev-xpectum',
      bucketFolder: 'files',
    },
    ses: {
      fromEmail: 'support@xpectum.se',
    },
  },
  studyPlan: {
    defaultHoursPerWeek: 40,
    hoursVariations: [8, 16, 24, 32, 40],
  },
  user: {
    account: {
      daysToClose: 30,
      maxEmailCount: 3,
      maxPhoneCount: 3,
      avatarMimetype: ['image/jpg', 'image/jpeg', 'image/png'],
      avatarMaxSize: 5242880,
    },
    avatarsFolder: 'avatars',
    maxStudentsCount: 10,
  },
  tutor: {
    account: {
      maxEmailCount: 2,
      maxPhoneCount: 2,
      avatarMimeType: ['image/jpg', 'image/jpeg', 'image/png'],
      avatarMaxSize: 5242880,
    },
    files: {
      maxCount: 10,
      maxSize: 5242880,
      mimeTypes: [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'application/rtf',
        'text/plain',
        'application/msword',
        'application/vnd.ms-excel',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.apple.numbers',
        'application/vnd.apple.pages',
        'application/pdf',
        'text/csv'
      ]
    }
  },
  student: {
    import: {
      allowedMimeTypes: ['text/csv'],
      allowedMaxSize: 5242880,
      allowedHeaders: [
        'firstName',
        'lastName',
        'email',
        'phone',
        'language',
        'notifyEmail',
        'notifySms',
        'personNumber',
        'employeeNumber',
        'null',
      ],
      templateToDownloadPath: 'src/downloads',
      exampleFileData: [{
        'First name': 'Osvaldo',
        'Last name': 'Terry',
        'E-mail address': ['Ricky.OConner@yahoo.com'],
        'Telephone': ['569-115-3540'],
        'Language': 'swe',
        'Notifications e-mail': 'Yes',
        'Notifications SMS': "No",
        'Note': ''
      }, {
        'First name': 'Kamron',
        'Last name': 'Bartell',
        'E-mail address': ['Solon6@gmail.com'],
        'Telephone': ['342-435-3550'],
        'Language': 'swe',
        'Notifications e-mail': 'No',
        'Notifications SMS': "Yes",
        'Note': ''
      }, {
        'First name': 'Elnora',
        'Last name': 'Bernhard',
        'E-mail address': ['Lucienne.Abshire98@hotmail.com'],
        'Telephone': ['266-413-4601'],
        'Language': 'swe',
        'Notifications e-mail': 'No',
        'Notifications SMS': "No",
        'Note': ''
      }]
    }
  },
  organisation: {
    restrictions: {
      logotypeMimetypes: ['image/jpg', 'image/jpeg', 'image/png'],
      logotypeMaxSize: 5242880,
    },
  },
  websocket: {
    port: 5000,
  },
  lmsGroup: {
    restrictions: {
      logotypeMimetypes: ['image/jpg', 'image/jpeg', 'image/png'],
      logotypeMaxSize: 5242880,
    },
  },
  group: {
    maxStudentsCountGroup: 10,
    import: {
      templatePath: 'src/downloads/import_groups_template.csv',
      restrictions: {
        fileMimeTypes: ['text/csv'],
        fileMaxSize: 5242880,
        fileHeaders: [
          'name',
          'description_eng',
          'description_swe',
          'description_nor',
          'null',
        ],
      },
    },
  },
  communication: {
    attachmentMaxCount: 5,
    attachmentMaxSize: 5242880,
    attachmentMimetype: [
      'image/jpg',
      'image/jpeg',
      'image/gif',
      'image/png',
      'application/rtf',
      'application/x-rtf',
      'text/richtext',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/x-iwork-keynote-sffkey',
      'application/x-iwork-pages-sffpages',
      'application/x-iwork-numbers-sffnumbers',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/pdf',
      'application/vnd.apple.numbers',
      'application/vnd.apple.pages',
      'application/octet-stream',
    ],
  },
  course: {
    attachmentMaxCount: 1,
    fileMaxSize: 5242880,
    filesCourseTemplateMimetypes: [
      'image/jpg',
      'image/jpeg',
      'image/png',
      'font/woff',
      'font/woff2',
      'text/html',
      'text/htm',
      'text/css',
      'application/pdf',
      'application/x-pdf',
      'application/x-bzpdf',
      'application/x-gzpdf',
      'application/octet-stream',
      'application/vnd.apple.numbers',
      'application/vnd.apple.pages',
    ],
    filesCourseMimetypes: [
      'image/jpg',
      'image/jpeg',
      'image/png',
      'application/pdf',
      'application/x-pdf',
      'application/x-bzpdf',
      'application/x-gzpdf',
      'application/rtf',
      'application/x-rtf',
      'text/richtext',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/x-iwork-keynote-sffkey',
      'application/x-iwork-pages-sffpages',
      'application/x-iwork-numbers-sffnumbers',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.apple.numbers',
      'application/vnd.apple.pages',
      'application/octet-stream',
    ],
    imageFileMimetype: [
      'image/x-png',
      'image/png',
      'image/jpg',
      'image/jpeg',
      'image/gif',
    ],
    fieldName: {
      CERTIFICATE_TEMPLATE: 'certificateTemplate',
      WELCOME_EMAIL_TEMPLATE: 'welcomeEmailTemplate',
      WELCOME_LETTER_TEMPLATE: 'welcomeLetterTemplate',
      IMAGE_FILE: 'imageFile',
    },
  },
  contactUs: {
    supportingEmail: 'support@xpectum.se',
  },
  administrator: {
    import: {
      allowedMimeTypes: ['text/csv'],
      allowedMaxSize: 5242880,
      allowedHeaders: [
        'firstName',
        'lastName',
        'email',
        'phone',
        'language',
        'notifyEmail',
        'notifySms',
        'null',
      ],
      templateToDownloadPath: 'src/downloads/import_administrators_template.csv',
    },
  },
  formLearn: {
    exam: 'exam',
    course: 'course',
    assignment: 'assignment',
  },
	outerApi: {
		rolesForCheck: ['xpectum', 'admin_lms']
	},
	emailTemplates: {
		admin: {
			template: 'email-confirm-for-admin',
			subject: 'Email confirmation for administrator',
		},
		user: {
			template: 'email-confirm-for-user',
			subject: 'Email confirmation for user',
		},
    orderEmail: {
		  template: 'order-email',
      subject: 'Course order email'
    }
	},
  timeUnit: {
    days: 'days',
  },
  userIds: {
    adminXpectrumId: 11,
  }
};
