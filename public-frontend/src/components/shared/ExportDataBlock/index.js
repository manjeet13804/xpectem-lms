// @flow
import React, {Node, useState} from 'react';
import { bemlds } from 'utils';
import { ExportMyDocumentPopup } from 'components';
import { EDIT_PROFILE } from 'localise';
import './styles.scss';

const {
  exportMyData,
  exportText,
} = EDIT_PROFILE;

const b = bemlds('export-data-block');

const DefaultProps = {
  className: '',
};

type PropType = {
  className?: string
};

const ExportDataBlock = ({className}: PropType): Node => {
  const [isOpenPopup, openPopup] = useState(false);

  const showPopup = () => {
    openPopup(!isOpenPopup);
  };

  return (
    <section className={b({mix: className})}>
      <span className={b('title')}>{exportMyData}</span>
      <button className={b('btn btn')} type="button" onClick={showPopup}>{exportText}</button>
      {isOpenPopup && <ExportMyDocumentPopup close={showPopup} />}
    </section>
  );
};

ExportDataBlock.defaultProps = DefaultProps;

export default ExportDataBlock;
