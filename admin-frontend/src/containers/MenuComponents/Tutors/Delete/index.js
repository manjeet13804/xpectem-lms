import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getCurrentTutorFp,
  getTutorId,
} from 'selectors';
import URLS from 'redux/urls';
import tutorsActions from 'redux/tutors/actions';
import LayoutContent from 'components/utility/layoutContent';
import { PLACEHOLDER } from 'constants/constants';
import { REGEXP } from 'constants/regexp';
import IntlMessages from 'components/utility/intlMessages';
import {
  Banner,
  DeleteAttentionSvg,
  DefaultButton,
} from 'components';
import { bemlds } from 'utils';
import TutorsDeleteWrapper from './TutorsDelete.style';

const { confirmDelete } = PLACEHOLDER;
const { getDeleteId } = REGEXP;

const b = bemlds('delete-block');
const btn = bemlds('button');

const deleteConfirm = string => string.trim().toLowerCase() !== 'delete';

const urlDeleteConfirm = id => `${URLS.tutorsDelete}/${id}/confirm`;

class TutorsDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  clickCancel = () => {
    const { history } = this.props;
    history.goBack();
  };

  inputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  componentDidMount() {
    const { setCurrentTutor, tutorId } = this.props;
    setCurrentTutor(tutorId);
  }

  handleDelete = () => {
    const { deleteCurrentTutor, tutorId, history} = this.props;
    deleteCurrentTutor(tutorId, () => history.push(urlDeleteConfirm(tutorId)));
  }

  render() {
    const { inputValue } = this.state;

    const {
      currentTutor,
    } = this.props;

    const {
      firstName,
      lastName,
    } = currentTutor;

    return (
      <LayoutContent>
        <TutorsDeleteWrapper>
          <Banner title={<IntlMessages id="tutors.deleteBanner" />} />
          <section className={b()}>
            <DeleteAttentionSvg />
            <section className={b('text')}>
              <div className={b('text-title')}>
                <IntlMessages id="tutors.deleteTitle" />
                {firstName}
                {' '}
                {lastName}
              </div>
              <div className={b('text-confirm')}>
                <IntlMessages id="groupAdmin.deleteConfirm" />
              </div>
              <input
                className={b('text-input')}
                type="text"
                value={inputValue}
                placeholder={confirmDelete}
                onChange={this.inputChange}
              />
              <section className={btn()}>
                <DefaultButton
                  textId="groupAdmin.deleteBtn"
                  disabled={deleteConfirm(inputValue)}
                  onClick={this.handleDelete}
                  isDelete
                />
                <DefaultButton
                  textId="groupAdmin.cancelBtn"
                  onClick={this.clickCancel}
                />
              </section>
            </section>
          </section>
        </TutorsDeleteWrapper>
      </LayoutContent>
    );
  }
}


const mapStateToProps = (state) => {
  const { router: { location } } = state;

  const currentTutor = getCurrentTutorFp(state);
  const currentTutorId = getTutorId(state);

  const { pathname } = location;
  const res = pathname && pathname.match(getDeleteId);
  const tutorId = currentTutorId || res[1];

  return {
    currentTutor,
    tutorId,
  };
};

export default connect(mapStateToProps, { ...tutorsActions })(TutorsDelete);
