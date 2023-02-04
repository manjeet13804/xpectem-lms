const columnName = [
  'Field name',
  'Required',
  'Defaults',
  'Type',
  'Example data',
  'Notes',
];

const dataOrgAdmins = [
  ['First name', 'Yes', '', 'String', 'Amber', ''],
  ['Last name', 'Yes', '', 'String', 'Riley', ''],
  ['E-mail address', 'Yes', '', 'String', 'amber.riley@mail.com', 'Multiple e-mail address are separated by a comma. Max two.'],
  ['Telephone', 'No', '', 'String', '123321123', ''],
  ['Language', 'Yes', 'swe', 'String', 'swe', 'ISO 639-2 representation of which language the user wants to show the LMS in. Three letter code. Currently three languages are supported: Swedish (swe), English (eng) and Norwegian (nor).'],
  ['Notification e-mail', 'No', 'Yes', 'Boolean', 'Yes', 'Yes or No'],
  ['Notification SMS', 'No', 'No', 'Boolean', 'No', 'Yes or No'],
  ['Note', 'No', '', 'String', 'A very diligent and intelligent student.', 'Note for additional information about the student'],
];

const dataGroups = [
  ['Group name', 'Yes', '', 'String', 'Finance department', ''],
  ['Group description - Swedish', 'No', '', 'String', 'Ansvarig för bokföring, redovisning och budgetering i företaget.', 'Description in plain text or allowed HTML'],
  ['Group description - Norwegian', 'No', '', 'String', 'Ansvarlig for bokføring, regnskap og budsjettering for selskapet.', 'Description in plain text or allowed HTML'],
  ['Group description - English', 'No', '', 'String', 'Responsible for the book-keeping, accounting, and budgeting for the company.', 'Description in plain text or allowed HTML'],
];

export {
  columnName,
  dataGroups,
  dataOrgAdmins,
};
