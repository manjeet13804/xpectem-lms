 import classNames from 'classnames/bind';

const btnClass = (bem, mod) => classNames({
  [`${bem('btn')}`]: bem,
  btn: true,
  [`${mod}`]: mod,
});

const linkClass = (bem) => classNames({
  [`${bem('link')}`]: bem,
  link: true,
});

const btnIcon = (bem) => btnClass(bem, 'btn--icon');
const btnText = (bem) => btnClass(bem, 'btn--text');

function sharedClass(...args) {
  const classNamesObject = {};
  args.forEach((className) => {
    classNamesObject[className] = className;
  });

  return classNames(classNamesObject);
}

const labelClass = (bem, mod) => classNames({
  [`${bem('label')}`]: bem,
  label: true,
  [`${mod}`]: mod,
});


const labelCheckbox = (bem) => labelClass(bem, 'label--checkbox');

export {
  btnClass,
  btnIcon,
  btnText,
  linkClass,
  labelCheckbox,
  sharedClass,
};
