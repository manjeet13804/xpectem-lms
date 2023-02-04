// @flow
import React from 'react';
import {PopupContainer, SingleFieldForm} from 'components';
import {TERM_SHARED, FORMS} from 'localise';
import {connect} from 'react-redux';
import {actionRequest, actionGetOrganisationGroup} from 'redux/actions';
import {getRequestStatus, getCurrentOrganisationId} from 'redux/selectors';
import {GROUP as url} from 'constants/apiUrls';

type PropsType = {
  organisationId: string | number,
  close: () => void
};

const AddingGroup = (props: PropsType): Node => {
  const {
    close,
    requestStatus,
    organisationId,
    request,
    getGroupByOrganisationId,
  } = props;

  const onSubmit = ({field}: object, { setSubmitting }: object) => {
    setSubmitting(false);
    request({
      body: {name: field, organisationId},
      method: 'POST',
      url,
      callback: () => {
        getGroupByOrganisationId(organisationId);
      },
      isToken: true,
    });
  };

  return (
    <PopupContainer isRequestDefault close={close}>
      {requestStatus ? close() : null}
      <SingleFieldForm
        close={close}
        titleInput={TERM_SHARED.addGroup}
        placeholder={FORMS.placeholderAddGroup}
        buttonText={TERM_SHARED.add}
        onSubmit={onSubmit}
      />
    </PopupContainer>
  );
};

const mapStateToProps = (state: object): object => ({
  requestStatus: getRequestStatus(state),
  organisationId: getCurrentOrganisationId(state),
});

const mapDispatchToProps = {
  request: actionRequest,
  getGroupByOrganisationId: actionGetOrganisationGroup,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddingGroup);
