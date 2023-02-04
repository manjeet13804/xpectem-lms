import React from 'react';
import { IntlMessages, Checkbox, SelectAllNone } from 'components';
import { DATE_FORMATS } from 'constants/constants';
import moment from 'moment';
import studentsActions from 'redux/courses/actions';
import { bemlds } from 'utils';
import { connect } from 'react-redux';
import { Loader, Dimmer, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './styles.scss';

const { yearMonthDay } = DATE_FORMATS;
const b = bemlds('result-search-block');

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  prefix: PropTypes.string,
  belongs: PropTypes.string,
  onClickResultItem: PropTypes.func,
};

const defaultProps = {
  data: [],
  title: '',
  isLoading: false,
  prefix: '',
  onClickResultItem: () => null,
};

const ResultBlock = ({
  data,
  title,
  isLoading,
  prefix,
  onClickResultItem,
  isSelectCheckboxItem,
  selectedData,
  selectAll,
  permission,
  selectNone,
  report,
}) => {
  if (isLoading) {
    return (
      <div className={b()}>
        {title && <p className={b('title')}>{title}</p>}

        <div className={b('result')}>
          <Segment>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          </Segment>
        </div>
      </div>
    );
  }
  const isHaveReports = (report || permission) && isSelectCheckboxItem && data.length;
  const selectItemName = item => item.name || item.title || `${item.firstName} ${item.lastName}`;
  return (
    <div className={b()}>
      <div className={b('header')}>
        {title && <p className={b('title')}>{title}</p>}
      </div>
      {isHaveReports ? (
        <div className={b('select-all')}>
          <SelectAllNone onSelectAll={selectAll} onSelectNone={selectNone} />
        </div>
      ) : null }
      <div className={b('result')}>
        {
          data.length ? data.map((item) => {
            const currentValueChecked = selectedData.some(sorg => sorg.id === item.id);

            return (
              <div
                key={`${prefix}${item.id}`}
                className={b('item')}
                role="button"
                onClick={() => onClickResultItem(item.id, item.name || item.title, item)}
                tabIndex={-1}
              >
                <div className={b('text-wrapper')}>
                  <p className={b('name')}>{selectItemName(item)}</p>
                  {item.affiliation && <p>{`- ${item.affiliation}`}</p>}
                  {item.email && <p>{`- ${item.email}`}</p>}
                  {Boolean(item.belongs) && <p>{`- Belongs to ${item.belongs}`}</p>}
                  <p>{`- Created ${moment(item.createdAt).format(yearMonthDay)}`}</p>
                </div>
                {isSelectCheckboxItem && (
                  <div className={b('checkbox-wrapper')}>
                    <Checkbox value={currentValueChecked} />
                  </div>
                )}
              </div>
            );
          })
            : (
              <div className={b('not-found')}>
                <IntlMessages id="lmsGroups.noResultsFound" />
              </div>
            )
        }
      </div>
    </div>
  );
};

ResultBlock.defaultProps = defaultProps;
ResultBlock.propTypes = propTypes;
const mapStateToProps = state => ({
});

export default connect(
  mapStateToProps,
  {
    ...studentsActions,
  },
)(ResultBlock);
