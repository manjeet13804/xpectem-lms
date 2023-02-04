import React from 'react';
import { bemlds } from 'utils';
import { Icon } from 'antd';
import ListItemWrapper from './listItem.style';

const b = bemlds('item');

function ListItem(props) {
  const {
    onDelete,
    name,
    id,
    disabled,
  } = props;

  const handleDelete = () => {
    if (disabled) return;
    onDelete(id);
  };

  return (
    <ListItemWrapper>
      <div className={b()}>
        <div className={b('name')}>{name}</div>
        <div className={b('controls')}>
          <div
            className={b('icon-wrapper_delete')}
            onClick={handleDelete}
            tabIndex={-1}
            role="button"
          >
            <Icon type="close" />
          </div>
        </div>
      </div>
    </ListItemWrapper>
  );
}

export default ListItem;
