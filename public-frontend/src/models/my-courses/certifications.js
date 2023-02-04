// @flow

type CertificationType = {
    id: number,
    city: string,
    street: string | null,
    zip: number | null,
    startAt: Date,
    isBooked: boolean,
    course: number | null
};

type CertificationLogsType = {
  id: number,
  date: string,
  isPassed: boolean,
  results: string
};

export {
  // eslint-disable-next-line import/prefer-default-export
  CertificationType,
  CertificationLogsType,
};
