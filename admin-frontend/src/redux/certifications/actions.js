import URLS from 'redux/urls';
import request from 'components/restApi';
import { errorMessage } from 'helpers/utility';
import _ from 'lodash';
import { getErrorMessage } from '../../utils';

const actions = {
  GET_ALL_CERTIFICATIONS: 'GET_ALL_CERTIFICATIONS',
  CREATE_CERTIFICATION: 'CREATE_CERTIFICATION',
  UPDATE_CERTIFICATION: 'UPDATE_CERTIFICATION',
  DELETE_CERTIFICATION: 'DELETE_CERTIFICATION',
  CHANGE_CERTIFICATE_DATA: 'CHANGE_CERTIFICATE_DATA',
  CLEAR_CERTIFICATE_DATA: 'CLEAR_CERTIFICATE_DATA',
  FILL_CERTIFICATE_DATA: 'FILL_CERTIFICATE_DATA',

  fillCertificateData: data => (dispatch) => {
    dispatch({ type: actions.FILL_CERTIFICATE_DATA, payload: data });
  },

  clearCertificateData: () => (dispatch) => {
    dispatch({ type: actions.CLEAR_CERTIFICATE_DATA });
  },

  changeCertificateData: (name, value) => (dispatch) => {
    dispatch({ type: actions.CHANGE_CERTIFICATE_DATA, payload: { name, value } });
  },

  getAllCertifications: () => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(URLS.adminCertifications);
      dispatch({ type: actions.GET_ALL_CERTIFICATIONS, payload: data });
    } catch (e) {
      const message = getErrorMessage(e);
      errorMessage(message);
    }
  },

  createCertification: body => async (dispatch) => {
    try {
      const { data: { data } } = await request.post(URLS.adminCertifications, body);
      dispatch({ type: actions.CREATE_CERTIFICATION, payload: data });
    } catch (e) {
      const message = getErrorMessage(e);
      errorMessage(message);
    }
  },

  updateCertification: body => async (dispatch) => {
    try {
      const { id } = body;
      const updateBody = _.omit(body, 'id');
      const { data: { data } } = await request.put(`${URLS.adminCertifications}/${id}`, updateBody);
      dispatch({ type: actions.UPDATE_CERTIFICATION, payload: data });
    } catch (e) {
      const message = getErrorMessage(e);
      errorMessage(message);
    }
  },

  deleteCertification: id => async (dispatch) => {
    try {
      await request.delete(`${URLS.adminCertifications}/${id}`);
      dispatch({ type: actions.DELETE_CERTIFICATION, payload: id });
    } catch (e) {
      const message = getErrorMessage(e);
      errorMessage(message);
    }
  },
};
export default actions;
