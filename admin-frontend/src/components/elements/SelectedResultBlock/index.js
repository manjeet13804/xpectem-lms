import React from 'react';
import { Icon } from 'semantic-ui-react';
import { IntlMessages } from 'components';
import courseCreatorActions from 'redux/courseCreator/actions';
import { bemlds } from 'utils';
import { connect } from 'react-redux';
import './styles.scss';

const b = bemlds('selected-result-block');

const SelectedResultBlock = ({
  data,
  isShowSelectedBlock,
  onRemoveItem,
  onClickNext,
  title,
  selectedReportType,
  description,
  report,
  withoutNextButton,
}) => {
  const isReportReadyToCreate =
    report && Number.isInteger(selectedReportType) && isShowSelectedBlock;

  return (
    <div className={b()}>
      <p className={b('title')}>{title}</p>
      <p className={b('description')}>{description}</p>
      <div className={b('items')}>
        {data.map(item => (
          <div className={b('item')} key={item.id}>
            <p className={b('text')}>{item.text}</p>
            <button
              type="button"
              onClick={() => onRemoveItem(item.id)}
              className={b('btn')}
            >
              <Icon name="close" />
            </button>
          </div>
        ))}
      </div>
      <div className={b('wrapper-next-btn')}>
        {!withoutNextButton && (
        <div>
          {
        isReportReadyToCreate ? (
          <button
            type="submit"
            onClick={onClickNext}
            className={b('next-btn')}
          >
            <IntlMessages id="orgAdmins.nextBtn" />
          </button>
        ) : (
          <button
            type="submit"
            onClick={onClickNext}
            className={b('next-btn')}
          >
            <IntlMessages id="orgAdmins.nextBtn" />
          </button>
        )
      }
        </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ courses: { selectedReportType } }) => ({
  selectedReportType,
});
export default connect(mapStateToProps,
  {
    ...courseCreatorActions,
  })(SelectedResultBlock);
