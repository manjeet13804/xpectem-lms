import isObject from 'lodash/isObject';
import isString from 'lodash/isString';

const getModifiers = object => (
  Object.keys(object).reduce((acc, key) => {
    const value = object[key];

    if (value) {
      const name = isString(key) ? key.trim() : key;
      return acc.concat(name);
    }

    return acc;
  }, [])
);

const addBlockNameToModifiers = (array, blockname) => (
  array.map(modifier => `${blockname}_${modifier}`)
);

const generateModifiers = (array, blockname) => (
  addBlockNameToModifiers(getModifiers(array), blockname).join(' ')
);

const getAffix = (name, blockname) => (
  name.trim() ? `${blockname}__${name}` : blockname
);

const getFullName = (affix, modifiers) => {
  const { mix, ...rest } = modifiers;
  const string = `${affix} ${generateModifiers(rest, affix)}`;
  return mix ? mix.concat(` ${string}`) : string;
};

const bemlds = (blockname) => {
  if (!isString(blockname)) {
    throw new Error('Expected type of block name string, but got: ', blockname);
  }

  return (...args) => {
    const [firstArg, secondArg] = args;

    if (isObject(firstArg)) {
      return getFullName(blockname, firstArg);
    }

    if (isString(firstArg)) {
      const affix = getAffix(firstArg, blockname);

      if (isObject(secondArg)) {
        return getFullName(affix, secondArg);
      }

      return affix;
    }

    return blockname;
  };
};

export default bemlds;
