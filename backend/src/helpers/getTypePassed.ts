enum TypePassed {
  failed = 'F',
  passed = 'P',
  passedDistinction = 'PD',
}

export const getTypePassed = (gradeA: number, gradeC: number, points: number) => {
  if (points >= gradeA) {
    return TypePassed.passedDistinction;
  }

  if (points < gradeC) {
    return TypePassed.failed;
  }

  return TypePassed.passed;
};
