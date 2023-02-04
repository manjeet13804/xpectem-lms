/* eslint-disable no-useless-escape */
const REGEXP = {
  getDeleteId: /delete\/(\d+)/,
  getEditId: /edit\/(\d+)/,
  getAddId: /add\/(\d+)/,
  getImport: /import\/(\d+)/,
  getInfoId: /info\/(\d+)/,
  patternDateInput: RegExp(/^\d{4}[/\- ](0?[1-9]|1[012])[/\- ](0?[1-9]|[12][0-9]|3[01])$/),
  getCourseDetailId: /detail-course\/(\d+)/,
  getPhoneNumber: /^[0-9]{1,35}$/im,
  getCurrentTopicId: /topic\/(\d+)/,
  getCurrentCourseId: /courses\/edit\/(\d+)/,
  getUrlBeforeAddFile: /\/add-files/,
  getUrlBeforeEditTopic: /\/topic\/(\d+)/,
  onlyNumbers: /^[\d]+$/,
  personNumberReg: /^\d{6}-\d{4}$/,
  numbersRegExp: /\d/,
  email: /(?:[\w0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[\w0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[\w0-9](?:[\w0-9-]*[\w0-9])?\.)+[\w0-9](?:[\w0-9-]*[\w0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[\w0-9-]*[\w0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
};

export {
  REGEXP,
};
