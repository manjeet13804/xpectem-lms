import banner from 'assets/images/img_Promo.jpg';
import imgA from 'assets/images/course-1.jpg';
import imgB from 'assets/images/course-2.jpg';
import imgC from 'assets/images/course-3.jpg';
import { HOME_DICTIONARY } from 'localise';

const BANNER = {
  url: banner,
  title: 'Certified fly-fisherman',
};

const COURSE_LIST = [
  {
    id: 1,
    img: imgA,
    title: 'Book-keeping 1 Basic Book-keeping',
    text: 'The course consists of digital material, a fact leaflet and an exercise book which you may keep after the course. The course concludes with a web-based exam.',
    students: 3843,
    like: 72456,
  },
  {
    id: 2,
    img: imgB,
    title: 'Certified financial controller & accountant',
    text: 'The course will give you a basic platform allowing you to grasp everything from current book-keeping to analysis.',
    students: 2419,
    like: 57562,
  },
  {
    id: 3,
    img: imgC,
    title: 'Swedish Lapland',
    text: 'The objective is to add to your knowledge about Swedish Lapland and through knowledge and inspiration promote awareness and understanding of what ... entails.',
    students: 932,
    like: 12125,
  },
];

const DISPLAY_MODE = {
  list: 'list',
  grid: 'grid',
};

const OPTIONS_SORT = [
  { value: 'most', label: HOME_DICTIONARY.recentPublished},
  { value: 'strawberry', label: HOME_DICTIONARY.recentPublished },
  { value: 'vanilla', label: HOME_DICTIONARY.recentPublished },
];

export {
  BANNER,
  DISPLAY_MODE,
  COURSE_LIST,
  OPTIONS_SORT,
};
