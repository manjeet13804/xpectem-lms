import React from 'react';
import { bemlds } from 'utils';
import { Icon } from 'antd';
import { PropTypes } from 'prop-types';
import AttachedTopicWrapper from './attachedTopic.style';

const defaultProps = {
  id: null,
  name: '',
  onDelete: null,
  onEdit: null,
  isEdit: false,
  type: '',
};

const propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  isEdit: PropTypes.bool,
  type: PropTypes.string,
};

const b = bemlds('attached-topic');

const AttachedTopic = (props) => {
  const {
    id,
    name,
    onDelete,
    onEdit,
    isEdit,
    type,
  } = props;

  return (
    <AttachedTopicWrapper>
      <div className={b()}>
        <div className={b('name')} title={name}>{name}</div>
        <div className={b('controls')}>
          {isEdit && (
            <button
              type="button"
              tabIndex="-1"
              className={b('icon-wrapper')}
              onClick={() => onEdit(id, type)}
              disabled={Boolean(!id)}
            >
              <Icon type="form" />
            </button>
          )}
          <div
            role="button"
            tabIndex="-1"
            className={b('icon-wrapper_delete')}
            onClick={() => onDelete(name)}
            disabled={Boolean(!id)}
          >
            <Icon type="close" />
          </div>
        </div>
      </div>
    </AttachedTopicWrapper>
  );
};

AttachedTopic.propTypes = propTypes;
AttachedTopic.defaultProps = defaultProps;

export default AttachedTopic;
