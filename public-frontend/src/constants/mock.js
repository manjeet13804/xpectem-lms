// @flow
import imgA from 'assets/images/course-1.jpg';
import imgB from 'assets/images/course-2.jpg';
import imgC from 'assets/images/course-3.jpg';

import photoA from 'assets/images/PhotoA.png';
import photoB from 'assets/images/PhotoB.png';
import photoC from 'assets/images/PhotoC.png';

type StatsType = {
  active: number,
  total: number,
  new: number
};

type AdminType = {
  id: string,
  img: string,
  title: string
};

type CourseType = {
  id: string,
  img: string,
  title: string,
  text: string,
  students: number,
  like: number,
  publishedStatus: boolean,
  version: string,
  communicationStatistic: StatsType,
  studentsStatistic: StatsType,
  courseAdmins: Array<AdminType> | []
};

const COURSE_LIST_DESIGNER: Array<CourseType> = [
  {
    id: '1',
    publishedStatus: true,
    version: '1.2.5',
    communicationStatistic: {
      active: 11,
      total: 86,
      new: 3,
    },
    studentsStatistic: {
      active: 146,
      total: 932,
      new: 12,
    },
    courseAdmins: [
      {
        id: '6',
        img: photoA,
        title: 'Mr Bin',
      },
      {
        id: '7',
        img: photoB,
        title: 'JD',
      },
      {
        id: '8',
        img: photoC,
        title: 'Silva',
      },
    ],
    img: imgA,
    title: 'Book-keeping 1 Basic Book-keeping',
    text: 'The course consists of digital material, a fact leaflet and an exercise book which you may keep after the course. The course concludes with a web-based exam.',
    students: 3843,
    like: 72456,
  },
  {
    id: '2',
    publishedStatus: true,
    version: '2.0.0',
    communicationStatistic: {
      active: 3,
      total: 27,
      new: 0,
    },
    studentsStatistic: {
      active: 36,
      total: 36,
      new: 3,
    },
    courseAdmins: [
      {
        id: '1',
        img: photoA,
        title: 'Mr Bin',
      },
      {
        id: '2',
        img: photoB,
        title: 'JD',
      },
      {
        id: '3',
        img: photoC,
        title: 'Silva',
      },
      {
        id: '4',
        img: imgA,
        title: 'Mr Bin',
      },
      {
        id: '5',
        img: photoC,
        title: 'Silva',
      },
    ],
    img: imgB,
    title: 'Certified financial controller & accountant',
    text: 'The course will give you a basic platform allowing you to grasp everything from current book-keeping to analysis.',
    students: 2419,
    like: 57562,
  },
  {
    id: '3',
    publishedStatus: false,
    communicationStatistic: {
      active: 0,
      total: 0,
      new: 0,
    },
    studentsStatistic: {
      active: 0,
      total: 0,
      new: 0,
    },
    courseAdmins: [],
    img: imgC,
    title: 'Swedish Lapland',
    text: 'The objective is to add to your knowledge about Swedish Lapland and through knowledge and inspiration promote awareness and understanding of what ... entails.',
    students: 932,
    like: 12125,
  },
];

const CURRENT_USER = {
  id: '1',
  photo: photoA,
  title: 'I\'m',
};

const ORGANISATIONS_LIST = [
  {
    id: '1',
    name: 'Almi',
  },
  {
    id: '2',
    name: 'Deloitte',
  },
  {
    id: '3',
    name: 'Foretagarna',
  },
  {
    id: '4',
    name: 'Nordea',
  },
];

const ADMINISTRATORS_LIST = [
  {
    id: '1',
    img: photoA,
    firstName: 'Urban',
    lastName: 'Pettersson',
    role: 'Course designer',
  },
  {
    id: '1',
    img: photoC,
    lastName: 'Pettersson',
    role: 'Course designer',
  },
  {
    id: '2',
    img: photoB,
    firstName: 'Mister Bin',
    role: 'Tutor - All system Incoporations and visiting finance',
  },
  {
    id: '3',
    img: photoC,
    firstName: 'Silva',
    lastName: 'Johanson',
    role: 'Super admin',
  },
  {
    id: '4',
    firstName: 'Bill',
    lastName: 'Gaits',
    role: 'course designer',
  },
];

const GROUP_LIST = [
  {
    id: '1',
    title: 'Caretaker services',
    students: 279,
    courses: 4,
    active: 2,
  },
  {
    id: '2',
    title: 'Economy',
    students: 65,
    courses: 15,
    active: 7,
  },
  {
    id: '3',
    title: 'Marceting',
    students: 47,
    courses: 5,
    active: 3,
  },
  {
    id: '4',
    title: 'Irish Dance',
    students: 585,
    courses: 46,
    active: 125,
  },
  {
    id: '5',
    title: 'Pyton',
    students: 7,
    courses: 1,
    active: 0,
  },
  {
    id: '6',
    title: 'History',
    students: 75,
    courses: 45,
    active: 7,
  },
  {
    id: '7',
    title: 'Kokilambe',
    students: 78,
    courses: 4,
    active: 9,
  },
  {
    id: '8',
    title: 'Hamesdale',
    students: 687,
    courses: 12,
    active: 8,
  },
  {
    id: '9',
    title: 'Open Are end Co',
    students: 789,
    courses: 25,
    active: 60,
  },
  {
    id: '10',
    title: 'Accommod Tru',
    students: 477,
    courses: 516,
    active: 58,
  },

];

const STUDENTS_CARD_LIST = [
  {
    id: '1',
    student: {
      id: '1',
      img: photoA,
      firstName: 'Urban',
      lastName: 'Pettersson',
      role: 'Course designer',
    },
    days: 4,
    study: 80,
    result: {
      done: 30,
      total: 80,
    },
  },
  {
    id: '2',
    student: {
      id: '47',
      img: photoB,
      firstName: 'Mister Bin',
      role: 'Tutor - All system Incoporations and visiting finance',
    },
    days: 14,
    study: 80,
    result: {
      done: 150,
      total: 200,
    },
  },
  {
    id: '3',
    student: {
      id: '12',
      img: photoC,
      firstName: 'Silva',
      lastName: 'Johanson',
      role: 'Super admin',
    },
    days: 35,
    study: 60,
    result: {
      done: 114,
      total: 250,
    },
  },
  {
    id: '4',
    student: {
      id: '23',
      firstName: 'Cracen',
      lastName: 'Cracen',
      role: 'course designer',
    },
    days: 80,
    study: 95,
    result: {
      done: 45,
      total: 50,
    },
  },
  {
    id: '5',
    student: {
      id: '67',
      img: photoA,
      firstName: 'Jon Lenon',
      role: 'Course designer',
    },
    days: 4,
    study: 80,
    result: {
      done: 30,
      total: 80,
    },
  },
  {
    id: '6',
    student: {
      iid: '45',
      lastName: 'Missis Kruk',
      role: 'Tutor - All system Incoporations and visiting finance',
    },
    days: 14,
    study: 80,
    result: {
      done: 150,
      total: 200,
    },
  },
  {
    id: '7',
    student: {
      id: '34',
      img: photoC,
      firstName: 'Iogan Sebastian',
      role: 'Super admin',
    },
    days: 35,
    study: 60,
    result: {
      done: 114,
      total: 250,
    },
  },
  {
    id: '8',
    student: {
      id: '48',
      img: photoC,
      firstName: 'Edvard Grig',
      role: 'course designer',
    },
    days: 80,
    study: 95,
    result: {
      done: 45,
      total: 50,
    },
  },
];

const DEFAULT_USER_AVATAR = 'https://ssl.gstatic.com/images/branding/product/1x/avatar_anonymous_64dp.png';

export {
  CURRENT_USER,
  COURSE_LIST_DESIGNER,
  ORGANISATIONS_LIST,
  ADMINISTRATORS_LIST,
  GROUP_LIST,
  STUDENTS_CARD_LIST,
  DEFAULT_USER_AVATAR,
};
