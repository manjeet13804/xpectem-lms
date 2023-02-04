export const INPUTS_CONFIG = {
  price: {
    type: 'number',
    min: 0,
  },
};

export const INPUTS_NAMES = {
  name: 'name',
  email: 'email',
  password: 'password',
};

export const INPUTS_TUTORS = {
  firstName: 'firstName',
  lastName: 'lastName',
  firstEmail: 'firstEmail',
  secondEmail: 'secondEmail',
  firstPhoneNumber: 'firstPhoneNumber',
  secondPhoneNumber: 'secondPhoneNumber',
  file: 'file',
};

export const INPUTS_NOTIFICATIONS = {
  LMSGroup: 'LMSGroup',
  student: 'student',
  header: 'header',
  message: 'message',
  translations: 'translations',
  sendToType: 'sendToType',
  triggerType: 'triggerType',
  notificationType: 'notificationType',
};

export const INPUTS_COMMUNICATION = {
  headerMessage: 'headerMessage',
};

export const INPUTS_COURSE_TYPE=[{
    name: 'Evalutation report',
    value: 0,
  },
  {
    name: 'A specifik evaluation report',
    value: 1,
  },
  {
    name: 'Total report',
    value: 2,
  },
  {
    name: 'Study result per course ',
    value: 3,
  },
]

export const INPUTS_TIME_OPTIONS = [{
  name: '7',
  value: '7',
},
{
  name: '14',
  value: '14',
},
{
  name: '30',
  value: '30',
},
{
  name: '60',
  value: '60',
},
{
  name: '90',
  value: '90',
},
{
  name: '180',
  value: '180',
},
{
  name: '365',
  value: '365',
},
];
