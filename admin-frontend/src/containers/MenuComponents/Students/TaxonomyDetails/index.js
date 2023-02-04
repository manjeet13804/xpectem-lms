import React, { Component } from 'react';
import LayoutContent from 'components/utility/layoutContent';
import {
  Banner,
  DefaultButton,
  BannerNotification,
} from 'components';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ROLES } from 'constants/constants';
import GlobalSearch from 'containers/_search/GlobalSearch';
import TaxonomyWrapper from './TaxonomyDetails.style';
import TaxonomyTable from './TaxonomyTable';
import TaxonomyActions from '../../../../redux/taxonomy/actions';

const b = bemlds('taxonomy-block');

const newTaxonomy = {
  title: '',
  format: '',
  mandatory: false,
};

const propTypes = {
  fetchTaxonomy: PropTypes.func,
  addTaxonomy: PropTypes.func,
  removeTaxonomy: PropTypes.func,
  changeTaxonomyData: PropTypes.func,
  saveTaxonomy: PropTypes.func,
  loadTaxonomy: PropTypes.bool,
  user: PropTypes.obj,
  taxonomies: PropTypes.arr,
  isSuccessBanner: PropTypes.bool,
  clearSuccessResultTaxonomy: PropTypes.func,
  isXpectum: PropTypes.bool,
};

const defaultProps = {
  fetchTaxonomy: () => null,
  addTaxonomy: () => null,
  removeTaxonomy: () => null,
  changeTaxonomyData: () => null,
  saveTaxonomy: () => null,
  user: {},
  taxonomies: [],
  loadTaxonomy: false,
  isSuccessBanner: false,
  clearSuccessResultTaxonomy: () => null,
  isXpectum: false,
};
class TaxonomyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lmsGroupId: '',
      validationErrors: [],
    };
  }


  componentDidMount() {
    const { fetchTaxonomy, user, isXpectum } = this.props;
    const lmsGroupId = user.lmsGroups && user.lmsGroups[0] && user.lmsGroups[0].id;
    if (lmsGroupId && !isXpectum) {
      fetchTaxonomy({ lmsGroupId });
      this.setState({ lmsGroupId });
    }
  }

  componentDidUpdate(prevProps) {
    const { fetchTaxonomy, user, isXpectum } = this.props;
    const prevLmsGroupId = prevProps.user.lmsGroups
      && prevProps.user.lmsGroups[0]
      && prevProps.user.lmsGroups[0].id;
    const lmsGroupId = user.lmsGroups && user.lmsGroups[0] && user.lmsGroups[0].id;
    if (prevLmsGroupId !== lmsGroupId && !isXpectum) {
      fetchTaxonomy({ lmsGroupId });
      this.setState({ lmsGroupId });
    }
  }

  onSaveValidation = () => {
    const { taxonomies } = this.props;
    const { validationErrors } = this.state;

    const errors = taxonomies.reduce((acc, item) => {
      if (!item.title) {
        return [...acc, {
          title: 'title', id: item.id, errText: 'Taxonomy title is required',
        }];
      }
      return acc;
    }, []);

    const newErrors = [
      ...validationErrors,
      ...errors,
    ];
    this.setState({
      validationErrors: newErrors,
    });
    if (errors.length > 0) return false;
    return true;
  }

  handleBlurValidation = ({ target: { name, value } }, id) => {
    const { validationErrors } = this.state;
    if ((name === 'title') && !value && !validationErrors.find(item => item.id === id)) {
      const newErrors = [
        ...validationErrors,
        { [name]: name, id, errText: 'Taxonomy title is required' },
      ];
      this.setState({
        validationErrors: newErrors,
      });
    } else if (value && validationErrors.find(item => item.id === id)) {
      this.setState({
        validationErrors: [...validationErrors.filter(item => item.id !== id)],
      });
    }
  }

  handleAddTaxonomyRow = () => {
    const { addTaxonomy } = this.props;
    addTaxonomy(newTaxonomy);
  }

  handleRemoveTaxonomyRow = (id) => {
    const { removeTaxonomy } = this.props;
    removeTaxonomy(id);
  }

  handleChangeTaxonomy = (e, id) => {
    const { changeTaxonomyData } = this.props;
    const { name, value } = e.target;
    if (value === '') {
      changeTaxonomyData(name, null, id);
      return;
    }
    changeTaxonomyData(name, value, id);
  }

  handleCheck = (value, name, id) => {
    const { changeTaxonomyData } = this.props;
    changeTaxonomyData(name, value, id);
  };

  handleSaveTaxonomy = (taxonomies, lmsGroupId) => {
    const { saveTaxonomy } = this.props;
    const { validationErrors } = this.state;
    const checkErrors = this.onSaveValidation();
    if (validationErrors.length === 0 && checkErrors) {
      const metaData = taxonomies.map((item) => {
        if (typeof item.id === 'string') {
          return {
            title: item.title,
            format: item.format,
            mandatory: item.mandatory,
          };
        }
        return item;
      });
      saveTaxonomy({ metaData, currentLmsGroupId: lmsGroupId });
    }
  }

  render() {
    const {
      taxonomies,
      loadTaxonomy,
      isSuccessBanner,
      clearSuccessResultTaxonomy,
      fetchTaxonomy,
      isXpectum,
    } = this.props;
    const {
      lmsGroupId,
      validationErrors,
    } = this.state;

    const saveDisabled = !lmsGroupId || validationErrors.length !== 0 || loadTaxonomy;

    if (isXpectum && !lmsGroupId) {
      return (
        <LayoutContent>
          <TaxonomyWrapper>
            <Banner title={<IntlMessages id="students.taxonomyBanner" />} />
            {isSuccessBanner && (
            <BannerNotification
              error={false}
              title={<IntlMessages id="students.taxonomyChangeSave" />}
              close={clearSuccessResultTaxonomy}
              isScrollMount
            />
            )}
            <section className={b()}>
              <GlobalSearch
                onClickResultLmsGroup={(id) => {
                  this.setState({ lmsGroupId: id });
                  fetchTaxonomy({ lmsGroupId: id });
                }}
              />
            </section>
          </TaxonomyWrapper>
        </LayoutContent>
      );
    }
    return (
      <LayoutContent>
        <TaxonomyWrapper>
          <Banner title={<IntlMessages id="students.taxonomyBanner" />} />
          {isSuccessBanner && (
            <BannerNotification
              error={false}
              title={<IntlMessages id="students.taxonomyChangeSave" />}
              close={clearSuccessResultTaxonomy}
              isScrollMount
            />
          )}
          <section className={b()}>
            <section>
              <div className={b('text')}>
                <div>
                  <IntlMessages id="students.taxonomyFirstTitle" />
                </div>
                <div>
                  <IntlMessages id="students.taxonomySecondTitle" />
                </div>
                <div>
                  <IntlMessages id="students.taxonomyThirdTitle" />
                </div>
              </div>
            </section>
            <TaxonomyTable
              taxonomies={taxonomies}
              validationErrors={validationErrors}
              handleAddRow={this.handleAddTaxonomyRow}
              handleRemoveRow={this.handleRemoveTaxonomyRow}
              handleChangeTaxonomy={this.handleChangeTaxonomy}
              handleCheck={this.handleCheck}
              handleBlur={this.handleBlurValidation}
            />
          </section>
          <div className={b('save-button')}>
            <DefaultButton
              onClick={() => this.handleSaveTaxonomy(taxonomies, lmsGroupId)}
              textId="students.saveMetaData"
              disabled={saveDisabled}
            />
            {isXpectum && (
            <div className={b('delete-button')}>
              <DefaultButton
                onClick={() => this.setState({ lmsGroupId: null })}
                textId="students.chooseAnotherGroup"
              />
            </div>
            )}
          </div>
        </TaxonomyWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.Auth;
  const isXpectum = user && user.roles && user.roles.includes(ROLES.XPECTUM_ADMIN);
  const {
    taxonomies,
    loadTaxonomy,
    error,
    isSuccessBanner,
  } = state.taxonomy;

  return {
    user,
    taxonomies,
    loadTaxonomy,
    error,
    isSuccessBanner,
    isXpectum,
  };
};

TaxonomyDetails.propTypes = propTypes;
TaxonomyDetails.defaultProps = defaultProps;
export default connect(mapStateToProps, {
  ...TaxonomyActions,
})(TaxonomyDetails);
