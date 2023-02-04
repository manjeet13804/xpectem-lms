// @flow
import {
  FETCH_MY_CERTIFICATES,
} from './types';
import {
  FetchMyCertificatesType,
} from './flowTypes';

const fetchMyCertificates = (): FetchMyCertificatesType => ({
  type: FETCH_MY_CERTIFICATES,
});

export {
  // eslint-disable-next-line import/prefer-default-export
  fetchMyCertificates,
};
