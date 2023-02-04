import React, { Component } from 'react';
import { AutoComplete, Form } from 'antd';
import { Marker, Map, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import classnames from 'classnames';
import constants from 'helpers/constants';
import generateAddressObject from './utils';
import { getCountry } from './requests';

const mapContainerStyle = { position: 'relative', height: '500px' };

const {
  googleMaps: {
    statuses: googleMapsStatuses,
  },
} = constants;

class AddressInput extends Component {
  static propTypes = {
    google: PropTypes.shape({}),
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    showMap: PropTypes.bool,
    required: PropTypes.bool,
  };

  static defaultProps = {
    google: null,
    onChange: null,
    value: '',
    label: 'Address',
    placeholder: 'Enter an address',
    showMap: true,
    required: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      selectedPlace: null,
      places: [],
      error: null,
    };

    this.onSearch = debounce(this.onSearch, 700);
  }

  componentDidMount() {
    const { value } = this.props;
    this.setValue(value);
  }

  componentWillReceiveProps({ value }) {
    this.setValue(value);
  }

  setValue = (value) => {
    const { searchQuery } = this.state;

    if (value !== searchQuery) {
      this.setState(prev => ({ ...prev, searchQuery: value }));
      this.getDataFromText(value);
    }
  };

  extractAddressObject = async (placeDetails) => {
    const { onChange } = this.props;
    const { searchQuery } = this.state;
    const address = generateAddressObject(placeDetails);

    const country = await getCountry(address.country);

    if (address && onChange) {
      onChange({
        ...address,
        formatted: searchQuery,
        country,
      });
    }

    this.setState(prev => ({ ...prev, selectedPlace: address }));

    return address;
  };

  onSelect = (selectedPlace) => {
    const { google } = this.props;
    const {
      maps: {
        places: {
          PlacesService,
        },
      },
    } = google;


    const service = new PlacesService(document.createElement('div'));
    service.getDetails(
      { placeId: selectedPlace.place_id },
      (place, status) => this.getPlaceDetails(place, status),
    );
  };

  async getPlaceDetails(place, status) {
    const { google } = this.props;
    const {
      maps: {
        places: {
          PlacesServiceStatus,
        },
      },
    } = google;

    if (status === PlacesServiceStatus.OK) {
      await this.extractAddressObject(place);
      this.setState(prev => ({
        ...prev,
        error: null,
      }));
    }

    const error = googleMapsStatuses[status];

    if (error) {
      this.setState(prev => ({ ...prev, error }));
    }

    return status;
  }

  onSearch = async (input) => {
    const { google } = this.props;
    const {
      maps: {
        places: {
          AutocompleteService,
          PlacesServiceStatus,
        },
      },
    } = google;
    const service = new AutocompleteService();

    service.getQueryPredictions({ input }, (predictions, status) => {
      if (status === PlacesServiceStatus.OK) {
        this.setState(prev => ({ ...prev, places: predictions }));
      }
    });
  };

  getDataFromText = (initValue = null) => {
    const { searchQuery } = this.state;
    const { google } = this.props;
    const {
      maps: { Geocoder },
    } = google;

    const service = new Geocoder();

    service.geocode(
      { address: initValue || searchQuery },
      (results, status) => this.getGeocoderData(results, status),
    );
  };

  async getGeocoderData(results, status) {
    if (results.length > 0 && status === 'OK') {
      await this.extractAddressObject(results[0]);

      return this.setState(prev => ({
        ...prev,
        error: null,
      }));
    }

    const error = googleMapsStatuses[status];

    if (error) {
      this.setState(prev => ({ ...prev, error }));
    }

    return status;
  }

  onSearchFromQuery = () => {
    const { searchQuery } = this.state;

    if (searchQuery.length > 0) {
      this.getDataFromText();
    }
  };

  onKeyPress = (e) => {
    if (e.keyCode === 13) {
      this.onSearchFromQuery();
    }
  };

  onChangeQuery = searchQuery => this.setState(prev => ({ ...prev, searchQuery }));

  renderItems = () => {
    const { places } = this.state;
    const { Option } = AutoComplete;

    return places.map(place => (
      <Option
        key={place.id}
        value={place.description}
        onClick={() => this.onSelect(place)}
      >
        {place.description}
      </Option>
    ));
  };

  render() {
    const { selectedPlace, searchQuery, error } = this.state;
    const {
      google,
      label,
      placeholder,
      showMap,
      required,
    } = this.props;

    const containerClassName = classnames('address wideContent', { 'has-error': Boolean(error) });

    return (
      <Form.Item
        label={label}
        required={required}
        className={containerClassName}
        style={showMap && mapContainerStyle}
      >
        <AutoComplete
          value={searchQuery}
          onBlur={this.onSearchFromQuery}
          onKeyPress={this.onKeyPress}
          onSearch={this.onSearch}
          placeholder={placeholder}
          onChange={this.onChangeQuery}
          children={this.renderItems()}
        />
        {showMap && (
          <Map
            google={google}
            zoom={14}
            style={{ height: '400px', width: '100%' }}
            center={selectedPlace && selectedPlace.coordinates}
          >
            {selectedPlace && (
              <Marker
                title={selectedPlace.address}
                position={selectedPlace.coordinates}
                name={label}
              />
            )}
          </Map>
        )}
        { error && <div className="ant-form-explain">{error}</div>}
      </Form.Item>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: constants.googleMapsApiKey,
})(AddressInput);
