import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import IntlMessages from 'components/utility/intlMessages';
import Scrollbar from 'components/utility/customScrollBar';
import SingleContact from './singleContact';
import { ContactListWrapper } from './contactList.style';

export default class ContentList extends Component {
  render() {
    const { content } = this.props;

    return (
      <ContactListWrapper className="isoContactListWrapper">
        {content && content.length > 0 ? (
          <div className="isoContactList">
            <Scrollbar className="contactListScrollbar">
              {content.map(contact => <SingleContact item={contact} key={contact.value} {...this.props} />)}
            </Scrollbar>
          </div>
        ) : (
          <span className="isoNoResultMsg">
            <IntlMessages id="Component.content.noOption" />
          </span>
        )}
      </ContactListWrapper>
    );
  }
}

ContentList.defaultProps = {
  content: [],
  selectContent: null,
  selectedId: null,
};

ContentList.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object),
  selectContent: PropTypes.func,
  selectedId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};
