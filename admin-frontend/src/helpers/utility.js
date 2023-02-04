import moment from 'moment';
import _ from 'lodash';
import qs from 'qs';
import { Map } from 'immutable';
import notification from 'components/notification';
import constants from './constants';

const sortOption = {};

export function clearToken() {
  localStorage.removeItem('id_token');
}

export function getToken() {
  try {
    const idToken = localStorage.getItem('id_token');

    return new Map({ idToken });
  } catch (err) {
    clearToken();

    return new Map();
  }
}

export function dateFormat(date) {
  return date ? moment(date).format('DD-MM-YYYY') : '';
}

export function timeFormat(date) {
  return date ? moment(date).format('HH:mm') : '';
}

export function dateDoFormat(date) {
  return date ? moment(date).format('MMMM Do YYYY') : '';
}

export function timeDifference(givenTime) {
  const time = new Date(givenTime);
  const milliseconds = new Date().getTime() - time.getTime();
  const numberEnding = number => (number > 1 ? 's' : '');
  const number = num => (num > 9 ? `${num}` : `0${num}`);
  const getTime = () => {
    let temp = Math.floor(milliseconds / 1000);
    const years = Math.floor(temp / 31536000);

    if (years) {
      const month = number(time.getUTCMonth() + 1);
      const day = number(time.getUTCDate());
      const year = time.getUTCFullYear() % 100;

      return `${day}-${month}-${year}`;
    }
    const days = Math.floor((temp %= 31536000) / 86400);

    if (days) {
      if (days < 28) {
        return `${days} day${numberEnding(days)}`;
      }
      const { months } = constants;
      const month = months[time.getUTCMonth()];
      const day = number(time.getUTCDate());

      return `${day} ${month}`;
    }
    const hours = Math.floor((temp %= 86400) / 3600);

    if (hours) {
      return `${hours} hour${numberEnding(hours)} ago`;
    }

    const minutes = Math.floor((temp %= 3600) / 60);

    if (minutes) {
      return `${minutes} minute${numberEnding(minutes)} ago`;
    }

    return 'a few seconds ago';
  };

  return getTime();
}

export function stringToInt(value, defValue = 0) {
  if (!value) {
    return 0;
  }

  if (!_.isNaN(value)) {
    return parseInt(value, 10);
  }

  return defValue;
}

export function stringToPosetiveInt(value, defValue = 0) {
  const val = stringToInt(value, defValue);

  return val > -1 ? val : defValue;
}

function localSort(optionA, optionB) {
  const valueA = optionA[sortOption.sortKey];
  const valueB = optionB[sortOption.sortKey];
  let sortVal = 0;

  if (valueA > valueB) {
    sortVal = 1;
  }

  if (valueA < valueB) {
    sortVal = -1;
  }

  if (sortVal !== 0 && sortOption.sortDir === 'DESC') {
    return sortVal * (-1);
  }

  return sortVal;
}

export function getSortAsc(data, sortKey) {
  sortOption.sortKey = sortKey;
  sortOption.sortDir = 'ASC';

  return data.sort(localSort);
}

export function getSortDesc(data, sortKey) {
  sortOption.sortKey = sortKey;
  sortOption.sortDir = 'DESC';

  return data.sort(localSort);
}

export function generateRequest(props, assetFieldName = 'assets.id') {
  const {
    paginationInfo,
    sortedInfo,
    defaultSort,
    filteredInfo,
    filteredInfoEq,
    filteredDateBetween,
    searchText,
    searchTextOr,
    assetsId,
    assets,
    categories,
    markets,
  } = props;

  const search = generateSearch(searchText);
  let filters = generateFilter({ ...filteredInfo, ...search });
  const filtersOr = generateFilterOr(searchTextOr);
  const filtersEq = generateFilterEq(filteredInfoEq);
  const filterDateBetween = generateFilterDateBetween(filteredDateBetween);

  filters = {
    ...filters,
    ...filtersOr,
    ...filterDateBetween,
    ...filtersEq,
  };

  if (assetsId) {
    filters.assets = { $in: assetsId };
  }

  if (assets) {
    filters[assetFieldName] = { $in: assets };
  }

  if (categories) {
    filters['category.id'] = { $in: categories };
  }

  if (markets) {
    filters['markets.id'] = { $in: markets };
  }

  const sort = generateSort(sortedInfo, defaultSort);
  const pagination = generatePagination(paginationInfo);

  return qs.stringify({ filters, sort, pagination }, { encode: true });
}

export function generateSearch(searchText) {
  let search = {};
  _.mapValues(searchText, (text, index) => {
    if (text) {
      const value = { [index]: { $ilike: text } };
      search = { ...search, ...value };
    }
  });

  return search;
}

export function generateFilter(request) {
  const filter = {};
  for (const item in request) {
    if (item === 'eventCategories') {
      const value = request[item];
      filter[item] = { $in: value };
      continue;
    }

    if (Array.isArray(request[item])) {
      const [value] = request[item];
      filter[item] = value;
    } else {
      filter[item] = request[item];
    }
  }

  return filter;
}

export function generateSort(sorters, defaultField) {
  if (_.isEmpty(sorters) && !defaultField) {
    return {};
  }

  const sortField = _.isString(sorters) && sorters;

  const insureSorters = _.isArray(sorters)
    ? sorters
    : [
      {
        field: sortField || defaultField,
        order: 'ascend',
        ...(_.isObject(sorters) && sorters),
      },
    ];

  return insureSorters.reduce(
    (accumulator, { field, order: method }, index) => ({
      ...accumulator,
      [field || defaultField]: {
        method: method === 'descend' ? 'desc' : 'asc',
        order: index + 1,
      },
    }),
    {},
  );
}
export function generateFilterOr(request) {
  if (!request || !Object.keys(request).length) {
    return {};
  }

  const filter = {
    $or: [],
  };

  const keys = Object.keys(request);

  keys.forEach((key) => {
    const value = request[key];
    filter.$or.push({
      [key]: { $ilike: value },
    });
  });

  return filter;
}

export function generateFilterEq(filter) {
  if (!filter || !Object.keys(filter).length) {
    return {};
  }
  const keys = Object.keys(filter);
  const filterWithEqualOperator = {};

  keys.forEach((key) => {
    const { [key]: value } = filter;

    if (Array.isArray(value)) {
      const [val] = value;
      filterWithEqualOperator[key] = { $eq: val };
    } else {
      filterWithEqualOperator[key] = { $eq: value };
    }
  });

  return filterWithEqualOperator;
}

export default function generateFilterDateBetween(request) {
  if (!request || !Object.keys(request).length) {
    return {};
  }

  const { dateStart, dateFinish, dateEnd } = request;
  const secondDateProp = dateEnd ? 'dateEnd' : 'dateFinish';
  let firstDate = dateStart;
  let secondDate = dateFinish || dateEnd;

  firstDate = makeISOdate(firstDate);
  secondDate = makeISOdate(secondDate);

  if (firstDate && secondDate) {
    const filter = {
      $or: [],
    };

    const filterFields = Object.keys(request);

    filterFields.forEach((filterField) => {
      filter.$or.push({
        [filterField]: {
          $between: [firstDate, secondDate],
        },
      });
    });

    filter.$or.push({
      dateStart: {
        $lt: firstDate,
      },
      [secondDateProp]: {
        $gt: secondDate,
      },
    });

    return filter;
  }

  if (dateStart) {
    return {
      $or: [
        {
          dateStart: { $gt: firstDate },
        },
      ],
    };
  }

  if (secondDate) {
    return {
      $or: [
        {
          [secondDateProp]: { $lt: secondDate },
        },
      ],
    };
  }

  return {};
}

export function makeISOdate(date) {
  if (date && date.format) return date.toISOString();

  return date;
}

export function generatePagination(pagination) {
  return {
    current: pagination.pageSize * (pagination.current - 1),
    pageSize: pagination.pageSize,
  };
}

export function stringToBool(value) {
  if (value === 'true' || value === 'false') {
    return value === 'true';
  }

  return value;
}

export function fromArrayToString(array) {
  const resultArray = array.map(item => `"${item}"`);

  return `[${resultArray.join(',')}]`;
}

export function boolToString(value) {
  return typeof value === 'boolean' ? String(value) : value;
}

export const validateTextFields = (fieldName, isNumber) => (rules, value, callback) => {
  const text = value === undefined ? '' : String(value);

  if (/^\s+$/.test(value)) {
    callback('Empty spaces is not allowed!');
  }

  if (rules.required && !text.trim().length) {
    callback(`${fieldName} is required`);
  }

  if (rules.pattern && text.length) {
    const index = text.search(rules.pattern);

    if (index !== -1) {
      callback(`${fieldName} contains illegal symbols`);
    }
  }

  const lengthStatus = {
    min: true,
    max: true,
  };

  if (isNumeric(rules.min)) {
    lengthStatus.min = text.length >= rules.min;
  }

  if (isNumeric(rules.max)) {
    lengthStatus.max = text.length <= rules.max;
  }

  if (!lengthStatus.min) {
    callback(`${fieldName} must contain more than ${rules.min} symbols`);
  }

  if (!lengthStatus.max) {
    callback(`${fieldName} can't contain more than ${rules.max} symbols`);
  }

  if (isNumber && value && !/^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/.test(value)) {
    callback(`${fieldName} must contain only numbers`);
  }

  callback();
};

export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function getInputConfig(props, contentType) {
  const {
    editableItem,
    itemName,
    title,
    required,
    type,
    validator,
    min,
    max,
    pattern,
    validate,
    defaultValue,
    message,
    isNumber,
  } = props;

  const value = editableItem ? editableItem[itemName] : '';
  let rules = [{
    required: required !== undefined ? required : true,
    ...((required !== false && message) && { message }),
    ...(type && { type }),
    ...((type && type === 'url') && { message: `${title || 'Field'} should contain a link` }),
    ...(min && { min }),
  }];

  if (contentType === 'text-input' && !validate) {
    rules[0].max = max || 70;

    const regexp = pattern === undefined ? constants.emojiPattern : pattern;

    if (regexp) {
      rules[0].pattern = regexp;
      rules[0].validator = validateTextFields(title || itemName, isNumber);
    }
  }

  if (validator) rules = [...rules, { validator }];

  return {
    initialValue: getInitialValue(value, contentType, editableItem, defaultValue),
    rules: [...rules],
  };
}

export function validateDateBetween(dateStart, dateFinish) {
  if (dateFinish - dateStart <= 0) {
    notification('error', '“Finish Date” can\'t be earlier than “Start Date”');

    return false;
  }

  return true;
}

function getDefaultIfNeed(value, defaultValue) {
  return !_.isNil(value) ? boolToString(value) : defaultValue;
}

function getValueIfNeed(value, defaultValue) {
  return !_.isNil(defaultValue) ? defaultValue : boolToString(value);
}

function getInitialValue(value, contentType, editableItem, defaultValue) {
  switch (contentType) {
    case 'date':
      return value && moment(value);
    case 'switch':
      return getDefaultIfNeed(value, false);
    case 'checkBox':
      return getDefaultIfNeed(value, defaultValue);
    default:
      return editableItem ? getValueIfNeed(value, defaultValue) : '';
  }
}

function clearFields(values, isNew, id, isUsers) {
  const clearedValues = { ...values };
  const requiredValues = ['password', 'confirmPassword', 'isActive'];

  if (isUsers) {
    delete clearedValues.isEmailConfirmationNeed;
    delete clearedValues.confirmPassword;

    _.map(requiredValues, (value) => {
      if (!clearedValues[value]) {
        delete clearedValues[value];
      }
    });
  }

  if (!isNew) {
    clearedValues.id = id;
  }

  return clearedValues;
}

function getBody(values, props, isUsers) {
  let request;
  const { isNew, id } = props;
  const data = { ...clearFields(values, isNew, id, isUsers) };

  if (isNew) {
    request = isUsers ? {
      isEmailConfirmationNeed: values.isEmailConfirmationNeed,
      data,
    } : { ...data };
  } else {
    request = { ...data };
  }
  return request;
}

export function validateFields(props, filter) {
  const {
    validateFieldsAndScroll,
    additionalFields,
    isNew,
    create,
    update,
    isUsers,
    dateProps,
  } = props;

  if (dateProps && dateProps.dateStart && dateProps.dateFinish) {
    const { dateStart, dateFinish } = dateProps;

    if (!validateDateBetween(dateStart, dateFinish)) {
      return;
    }
  }

  // eslint-disable-next-line
  return validateFieldsAndScroll((err, values) => {
    if (!err) {
      const api = isNew ? create : update;
      const filteredValues = filter ? filter(values, additionalFields) : values;
      const params = getBody({ ...filteredValues, ...additionalFields }, props, isUsers);
      api(params);
    }
  });
}

export function createFilterString({ filters, sort, pagination }) {
  const compose = {};

  if (filters) {
    const notEmpty = {};
    _.forIn(
      filters,
      (val, key) => {
        if (val.value.length) {
          notEmpty[key] = { [val.type]: encodeURIComponent(val.value) };
        }
      },
    );

    if (!_.isEmpty(notEmpty)) {
      compose.filters = notEmpty;
    }
  }

  if (sort) {
    compose.sort = sort;
  }

  if (pagination) {
    compose.pagination = pagination;
  }

  return _.isEmpty(compose) ? '' : `?${qs.stringify(compose, { encode: false })}`;
}

export function validateTeam(props) {
  const {
    validateFieldsAndScroll,
    additionalFields,
    teamId,
    team,
    isNew,
    create,
    update,
  } = props;

  return validateFieldsAndScroll((err, values) => {
    if (!err) {
      const api = isNew ? create : update;
      const request = { ...values };
      api({ ...request, ...additionalFields }, teamId, team);
    }
  });
}

export function getMessage(data, mapIndex) {
  data.map(updatedUser => getSingleMessage(updatedUser, mapIndex));
}

export function validateInputLength(
  {
    value,
    name,
    max,
    min,
  },
) {
  if (isNumeric(value)) {
    if (isNumeric(min) && isNumeric(max)) {
      if (value < min || value > max) {
        return {
          valid: false,
          message: `${name} must be between ${min} and ${max}`,
        };
      }
    }

    if (value > max) {
      return {
        valid: false,
        message: `${name} must be shorten then ${max}`,
      };
    }
  } else {
    if (isNumeric(min) && isNumeric(max)) {
      if (!value) {
        return {
          valid: false,
          message: `${name} can't be shorten then ${min}`,
        };
      }

      const text = value.trim();

      if (text.length > max || text.length < min) {
        return {
          valid: false,
          message: `${name} must be between ${min} and ${max} characters`,
        };
      }
    }

    if (value) {
      const text = value.trim();

      if (text.length > max) {
        return {
          valid: false,
          message: `${name} must be shorten then ${max} symbols`,
        };
      }
    }
  }

  return {
    valid: true,
  };
}

export function validateUrl(rule, value, callback) {
  const {
    spacesPattern,
    urlPattern,
    linkPattern,
    protocolPattern,
    validationErrors: {
      emptySpaces,
      linkError,
      protocolError,
    },
  } = constants;

  if (value && value.length && spacesPattern.test(value)) {
    return callback(emptySpaces);
  }

  if (value && value.length && !urlPattern.test(value)) {
    if (!linkPattern.test(value)) {
      return callback(linkError);
    }

    if (!protocolPattern.test(value)) {
      return callback(protocolError);
    }

    return callback(linkError);
  }

  return callback();
}

export function validateDateRange(
  date,
  mustLarger = true,
  message = null,
) {
  return ({ field }, value, callback) => {
    const endDates = ['dateEnd', 'dateFinish'];

    if (endDates.indexOf(field) !== -1 && !value) {
      return callback();
    }

    if (!date) {
      return callback();
    }

    const after = moment(value).isAfter(date);

    if (mustLarger && !after) {
      return callback(message || 'Date must be larger than other date');
    }

    if (!mustLarger && after) {
      return callback(message || 'Date must be lower than other date');
    }

    if (moment(date).isSame(value)) {
      return callback('Dates must be different');
    }

    return callback();
  };
}

export function validateIllegalSymbols(value, regexp) {
  const pattern = regexp || constants.emojiPattern;

  const index = value.search(pattern);

  return index === -1;
}

export function getSingleMessage(data, mapIndex) {
  const statuses = constants[mapIndex];

  const { status } = data;
  const statusFiled = statuses[status.code || status];
  const message = statusFiled.text;
  const type = statusFiled.status;

  return notification(type, message);
}

export function errorMessage(error) {
  return notification('error', error);
}

export function getError(error) {
  if (error.message) return error.message;

  return error.info && error.info.details
    ? error.info.details[0].message
    : error.message;
}

export function omitCollection(omitProps = [], collection = []) {
  return collection.map(item => _.omit(item, omitProps));
}

export function parseBool(value) {
  return (value === 'true' || value === 'false') ? (value === 'true') : value;
}

export function setRules(rules, value) {
  const editedRules = {};
  _.forOwn(rules, (rule, index) => {
    editedRules[index] = value;
  });

  return editedRules;
}

export function convertRules(rules, isSave) {
  const convertedRules = {};
  _.forOwn(rules, (rule, index) => {
    const toBool = rule === 'allow';
    const toText = rule ? 'allow' : 'disallow';
    convertedRules[index] = isSave ? toText : toBool;
  });

  return convertedRules;
}

export function checkSoftDeleteStatuses(items, isUsers) {
  const { deleteRestoreStatuses } = constants;
  const groupByStatus = _.groupBy(items, 'statusCode');
  const successIds = [];

  _.forIn(groupByStatus, (group, key) => {
    const { text, userText, status } = deleteRestoreStatuses[key];
    const textForUsers = userText || text;

    if (status) {
      notification(status, `${group.length} ${isUsers ? textForUsers : text}`);
    }

    if (status === 'success') {
      successIds.push(group.map(({ id }) => id));
    }
  });

  return _.flatten(successIds);
}

export function checkEmptyString(value) {
  return /^\s+$/.test(value) ? '' : value;
}

export function onClearOwner(itemName, form) {
  const { setFieldsValue } = form;

  setFieldsValue({
    [itemName]: null,
  });
}

export function getTimeStatus(date) {
  const momentDate = moment(date).utc().endOf('day');
  const currentDate = moment().utc();

  if ((momentDate - currentDate) > 0) {
    return 'Current';
  }

  return 'Past';
}

export function generateEditUrl({ name, id, secondId }) {
  switch (name) {
    case 'asset': {
      return `/dashboard/assets/edit/${id}`;
    }

    case 'assetLink': {
      return `/dashboard/assets/edit/${id}/link/edit/${secondId}`;
    }

    case 'feed_source': {
      return `/dashboard/feed/news_sources/edit/${id}`;
    }

    case 'asset_calendar': {
      return `/dashboard/all_events/asset_calendar/edit/${id}`;
    }

    case 'item_team': {
      return `/dashboard/assets/edit/${id}`;
    }

    case 'offline_events':
      return `/dashboard/all_events/offline_events/edit/${id}`;

    case 'news_source':
      return `/dashboard/news/news_sources/edit/${id}`;

    default:
      return `/dashboard/${name}/edit/${id}`;
  }
}

export function clearEmptyExternalId(form) {
  const { setFieldsValue, getFieldsValue } = form;
  const { externalId } = getFieldsValue(['externalId']);

  if (!externalId) {
    setFieldsValue({
      externalId: null,
    });
  }
}

export function createOptions(list = [], mapping = null) {
  if (!mapping) {
    return list;
  }

  return list.map(item => ({
    text: item[mapping.text],
    value: item[mapping.value],
  }));
}

export function fixDefaultImage(src) {
  const { DEFAULT_SOURCE_IMAGES } = constants;

  if (DEFAULT_SOURCE_IMAGES.includes(src)) {
    return `${window.location.protocol}//${window.location.host}${src}`;
  }

  return src;
}

export function downloadFile(fileFame, data) {
  const blob = new Blob([data], { type: 'pdf' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', `${fileFame}.pdf`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
export function checkRolePermission(role, permRole) {
  const Role = {
    'xpectum': 0,
    'admin_lms': 1,
    'admin_organisation': 2,
    'admin_group': 3,
  };
  return role.some(el => Role[el] <= Role[permRole]);
}
