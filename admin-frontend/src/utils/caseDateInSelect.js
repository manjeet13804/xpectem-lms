import moment from 'moment';

const caseDateAfterSelect = (value) => {
  switch (value) {
    case 'Any time':
      return null;
    case 'Past 24 hour':
      return moment().subtract(1, 'days').toISOString();
    case 'Past week':
      return moment().subtract(1, 'weeks').toISOString();
    case 'Past month':
      return moment().subtract(1, 'months').toISOString();
    case 'Past year':
      return moment().subtract(1, 'years').toISOString();

    default:
      return null;
  }
};

export default caseDateAfterSelect;
