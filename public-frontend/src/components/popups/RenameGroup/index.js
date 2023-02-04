// @flow
import React from 'react';
import {PopupContainer, SingleFieldForm} from 'components';
import {TERM_SHARED, FORMS} from 'localise';
import {connect} from 'react-redux';
import {actionRequest, actionRenameGroup} from 'redux/actions';
import {getRequestStatus} from 'redux/selectors';
import {GROUP as url} from 'constants/apiUrls';

type PropsType = {
  close: () => void,
  id: number | string,
  oldName: string
};

const renameGroupPopup = (props: PropsType): Node => {
  const {
    close,
    requestStatus,
    id,
    oldName,
  } = props;

  const onSubmit = ({field}: object, { setSubmitting }: object) => {
    const {renameGroup, renameGroupRequest} = props;
    setSubmitting(false);
    renameGroupRequest({
      body: {name: field},
      url: `${url}/${id}`,
      method: 'PUT',
      callback: () => {
        renameGroup(id, field);
      },
    });
  };

  return (
    <PopupContainer isRequestDefault close={close}>
      {requestStatus ? close() : null}
      <SingleFieldForm
        close={close}
        titleInput={TERM_SHARED.renameGroup}
        placeholder={FORMS.placeholderRenameOrganisation}
        buttonText={TERM_SHARED.rename}
        inputDefault={oldName}
        onSubmit={onSubmit}
      />
    </PopupContainer>
  );
};

const mapStateToProps = (state: object): object => ({
  requestStatus: getRequestStatus(state),
});

const mapDispatchToProps = {
  renameGroupRequest: actionRequest,
  addGroup: actionRenameGroup,
};


export default connect(mapStateToProps, mapDispatchToProps)(renameGroupPopup);
