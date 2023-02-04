import React from 'react';
import { bemlds } from 'utils';
import PropTypes from 'prop-types';
import {
  TrashIcon,
  Checkbox,
} from 'components';
import { REG_LINK_BASE_URL } from 'constants/constants';

const b = bemlds('reglink-table');
const item = bemlds('reglink-item');

const propTypes = {
  data: PropTypes.arr,
  isDisabled: PropTypes.bool,
  handleUpdateRegLinkStatus: PropTypes.func,
  handleDeleteRegistrationLink: PropTypes.func,
};

const defaultProps = {
  data: {},
  isDisabled: false,
  handleUpdateRegLinkStatus: () => null,
  handleDeleteRegistrationLink: () => null,
};

const RegLinkTableBody = ({
  data,
  handleUpdateRegLinkStatus,
  handleDeleteRegistrationLink,
  isDisabled,
}) => {
  const copyToClipboard = (textToCopy) => {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(textToCopy);
    }
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    textArea.style.position = 'absolute';
    textArea.style.opacity = 0;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
  };

  return (
    <tbody>
      {data.map((row, index) => {
        const {
          id,
          uid,
          courses,
          groups,
          active,
        } = row;
        const link = `${REG_LINK_BASE_URL}${uid}`;
        return (
          <tr className={b('row')} key={id}>
            <td className={b('col')}>
              <div className={b('col-label-container')}>
                <div>
                  {courses.map(({ title, id: courseId }) => (
                    <div
                      className={b('col-label')}
                      key={courseId}
                    >
                      {title}
                    </div>
                  ))}
                </div>
                <div>
                  {groups.map(({ name, id: groupId }) => (
                    <div key={groupId}>
                      {` - ${name}`}
                    </div>
                  ))}
                </div>
              </div>
            </td>
            <td className={b('col')}>
              <button
                type="button"
                tabIndex="0"
                onClick={() => copyToClipboard(link)}
                className={item('link')}
              >
                {link}
              </button>
            </td>
            <td className={b('col')}>
              <div className={item('check-box')}>
                <Checkbox
                  name="mandatory"
                  value={active}
                  disabled={isDisabled}
                  handleCheck={() => handleUpdateRegLinkStatus(id, !active)}
                />
              </div>
            </td>
            <td className={b('col')}>
              <button
                type="button"
                tabIndex="0"
                onClick={() => handleDeleteRegistrationLink(id)}
                className={item('delete-button')}
                disabled={isDisabled}
              >
                <TrashIcon width={18} height={18} />
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

RegLinkTableBody.propTypes = propTypes;
RegLinkTableBody.defaultProps = defaultProps;

export default RegLinkTableBody;
