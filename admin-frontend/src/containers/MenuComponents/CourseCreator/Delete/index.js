import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import courseCreatorActions from 'redux/courseCreator/actions';
import LayoutContent from 'components/utility/layoutContent';
import { PLACEHOLDER } from 'constants/constants';
import IntlMessages from 'components/utility/intlMessages';
import {
  Banner,
  DeleteAttentionSvg,
  DefaultButton,
} from 'components';
import { bemlds } from 'utils';
import { MAIN_ROUTE } from '../../../../constants/routes';
import AdministratorsDeleteWrapper from './AdministratorsDelete.style';

const { confirmDelete } = PLACEHOLDER;

const b = bemlds('delete-block');
const btn = bemlds('button');

const { deleteCourseCreator } = MAIN_ROUTE;
const deleteConfirmUrl = id => `${deleteCourseCreator}/${id}/confirm`;

class CourseCreatorDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  inputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  clickCancel = () => {
    const { history } = this.props;
    history.goBack();
  };


  render() {
    const { inputValue } = this.state;
    const {
      currentCourseCreator,
      deleteCourseCreator,
    } = this.props;

    const {
      firstName,
      lastName,
      id,
    } = currentCourseCreator;

    return (
      <LayoutContent>
        <AdministratorsDeleteWrapper>
          <Banner title={<IntlMessages id="courseCreators.bannerDelete" />} />
          <section className={b()}>
            <DeleteAttentionSvg />
            <section className={b('text')}>
              <div className={b('text-title')}>
                {<IntlMessages id="courseCreators.deleteTitleAdmin" />}
                {`${firstName} ${lastName} ?`}
              </div>
              <div className={b('text-confirm')}>
                <IntlMessages id="groupAdmin.deleteConfirm" />
              </div>
              <input
                className={b('text-input')}
                type="text"
                value={inputValue}
                name="inputValue"
                placeholder={confirmDelete}
                onChange={this.inputChange}
              />
              <section className={btn()}>
                <Link className={btn('link')} to={deleteConfirmUrl(id)}>
                  <DefaultButton
                    textId="groupAdmin.deleteBtn"
                    onClick={() => deleteCourseCreator(id)}
                    disabled={!(inputValue)}
                    isDelete
                  />
                </Link>
                <DefaultButton
                  textId="groupAdmin.cancelBtn"
                  onClick={this.clickCancel}
                />
              </section>
            </section>
          </section>
        </AdministratorsDeleteWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = ({
  courseCreator: {
    currentCourseCreator,
  },
}) => ({
  currentCourseCreator,
});

export default connect(mapStateToProps,
  {
    ...courseCreatorActions,
  })(CourseCreatorDelete);
