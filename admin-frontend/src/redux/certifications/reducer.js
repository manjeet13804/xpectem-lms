import actions from './actions';

const initDataCertificate = {
  city: '',
  street: '',
  zip: '',
  startAt: '',
};

const initState = {
  certifications: [],
  certificationData: initDataCertificate,
};

export default function certificationsReducer(state = initState, { type, ...action }) {
  switch (type) {
    case actions.FILL_CERTIFICATE_DATA: {
      const { payload } = action;

      return {
        ...state,
        certificationData: payload,
      };
    }

    case actions.CLEAR_CERTIFICATE_DATA: {
      return {
        ...state,
        certificationData: initDataCertificate,
      };
    }

    case actions.CHANGE_CERTIFICATE_DATA: {
      const { payload } = action;
      const { name, value } = payload;
      const { certificationData } = state;

      return {
        ...state,
        certificationData: {
          ...certificationData,
          [name]: value,
        },
      };
    }

    case actions.DELETE_CERTIFICATION: {
      const { payload } = action;
      const { certifications } = state;
      const updatedCertifications = certifications.filter(item => item.id !== payload);

      return {
        ...state,
        certifications: updatedCertifications,
      };
    }

    case actions.UPDATE_CERTIFICATION: {
      const { payload } = action;
      const { id } = payload;
      const { certifications } = state;
      const updatedCertifications = certifications.map((item) => {
        if (item.id === id) {
          return {
            ...payload,
          };
        }

        return item;
      });

      return {
        ...state,
        certifications: updatedCertifications,
      };
    }

    case actions.CREATE_CERTIFICATION: {
      const { payload } = action;
      const { certifications } = state;

      return {
        ...state,
        certifications: [
          ...certifications,
          payload,
        ],
      };
    }

    case actions.GET_ALL_CERTIFICATIONS: {
      const { payload } = action;

      return {
        ...state,
        certifications: payload,
      };
    }

    default:
      return state;
  }
}
