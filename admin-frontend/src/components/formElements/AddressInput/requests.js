import { generateRequest } from 'helpers/utility';
import constants from 'helpers/constants';
import request from 'components/restApi';

const { API } = constants;

const getCountry = async (name) => {
  try {
    const query = generateRequest({
      filteredInfo: {
        name: { $ilike: name },
      },
      paginationInfo: {
        current: 1,
        pageSize: 1,
      },
    });
    const {
      data: { data: { result } },
    } = await request.get(`${API.countries}?${query}`);

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    return null;
  }
};

const createCity = async (countryId, name) => {
  try {
    return await request.post(API.city, { countryId, name });
  } catch (error) {
    return error;
  }
};

export {
  getCountry,
  createCity,
};
