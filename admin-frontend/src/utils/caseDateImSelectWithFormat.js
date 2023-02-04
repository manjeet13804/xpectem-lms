import moment from 'moment';

const caseDateWithFormat = (value, format) => {
  switch (value) {
    case 'Any time':
      return null;
    case 'Past 24 hour':
      return moment().subtract(1, 'days').format(format);
    case 'Past week':
      return moment().subtract(1, 'weeks').format(format);
    case 'Past month':
      return moment().subtract(1, 'months').format(format);
    case 'Past year':
      return moment().subtract(1, 'years').format(format);

    default:
      return null;
  }
};

export default caseDateWithFormat;
