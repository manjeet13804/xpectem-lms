// @flow
import { Node } from 'react';
import { connect } from 'react-redux';

import { Page } from 'pages';
import { actionAddNewEmail } from 'redux/actions';

type PropType = {
  addNewEmail: () => void
};

class AddEmailPage extends Page<PropType> {
  componentDidMount() {
    const { addNewEmail, history, location: { search } } = this.props;
    const urlParts = search && search.split('token=');

    const token = urlParts[urlParts.length - 1];

    if (token) {
      addNewEmail(token, history);
    }
  }

  render(): Node {
    return null;
  }
}

const mapDispatchToProps = {
  addNewEmail: actionAddNewEmail,
};

export default connect(null, mapDispatchToProps)(AddEmailPage);
