import { store } from 'redux/store';
import authActions from 'redux/auth/actions';
import _ from 'lodash';
import { ROLES, MENU_TO_ROLE } from '../../constants/constants';

const getMenuItemsByRoles = (user, menu, routes) => {
  const allowedRoles = MENU_TO_ROLE[menu];
  const { roles } = user;

  const allowedHashTable = allowedRoles.reduce((acc, item) => ({
    ...acc,
    [item]: true,
  }), {});

  const isAllowed = allowedHashTable[roles];

  if (isAllowed) {
    return routes;
  }

  return [];
};

const COMMON_ROUTES = () => [
  {
    key: 'start',
    label: 'sidebar.start',
  },
  {
    key: 'profile',
    label: 'sidebar.profile',
    children: [
      {
        key: 'profile/edit',
        label: 'sidebar.edit',
      },
    ],
  },
];

const LMS_GROUPS = (user) => {
  const { roles, lmsGroups } = user;
  const lmsGroup = _.get(lmsGroups, '0', null);
  const lmsGroupId = _.get(lmsGroup, 'id', null);

  if (roles === ROLES.ADMIN_LMS) {
    return [{
      key: 'lms-groups',
      label: 'sidebar.lmsGroups',
      children: [
        {
          key: `lms-groups/edit/${lmsGroupId}`,
          label: 'sidebar.edit',
        },
        {
          key: 'lms-groups/permissions',
          label: 'sidebar.lmsGroupPermissions',
        },
      ],
    }];
  }

  if (roles === ROLES.XPECTUM_ADMIN) {
    return [{
      key: 'lms-groups',
      label: 'sidebar.lmsGroups',
      children: [
        {
          key: 'lms-groups/add',
          label: 'sidebar.add',
        },
        {
          key: 'lms-groups/edit',
          label: 'sidebar.edit',
        },
        {
          key: 'lms-groups/permissions',
          label: 'sidebar.lmsGroupPermissions',
        },
      ],
    }];
  }

  return [];
};

const LMS_GROUP_ADMINISTRATORS = (user) => {
  if (user.roles === ROLES.XPECTUM_ADMIN) {
    return [
      {
        key: 'lms-groups-administrators',
        label: 'sidebar.lmsGroupsAdministrator',
        children: [
          {
            key: 'lms-groups-administrators/add',
            label: 'sidebar.add',
          },
          {
            key: 'lms-groups-administrators/edit',
            label: 'sidebar.edit',
          },
        ],
      },
    ];
  }

  return [];
};

const ORGANISATIONS = (user) => {
  const { roles, lmsGroups } = user;
  const lmsGroup = _.get(lmsGroups, '0', null);
  const lmsGroupId = _.get(lmsGroup, 'id', null);
  if (roles === ROLES.ADMIN_LMS) {
    return [{
      key: 'organisations',
      label: 'sidebar.organisations',
      children: [
        {
          key: `organisations/add/${lmsGroupId}`,
          label: 'sidebar.add',
        },
        {
          key: 'organisations/edit',
          label: 'sidebar.edit',
        },
        {
          key: 'organisations/permissions',
          label: 'sidebar.lmsGroupPermissions',
        },
      ],
    }];
  }
  if (roles === ROLES.ADMIN_ORGANISATION) {
    return [{
      key: 'organisations',
      label: 'sidebar.organisations',
      children: [
        {
          key: 'organisations/permissions',
          label: 'sidebar.lmsGroupPermissions',
        },
      ],
    }];
  }
  const routes = [{
    key: 'organisations',
    label: 'sidebar.organisations',
    children: [
      {
        key: 'organisations/add',
        label: 'sidebar.add',
      },
      {
        key: 'organisations/edit',
        label: 'sidebar.edit',
      },
      {
        key: 'organisations/permissions',
        label: 'sidebar.lmsGroupPermissions',
      },
    ],
  }];

  return getMenuItemsByRoles(user, 'organisations', routes);
};

const ORGANISATIONS_ADMINISTRATORS = (user) => {
  const routes = [{
    key: 'organisation-administrators',
    label: 'sidebar.organisationAdministrators',
    children: [
      {
        key: 'organisation-administrators/add',
        label: 'sidebar.add',
      },
      {
        key: 'organisation-administrators/edit',
        label: 'sidebar.edit',
      },
      {
        key: 'organisation-administrators/import',
        label: 'sidebar.import',
      },
    ],
  }];

  return getMenuItemsByRoles(user, 'organisation-administrators', routes);
};

const GROUPS = (user) => {
  const routes = [
    {
      key: 'groups',
      label: 'sidebar.groups',
      children: [
        {
          key: 'groups/add',
          label: 'sidebar.add',
        },
        {
          key: 'groups/edit',
          label: 'sidebar.edit',
        },
        {
          key: 'groups/import',
          label: 'sidebar.import',
        },
        {
          key: 'groups/permissions',
          label: 'sidebar.groupsPermissions',
        },
      ],
    },
  ];

  return getMenuItemsByRoles(user, 'groups', routes);
};

const GROUPS_ADMINS = (user) => {
  const routes = [{
    key: 'group-administrators',
    label: 'sidebar.groupAdministrators',
    children: [
      {
        key: 'group-administrators/add',
        label: 'sidebar.add',
      },
      {
        key: 'group-administrators/edit',
        label: 'sidebar.edit',
      },
      {
        key: 'group-administrators/import',
        label: 'sidebar.import',
      },
    ],
  }];

  return getMenuItemsByRoles(user, 'group-administrators', routes);
};

const STUDENTS = (user) => {
  const { roles } = user;

  if (roles === ROLES.ADMIN_LMS || roles === ROLES.XPECTUM_ADMIN) {
    return [{
      key: 'students',
      label: 'sidebar.students',
      children: [
        {
          key: 'students/add',
          label: 'sidebar.addStudents',
        },
        {
          key: 'students/registration-links',
          label: 'sidebar.regLink',
        },
        {
          key: 'students/import',
          label: 'sidebar.import',
        },
        {
          key: 'students/info',
          label: 'sidebar.info',
        },
        {
          key: 'students/taxonomy',
          label: 'sidebar.taxonomy',
        },
      ],
    }];
  }

  if (roles === ROLES.TUTOR || roles === ROLES.COURSE_CREATOR) {
    return [{
      key: 'students',
      label: 'sidebar.students',
      children: [
        {
          key: 'students/registration-links',
          label: 'sidebar.regLink',
        },
        {
          key: 'students/import',
          label: 'sidebar.import',
        },
        {
          key: 'students/info',
          label: 'sidebar.info',
        },
      ],
    }];
  }

  const routes = [{
    key: 'students',
    label: 'sidebar.students',
    children: [
      {
        key: 'students/add',
        label: 'sidebar.addStudents',
      },
      {
        key: 'students/registration-links',
        label: 'sidebar.regLink',
      },
      {
        key: 'students/import',
        label: 'sidebar.import',
      },
      {
        key: 'students/info',
        label: 'sidebar.info',
      },
    ],
  }];

  return getMenuItemsByRoles(user, 'students', routes);
};

const COURSES = (user) => {
  const routes = [{
    key: 'courses',
    label: 'sidebar.courses',
    children: [
      {
        key: 'courses/create',
        label: 'sidebar.createCourse',
      },
      {
        key: 'courses/edit',
        label: 'sidebar.edit',
      },
      {
        key: 'courses/mmc',
        label: 'sidebar.createMMC',
      },
    ],
  }];

  return getMenuItemsByRoles(user, 'courses', routes);
};

const TUTORS = (user) => {
  if (user.roles === ROLES.TUTOR) {
    return [{
      key: 'tutors',
      label: 'sidebar.tutors',
      children: [
        {
          key: 'tutors/files',
          label: 'sidebar.files',
        },
      ],
    }];
  }

  const routes = [{
    key: 'tutors',
    label: 'sidebar.tutors',
    children: [
      {
        key: 'tutors/find-courses',
        label: 'sidebar.add',
      },
      {
        key: 'tutors/edit',
        label: 'sidebar.edit',
      },
    ],
  }];

  return getMenuItemsByRoles(user, 'tutors', routes);
};

const COURSE_CREATORS = (user) => {
  const routes = [{
    key: 'course-creators',
    label: 'sidebar.courseCreators',
    children: [
      {
        key: 'course-creators/add',
        label: 'sidebar.add',
      },
      {
        key: 'course-creators/edit',
        label: 'sidebar.edit',
      },
    ],
  }];

  return getMenuItemsByRoles(user, 'course-creators', routes);
};

const REPORTS = (user) => {
  const routes = [{
    key: 'reports',
    label: 'sidebar.reports',
    children: [
      {
        key: 'reports/create',
        label: 'sidebar.createReport',
      },
    ],
  }];

  return getMenuItemsByRoles(user, 'reports', routes);
};

const CERTIFICATIONS = (user) => {
  const routes = [{
    key: 'certification',
    label: 'sidebar.certification',
  }];

  return getMenuItemsByRoles(user, 'certification', routes);
};

const COMMUNICATIONS = (user) => {
  const routes = [{
    key: 'communication',
    label: 'sidebar.communication',
  }];

  return getMenuItemsByRoles(user, 'communication', routes);
};

const NOTIFICATIONS = (user) => {
  if (user.roles === ROLES.XPECTUM_ADMIN) {
    return [{
      key: 'notifications',
      label: 'sidebar.notification',
      children: [
        {
          key: 'notifications/select',
          label: 'sidebar.sendNotifications',
        },
        {
          key: 'notifications/create-reminders',
          label: 'sidebar.automaticReminders',
        },
        {
          key: 'notifications/create-event',
          label: 'sidebar.eventNotifications',
        },
        {
          key: 'notifications/report',
          label: 'sidebar.notificationReport',
        },
      ],
    }];
  }
  const routes = [{
    key: 'notifications',
    label: 'sidebar.notification',
    children: [
      {
        key: 'notifications/select',
        label: 'sidebar.sendNotifications',
      },
      {
        key: 'notifications/create-reminders',
        label: 'sidebar.automaticReminders',
      },
      {
        key: 'notifications/report',
        label: 'sidebar.notificationReport',
      },
    ],
  }];

  return getMenuItemsByRoles(user, 'notifications', routes);
};

const QUESTIONS_AND_ANSWERS = (user) => {
  const routes = [
    {
      key: 'questions-answers',
      label: 'sidebar.questionsAnswers',
    },
    {
      key: 'technical-support',
      label: 'sidebar.technicalSupport',
    },
  ];

  return getMenuItemsByRoles(user, 'questions-answers', routes);
};

const QUESTIONS_AND_ANSWERS_EDIT = (user) => {
  const routes = [
    {
      key: 'questions-answers/edit',
      label: 'sidebar.editQuestionsAnswers',
    },
  ];

  return getMenuItemsByRoles(user, 'questions-answers/edit', routes);
};

const SECOND_COMMON_ROUTES = () => [
  {
    key: 'signin',
    label: 'sidebar.signOut',
    action: () => {
      store.dispatch({ type: authActions.LOGOUT });
    },
  }];

const options = (commonUser) => {
  const roles = _.get(commonUser, 'roles', []);

  const result = roles.reduce((acc, item) => {
    const user = {
      ...commonUser,
      roles: item,
    };

    const routes = [
      ...COMMON_ROUTES(),
      ...LMS_GROUPS(user),
      ...LMS_GROUP_ADMINISTRATORS(user),
      ...ORGANISATIONS(user),
      ...ORGANISATIONS_ADMINISTRATORS(user),
      ...GROUPS(user),
      ...GROUPS_ADMINS(user),
      ...STUDENTS(user),
      ...COURSES(user),
      ...TUTORS(user),
      ...COURSE_CREATORS(user),
      ...REPORTS(user),
      ...CERTIFICATIONS(user),
      ...COMMUNICATIONS(user),
      ...NOTIFICATIONS(user),
      ...QUESTIONS_AND_ANSWERS_EDIT(user),
      ...QUESTIONS_AND_ANSWERS(user),
      ...SECOND_COMMON_ROUTES(),
    ];
    return [...acc, ...routes];
  }, []);

  const existedRoutes = result.reduce((acc, item) => ({
    ...acc,
    [item.key]: item,
  }), {});


  const list = [
    'start',
    'profile',
    'lms-groups',
    'lms-groups-administrators',
    'organisations',
    'organisation-administrators',
    'groups',
    'group-administrators',
    'students',
    'courses',
    'tutors',
    'course-creators',
    'reports',
    'certification',
    'communication',
    'notifications',
    'questions-answers/edit',
    'questions-answers',
    'technical-support',
    'signin',
  ];

  const sortRoutes = list.reduce((acc, item) => {
    if (existedRoutes[item]) {
      return { ...acc, [item]: existedRoutes[item] };
    }
    return acc;
  }, {});

  const finalRoutes = Object.keys(sortRoutes).reduce((acc, item) => {
    const isHaveChildrens = Boolean(sortRoutes[item].children);
    if (isHaveChildrens) {
      const foundedChildrens = result.filter(route => route.key === item)
        .reduce((childrens, route) => [...childrens, ...route.children], []);
      const uniqChildrens = _.uniqBy(foundedChildrens, 'key');
      return [
        ...acc,
        {
          ...sortRoutes[item],
          children: uniqChildrens,
        },
      ];
    }

    return [...acc, sortRoutes[item]];
  }, []);

  return finalRoutes;
};
export default options;
