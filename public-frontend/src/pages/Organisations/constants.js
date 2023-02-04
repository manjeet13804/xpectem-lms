// @flow
import {
  AddingOrganisationPopup,
  AddingGroupPopup,
  RenameGroupPopup,
} from 'components';

const POPUPS_PROPS = {
  admin: 'admin',
  addGroup: 'addGroup',
  renameGroup: 'renameGroup',
  hide: 'hide',
};

const POPUPS_RENDER = [
  {
    name: POPUPS_PROPS.admin,
    tag: AddingOrganisationPopup,
  },
  {
    name: POPUPS_PROPS.addGroup,
    tag: AddingGroupPopup,
  },
  {
    name: POPUPS_PROPS.renameGroup,
    tag: RenameGroupPopup,
  },
];

export {
  POPUPS_PROPS,
  POPUPS_RENDER,
};
