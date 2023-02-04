import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import URLS from 'redux/urls';
import groupsActions from 'redux/groups/actions';
import { bemlds, getErrorsFromValidationError } from 'utils';
import {
  CustomTextInput, IntlMessages,
  Banner,
  TextFormat,
  BannerNotification,
  CreatedAtBlock,
  LoaderFullSize,
  Checkbox,
  DefaultButton,
} from 'components';
import LayoutContent from 'components/utility/layoutContent';
import { PLACEHOLDER } from 'constants/constants';
import { ROLES } from 'constants/constants';
import Schema from './schema';
import GroupsAddWrapper from './AddGroups.style';

const { groupName } = PLACEHOLDER;

const page = bemlds('page');
const group = bemlds('group');
const btn = bemlds('button');

const urlCurrentGroupDelete = id => `${URLS.groupsDelete}/${id}`;

class AddAndEdit extends PureComponent {
  textFormatInstance = {};

  state = {
    errors: {},
    touched: {
      name: false,
    },
    translations: [],
  };

  constructor(props) {
    super(props);

    const {
      location: {
        pathname,
      },
      user
    } = props;

    const isXpectrumAdmin = (user.roles || []).includes(ROLES.XPECTUM_ADMIN)

    this.isEdit = pathname.includes('edit');

    const { history, selectedOrganisationName } = this.props;
    if (!selectedOrganisationName && !this.isEdit && isXpectrumAdmin) {
      history.push(URLS.groupsAdd);
    }
  }

  componentDidMount() {
    const {
      getCurrentGroup,
      match: { params: { groupsId } },
      setInitStateFullGroups,
    } = this.props;

    setInitStateFullGroups();

    if (this.isEdit) {
      getCurrentGroup(groupsId);
    }
  }

  componentDidUpdate() {
    if (this.props.currentGroup.translations !== this.state.translations) {
      this.setState((state, props) => ({
        translations: props.currentGroup.translations,
      }));
    }
  }

  addNameGroup = ({ target: { value, name } }) => {
    const { addInputGroupNameGroups } = this.props;
    this.validateForm({ name, value });
    addInputGroupNameGroups(value);
  };

  handleSaveDescription = (value, name, lang) => {
    const { translations } = this.state;

    const language = lang + 1;
    const index = translations.findIndex(item => item.language === language);
    this.setState(() => {
      const newTranslations = translations;
      newTranslations[index] = {
        ...newTranslations[index],
        [name]: value,
      };
      return {
        translations: newTranslations,
      };
    });
  };

  handleSubmit = () => {
    const {
      currentGroup,
      selectedOrganisationId,
      addGroupGroups,
      editGroup,
      match: { params: { groupsId } },
    } = this.props;
    const { name, isActive } = currentGroup;
    const isValid = this.validateForm();

    const { translations } = this.state;

    if (!isValid) {
      return;
    }

    const transactionFilter = translations.filter(({ description }) => description);

    const body = {
      name,
      isActive,
      translations: transactionFilter,
    };

    if (this.isEdit) {
      editGroup({
        ...body,
      }, groupsId);

      return;
    }

    addGroupGroups({
      ...body,
      organisation: selectedOrganisationId,
    }, () => {
      this.textFormatInstance.description.hardReset();
    });
  };

  validateForm = (newValue) => {
    try {
      const { currentGroup } = this.props;
      const valuesForValidation = {
        ...currentGroup,
        ...(newValue ? { [newValue.name]: newValue.value } : {}),
      };

      Schema.validateSync(valuesForValidation, { abortEarly: false });

      this.setState({ errors: {} });
      return true;
    } catch (error) {
      const errors = getErrorsFromValidationError(error);
      this.setState({ errors });
      return false;
    }
  };

  setTouchedName = () => {
    this.setState({ touched: { name: true } });
  }

  handleCheck = (value) => {
    const { changeInfoGroup } = this.props;
    changeInfoGroup('isActive', value);
  }

  render() {
    const {
      currentGroup: { name, isActive } = {},
      isSuccessResult,
      clearSuccessResult,
      isAddGroupLoading,
      currentGroup,
      isLoadingGettingGroup,
      match: { params: { groupsId } },
      isLoadingEditGroup,
      createdGroupName,
    } = this.props;

    const { translations } = this.state;

    const { errors } = this.state;
    const successMessage = this.isEdit ? <IntlMessages id="groups.changesSaved" /> : `The group - ${createdGroupName} is added!`;
    const bannerTitleId = this.isEdit ? 'groups.editTitle' : 'groups.titleBanner';

    return (
      <LayoutContent>
        <GroupsAddWrapper>
          <Banner title={<IntlMessages id={bannerTitleId} />} />
          {isSuccessResult && (
            <BannerNotification
              error={false}
              title={successMessage}
              isScrollMount
              close={clearSuccessResult}
            />
          )}
          {isLoadingGettingGroup ? <LoaderFullSize isLoading /> : (
            <section className={page({ transparent: false })}>
              <section className={page('left')}>
                <div className={group()}>
                  <div className={group('title')}>
                    <IntlMessages id="groups.addTitle" />
                    <span className={group('span')}>
                      {name}
                    </span>
                  </div>
                  <div className={group('name')}>
                    <IntlMessages id="groups.addInput" />
                  </div>
                  <CustomTextInput
                    className={group('name-input')}
                    type="text"
                    value={name}
                    placeholder={groupName}
                    name="name"
                    onChange={this.addNameGroup}
                    onFocus={this.setTouchedName}
                    error={errors.name}
                  />
                  <div className={group('optional')}>
                    <IntlMessages id="group.description" />
                  </div>
                  <TextFormat
                    saveDescription={this.handleSaveDescription}
                    translations={translations}
                    name="description"
                    link={this.textFormatInstance}
                  />
                  <div className={group('checkbox')}>
                    <Checkbox
                      handleCheck={this.handleCheck}
                      name="isActive"
                      title={<IntlMessages id="group.isActive" />}
                      value={isActive}
                    />
                  </div>
                  <section className={btn()}>
                    <Loader active={isAddGroupLoading || isLoadingEditGroup} inline className={btn('loader')} />
                    {this.isEdit && (
                    <Link className="link" to={urlCurrentGroupDelete(groupsId)}>
                      <DefaultButton
                        textId="lmsGroups.deleteBtn"
                        isDelete
                        disabled={isAddGroupLoading || isLoadingEditGroup}
                      />
                    </Link>
                    )}
                    <DefaultButton
                      textId={this.isEdit
                        ? 'lmsGroups.saveBtn'
                        : 'groups.addBtn'}
                      onClick={this.handleSubmit}
                      disabled={isAddGroupLoading || isLoadingEditGroup}
                    />
                  </section>
                </div>
              </section>
              <section className={page('right')}>
                {this.isEdit && (
                  <CreatedAtBlock data={currentGroup} />
                )}
              </section>
            </section>
          )}
        </GroupsAddWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = state => ({
  ...state.groups,
  ...state.searchOrganisations,
  ...state.searchLmsGroup,
  ...state.user,
});
export default connect(mapStateToProps, { ...groupsActions })(AddAndEdit);
