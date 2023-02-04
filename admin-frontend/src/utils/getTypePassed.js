import { TYPE_PASSED } from 'constants/constants';

const getTypePassed = (gradeA, gradeC, points) => {
  if (points >= gradeA) {
    return TYPE_PASSED.passedDistinction;
  }
  if (points < gradeC) {
    return TYPE_PASSED.failed;
  }
  return TYPE_PASSED.passed;
};

export default getTypePassed;
