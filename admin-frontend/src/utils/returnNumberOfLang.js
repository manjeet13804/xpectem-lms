const returnNumberOfLang = (lang) => {
  switch (lang) {
    case 'English':
      return 1;
    case 'Svenska':
      return 2;
    case 'Norsk':
      return 3;

    default:
      return null;
  }
};

export default returnNumberOfLang;
