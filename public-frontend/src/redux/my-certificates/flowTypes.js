// @flow
import { ByIdType, CertificateType } from 'models';
import {
  FETCH_MY_CERTIFICATES,
  FETCH_MY_CERTIFICATES_START,
  FETCH_MY_CERTIFICATES_SUCCESS,
  FETCH_MY_CERTIFICATES_FAIL,
} from './types';

type FetchMyCertificatesType = {
  type: FETCH_MY_CERTIFICATES
};

type FetchMyCertificatesSuccessType = {
  type: FETCH_MY_CERTIFICATES_SUCCESS,
  payload: {
    certificates: ByIdType<CertificateType>
  }
};

type StartType = {
  type: FETCH_MY_CERTIFICATES_START
};

type SuccessType = FetchMyCertificatesSuccessType;

type FailType = {
  type: FETCH_MY_CERTIFICATES_FAIL,
  payload: string | null
};

type StateType = {
  [key: string]: CertificateType
};

export {
  FetchMyCertificatesType,
  FetchMyCertificatesSuccessType,
  StartType,
  SuccessType,
  FailType,
  StateType,
};
