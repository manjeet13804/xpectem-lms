// @flow
import { MyCourseType } from '../my-courses';

type CertificateType = {
    id: number,
    url: string,
    course: number
};

type CertificateFullType = {
    id: number,
    url: string,
    course: MyCourseType
};

export {
  CertificateType,
  CertificateFullType,
};
