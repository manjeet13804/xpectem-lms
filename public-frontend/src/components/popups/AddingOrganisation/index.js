// @flow
import React from 'react';
import {PopupContainer, SingleFieldForm} from 'components';
import {TERM_SHARED, FORMS} from 'localise';
import {connect} from 'react-redux';
import {actionRequest, actionGetAllOrganisation} from 'redux/actions';
import {getRequestStatus} from 'redux/selectors';
import {ORGANISATION as url} from 'constants/apiUrls';

type PropsType = {
  close: () => void
};

const AddingOrganisationPopup = (props: PropsType): Node => {
  const {close, requestStatus} = props;

  const onSubmit = ({field}: object, { setSubmitting }: object) => {
    const {getAllOrganisation, request} = props;
    setSubmitting(false);
    request({
      body: {name: field},
      url,
      method: 'POST',
      callback: () => {
        getAllOrganisation();
      },
      isToken: true,
    });
  };

  return (
    <PopupContainer isRequestDefault close={close}>
      {requestStatus ? close() : null}
      <SingleFieldForm
        close={close}
        titleInput={TERM_SHARED.addOrganisation}
        placeholder={FORMS.placeholderAddOrganisation}
        buttonText={TERM_SHARED.add}
        onSubmit={onSubmit}
      />
    </PopupContainer>
  );
};

const mapStateToProps = (state: object): object => ({
  requestStatus: getRequestStatus(state),
});

const mapDispatchToProps = {
  request: actionRequest,
  getAllOrganisation: actionGetAllOrganisation,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddingOrganisationPopup);
