import {
  getError,
  errorMessage,
} from 'helpers/utility';
import constants from 'helpers/constants';
import request from 'components/restApi';

const fetchAssets = async (querystring, showFiats = false) => {
  const {
    fiatAssetTypeId,
    API: {
      assets: assetsAPI,
    },
  } = constants;
  const fiatFilter = encodeURIComponent('filters[assetTypeId][$ne]');
  try {
    const fiatQuery = showFiats ? '' : `${fiatFilter}=${fiatAssetTypeId}&`;
    const { data: { data: assets } } = await request.get(`${assetsAPI}?${fiatQuery}${querystring}`);

    return assets;
  } catch ({ response: { data } }) {
    const error = getError(data);

    return errorMessage(error);
  }
};

export {
  fetchAssets,
};
