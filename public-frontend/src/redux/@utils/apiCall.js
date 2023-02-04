// @flow
import { call } from 'redux-saga/effects';
import axios from 'axios';
import API_BASE_URL from 'config';

type GetTokenType = {
  Authorization: string
};

const getToken = (isToken: boolean): GetTokenType => {
  if (isToken) {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return {Authorization: `Bearer ${token}`};
  }

  return {};
};


const fetchJSON = (url: string, {
  headers, body, params, method,
}: object): mixed => (
  axios(
    {
      url,
      headers,
      data: body,
      method,
      params,
    },
  ));

type ApiCallType = {
  type: string,
  body?: object,
  headers?: object,
  url: string,
  isToken?: boolean,
  file?: object,
  params?: Array<object>
};

const apiCall = ({
  type,
  body,
  headers,
  url,
  isToken,
  file,
  params,
}: ApiCallType): mixed => {
  let bodyForData = null;
  if (file) {
    bodyForData = new FormData();
    bodyForData.set('file', file);
  }
  const token = isToken ? getToken(isToken) : {};

  const options = {
    method: type,
    headers: {
      'Content-Type': 'application/json',
      ...(headers && headers),
      ...token,
    },
    body: bodyForData || body,
    params,
  };

  return call(fetchJSON, `${API_BASE_URL}/api/${url}`, options);
};

const apiDownload = ({
  headers,
  url,
  type,
  isToken,
  fileName,
  params,
}: object): Promise => {
  const token = getToken(isToken);
  const options = {
    method: type,
    headers: {
      ...token,
      ...headers,
    },
    responseType: 'blob',
    url: `${API_BASE_URL}/api/${url}`,
    params,
  };

  return axios(options).then((response: object) => {
    if (!window.navigator.msSaveOrOpenBlob) {
      const newUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = newUrl;
      link.setAttribute('download', `${fileName}.pdf`);
      document.body.appendChild(link);
      link.click();
    } else {
      window.navigator.msSaveOrOpenBlob(new Blob([response.data]), fileName);
    }
  });
};


const getError = ({ response }: object): string => (
  response && response.data && response.data.message);


export {
  apiCall,
  getError,
  apiDownload,
};
