// @flow
const getSearchTextPart = (text: string, searchText: string): [] => {
  const start = new RegExp(`\\..*${searchText}`);
  const startIndex = text.search(start) + 1;
  const startSearchText = text.indexOf(searchText);
  const end = text.indexOf('.', startSearchText) + 1 || text.length - 1;
  const startText = text.substring(startIndex, startSearchText);
  const endText = text.substring(startSearchText + searchText.length, end);

  return startSearchText >= 0 ? [startText, searchText, endText] : [startText, null, endText];
};

export default getSearchTextPart;
