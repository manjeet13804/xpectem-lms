import constants from 'helpers/constants';
import mapValues from 'lodash/mapValues';
import find from 'lodash/find';

const {
  googleMaps: {
    placeTypes,
  },
} = constants;

const generateAddressObject = (place) => {
  /* eslint-disable-next-line camelcase */
  const { address_components = [] } = place;

  const getData = (value) => {
    const component = find(address_components, ({ types }) => types.indexOf(value) > -1);

    if (component) {
      return component.long_name;
    }

    return null;
  };

  const addressDetails = mapValues(placeTypes, getData);

  return {
    ...addressDetails,
    coordinates: {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    },
  };
};

export default generateAddressObject;
