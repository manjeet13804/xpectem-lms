// @flow
import classNames from 'classnames/bind';

const btnClass = (bem: function, mod: string): string => classNames({
  [`${bem('btn')}`]: bem,
  btn: true,
  [`${mod}`]: mod,
});

const linkClass = (bem: function): string => classNames({
  [`${bem('link')}`]: bem,
  link: true,
});

const btnIcon = (bem: function): string => btnClass(bem, 'btn--icon');
const btnText = (bem: function): string => btnClass(bem, 'btn--text');

function sharedClass(...args: string): string {
  const classNamesObject = {};
  args.forEach((className: string) => {
    classNamesObject[className] = className;
  });

  return classNames(classNamesObject);
}

const labelClass = (bem: function, mod: string): string => classNames({
  [`${bem('label')}`]: bem,
  label: true,
  [`${mod}`]: mod,
});


const labelCheckbox = (bem: function): string => labelClass(bem, 'label--checkbox');

export {
  btnClass,
  btnIcon,
  btnText,
  linkClass,
  labelCheckbox,
  sharedClass,
};
