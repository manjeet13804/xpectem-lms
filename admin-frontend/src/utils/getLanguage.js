const getLanguageId = (id) => {
  switch (id) {
    case 1:
      return 'English';
    case 2:
      return 'Svenska';
    case 3:
      return 'Norsk';
    default:
      return '';
  }
};

export default getLanguageId;
