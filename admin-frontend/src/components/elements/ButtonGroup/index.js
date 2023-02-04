import React from 'react';
import './button-group.scss';

const ButtonGroup = (props) => {
  const { buttons, doSomethingAfterClick, permission } = props;
  const handleClick = (buttonLabel) => {
    doSomethingAfterClick(buttonLabel);
  };

  const changeActiveColor = (i, buttonLabel) => {
    if ((permission === 1) && buttonLabel === 'No Access') {
      return 'customButton active';
    }
    if ((permission === 2) && buttonLabel === 'Access') {
      return 'customButton active-access';
    }
    if ((permission === 3) && buttonLabel === 'Access & Edit') {
      return 'customButton active-access_edit';
    }
    return 'customButton';
  };

  return (
    <div className="custom-button">
      {buttons.map((buttonLabel, i) => (
        <button
          key={i}
          type="button"
          name={buttonLabel}
          onClick={() => handleClick(buttonLabel)}
          className={changeActiveColor(i, buttonLabel)}
        >
          {buttonLabel}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
