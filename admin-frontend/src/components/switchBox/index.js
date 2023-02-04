import React from 'react';
import Tooltip from 'components/uielements/tooltip';
import { Switch } from 'antd';
import defaultProps from './defaultProps';
import propTypes from './propTypes';

const SwitchBox = ({
  input,
  updateSwitch,
  isNew,
  name,
  title,
  rules,
}) => {
  const value = rules && rules[name];
  const titleForShow = title || name;

  return (
    <div className="FormContainer">
      {input && input}
      {
          !isNew
          && (
            <div className="SwitchBox">
              <Tooltip title={`${(input && input.props) ? input.props.title : titleForShow} external update`}>
                <Switch
                  checked={value !== null ? value : true}
                  name={name}
                  onChange={event => updateSwitch(event, { name })}
                  className="formInput getInputConfigSwitchBox"
                />
              </Tooltip>
            </div>
          )
        }
    </div>
  );
};

SwitchBox.defaultProps = defaultProps;
SwitchBox.propTypes = propTypes;

export default SwitchBox;
